import { HStack, IconButton } from "@chakra-ui/react";
import { BsMedium, BsTelegram, BsTwitterX } from "react-icons/bs";
import { RiGlobalFill } from "react-icons/ri";

interface Props {
    links?: {
        type: string;
        link: string;
    }[]
}

const ICONS: any = {
    telegram: <BsTelegram />,
    website: <RiGlobalFill />,
    x: <BsTwitterX />,
    medium: <BsMedium />
}

const ProjectLinks = ({ links }: Props) => {
    return (

        <HStack wrap="wrap" gap="2">
            {links && links.map(link => (
                <IconButton
                    aria-label={link.type}
                    variant="ghost"
                    size={"lg"}
                    onClick={() => window.open(link.link)}
                >
                    {ICONS[link.type] as unknown as any}
                </IconButton>
            )
            )}
        </HStack>
    );
}

export default ProjectLinks;