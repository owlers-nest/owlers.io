import { Spinner, VStack, Text } from "@chakra-ui/react"

interface Props {
    text?: string;
}

const Loader = ({text = "loading..."}: Props) => {
    return (
        <VStack colorPalette="blue" height={"100%"} justifyContent={"center"}>
            <Spinner color="colorPalette.600" />
            <Text color="colorPalette.600">{text}.</Text>
        </VStack>
    );
};

export default Loader;