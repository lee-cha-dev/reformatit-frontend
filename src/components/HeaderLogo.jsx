import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const HeaderLogo = (props) => {
  return (
    <Box
      position="fixed"
      width="100vw"
      top="0"
      left="0"
      p={5}
      zIndex="3" // Ensure it is above other elements
      bg="black" // Keep background transparent
      boxShadow="md"
    >
      <Heading as="h3" size="lg" textAlign="left" className={props.class_one}>
        Reformat
        <Text as="span" color="dodgerblue" className={props.class_two}>IT</Text>
      </Heading>
    </Box>
  );
};

export default HeaderLogo;