import { FC } from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";
import LegitOwl from "../../../assets/legit-owl.svg";
import ScamOwl from "../../../assets/scam-owl.svg";
import styles from "./owl-vote.module.scss";

type Owl = "Legit" | "Scam";

interface Props {
  handleOwlClicked: (owl: Owl) => void;
  isLoading: boolean;
}

const OwlVote: FC<Props> = ({ handleOwlClicked, isLoading }) => {
  return (
    <Flex className={styles.owlVotes}>
      <Flex className={styles.owlContent}>
        <Heading as="h1" fontWeight="normal" className={styles.title}>Let's Owl:</Heading>
        <Flex>
          <Box
            onClick={() => handleOwlClicked("Legit")}
            as="button"
            _hover={{ cursor: isLoading ? "disabled" : "pointer" }}
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
            marginRight={5}
            border="1px solid #EBEDED"
            borderBottomWidth={"3px"}
            borderBottomColor={isLoading ? "light-grey" : "green"}
            padding={3}
          >
            <img src={LegitOwl} alt="" />
          </Box>
          <Box
            onClick={() => handleOwlClicked("Scam")}
            as="button"
            _hover={{ cursor: isLoading ? "disabled" : "pointer" }}
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
            border="1px solid #EBEDED"
            borderBottomWidth={"3px"}
            borderBottomColor={isLoading ? "light-grey" : "danger3"}
            padding={3}
          >
            <img src={ScamOwl} alt="" />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OwlVote;
