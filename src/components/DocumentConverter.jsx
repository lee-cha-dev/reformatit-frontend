import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Select,
    Input,
    VStack,
    AlertIcon,
    Alert,
    CloseButton,
    Text,
    Divider,
    HStack,
    Container,
    Spinner,
} from '@chakra-ui/react';
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet';
import DocInfoSection from './DocInfoSection';

const BACK_END_URL = "https://api.reformatit.com";
const BACK_END_DEV_URL = "http://0.0.0.0:8080";
const DEV = true;
let convert_url = DEV ? BACK_END_DEV_URL : BACK_END_URL;

const MotionBox = motion(Box);

const DocumentConverter = () => {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState(null);
    const [convertedDocument, setConvertedDocument] = useState(null);
    const [convertTo, setConvertTo] = useState("PDF");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const nameWithoutExtension = selectedFile.name.split(".").slice(0, -1).join(".");
        setFilename(nameWithoutExtension);
        setConvertedDocument(null);
    };

    const handleConvert = async () => {
        if (!file) {
            setError("Please upload a document before converting.");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("convert_to", convertTo.toLowerCase());

        try {
            const response = await axios.post(
                `${convert_url}/convert-document/`,
                formData,
                {
                    responseType: "blob",
                    timeout: 120000
                }
            );
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = URL.createObjectURL(blob);
            setConvertedDocument(url);
            setError(null);
        } catch (error) {
            console.error("There was an error!", error);
            setConvertedDocument(null);
            if (error.response) {
                const status = error.response.status;
                switch (status) {
                    case 413:
                        setError("File Size Cannot Exceed 10 MB.");
                        break;
                    case 400:
                        setError("Invalid File Type - Please Try Again.");
                        break;
                    case 504:
                        setError("The Server Timed Out - Please Try Again Later.");
                        break;
                    default:
                        setError("An Error Occurred - Please Try Again Later.");
                        break;
                }
            } else if (error.request) {
                setError("Unable to Process Your Request - Please Try Again Later.");
            } else if (error.code === "ECONNABORTED") {
                setError("Request timed out. Please try again.");
            } else {
                setError("An Error Occurred. Please Try Again Later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <VStack spacing={4} marginBottom="20vh">
            <Helmet>
                <title>Documents | Reformat</title>
                <meta name="description" content="Reformat your documents here!" />
            </Helmet>
            <Input type="file" onChange={handleFileChange} />
            <div className="convert-to-option">
                <Select onChange={(e) => setConvertTo(e.target.value)} value={convertTo}>
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="ODT">ODT</option>
                    <option value="TXT">TXT</option>
                    <option value="RTF">RTF</option>
                </Select>
                <Button
                    className="convert-button"
                    onClick={handleConvert}
                    sx={{
                        bg: 'white',
                        color: 'black',
                        _hover: {
                            bg: 'silver',
                            color: 'black'
                        },
                    }}
                >
                    Convert Document
                </Button>
                <AnimatePresence>
                    {loading && (
                        <MotionBox
                            position="fixed"
                            top="40%"
                            left="50%"
                            transform={`translate(-50%, -50%)`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", stiffness: 100}}
                            zIndex={1}
                        >
                            <Box
                                p={4}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                bg="white"
                                boxShadow="md"
                                rounded="md"
                            >
                                <Spinner color="black" size="xl" />
                                <Text color="black" ml={3}>Reformatting...</Text>
                            </Box>
                        </MotionBox>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {error && (
                        <MotionBox
                            position="fixed"
                            top="-20vh"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            initial={{ top: "-20vh" }}
                            animate={{ top: "5vh" }}
                            exit={{ top: "-20vh" }}
                            transition={{ type: "spring", stiffness: 100 }}
                            zIndex={10}
                        >
                            <Alert status="error" className="error-alert">
                                <AlertIcon />
                                {error}
                                <CloseButton className="error-close-button" onClick={() => setError("")} />
                            </Alert>
                        </MotionBox>
                    )}
                </AnimatePresence>
                {convertedDocument && (
                    <Box className="convert-doc-div">
                        <Container className="document-success" py={{ base: '4', md: '8' }}>
                            <HStack>
                                <Divider />
                                <Text className="document-success-text" textStyle="md" whiteSpace="nowrap">Reformat Successful</Text>
                                <Divider />
                            </HStack>
                        </Container>
                        <Button
                            className="save-document" as="a"
                            href={convertedDocument}
                            download={`${filename}.${convertTo.toLowerCase()}`}
                            sx={{
                                bg: 'white',
                                color: 'black',
                                _hover: {
                                    bg: 'silver',
                                    color: 'black'
                                },
                            }}
                        >
                            Save Document
                        </Button>
                    </Box>
                )}
            </div>
            <DocInfoSection />
        </VStack>
    );
}

export default DocumentConverter;