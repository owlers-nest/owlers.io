import { Link } from "@chakra-ui/react";
import { AiOutlineGlobal } from "react-icons/ai";
import { RiMediumFill, RiTelegramFill, RiTwitterXFill, RiContractFill, RiDiscordFill, RiInstagramFill } from "react-icons/ri";

interface Props {
  type: "website" | "x" | "telegram" | "medium" | 'contract';
  link: string;
  size?: number;
}

const ICONS = {
  website: <AiOutlineGlobal />,
  x: <RiTwitterXFill />,
  telegram: <RiTelegramFill />,
  medium: <RiMediumFill />,
  contract: <RiContractFill />,
  discord: <RiDiscordFill />,
  instagram: <RiInstagramFill />
};

const ICONS_COLORS = {
  website: '#42A5F5',
  telegram: '#358EEC',
  x: '#000000',
  medium: '#000000',
  contract: '#979695',
  discord: '#5865F2',
  instagram: '#EB6AC6'
}

const SocialMediaIcon = ({
  link,
  type,
  size = 21, // Added to component props
}: Props) => {
  return (
    <Link
      href={link}
      marginX={1}
      target="blank"
      color={ICONS_COLORS[type]}
      fontSize={size + "px"}
      title={type}
    >
      {ICONS[type]}
    </Link>
  );
};

export default SocialMediaIcon;
