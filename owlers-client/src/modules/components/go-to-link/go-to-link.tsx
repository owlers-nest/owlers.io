import { FC } from "react";
import ArrowForward from "../../../assets/arrow-forward.svg";
import { Button } from "../../../components/ui/button";

type Props = {
  title: string;
  onClick: () => void;
};

const GoToLink: FC<Props> = ({ title = 'more',  onClick}) => (
  <Button
    onClick={onClick}
    variant={"plain"}
    style={{ color: "#535EF9" }}
  >
    {title} <img style={{ display: "inline" }} src={ArrowForward} />
  </Button>
);

export default GoToLink;
