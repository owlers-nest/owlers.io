import { Table, Flex, Box, Heading, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import OwlBadge from "../owl-badge";
import { FC } from "react";


export interface Props {
    isLastElement: boolean;
}

const ProjectListItemSkeleton: FC<Props> = ({ isLastElement }) => {
    console.log("isLastElement", isLastElement);
    return (
        <Table.Row>
            <Table.Cell borderBottom={isLastElement ? "none": "1px solid grey.light"}>
                <Flex justifyContent={"space-between"}>
                    <Flex alignItems={"start"}>
                        <Box style={{ textDecoration: 'none', marginRight: "8px" }}>
                            <SkeletonCircle size="12" />
                        </Box>
                        <Flex flexDirection={"column"}>
                            <Heading color="primary1" as={"h2"} fontWeight={"normal"}>
                                <SkeletonText noOfLines={1} width={"10"} marginBottom={2}/>
                            </Heading>
                            <OwlBadge owl={"Skeleton"} />
                        </Flex>
                    </Flex>
                </Flex>
            </Table.Cell>
            <Table.Cell borderBottom={isLastElement ? "none": "1px solid grey.light"} maxW="350px" color="primary2">
                <SkeletonText noOfLines={2} width={"500px"} margin={"0 auto"}/>
            </Table.Cell>
            <Table.Cell borderBottom={isLastElement ? "none": "1px solid grey.light"} textAlign="end">
                <Skeleton display="inline-block" loading={true} variant="shine" height={"10"} width={"100px"} />
            </Table.Cell>
        </Table.Row>
    )
}

export default ProjectListItemSkeleton;

