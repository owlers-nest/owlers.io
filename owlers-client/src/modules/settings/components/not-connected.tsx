import { Group, Card } from "@chakra-ui/react";
import { Button } from "../../../components/ui/button";
import { EmptyState } from "../../../components/ui/empty-state";
import { ConnectKitButton } from "connectkit";


const NotConnected = () => {
    return (
        <Card.Root display="flex" borderRadius={24} height={"full"} alignItems={"center"}>
            <Card.Body justifyContent={"center"}>
                <EmptyState
                    title="You are not connected"
                    description="Please make sure you are connected to your wallet"
                >
                    <Group>
                        <ConnectKitButton.Custom>
                            {({ show }) => {
                                return (
                                    <Button onClick={show} size={"lg"}>
                                        Connect
                                    </Button>
                                );
                            }}
                        </ConnectKitButton.Custom>
                    </Group>
                </EmptyState>
            </Card.Body>
        </Card.Root>
    );
}

export default NotConnected;