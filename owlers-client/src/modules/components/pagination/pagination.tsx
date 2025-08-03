
import { FC } from "react";

import {
  Pagination,
  ButtonGroup,
  Stack,
  For,
  IconButton,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type IProps = {
  total: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: FC<IProps> = ({ total, onPageChange }) => {
  const handlePageChange = (details: { page: number, pageSize: number }) => onPageChange(details.page);
  return (
    <Stack gap="8">
      <For each={["sm"]}>
        {(size) => (
          <Pagination.Root count={total} pageSize={10} defaultPage={1} key={size} onPageChange={handlePageChange}>
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
};

export default PaginationComponent;