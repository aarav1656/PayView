import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, Input, Button, Box, Flex} from "@chakra-ui/react";
import {ABI} from '../utils/factory_contract';
import {PAY_ABI} from '../utils/payview_abi';
import {ADDRESS} from '../utils/factory_contract';
const { providers, Contract, getSigner, ethers   } = require('ethers');

let idCount ;
let image = [];
let video = [];
let items = [];
let description = [];
let amounts = [];

function View() {
  const [number, setNumber] = useState(2); // Should be useState(idCount)
  const [reload, setReload] = useState(false); 

  useEffect(() => {
    if (image.length > 0 && video.length > 0) {
      setReload(true);
    }
  }, [image, video]);  

   const  readItems = async (event) => {
    
    // Connect to a Hyperspace (Filecoin) node
    const provider = new providers.JsonRpcProvider('https://api.hyperspace.node.glif.io/rpc/v1');

    // The address of the smart contract
    const contractAddress = ADDRESS;

    // Create an instance of the Contract object
    const contract = new Contract(contractAddress, ABI, provider);
    
    // Call the READ function
    await contract.s_contractIdCounter().then((result) => {
      console.log(`The result of s_contractIdCounter the function call is: ${result}`);
      idCount = result;
    });    
      
    // Call the READ function
    console.log(`The result of idCount is: ${idCount}`);

    items = [];
    for(let i=1;i<=idCount;i++){
      console.log(`i is: ${i}`);
      let address = await contract.getPayViewContract(i)
      items.push(address)
      console.log(`address is: ${address}`);
   }
  console.log(`The items length is: ${items.length}`);
  readPayViewDisplayData()
};

const readPayViewDisplayData = async (event) => {
    
  // Connect to a Hyperspace (Filecoin) node
  const provider = new providers.JsonRpcProvider('https://api.hyperspace.node.glif.io/rpc/v1');

  const provider2 = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider2.getSigner();

  console.log("items.length" + items.length)
  for(let i=0;i<items.length;i++){
  // The address of the smart contract
  const contractAddress =  "0x159201b180142d6346277bB3416882c1f05d2825"     //items[i];

  // Create an instance of the Contract object
  const contract = new Contract(contractAddress, PAY_ABI, provider);
  console.log("signer.address" + await signer.getAddress())
  await contract.balanceOf(signer.getAddress()).then((result) => {
    console.log(`The result of balanceOf the function call is: ${result}`);
  });
  
  
  // Call the READ function
  await contract.vid_cid().then((result) => {
    console.log(`The result of s_uri the function call is: ${result}`);
    video.push(result)
  });
}
};

const videos = [...Array(number)].map((_, index) => (
    <div key={index} className="video-container">
    <iframe
      key={index}
      className="video"
      src= "https://infura-ipfs.io/ipfs/QmerYuSCvqT4bRGmD7Ys84dWLyau4esJA2hBCKMk1VTExe" //"https://www.youtube.com/embed/xO1q1UQEUtQ" //{video[0]}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      width="300" height="200"
    />
  <br/><br/><br/>
  </div> 
  ));


  return (
    <Box bg='gray.800'minH="100vh" w='100%' p={4} color='white' alignItems="center">
    <div className="container" style={{  width: '100vw',
    height: '100vh'}}>
      <h1 className="title" style={{
      marginTop: '1em',
      color:"white",
      padding: '1em 2em',
      fontSize: '2em'
  }}>Your Available Videos to Watch</h1>
      <div className="video-list">
      <div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}}>{videos}
<button style={{
      marginTop: '1em',
      color:"white",
      padding: '1em 2em',
  fontSize: '1.5em'
  }} onClick={readItems}>Get display data</button>
</div>
        
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          margin-top: 70px;
        }

        .video-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 40px;
        }

        .video {
          width: 700px;
          height: 500px;
          margin: 40px;
        }

        .video-button {
          margin-top: 1em;
          color: white;
          padding: 1em 2em;
          font-size: 1.5em;
        }
      `}</style>
    </div></Box>
  );

}


export default View;
