import React from 'react';
import { Heading, Text } from '@chakra-ui/react';

const Logo = (props) => {

  return (
    <>
      <div className="logo-container">
        <Heading className={props.class_one} as="h1" size="lg" mb={5} textAlign="center">
          Reformat: <Text className={props.class_two} as="span">{props.mediaType}</Text>
        </Heading>
        {/*<h1 className={props.class_one}>Reformat: </h1><h1 className={props.class_two}>Images</h1>*/}
      </div>
    </>
  )
}

export default Logo;