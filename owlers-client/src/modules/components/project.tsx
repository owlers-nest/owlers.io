import { Heading, Badge, HStack, Text, Flex, Icon } from "@chakra-ui/react";
import { Avatar } from "../../components/ui/avatar";
import { StatLabel, StatRoot, StatValueText } from "../../components/ui/stat";

import { Tag } from "../../components/ui/tag";
import { LuTrophy } from "react-icons/lu";
import { BsPercent } from "react-icons/bs";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import { MdVerified, MdVerifiedUser } from "react-icons/md";
import { Project } from "../types";
import ProjectLinks from "../shared/components/project-links";

const ProjectBadge = ({ legit, scam }: { legit: number, scam: number }) => {
    if (legit > scam) {
        return (<Badge colorPalette="green">
            <LuTrophy />
            Legit
        </Badge>)
    } else if (scam > legit) {
        return (<Badge colorPalette="red">
            <LuTrophy />
            Scam
        </Badge>)
    } else {
        return (<Badge colorPalette="blue">
            <LuTrophy />
            not specified
        </Badge>)
    }
}

export const ProjectItemHeader = ({ project }: { project: Project }) => {
    return <>
        <Avatar shape="rounded" src={project.logoUrl} name={project.name} background={"transparent"} />
        <HStack>
            {project.name}{" "}
            <ProjectBadge scam={project.decisionsStats.scam} legit={project.decisionsStats.legit} />
        </HStack></>
}

export const ProjectItemContent = ({ project }: { project: Project; }) => {
    return (
        <>
            <Avatar shape="full" src={project.logoUrl} name={project.name} background={"transparent"} />
            <Heading display={"flex"} alignItems={"center"}>{project.name}<MdVerified style={{ marginLeft: "5px" }} color="blue" /></Heading>
            
            <ProjectLinks links={project.links} />

            <Text margin={"10px auto"}>{project.description}</Text>

            <Flex flexDir={"column"} width={"100%"} margin={"10px auto"}>
                <Heading margin={"10px 0"}>Tokenmics ({project.symbol})
                     {/* ({project.decimals}) */}
                     </Heading>
                <HStack width={"100%"} display="flex" justifyContent={"center"} alignItems={"center"}>

                    {project.tokenDistribution?.map((dist, index) => (
                        <StatRoot key={index}>
                            <StatLabel info="Some info">{dist.title}</StatLabel>
                            <StatValueText>{dist.percentage} {dist.isPercentage ? <BsPercent /> : ""}</StatValueText>
                        </StatRoot>
                    ))}

                </HStack>
            </Flex>

            <Flex flexDir={"column"} width={"100%"}>
                <Heading marginBottom={"10px"}>Networks</Heading>
                <HStack width={"100%"} display="flex" justifyContent={"flex-start"}>

                    {project.contracts?.map((contract, index) => (
                        <Tag key={index} onClick={() => window.open(`https://etherscan.io/token/${contract.address}`)} style={{ cursor: "pointer" }} color={contract.isContractVerified ? "blue" : ""} variant="outline" padding={"5px"}>{contract.name} {contract.isContractVerified ? <MdVerifiedUser style={{ marginLeft: "5px", display: "inline" }} color="blue" /> : ""}</Tag>
                    ))}

                </HStack>
            </Flex>


            <Flex flexDir={"column"} width={"100%"} margin={"10px"}>
                <Heading marginBottom={"10px"}>Owlers</Heading>
                <HStack width={"100%"} display="flex" justifyContent={"flex-start"}>

                    <StatRoot maxW="240px" borderWidth="1px" p="4" rounded="md">
                        <HStack justify="space-between">
                            <StatLabel>Legit</StatLabel>
                            <Icon color="green">
                                <BiArrowToTop />
                            </Icon>
                        </HStack>
                        <StatValueText>{project.decisionsStats.legit || "0"}</StatValueText>
                    </StatRoot>

                    <StatRoot maxW="240px" borderWidth="1px" p="4" rounded="md">
                        <HStack justify="space-between">
                            <StatLabel>Scam</StatLabel>
                            <Icon color="red">
                                <BiArrowToBottom />
                            </Icon>
                        </HStack>
                        <StatValueText>{project.decisionsStats.scam || "0"}</StatValueText>
                    </StatRoot>

                </HStack>
            </Flex>
        </>
    )
}