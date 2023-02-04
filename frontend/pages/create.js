import { useAccount } from "wagmi";
import { useEffect } from "react";
import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button, Box, Flex} from "@chakra-ui/react";


function Create() {
  /*
  const { address } = useAccount();

  console.log(address);

  useEffect(() => {
    canUpload();
  }, []);

  const canUpload = () => {
    if (!address) {
      return <>You need to connect the wallet before you can upload</>;
    }
  };

  return <div>Create </div>;
  */
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
  };

  return (
   
      <Box bg='gray.800'minH="100vh" w='100%' p={4} color='white' alignItems="center">
      <Box maxW="800px" borderWidth="2px" rounded="lg" overflow="hidden" boxShadow="md">
        <form>
        <FormControl mt={4} w="100%">
            <FormLabel htmlFor="name" color="white">
              Description (Token Name)
            </FormLabel>
            <Flex >
            <Input type="text" id="name" color="white" w='150%' /></Flex>
          </FormControl>
          <FormControl mt={4} w="100%">
            <FormLabel htmlFor="name" color="white">
              Symbol
            </FormLabel>
            <Input type="text" id="name" color="white" />
          </FormControl>
          <FormControl mt={4} w="100%">
            <FormLabel htmlFor="name" color="white">
              URI
            </FormLabel>
            <Input type="text" id="name" color="white" />
          </FormControl>
          <FormControl mt={4} w="100%">
            <FormLabel htmlFor="name" color="white">
              Amount per NFT
            </FormLabel>
            <Input type="text" id="name" color="white" />
          </FormControl>
          <FormControl mt={4} w="100%">
            <FormLabel htmlFor="name" color="white">
              Enter your video CID
            </FormLabel>
            <Input type="text" id="name" color="white" />
          </FormControl>
          <FormLabel htmlFor="name" color="white">
          OR
            </FormLabel>
            <FormControl mt={4}>
        <FormLabel htmlFor="file">Upload File</FormLabel>
        <Input type="file" id="file" />
      </FormControl>
          <Button mt={4} variantColor="teal" type="submit" color="black">
            Submit
          </Button>
        
        </form>
        </Box>
    </Box>
  );
}

export default Create;
