import { Box, Flex, Float } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Owlers from "../../../assets/owlers.svg";
import Settings from "../../../assets/settings.svg";
import EthChainIcon from "../../../assets/ETHChainIcon.svg";
import BNBChainIcon from "../../../assets/bnb-chain-logo.svg";
import { getNetwork } from "../../store/selectors/wallet";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import styles from "./header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const network = useSelector(getNetwork);
  const { isConnected } = useAccount();

  return (
    <Flex
      zIndex={1}
      position="fixed"
      align={"center"}
      justifyContent={'space-between'}
      className={styles.tabMenu}
    >
      <img src={Owlers} alt="owlers logo" />

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

export default Header;
