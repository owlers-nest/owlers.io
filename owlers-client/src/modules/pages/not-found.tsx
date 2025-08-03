import { Flex, Heading, Stack, AbsoluteCenter } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import Logo from "../../assets/owlers.svg";
import { useNavigate } from "react-router-dom";
import { BsArrowUpLeftCircle } from "react-icons/bs";

const NotFound = () => { 
        const navigate = useNavigate();
    return (
    <Stack position="relative" h="100vh" width={"100vw"}>
        <AbsoluteCenter>
    <Flex alignItems="center" flexDir={"column"} width={"98%"} height={"100%"} margin={'5px'}>
        <img src={Logo} width={"100px"} height={"100px"} />
    <Heading textAlign={"center"} marginY={"10px"}>You never get lost with Owlers.</Heading>
    <Button onClick={() => navigate("/")} rounded={"full"}>
        <BsArrowUpLeftCircle /> Back to home
    </Button>
    </Flex>
    </AbsoluteCenter>
    </Stack>
)};

export default NotFound;