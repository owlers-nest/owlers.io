import { Flex, Box, Text } from "@chakra-ui/react";
import LegitOwl from "../../assets/legit-owl.svg";
import ScamOwl from "../../assets/scam-owl.svg";
import { FC } from "react";

type Owl = "Legit" | "Scam";

interface Props {
    handleOwlClicked: (owl: Owl) => void;
    isLoading: boolean;
}

const OwlVote: FC<Props> = ({ handleOwlClicked, isLoading }) => {
    return (
        <Flex flexDirection={"column"} >
            <Text>Let's Owl:</Text>
            <Flex>
                <Box onClick={() => handleOwlClicked("Legit")} as="button" _hover={{ cursor: isLoading ? "disabled" : "pointer" }} borderTopLeftRadius={8} borderTopRightRadius={8} marginRight={5} border="1px solid #EBEDED" borderBottomWidth={"3px"} borderBottomColor={isLoading ? 'light-grey' : "green"} padding={3}>
                    <img src={LegitOwl} alt="" />
                </Box>
                <Box onClick={() => handleOwlClicked("Scam")} as="button" _hover={{ cursor: isLoading ? "disabled" : "pointer" }} borderTopLeftRadius={8} borderTopRightRadius={8} border="1px solid #EBEDED" borderBottomWidth={"3px"} borderBottomColor={isLoading ? 'light-grey' : "danger3"} padding={3}>
                    <img src={ScamOwl} alt="" />
                </Box>
            </Flex>
        </Flex>
    );
};

export default OwlVote;