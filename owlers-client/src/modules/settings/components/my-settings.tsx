import { useAccount, useBalance, useDisconnect } from "wagmi";
import { Card, Heading, Badge, Flex, Link, Text } from "@chakra-ui/react";
import { Button } from "../../../components/ui/button";
import { StatRoot, StatLabel, StatValueText,  } from "../../../components/ui/stat";
import { useLazyGetDecisionsQuery } from "../../services/decisions";
import { useEffect, useState } from "react";
import ProjectList from "../../components/project-list";
import OwlStats from "../../components/owl-stats";
import BNBCoinLogo from "../../../assets/bnb-coin-logo.svg";
import ETHChainIcon from "../../../assets/ETHChainIcon.svg";
import Owlet from "../../../assets/owlet.svg";
import { disconnect as disconnectWallet } from "../../store/slices/wallet";
import { getNetwork } from "../../store/selectors/wallet";
import { useDispatch, useSelector } from "react-redux";
import NetworksSelector from "./networks-selectors";
import { getMyAllocations } from "../../services/preslae-contract";
import { useNavigate } from "react-router-dom";
import { UserTokenAllocation } from "../../types";
import { RiArrowRightLine } from "react-icons/ri";
import { formatPrices } from "../../utilities/wallet";
import UserProfileAvatar from "../../components/user-profile-avatar/UserProfileAvatar";
import { InfoTip } from "../../../components/ui/toggle-tip";


const MySettings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userTokenAllocation, setUserTokenAllocation] = useState<UserTokenAllocation>({
        claimable: 0,
        claimed: 0,
        sold: 0,
    });
    const network = useSelector(getNetwork);
    const { address, chain } = useAccount();
    const { disconnect } = useDisconnect();
    const balance = useBalance({
        address,
    });

    // Remove or comment out if not used
    // const owlBalance = useBalance({
    //     address,
    //     token: OWL_TOKEN_ADDRESS
    // });

    const [trigger, { isLoading }] = useLazyGetDecisionsQuery();

    const [scams, setScams] = useState<number>(0);
    const [legits, setLegits] = useState<number>(0);
    const [myProjects, setMyProjects] = useState<any>([]);

    const loadMyAllocations = async () => {
        const myAllocations = await getMyAllocations(address as string);
        if (myAllocations) {
            setUserTokenAllocation(myAllocations);
        }
    }

    useEffect(() => {
        if (address) {
            loadMyAllocations();
        }
    }, [address])



    useEffect(() => {
        const fetch = async () => {
            if (address) {
                const response = await trigger(address);

                if (response.status === "fulfilled") {
                    setLegits(response.data.legits)
                    setScams(response.data.scams)

                    const projects = response.data.data.map((d: any) => ({
                        ...d.project,
                        decision: d.decision
                    }));

                    setMyProjects(projects);
                }
            }
        };
        fetch();
    }, [address]);

    const handleDisconnectClicked = () => {
        disconnect();
        dispatch(disconnectWallet());
    };

    return (
        <>
            <Card.Root borderRadius={24} display={"flex"} justifyContent={"center"} marginBottom={5}>
                <Card.Header>
                    <Flex justifyContent={"space-between"}>
                        <Heading>My Account</Heading>
                        <div>
                        <Button onClick={handleDisconnectClicked} borderColor="danger3" color="danger3" variant={"outline"}>Disconnect Wallet</Button>
                        </div>
                    </Flex>
                </Card.Header>
                <Card.Body gap="2">
                    <Flex>
                        <Flex marginRight={5}>
                            {/* <Box display="flex" justifyContent={"center"} alignItems={"center"} padding={1} border={"1px solid #E4E4E7"} rounded={"full"} width={"50px"} height={"50px"}>
                                <img src={Owler} width={"25px"} height={"25px"} alt="" />
                            </Box> */}
                            {/* <h1>{shortWalletAddress(address || "")}</h1> */}

                            <UserProfileAvatar name={address || ''}/>
                        </Flex>
                        <Card.Title mt="2">
                            <Flex alignItems={"center"} justifyContent={"center"}>
                                <NetworksSelector />
                                <Badge colorPalette={"cyan"}>
                                    {balance.data?.formatted} {""}
                                    {chain?.nativeCurrency.symbol}
                                    {network.symbol === "ETH" ? <img src={ETHChainIcon} width={7} height={7} alt="" /> : <img src={BNBCoinLogo} width={10} height={10} alt="" />}
                                </Badge>
                            </Flex>
                        </Card.Title>
                    </Flex>

                    <Flex justifyContent={"flex-start"} width="full" flexDirection={"column"}>
                        <Heading margin={"10px 0"}>
                            My Wallet
                        </Heading>
                        <div>
                            {/* this should be displayed in case of the presale is end */}
                            {/* <StatRoot borderWidth="1px" p="4" borderRadius={8} display={"inline-block"}>
                                <Flex justifyContent={"space-between"}>
                                    <StatLabel marginRight={5}>Your Owl Tokens Balance</StatLabel>
                                    <StatValueText>
                                        {owlBalance.data?.formatted} {" "}
                                        {owlBalance.data?.symbol}
                                        <img src={Owlet} width={30} height={30} alt="Owl token logo" />
                                    </StatValueText>
                                </Flex>
                            </StatRoot> */}
                            <StatRoot borderWidth="1px" p="4" borderRadius={8} display={"inline-block"}>
                            {/* <div><Link onClick={() => navigate("/pre-sale")}>Presale is live!</Link></div> */}
                            {/* <Button onClick={handleDisconnectClicked} color="green" variant={'surface'}>Presale is live!</Button> */}
                                {/* <Flex justifyContent={"space-between"}> */}
                                    <div>
                                    <Flex justifyContent={'space-between'}>
                                
                                    <StatLabel marginRight={10}>
                                        Your Owl Tokens Allocations
                                    </StatLabel>
                                    <InfoTip>you can withdraw your allocations when presale is end.</InfoTip>
                                    </Flex>
                                    </div>
                                    <Flex justify={'space-between'}>
                                    <StatValueText>
                                        <Flex lineHeight={1} justifyContent={'flex-end'}>
                                        <Text textStyle={'xl'}>{formatPrices(userTokenAllocation.sold).integerPart}</Text>
                                        {','}
                                        <Text position={"relative"} top={'6px'} fontWeight={'medium'}  textStyle={'sm'}>{formatPrices(userTokenAllocation.sold).fractionPart}</Text>
                                        </Flex>
                                        {/* {userTokenAllocation.sold} {" "} */}
                                        {/* {owlBalance.data?.symbol} */}
                                        <img src={Owlet} width={30} height={30} alt="Owl token logo" />
                                    </StatValueText>
                                    <Link  variant="plain" marginTop="1" paddingBottom={1} color="#2FB8A8" onClick={() => navigate("/pre-sale")}>Buy now <RiArrowRightLine /></Link>
                                    </Flex>
                                {/* </Flex> */}
                                {/* <Flex justifyContent={'flex-end'}>
                                    <Link  variant="plain" marginTop="1" paddingBottom={1} color="#2FB8A8" onClick={() => navigate("/pre-sale")}>Buy now <RiArrowRightLine /></Link>
                                </Flex> */}
                            </StatRoot>
                        </div>
                    </Flex>
                </Card.Body>
            </Card.Root >

            <Card.Root borderRadius={24} display={"flex"} justifyContent={"center"}>
                <Card.Header>
                    <Heading>My Owls</Heading>
                </Card.Header>
                <Card.Body>

                    <Flex flexDir={"column"} width={"100%"} margin={"10px"}>
                        <OwlStats legits={legits} scams={scams} isLoading={isLoading} />
                    </Flex>

                    {myProjects && myProjects.length ? <ProjectList projects={myProjects} isLoading={isLoading} /> : ""}
                </Card.Body>
            </Card.Root >
        </>
    );
}

export default MySettings;