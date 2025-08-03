import { Card, Flex, Heading } from "@chakra-ui/react";
import { Button } from "../../../components/ui/button";
import { Avatar } from "../../../components/ui/avatar";
import { useNavigate } from "react-router-dom";
import OwlBadge from "../owl-badge";

interface Props {
    name: string;
    image: string;
    description: string;
    id: string;
    legitStats: {
        legit: number;
        scam: number;
    }
}


const ProjectCard = ({ name, description, image, id, legitStats }: Props) => {
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
        <Card.Root borderRadius={24} margin={2}>
            <Card.Body minH={'200px'} maxH={'200px'}>
                <Flex justifyContent={"space-between"}>
                    <Flex alignItems={"start"}>
                        <Avatar
                            src={image}
                            name={name}
                            size="lg"
                            shape="full"
                            bg={'transparent'}
                        />
                        <Heading marginLeft={'5px'}  color="primary1" as={"h2"} fontWeight={"normal"}>
                            {name}
                        </Heading>
                         
                    </Flex>
                    {renderOwlBadge()}
                </Flex>
                <Card.Description marginTop={5} color={"primary2"} textWrap={'none'} overflow={'hidden'}>
                    {description}
                </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="center">
      <Button w={"full"} size={"lg"} variant="outline" onClick={() => navigate(`/projects/${id}`)} borderRadius={"8px"} color="primary1" borderColor={"primary1"}>View Project</Button>
            </Card.Footer>
        </Card.Root>
    );
}

export default ProjectCard;