import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogActionTrigger
} from "../../components/ui/dialog";

import { Button } from "../../components/ui/button"

interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    handleConfirmClicked: () => void;
}


const SwitchNetworkDialog = ({ isOpen, onOpenChange, handleConfirmClicked}: Props) => {
    return (
        <DialogRoot lazyMount open={isOpen} onOpenChange={(e) => onOpenChange(e.open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>You need to switch to BSC network</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    {/* <Flex alignItems={"center"} justifyContent={"space-between"}>
                        <h1>Are you sure this project is {owl} </h1> {" "}
                        { owl === 'Legit' ? <img src={LegitOwl} alt="Legit Project" /> : <img src={ScamOwl} alt="Scam Project" /> }
                    </Flex> */}
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button onClick={handleConfirmClicked}>Switch</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
}

export default SwitchNetworkDialog;