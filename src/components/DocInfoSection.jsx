import React from 'react';
import { Box, Heading, SimpleGrid, Text, useBreakpointValue } from '@chakra-ui/react';

const info = [
    {
        title: "Request Limit",
        description: "Up to 5 requests per minute to minimize malicious traffic and protect against DoS and DDoS attacks."
    },
    {
        title: "Document Size",
        description: "Convert documents up to a maximum size of 10 MB per document."
    },
    {
        title: "Privacy Protection",
        description: "Documents are automatically deleted from the server after one hour to ensure user privacy."
    },
    {
        title: "SSL Encryption",
        description: "Utilizes 256-bit SSL certificates to secure document uploads and protect against unauthorized access."
    }
];

const InfoCard = ({ title, description }) => {
    return (
        <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            bg="black"
            fg="silver"
            maxW="sm"
        >
            <Text fontWeight="bold" fontSize="lg" mb={2}>
                {title}
            </Text>
            <Text>
                {description}
            </Text>
        </Box>
    );
}

const DocInfoSection = () => {
    const columns = useBreakpointValue({ base: 1, md: 2 });

    return (
        <Box p={5} marginTop="8vh">
            <Heading as="h2" size="lg" mb={5} textAlign="center">
                About Our <Text as="span" color="forestgreen">Document Services</Text>
            </Heading>
            <SimpleGrid columns={columns} spacing={5}>
                {info.map((item, index) => (
                    <InfoCard key={index} title={item.title} description={item.description} />
                ))}
            </SimpleGrid>
        </Box>
    )
}

export default DocInfoSection;