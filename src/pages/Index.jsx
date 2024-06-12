import React, { useState } from "react";
import { Container, VStack, Text, Button, useToast, Spinner, Box } from "@chakra-ui/react";
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const toast = useToast();

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("YOUR_API_ENDPOINT", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
      toast({
        title: "Success",
        description: "Audio file processed successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing the audio file.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "audio/*" });

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Doublage Français - Reconnaissance d'Acteurs et d'Actrices</Text>
        <Box {...getRootProps()} border="2px dashed" borderColor="gray.300" padding={4} borderRadius="md" cursor="pointer">
          <input {...getInputProps()} />
          <Text>Glissez et déposez un fichier audio ici, ou cliquez pour sélectionner un fichier</Text>
          <Button leftIcon={<FaUpload />} mt={2}>
            Upload Audio
          </Button>
        </Box>
        {loading && <Spinner size="xl" />}
        {result && (
          <Box textAlign="center" mt={4}>
            <FaCheckCircle color="green" size="2em" />
            <Text mt={2}>Résultat: {result}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
