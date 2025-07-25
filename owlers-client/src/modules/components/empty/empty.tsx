import { EmptyState, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { HiColorSwatch } from "react-icons/hi";

type Props = {
  message?: string;
};

const Empty: FC<Props> = ({ message = "No results found" }) => (
  <EmptyState.Root>
    <EmptyState.Content>
      <EmptyState.Indicator>
        <HiColorSwatch />
      </EmptyState.Indicator>
      <VStack textAlign="center">
        <EmptyState.Title>{message}</EmptyState.Title>
      </VStack>
    </EmptyState.Content>
  </EmptyState.Root>
);

export default Empty;
