import { Table, Flex, Box, Heading} from "@chakra-ui/react";
import { Avatar } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import OwlBadge from "./owl-badge";
import { useNavigate } from "react-router-dom";


export interface Props {
    name: string;
    description: string;
    image: string;
    id: string;
    legitStats: {
        legit: number;
        scam: number;
    };
    isLastElement: boolean;
}

const ProjectListItem = ({ id, name, description, image, legitStats, isLastElement }: Props) => {
    const navigate = useNavigate();

    const renderOwlBadge = () => {
        const { scam, legit } = legitStats;
        if (legit === scam) {
            return <OwlBadge owl={"NotSpecified"} />
        } else if (legit > scam) {
            return <OwlBadge owl={"Legit"} />
        } else {
            return <OwlBadge owl={"Scam"} />
        }
    }

    return (
        <Table.Row>
            <Table.Cell borderBottom={isLastElement ? "none": "1px solid grey.light"}>
                <Flex justifyContent={"space-between"}>
                    <Flex alignItems={"start"}>
                        <Box style={{ textDecoration: 'none', marginRight: "8px" }}>
                            <Avatar
                                src={image}
                                name={name}
                                size="lg"
                                shape="full"
                                bg={'transparent'}
                                width={50}
                                height={50}
                            />
                        </Box>
                        <Flex flexDirection={"column"}>
                            {/* <h2>{name}</h2> */}
                            <Heading color="primary1" as={"h2"} fontWeight={"normal"}>{name}</Heading>
                            {renderOwlBadge()}
                        </Flex>
                    </Flex>
                </Flex>
            </Table.Cell>
            <Table.Cell borderBottom={isLastElement ? "none": "1px solid grey.light"} maxW="350px" color="primary2">{description}</Table.Cell>
            <Table.Cell borderBottom={isLastElement ? "none": "1px solid grey.light"} textAlign="end">
                <Button size={"lg"} variant="outline" onClick={() => navigate(`/projects/${id}`)} borderRadius={"8px"} color="primary1" borderColor={"primary1"}>View Project</Button>
            </Table.Cell>
        </Table.Row>
    )
}

export default ProjectListItem;

