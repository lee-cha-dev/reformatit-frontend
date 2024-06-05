// src/components/Footer.js
import React from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box
            className="footer"
            as="footer" py={4}
            textAlign="center"
            bg="gray.200" width="100%"
            style={{ backgroundColor: "silver", color: "black"}}
        >
            <HStack justify="center" spacing={4}>
                <Box>
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    <ins className="adsbygoogle"
                         style={{ display: 'inline-block', width: '120px', height: '90px' }}
                         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                         data-ad-slot="XXXXXXXXXX"></ins>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                </Box>
                <Box>
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    <ins className="adsbygoogle"
                         style={{ display: 'inline-block', width: '120px', height: '90px' }}
                         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                         data-ad-slot="XXXXXXXXXX"></ins>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                </Box>
                <Box>
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    <ins className="adsbygoogle"
                         style={{ display: 'inline-block', width: '120px', height: '90px' }}
                         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                         data-ad-slot="XXXXXXXXXX"></ins>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                </Box>
                <Box>
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    <ins className="adsbygoogle"
                         style={{ display: 'inline-block', width: '120px', height: '90px' }}
                         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                         data-ad-slot="XXXXXXXXXX"></ins>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                </Box>
            </HStack>
            <Text mt={4}>© 2024 Your Company Name. All rights reserved.</Text>
        </Box>
    );
};

export default Footer;
