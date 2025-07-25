import { Avatar, Circle, Float } from "@chakra-ui/react";


type Props = {
    onClick?: any;
    name: string;
}

const UserProfileAvatar = ({ onClick, name }: Props) => (
  <Avatar.Root
    colorPalette="red"
    variant="subtle"
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <Avatar.Fallback name={name} />
    <Float placement="bottom-end" offsetX="1" offsetY="1">
      <Circle
        bg="red.500"
        size="10px"
        outline="0.2em solid"
        outlineColor="bg"
      />
    </Float>
  </Avatar.Root>
);

export default UserProfileAvatar;
