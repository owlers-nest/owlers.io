import { FC, useState } from "react";
import {
  Card,
  Stack,
  Span,
  Flex,
  SelectValueChangeDetails,
  Popover,
  Table,
  Box,
  Heading,
} from "@chakra-ui/react";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { Avatar } from "../../../components/ui/avatar";
import GoToLink from "../go-to-link/go-to-link";
import { useLazySearchQuery } from "../../services/projects";
import Loader from "../loader";
import { useNavigate } from "react-router-dom";
import Empty from "../empty/empty";

const projectsStatus = createListCollection({
  items: [
    {
      label: "All",
      value: "all",
      description: "All projects",
    },
    {
      label: "Legit",
      value: "legit",
      description: "Legit projects",
    },
    {
      label: "Scam",
      value: "scam",
      description: "Scam projects",
    },

    {
      label: "Not specified",
      value: "notSpecified",
      description: "Not determined",
    },
  ],
});

type Props = {
  onStatusChange: (value: string) => void;
};

type ProjectSearchListItem = {
  isLastItem?: boolean;
  item: any;
};

const ProjectSearchListItem: FC<ProjectSearchListItem> = ({
  isLastItem = false,
  item,
}) => {
  const navigate = useNavigate();
  return (
    <Table.Row w={"100%"}>
      <Table.Cell borderBottom={isLastItem ? "none" : "1px solid grey.light"}>
        <Flex justifyContent={"space-between"}>
          <Flex alignItems={"center"}>
            <Box style={{ textDecoration: "none", marginRight: "8px" }}>
              <Avatar
                src={
                  item.logoUrl
                }
                name={"name"}
                size="md"
                shape="full"
                bg={"transparent"}
              />
            </Box>
            <Flex flexDirection={"column"}>
              <Heading
                color="primary1"
                as={"h4"}
                fontSize={"18px"}
                fontWeight={"normal"}
              >
                {item.name}
              </Heading>
              <Heading
                position="relative"
                bottom={"7px"}
                color="primary1"
                as={"h6"}
                fontSize={"15px"}
                fontWeight={"normal"}
              >
                {item.symbol}
              </Heading>
            </Flex>
          </Flex>
        </Flex>
      </Table.Cell>
      <Table.Cell
        maxW="350px"
        color="primary2"
        textAlign={"right"}
        borderBottom={isLastItem ? "none" : "1px solid grey.light"}
      >
        <GoToLink title="Open" onClick={() => navigate(`/projects/${item.id}`)} />
      </Table.Cell>
    </Table.Row>
  );
};

const ProjectSearchList = ({items = []} : any) => {
  return (
    <Table.Root>
      <Table.Body>
        {items.map((item: any, index: number) => <ProjectSearchListItem item={item} isLastItem={index === items.length - 1} />)}
      </Table.Body>
    </Table.Root>
  );
};

type SearchResultProps = {
  open: boolean;
  isLoading: boolean;
  children: any;
  onEscapeKeyDown: any;
  items: any[];
};
const SearchResult: FC<SearchResultProps> = ({
  open = false,
  children,
  onEscapeKeyDown,
  isLoading = false,
  items = []
}) => (
  <Popover.Root
    open={open}
    closeOnEscape={true}
    onEscapeKeyDown={onEscapeKeyDown}
    autoFocus={false}
  >
    <Popover.Trigger>{children}</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content width={400}>
        <Popover.Arrow>
          <Popover.ArrowTip />
        </Popover.Arrow>
        <Popover.Body>
          { isLoading ? <Loader text="searching..." /> : (items &&  items.length ? <ProjectSearchList items={items} /> : <Empty />) }
        </Popover.Body>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
);

const ProjectsFilter: FC<Props> = ({ onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResultItems, setSearchResultItems] = useState<any>([]);
  const [trigger, { isLoading }] = useLazySearchQuery();


  const handleProjectStatusChanged = (value: SelectValueChangeDetails) => {
    const status = value.value[0];
    onStatusChange(status);
  };

  const handleSearchEntered = async (value: any) => {
    const val = value.target.value;
    if (!val) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      const result = await trigger(val);
      if (result.isSuccess) {
        console.log("==== result", result.data.data);
        setSearchResultItems(result.data.data);
      }
    }
  };

  return (
    <>
      <Card.Root
        width="full"
        borderRadius={24}
        borderColor={"transparent"}
        marginBottom={5}
      >
        <Card.Body position={"relative"}>
          <Flex justifyContent={"space-between"}>
            <SearchResult
              open={isOpen}
              onEscapeKeyDown={() => setIsOpen(false)}
              isLoading={isLoading}
              items={searchResultItems}
            >
              <InputGroup
                width={400}
                startElement={<LuSearch />}
                endElement={<Kbd>⌘K</Kbd>}
              >
                <Input
                  rounded="xl"
                  placeholder="Enter project name"
                  onKeyUp={handleSearchEntered}
                />
              </InputGroup>
            </SearchResult>

            <Select.Root
              collection={projectsStatus}
              size="sm"
              width={150}
              defaultValue={["all"]}
              rounded={"xl"}
              onValueChange={handleProjectStatusChanged}
            >
              <Select.HiddenSelect />
              <Select.Control defaultValue={"all"}>
                <Select.Trigger>
                  <Select.ValueText placeholder="Project status" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {projectsStatus.items.map((status) => (
                      <Select.Item item={status} key={status.value}>
                        <Stack gap="0">
                          <Select.ItemText>{status.label}</Select.ItemText>
                          <Span color="fg.muted" textStyle="xs">
                            {status.description}
                          </Span>
                        </Stack>
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Flex>
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default ProjectsFilter;
