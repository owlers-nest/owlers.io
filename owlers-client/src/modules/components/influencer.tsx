import { Card, Flex } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import { Avatar } from "../../components/ui/avatar";
import { RiArrowRightLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface Props {
    name: string;
    image: string;
    description: string;
    id: string;
}

const ProjectCard = ({ name, description, image, id }: Props) => {
    const navigate = useNavigate();

    return (
        <Card.Root width="320px">
            <Card.Body gap="2">
                <Flex flexDirection={"column"} alignItems={"center"}>
                <Avatar
                    src={image}
                    name={name}
                    size="lg"
                    shape="full"
                />
                <Card.Title mt="2">{name}</Card.Title>
                <Card.Description>
                    {description}
                </Card.Description>
                </Flex>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Button>Owl</Button>
                <Button variant="outline" onClick={() => navigate(`/projects/${id}`)}>View <RiArrowRightLine /></Button>
            </Card.Footer>
        </Card.Root>
    );
}

export default ProjectCard;