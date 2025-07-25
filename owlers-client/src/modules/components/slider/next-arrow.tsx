import { IconButton } from "@chakra-ui/react";
import { IoArrowForward } from "react-icons/io5";

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div style={{ padding: "5px", display: "flex", alignItems: "center", justifyContent: "flex-end", position: "absolute", right: 0, top: 0, bottom: 0, width: "50px", backgroundColor: "#fff", opacity: "0.6" }}>
      <IconButton onClick={onClick} rounded={"full"}><IoArrowForward /></IconButton>
    </div>
  );
}

export default NextArrow;