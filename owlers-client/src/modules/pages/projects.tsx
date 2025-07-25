import { Card, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import Pagination from "../components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { useGetProjectsQuery } from "../services/projects";
// import { useAccount } from "wagmi";
import { Button } from "../../components/ui/button";

import ProjectCards from "../components/project-cards";
import ProjectList from "../components/project-list";

import { getProjects } from "../store/selectors/projects";
import { insertProjects, updateProjectsStatus } from "../store/slices/projects";

import ViewList from "../../assets/view-list.svg";
import ViewCard from "../../assets/view-card.svg";

import ProjectsFilter from "../components/projects-filter/projects-filter";
import Empty from "../components/empty/empty";

import { Pagination, ButtonGroup, Stack, For, IconButton } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const PaginationComponents = () => {
  return (
    <Stack gap="8">
      <For each={["sm"]}>
        {(size) => (
          <Pagination.Root count={20} pageSize={2} defaultPage={1} key={size}>
            <ButtonGroup variant="ghost" size={size}>
              <Pagination.PrevTrigger asChild>
                <IconButton>
                  <LuChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>

              <Pagination.Items
                render={(page) => (
                  <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                    {page.value}
                  </IconButton>
                )}
              />

              <Pagination.NextTrigger asChild>
                <IconButton>
                  <LuChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>
        )}
      </For>
    </Stack>
  );
}

const ProjectsPage = () => {
  const projects = useSelector(getProjects);
  const dispatch = useDispatch();

  const [page, _] = useState<number>(1);

  const { data: response } = useGetProjectsQuery(page);

  useEffect(() => {
    if (response) {
      dispatch(insertProjects(response.data));
    }
  }, [response]);

  const [display, setDisplay] = useState<"list" | "card">("card");

  const handleDisplayChange = (display: "list" | "card") => {
    setDisplay(display);
  };

  return (
    <>
      <ProjectsFilter
        onStatusChange={(status: any) => dispatch(updateProjectsStatus(status))}
      />
      <Card.Root width="full" borderRadius={24} borderColor={"transparent"}>
        <Card.Header>
          <Flex justify={"space-between"} align={"center"}>
            <Card.Title>
              <Flex justifyContent={"center"}>
                <h1 style={{ fontSize: "30px", fontWeight: "400" }}>
                  All Projects
                </h1>
              </Flex>
            </Card.Title>

            <Flex>
              <Button
                onClick={() => handleDisplayChange("card")}
                marginRight={"8px"}
                padding={"5px"}
                variant={{ base: "outline", _selected: "solid" }}
                disabled={projects.length === 0}
              >
                <img width="20" height="16" src={ViewList} alt="" />
              </Button>

              <Button
                onClick={() => handleDisplayChange("list")}
                variant={"outline"}
                padding={"5px"}
                disabled={projects.length === 0}
              >
                <img width="24" height="24" src={ViewCard} alt="" />
              </Button>
            </Flex>
          </Flex>
        </Card.Header>
        <Card.Body gap="2">
          {display === "list" ? (
            <ProjectList projects={projects} />
          ) : (
            <ProjectCards projects={projects} />
          )}

          {projects.length === 0 ? <Empty /> : null}
        </Card.Body>

          <Flex justifyContent={'center'} marginY={5}>
        <PaginationComponents />
        </Flex>
      </Card.Root>
    </>
  );
};

export default ProjectsPage;
