import { useSwitchChain } from "wagmi";
import { Badge } from "@chakra-ui/react"
import { useDispatch } from "react-redux";
import { updateNetwork } from "../../store/slices/wallet";
import {
    MenuContent,
    MenuRoot,
    MenuTrigger,
    MenuRadioItemGroup,
    MenuRadioItem,
} from "../../../components/ui/menu";
import EthChainIcon from "../../../assets/ETHChainIcon.svg";
import BNBChainIcon from "../../../assets/bnb-chain-logo.svg";
import { getNetwork } from "../../store/selectors/wallet";
import { useSelector } from "react-redux";

const NetworkIcons = {
    "Localhost": <img src={EthChainIcon} width="8" height="8" alt="" />,
    "BNB Smart Chain": <img src={BNBChainIcon} width="10" height="10" alt="" />
}

const NetworksSelector = () => {
    const dispatch  = useDispatch();
    let { chains, switchChain } = useSwitchChain();

    const network = useSelector(getNetwork);

    const handleChainChange = (e: any) => {
        const chain = chains.find(c => c.name === e.value);
        if (chain) {
            switchChain({chainId: chain.id});
            dispatch(updateNetwork({ symbol: chain.nativeCurrency.symbol, id: chain.id, name: chain.name }));
        }
    }

    return (
        <MenuRoot>
            <MenuTrigger asChild marginRight={2} cursor={"pointer"}>
                <Badge colorPalette={"cyan"} size="sm">
                    {(NetworkIcons as any)[network.name]} {network.name}
                </Badge>
            </MenuTrigger>
            <MenuContent minW="10rem" w={"250"}>
                <MenuRadioItemGroup
                    value={network.name}
                    onValueChange={handleChainChange}
                >
                    {
                        chains.map(chain => (
                            <MenuRadioItem value={chain.name}>{chain.name}</MenuRadioItem>
                        ))
                    }

                </MenuRadioItemGroup>
            </MenuContent>
        </MenuRoot>
    );
}

export default NetworksSelector;