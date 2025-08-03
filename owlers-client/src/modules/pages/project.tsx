import {
  Flex,
  Card,
  Heading,
  Box,
  Text,
  Grid,
  GridItem,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useOwlMutation, useLazyGetProjectQuery } from "../services/projects";
import { useParams } from "react-router-dom";
import { toaster, Toaster } from "../../components/ui/toaster";
import { useAccount, useBalance, useSwitchChain } from "wagmi";
import { ConnectKitButton } from "connectkit";

import OwlBadge from "../components/owl-badge";
import { Avatar } from "../../components/ui/avatar";
import OwlStats from "../components/owl-stats";
import OwlVote from "../components/owl-vote";
import ProjectTokenDistribution from "../components/project-distribution";
import ProjectContract from "../components/project-contract";
import ProjectRoadmap from "../components/project-roadmap";
import OwlVoteConfirmationDialog from "../components/owl-vote-confrimation-dialog";
import { OWL_TOKEN_ADDRESS, OWL_CHAIN_ID } from "../../constants";
import SocialMediaIcon from "../components/social-media-icon";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../store/selectors/projects";
import { selectProject } from "../store/slices/projects";
import { Project } from "../types";
import SwitchNetworkDialog from "../components/switch-network-dialog";
import Empty from "../components/empty/empty";
import GoToLink from "../components/go-to-link/go-to-link";

const ProjectPage = () => {
  const dispatch = useDispatch();
  const { address, isConnected, chain } = useAccount();

  const balance = useBalance({
    address,
    token: OWL_TOKEN_ADDRESS,
  });

  const { projectId } = useParams<{ projectId: string }>();
  const project = useSelector(getProject(projectId as unknown as string));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [owlDecision, setOwlDecision] = useState("Legit");

  const [owl, { isLoading: isOwling }] = useOwlMutation();

  const [trigger, { isLoading: isLoadingProject }] = useLazyGetProjectQuery();

  const { switchChain } = useSwitchChain();

  const [isSwitchNetworkDialogOpen, setSwitchNetworkDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const triggerGetProject = async () => {
      const data = await trigger(projectId as unknown as string);
      dispatch(selectProject(data.data?.data as unknown as Project));
    };
    if (!project) {
      triggerGetProject();
    }
  }, [project]);

  const handleOwlClicked = (owl: string, show: (() => void) | undefined) => {
    setOwlDecision(owl);
    if (isConnected) {
      if (chain?.id === OWL_CHAIN_ID) {
        setIsOpen(true);
      } else {
        setSwitchNetworkDialogOpen(true);
      }
    } else {
      /** open connect wallet modal */
      if (show) {
        show();
      }
    }
  };

  const handleConfirmClicked = async () => {
    try {
      if (!balance) {
        return toaster.create({
          type: "error",
          title: "Make sure you import owl token to your own wallet!",
        });
      }
      const value = balance.data?.value;
      if (value && value > 0) {
        let body = {
          id: projectId,
          walletAddress: address,
          decision: owlDecision.toLowerCase(),
        };
        const response = await owl(body);
        setIsOpen(false);

        if (!response.error) {
          toaster.create({
            type: "success",
            title: "You owled saved successfully!",
            description:
              "Thanks for your owl voice, it's very helpful for others!",
          });
        } else {
          const errorMessage = (response.error as any).data.message;
          toaster.create({
            type: "error",
            title: "Error Happened",
            description: errorMessage,
          });
        }
      } else {
        toaster.create({
          type: "error",
          title: "Make sure you have owl token in you wallet account!",
        });
      }
    } catch (err) {
      toaster.create({
        type: "error",
        title: "Error Happened",
      });
    }
  };

  const handleSwitchChain = () => {
    switchChain({ chainId: OWL_CHAIN_ID });
    setSwitchNetworkDialogOpen(false);
    setIsOpen(true);
  };

  return !isLoadingProject ? (
    <>
      {/* Base Info */}
      <Card.Root
        marginBottom={5}
        width="full"
        borderRadius={24}
        borderColor={"transparent"}
      >
        <Card.Body gap="2">
          <Grid marginBottom={6} templateColumns="repeat(4, 1fr)" gap="6">
            <GridItem>
              <Flex alignItems={"start"}>
                <Box style={{ textDecoration: "none", marginRight: "8px" }}>
                  {isLoadingProject ? (
                    <SkeletonCircle size={12} />
                  ) : (
                    <Avatar
                      src={project?.logoUrl}
                      name={project?.name}
                      size="lg"
                      shape="full"
                      background={"transparent"}
                    />
                  )}
                </Box>
                <Flex flexDirection={"column"}>
                  <div>
                    {isLoadingProject ? (
                      <SkeletonText
                        width={"65px"}
                        noOfLines={1}
                        marginBottom={"5px"}
                      />
                    ) : (
                      <h2>{project?.name}</h2>
                    )}
                  </div>
                  <OwlBadge
                    owl={isLoadingProject ? "Skeleton" : "NotSpecified"}
                  />
                </Flex>
              </Flex>
            </GridItem>
            <GridItem colSpan={2} textAlign={"center"}>
              {isLoadingProject ? (
                <SkeletonText noOfLines={3} />
              ) : (
                <Text>{project?.description}</Text>
              )}
            </GridItem>
            <GridItem>
              <Flex justifyContent={"flex-end"}>
                {isLoadingProject
                  ? Array.from({ length: 3 }).map(() => (
                      <SkeletonCircle size={6} marginRight={"3px"} />
                    ))
                  : project?.links.map((link) => (
                      <SocialMediaIcon
                        link={link.link}
                        type={link.type as any}
                      />
                    ))}
              </Flex>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(3, 1fr)" gap="6">
            <GridItem display={"flex"} alignItems={"center"}>
              <Heading>Owlers Votes</Heading>
            </GridItem>
            <GridItem display={"flex"} alignItems={"center"}>
              <OwlStats
                legits={project?.decisionsStats.legit || 0}
                scams={project?.decisionsStats.scam || 0}
                isLoading={isLoadingProject}
              />
            </GridItem>
            <GridItem>
              <Flex justifyContent={"flex-end"}>
                <ConnectKitButton.Custom>
                  {({ show }) => {
                    return (
                      <OwlVote
                        handleOwlClicked={(owl) => handleOwlClicked(owl, show)}
                        isLoading={isLoadingProject}
                      />
                    );
                  }}
                </ConnectKitButton.Custom>
              </Flex>
            </GridItem>
          </Grid>
        </Card.Body>
      </Card.Root>

      {/* Tokenomics */}
      <Card.Root
        marginBottom={5}
        width="full"
        borderRadius={24}
        borderColor={"transparent"}
      >
        <Card.Header>
          <Card.Title>
            <Flex alignItems={"center"}>
              <Card.Title as={"h1"} fontSize={"30px"} fontWeight={"400"}>
                Project tokenomics
              </Card.Title>
              <GoToLink
                isDisabled={isLoadingProject}
                title="View tokenomics"
                onClick={() =>
                  window.open((project as any).tokenDistributionLink)
                }
              />
            </Flex>
          </Card.Title>
        </Card.Header>
        <Card.Body gap="2">
          <Flex flexWrap={"wrap"}>
            {isLoadingProject
              ? Array.from({ length: 5 }).map(() => (
                  <ProjectTokenDistribution
                    distribution={"loading"}
                    value={""}
                    isPercentage={false}
                    isLoading={isLoadingProject}
                  />
                ))
              : project && project.tokenDistribution
              ? project?.tokenDistribution?.map((d) => (
                  <ProjectTokenDistribution
                    distribution={d.title}
                    value={d.percentage}
                    isPercentage={d.isPercentage}
                    isLoading={false}
                  />
                ))
              : ""}
          </Flex>
        </Card.Body>
      </Card.Root>

      {/* Contracts */}
      <Card.Root
        marginBottom={5}
        width="full"
        borderRadius={24}
        borderColor={"transparent"}
      >
        <Card.Header>
          <Card.Title as={"h1"} fontSize={"30px"} fontWeight={"400"}>
            Contracts
          </Card.Title>
        </Card.Header>
        <Card.Body gap="2">
          <Flex>
            {project && project.contracts
              ? project.contracts.map((contract: any) => (
                  <ProjectContract network={contract.name} link={contract.link} isLoading={isLoadingProject} />
                ))
              : ""}
          </Flex>
        </Card.Body>
      </Card.Root>

      {/* Roadmap */}
      <Card.Root
        marginBottom={5}
        width="full"
        borderRadius={24}
        borderColor={"transparent"}
      >
        <Card.Header>
          <Card.Title as={"h1"} fontSize={"30px"} fontWeight={"400"}>
            Roadmap
          </Card.Title>
        </Card.Header>
        <Card.Body gap="2">
          {project?.roadMap && project?.roadMap.length > 0 ? (
            <ProjectRoadmap roadMap={project.roadMap} isLoading={isLoadingProject} />
          ) : (
            <Empty message="No project roadMap!" />
          )}
        </Card.Body>
      </Card.Root>

      <OwlVoteConfirmationDialog
        owl={owlDecision as any}
        isOpen={isOpen}
        onOpenChange={(openStatus) => setIsOpen(openStatus)}
        handleConfirmClicked={handleConfirmClicked}
        isOwling={isOwling}
      />
      <SwitchNetworkDialog
        isOpen={isSwitchNetworkDialogOpen}
        onOpenChange={(openStatus) => setSwitchNetworkDialogOpen(openStatus)}
        handleConfirmClicked={handleSwitchChain}
      />
      <Toaster />
    </>
  ) : (
    "loading..."
  );
};

export default ProjectPage;
