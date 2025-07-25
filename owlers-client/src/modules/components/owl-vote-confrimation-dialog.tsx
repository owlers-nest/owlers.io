import { DialogActionTrigger, Flex } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from "../../components/ui/dialog";

import LegitOwl from "../../assets/legit-owl.svg";
import ScamOwl from "../../assets/scam-owl.svg";

type Owl = "Legit" | "Scam";

interface Props {
    owl: Owl;
    isOpen: boolean;
    isOwling: boolean;
    onOpenChange: (isOpen: boolean) => void;
    handleConfirmClicked: () => void;
}

const OwlVoteConfirmationDialog = ({ owl, isOpen, isOwling, onOpenChange, handleConfirmClicked }: Props) => {
    return (
        <DialogRoot lazyMount open={isOpen} onOpenChange={(e) => onOpenChange(e.open)} placement={'center'}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Owl Confirmation</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Flex alignItems={"center"} justifyContent={"space-between"}>
                        <h1>Are you sure this project is {owl} </h1> {" "}
                        { owl === 'Legit' ? <img src={LegitOwl} alt="Legit Project" /> : <img src={ScamOwl} alt="Scam Project" /> }
                    </Flex>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button loading={isOwling} onClick={handleConfirmClicked}>Owl</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
}

export default OwlVoteConfirmationDialog;