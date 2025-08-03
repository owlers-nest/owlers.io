import { Card, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProjectsQuery } from "../services/projects";
import { Button } from "../../components/ui/button";
import ProjectCards from "../components/project-cards";
import ProjectList from "../components/project-list";
import { getProjects } from "../store/selectors/projects";
import { insertProjects, updateProjectsStatus } from "../store/slices/projects";
import ViewList from "../../assets/view-list.svg";
import ViewCard from "../../assets/view-card.svg";
import ProjectsFilter from "../components/projects-filter/projects-filter";
import Empty from "../components/empty/empty";
import PaginationComponent from "../components/pagination/pagination";

const ProjectsPage = () => {
  const projects = useSelector(getProjects);
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(1);
  const [paginationMetaData, setPaginationMetaData] = useState<{ total: number; }>({ total: 0 });

  const { data: response, isLoading } = useGetProjectsQuery(page);

  useEffect(() => {
    if (response && !isLoading) {
      setPaginationMetaData({ total: response.total })
      dispatch(insertProjects(response.data));
    }
  }, [response]);

  const [display, setDisplay] = useState<"list" | "card">("card");

  const handleDisplayChange = (display: "list" | "card") => {
    setDisplay(display);
  };

  const handlePageChange = (page: number) => setPage(page);

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
                variant={display === "card" ? "surface" : "outline"}
                disabled={projects.length === 0}
              >
                <img width="20" height="16" src={ViewList} alt="" />
              </Button>

              <Button
                onClick={() => handleDisplayChange("list")}
                padding={"5px"}
                disabled={projects.length === 0}
                variant={display === "list" ? "surface" : "outline"}
              >
                <img width="24" height="24" src={ViewCard} alt="" />
              </Button>
            </Flex>
          </Flex>
        </Card.Header>
        <Card.Body gap="2">
          {display === "list" ? (
            <ProjectList projects={projects} isLoading={isLoading} />
          ) : (
            <ProjectCards projects={projects} isLoading={isLoading} />
          )}

          {projects.length === 0 && !isLoading ? <Empty /> : null}
        </Card.Body>

        <Flex justifyContent={"center"} marginY={5}>
          <PaginationComponent total={paginationMetaData.total} onPageChange={handlePageChange} />
        </Flex>
      </Card.Root>
    </>
  );
};

export default ProjectsPage;
