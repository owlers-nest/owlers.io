import { Box, Flex, Float } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "../../assets/dark-home.svg";
import LightHome from "../../assets/light-home.svg";
import Projects from "../../assets/stacks.svg";
import LightProjects from "../../assets/light-stacks.svg";
import Owlet from "../../assets/owlet.svg";
import Owlers from "../../assets/owlers.svg";
import Settings from "../../assets/settings.svg";
import Soon from "../../assets/search_activity.svg";
import EthChainIcon from "../../assets/ETHChainIcon.svg";
import BNBChainIcon from "../../assets/bnb-chain-logo.svg";
import { getNetwork } from "../store/selectors/wallet";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const network = useSelector(getNetwork);
  const { isConnected } = useAccount();

  const isActive = (link: string, target = "home") => {
    console.log("link", link);
    if (target === "home" && location.pathname === link) {
      return true;
    }
    return location.pathname.includes(target);
  };

  return (
    <Flex
      zIndex={1}
      position="fixed"
      top="0"
      left="0"
      justifyContent={"space-between"}
      style={{
        padding: "20px 10px",
        width: "100px",
        height: "100vh",
        backgroundColor: "#fff",
      }}
      direction={"column"}
      align={"center"}
      justify={"center"}
    >
      <img src={Owlers} alt="owlers logo" />
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Box
          as="button"
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
          onClick={() => navigate("/")}
        >
          <Flex
            align="center"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
          >
            <Flex flexDirection={"column"} alignItems={"center"} width={"100%"}>
              {isActive("/", "home") ? (
                <img width="30" height="30" src={Home} alt="" />
              ) : (
                <img width="30" height="30" src={LightHome} alt="" />
              )}
              <p
                style={{ color: isActive("/", "home") ? "#1F3434" : "#879090" }}
              >
                Home
              </p>
            </Flex>
          </Flex>
        </Box>

        <Box
          as="button"
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
          onClick={() => navigate("/projects")}
        >
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
          >
            <Flex flexDirection={"column"} alignItems={"center"}>
              {isActive("/projects", "projects") ? (
                <img width="30" height="30" src={Projects} alt="" />
              ) : (
                <img width="30" height="30" src={LightProjects} alt="" />
              )}
              <p
                style={{
                  color: isActive("/projects", "projects")
                    ? "#1F3434"
                    : "#879090",
                }}
              >
                Projects
              </p>
            </Flex>
          </Flex>
        </Box>

        <Box
          as="button"
          style={{ textDecoration: "none", cursor: "disabled" }}
          _focus={{ boxShadow: "none" }}
          // onClick={() => {}}
        >
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
          >
            <Flex flexDirection={"column"} alignItems={"center"}>
              <img
                src={Soon}
                alt=""
                style={{ position: "relative", top: 7, left: 13 }}
              />
              <img
                style={{ filter: "grayscale(100%)" }}
                width="30"
                height="30"
                src={Owlet}
                alt=""
              />
              <p style={{ color: "#879090" }}>Soon</p>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Box
        as="button"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
        onClick={() => navigate("/my-settings")}
        position={"relative"}
      >
        {isConnected ? (
          <Float placement={"top-end"}>
            {network.symbol === "ETH" ? (
              <img width="10px" height="10px" src={EthChainIcon} alt="" />
            ) : (
              <img width="15px" height="15px" src={BNBChainIcon} alt="" />
            )}
          </Float>
        ) : (
          ""
        )}
        <Flex align="center" role="group" cursor="pointer">
          <div
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "100%",
              backgroundColor: "#f7f7f7",
            }}
          >
            <img width="30" height="30" src={Settings} alt="settings" />
          </div>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SideNav;
