import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Select,
    Input,
    VStack,
    Image, AlertIcon, Alert, CloseButton, Text, Divider, HStack, Container, Spinner,
} from '@chakra-ui/react';
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet';
import InfoSection from './InfoSection';

const BACK_END_URL = "https://api.reformatit.com"; // https://ec2-18-119-130-207.us-east-2.compute.amazonaws.com/
const BACK_END_DEV_URL = "http://localhost:8000";

const MotionBox = motion(Box);


const ImageUploader = () => {
    // useState & useEffort variables
    const [file, setFile] = useState(null);
    const [convertedFile, setConvertedFile] = useState(null);
    const [convertTo, setConvertTo] = useState("JPEG");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Methods
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setConvertedFile(null);
    };

    const handleConvert = async () => {
        if (!file){
            setError("Please upload an image before converting.");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("convert_to", convertTo);
        try {
           const response = await axios.post(
            `${BACK_END_URL}/convert/`,
            formData,
            {responseType: "blob"}
            );
            const url = URL.createObjectURL(new Blob([response.data]));
            setConvertedFile(url);
            setError(null);
        } catch (error) {
            console.error("There was an error!", error)
            if (error.response){
                setConvertedFile(null);
                const status = error.response.status;
                switch (status) {
                    case 413:
                        setError("File Size Cannot Exceed 5 MB.");
                        break;
                    case 400:
                        setError("Invalid File Type - Please Try Again.")
                        break;
                    case 504:
                        setError("The Server Timed Out - Please Try Again Later.")
                        break;
                    default:
                        setError("The Server Timed Out - Please Try Again Later.")
                        break;
                }
            } else if (error.request){
                setError("Unable to Process Your Request - Please Try Again Later.");
                setConvertedFile(null);
            } else {
                setError("An Error Occurred. Please Try Again Later.");
                setConvertedFile(null);
            }
        } finally {
            setLoading(false);
        }
    }

    // HTML Returned from Component
    return (
        <VStack spacing={4} marginBottom="20vh">
            <Helmet>
                <title>Images | Reformat</title>
                <meta name="description" content="Reformat your images here!" />
                {/*<link rel="canonical" href="https://www.reformatit.com/" />*/}
                {/*<meta name="robots" content="index, follow" />*/}
            </Helmet>
            <Input type="file" onChange={handleFileChange} />
            <div className="convert-to-option">
                <Select onChange={(e) => setConvertTo(e.target.value)} value={convertTo}>
                    <option value="BMP">BMP</option>
                    <option value="GIF">GIF</option>
                    <option value="HEIF">HEIF</option>
                    <option value="ICO">ICO</option>
                    <option value="IM">IM</option>
                    <option value="JPEG">JPEG</option>
                    <option value="JPG">JPG</option>
                    <option value="PCX">PCX</option>
                    <option value="PNG">PNG</option>
                    <option value="PPM">PPM</option>
                    <option value="SGI">SGI</option>
                    <option value="SPIDER">SPIDER</option>
                    <option value="TIFF">TIFF</option>
                    <option value="WebP">WebP</option>
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
                >Convert Image</Button>
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
                {convertedFile && (
                    <Box className="convert-img-div">
                        <Container className="image-success" py={{ base: '4', md: '8' }}>
                            <HStack>
                                <Divider />
                                <Text className="image-success-text" textStyle="md" whiteSpace="nowrap">Reformat Successful</Text>
                                <Divider />
                            </HStack>
                        </Container>
                        {/*<Image className="converted-img" src={convertedFile} alt={"Converted Img"} />*/}
                            <Button
                                className="save-image" as="a"
                                href={convertedFile}
                                download={`converted_image.${convertTo.toLowerCase()}`}
                                sx={{
                                    bg: 'white',
                                    color: 'black',
                                    _hover: {
                                        bg: 'silver',
                                        color: 'black'
                                    },
                                }}
                            >
                                Save Image
                            </Button>
                    </Box>
                )}
            </div>
            <InfoSection />
        </VStack>
    );
}

export default ImageUploader;

