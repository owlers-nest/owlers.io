import { Table, Flex, Box, Heading } from "@chakra-ui/react";
import { Avatar } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import OwlBadge from "../owl-badge/owl-badge";
import { useNavigate } from "react-router-dom";
import styles from "./project-list-item.module.scss";

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
                                shape="full"
                                bg={'transparent'}
                                className={styles.avatar}
                            />
                        </Box>
                        <Flex flexDirection={"column"}>
                            <Heading color="primary1" as={"h2"} fontWeight={"normal"} className={styles.projectName}>
                                {name}
                            </Heading>
                            {renderOwlBadge()}
                        </Flex>
                    </Flex>
                </Flex>
            </Table.Cell>
            <Table.Cell borderBottom={isLastElement ? "none": "1px solid grey.light"} maxW="350px" color="primary2" className={styles.description}>
                {description}
            </Table.Cell>
            <Table.Cell borderBottom={isLastElement ? "none": "1px solid grey.light"} textAlign="end">
                <Button className={styles.viewProjectButton} size={"lg"} variant="outline" onClick={() => navigate(`/projects/${id}`)} borderRadius={"8px"} color="primary1" borderColor={"primary1"}>View Project</Button>
            </Table.Cell>
        </Table.Row>
    )
}

export default ProjectListItem;

