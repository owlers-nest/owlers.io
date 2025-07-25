import { HStack, Icon } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from "../../components/ui/dialog";

import {
    RadioCardItem,
    RadioCardLabel,
    RadioCardRoot,
} from "../../components/ui/radio-card";
import { useEffect, useState } from "react";

interface Props {
    isOpen: boolean; 
    onClose: () => void; 
    onOwl: (val: string) => void;
    isOwling: boolean;
}

const OwlDialog = ({ isOpen, isOwling, onClose, onOwl }: Props) => {
    const items = [
        { value: "scam", title: "Scam", description: "Is a scam project", colorPalette: "red", icon: <BiArrowToBottom /> },
        { value: "legit", title: "Legit", description: "Is a legit project", colorPalette: "green", icon: <BiArrowToTop /> },

    ]

    const [owlDecision, setOwlDecision] = useState<string>("scam");

    useEffect(() => {
        setOwlDecision("scam");
    }, [isOpen])


    const handleOwlClick = () => {
        onOwl(owlDecision);
    }

    return (
        <HStack wrap="wrap" gap="4">
            <DialogRoot
                key={"key"}
                placement={"center"}
                open={isOpen}
                motionPreset="slide-in-bottom"
                closeOnInteractOutside={false}
                onOpenChange={isOwling ? () => {} : onClose}
                onEscapeKeyDown={isOwling ? () => {} : onClose}
            >
                <DialogContent>

                    <DialogHeader>
                        <DialogTitle>Make your decision</DialogTitle>
                    </DialogHeader>
                    <DialogBody>

                        <RadioCardRoot defaultValue={"scam"} >
                            <RadioCardLabel>Select is project scam or legit!</RadioCardLabel>
                            <HStack>
                                {items.map((item) => (
                                    <RadioCardItem
                                        onChange={() => setOwlDecision(item.value)}
                                        label={item.title}
                                        icon={
                                            <Icon fontSize="2xl" color="fg.muted">
                                                {item.icon}
                                            </Icon>
                                        }
                                        indicator={false}
                                        key={item.value}
                                        value={item.value}
                                        colorPalette={item.colorPalette}
                                    />
                                ))}
                            </HStack>
                        </RadioCardRoot>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button disabled={isOwling} variant="outline" onClick={onClose}>Cancel</Button>
                        </DialogActionTrigger>
                        <Button disabled={isOwling} loading={isOwling} onClick={handleOwlClick}>Owl</Button>
                    </DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
        </HStack >
    );
}

export default OwlDialog;