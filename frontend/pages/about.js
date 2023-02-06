import { useAccount } from "wagmi";
import { useEffect } from "react";
import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button, Box, Flex} from "@chakra-ui/react";
import { create, urlSource } from 'ipfs-http-client'
import { Buffer } from 'buffer'
import {ABI} from '../utils/factory_contract';
import {ADDRESS} from '../utils/factory_contract';
const { providers, Contract, getSigner, ethers   } = require('ethers');

/* configure Infura auth settings */
const projectId = "2LHva8zBI2gINCbG18shEHdpWtS"
const projectSecret ="b92caca11c9acbded128ef4f8540f9f2"
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https', headers: {
  authorization: auth,
}, })

function About() {
  const [values, setValues] = useState({ message: ""});	
  const [values2, setValues2] = useState({ message2: ""});	
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data: ", formData);
    // Connect to a Hyperspace (Filecoin) node
    const provider = new providers.JsonRpcProvider('https://api.hyperspace.node.glif.io/rpc/v1');

    // The address of the smart contract
    const contractAddress = ADDRESS;

    // Create an instance of the Contract object
    const contract = new Contract(contractAddress, ABI, provider);

    // Call the READ function
    contract.getPayViewContract(1).then((result) => {
    console.log(`The result of the function call is: ${result}`);
  });

    // Call the WRITE function
    const provider2 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider2.getSigner();

    const _tokenName = document.getElementById("nftname").value
    const _symbol= document.getElementById("symbol").value
    const _uri= document.getElementById("jsonuri").value
    const _amount=ethers.utils.parseEther(document.getElementById("amount").value)
    const _vid_cid=document.getElementById("videocid").value

    contract.connect(signer).createNewPayView(_tokenName, _symbol, _uri, _amount, _vid_cid).then((result) => {
      console.log(`The result of the function call is: ${result}`);
  
    });    

  };

  async function uploadIPFS(){   
    // Image Upload First
    const fileInput = document.getElementById("image")
    const data = fileInput.files[0]
    const added = await ipfs.add(data)
    const url = `https://infura-ipfs.io/ipfs/${added.path}`
    console.log("IPFS URI: ", url)

    //Create JSON 
    const object = {
      "name" : document.getElementById("name").value,
      "description": document.getElementById("description").value,
      "image": url,
    }
    const file = Buffer.from(JSON.stringify(object));
    const uploaded = await ipfs.add(file)
    const url2 = `https://infura-ipfs.io/ipfs/${uploaded.path}`
    console.log("IPFS URI: ", url2)
    setValues({ ...values, message: url2 })
  }

  async function uploadVideo(){   
    // Image Upload First
    const fileInput = document.getElementById("video")
    const data = fileInput.files[0]
    const added = await ipfs.add(data)
    const url = `https://infura-ipfs.io/ipfs/${added.path}`
    console.log("IPFS URI: ", url)
    setValues2({ ...values2, message2: url })
  }
  

  return (
    <Box bg='gray.800'minH="100vh" w='100%' p={4} color='white' alignItems="center">
   <div>ABOUT</div></Box>
  );
}

export default About;
