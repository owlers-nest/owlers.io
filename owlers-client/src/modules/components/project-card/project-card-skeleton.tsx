import { Card, Flex, Skeleton, SkeletonText, SkeletonCircle } from "@chakra-ui/react";
import OwlBadge from "../owl-badge/owl-badge";

const ProjectCardSkeleton = () => {

    return (
        <Card.Root borderRadius={24} margin={2}>
            <Card.Body minH={'200px'} maxH={'200px'}>
                <Flex justifyContent={"space-between"}>
                    <Flex alignItems={"start"} width={"100%"}>
                        <SkeletonCircle size="12" />
                        <Flex justifyContent={"space-between"} width={"100%"}>
                        <SkeletonText noOfLines={1} width={"50px"} marginBlock={"5px"} />
                        <OwlBadge owl={"Skeleton"} />
                        </Flex>
                    </Flex>
                </Flex>
                <Card.Description marginTop={5} color={"primary2"} textWrap={'none'} overflow={'hidden'}>
                    <SkeletonText noOfLines={3} />
                </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="center">
                <Skeleton loading={true} variant="shine" height={10} width={"100%"}></Skeleton>
            </Card.Footer>
        </Card.Root>
    );
}

export default ProjectCardSkeleton;