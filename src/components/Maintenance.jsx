// MaintenancePage.jsx
import React from 'react';
import { Box, Text, Button, VStack, Center } from '@chakra-ui/react';
import HeaderLogo from './HeaderLogo';

const MaintenancePage = () => {
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
        </VStack>
      </Center>
    </>

  );
};

export default MaintenancePage;
