import { IconButton} from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";

const PrevArrow = (props: any)  => {
  const { onClick } = props;
  return (
    <div style={{ padding:"5px", zIndex: "9", display: "flex", alignItems: "center", justifyContent: "flex-start", position: "absolute", left: 0, top: 0, bottom: 0, width: "50px", backgroundColor: "#fff", opacity: "0.6" }}>
        <IconButton onClick={onClick} rounded={"full"}><IoArrowBack /></IconButton>
    </div>
  );
}

export default PrevArrow;