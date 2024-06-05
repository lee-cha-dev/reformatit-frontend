// MaintenancePage.jsx
import React, {useState} from 'react';
import { Box, Text, Button, VStack, Center } from '@chakra-ui/react';
import HeaderLogo from './HeaderLogo';
import {AnimatePresence} from "framer-motion";

const MaintenancePage = () => {
  const [testData, setTestData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const callTest = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8080/test/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTestData(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <HeaderLogo class_one="header-logo-one" class_two="header-logo-two" />
      <Center height="65vh" backgroundColor="black" fg="silver">
        <VStack spacing={4}>
          <Box textAlign="center" paddingLeft="25px" paddingRight="25px">
            <Text fontSize="4xl" fontWeight="bold">
              We'll be back soon!
            </Text>
            <Text fontSize="lg" mt={4}>
              Sorry for the inconvenience. We're performing some maintenance at the moment.
            </Text>
          </Box>
          <Button colorScheme="blue" onClick={() => window.location.reload()}>
            Refresh
          </Button>
          <Button colorScheme="green" onClick={() => callTest()}>
            Test
          </Button>
          <AnimatePresence>
            {testData && (
                <Box mt={4}>
                  <Text fontSize="2xl" fontWeight="bold">Test Data:</Text>
                  {Object.entries(testData).map(([key, value]) => (
                      <Text key={key} fontSize="md">{`${key}: ${value}`}</Text>
                  ))}
                </Box>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {errorMessage && (
                <Text fontSize="md" mt={4} color="red">
                  Error: {errorMessage}
                </Text>
            )}
          </AnimatePresence>
        </VStack>
      </Center>
    </>

  );
};

export default MaintenancePage;
