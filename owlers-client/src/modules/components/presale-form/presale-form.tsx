import styles from "./presale-form.module.scss";
import Bell from "../../../assets/bell-dynamic-color.svg";
import Owlet from "../../../assets/owlet.svg";
import { useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
} from "wagmi";
import { ConnectKitButton } from "connectkit";
import {
  USDTAddress,
  USDT_ABI,
  PRESALE_CONTRACT_ADDRESS,
  PRESALE_ABI,
} from "../../../constants";
import { parseUnits, formatUnits } from "viem";
import { calculateAmountOfToken } from "../../services/preslae-contract";

// const OWL_TOKEN_PRICE = 0.0045;
const MIN_USDT_TO_PAY = 10;
const MAX_USDT_TOPAY = 10_000;

const PreSaleForm = () => {
  const [owls, setOwls] = useState(0);
  const [usdtAmount, setUsdtAmount] = useState(0);

  const { writeContract: approveUSDT, 
    // isPending: isApproving 
  } =
    useWriteContract();
  const {
    // data: hash,
    writeContract: buyTokens,
    // isPending: isBuying,
  } = useWriteContract();
  const { address: userAddress } = useAccount();

  const { isConnected } = useAccount();



  const { data: allowanceData, refetch } = useReadContract({
    address: USDTAddress,
    abi: USDT_ABI,
    functionName: "allowance",
    args: [userAddress, PRESALE_CONTRACT_ADDRESS],
  });

  // console.log("-==== balance", balance.data);

  const handlePriceChanged = async (e: any) => {
    const value = parseFloat(e.target.value || 0);
    // console.log(Math.floor(value / OWL_TOKEN_PRICE));
    // const owls = Math.floor(value / OWL_TOKEN_PRICE);
    if (value >= MIN_USDT_TO_PAY && value <= MAX_USDT_TOPAY) {
      const amount = await calculateAmountOfToken(value);
      console.log("====amount", amount);
      setOwls(Number(amount) || 0);
      setUsdtAmount(value);
    }
  };


  const approve = async (amount: any) => {
    console.log("====PRESALE_CONTRACT_ADDRESS, amount, ", PRESALE_CONTRACT_ADDRESS, amount)
    try {
      await approveUSDT({
        address: USDTAddress,
        abi: USDT_ABI,
        functionName: "approve",
        args: [PRESALE_CONTRACT_ADDRESS, amount],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const buy = async (amount: any) => {
    try {
      await buyTokens({
        address: PRESALE_CONTRACT_ADDRESS,
        abi: PRESALE_ABI,
        functionName: "buyTokens",
        args: [amount],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [allowance, setAllowance] = useState(0);

  useEffect(() => {
    if (allowanceData) {
      const formatted = Number(formatUnits(allowanceData as any, 6));
      console.log("allowed amount", formatted);
      setAllowance(formatted);
    }
  }, [allowanceData]);

  const handleBuyOwlClicked = async () => {
    const amount = parseUnits(usdtAmount.toString(), 6);

    if (allowance < usdtAmount) {
      console.log(`Request approval for ${amount} USDT`);
      const approved = await approve(amount);
      console.log("approved", approved);
      await refetch();
    }

    if (allowance >= usdtAmount) {
      console.log("===== I allowed the presale to get my tokens", allowance, usdtAmount);
      console.log("====== amount to buy with",amount)
      await buy(amount);
    }
  };

  return (
    <section id="home" className={`${styles.HeroSection} ${styles.Container}`}>
      <div className={styles.Form}>
        <header>
          <img src={Bell} alt="" srcSet="" />
          {/* <h2 className={styles.TextPrimary}>PRESALE ENDS IN</h2> */}
          <h2 className={styles.TextPrimary}>PRESALE IS ACTIVE</h2>
        </header>
        <div className={styles.TimerContainer}>
          <div className={`${styles.TimerCard} ${styles.Card}`}>
            <h3 className={styles.TextPrimary}>16</h3>
            <h4 className={styles.TextPrimary2}>DAYS</h4>
          </div>
          :
          <div className={`${styles.TimerCard} ${styles.Card}`}>
            <h3
              className={`${styles.TextPrimary} ${styles.TextOverflowEllipsis}`}
            >
              60
            </h3>
            <h4 className={styles.TextPrimary2}>HOURS</h4>
          </div>
          :
          <div className={`${styles.TimerCard} ${styles.Card}`}>
            <h3 className={styles.TextPrimary}>19</h3>
            <h4 className={styles.TextPrimary2}>MINUTES</h4>
          </div>
          :
          <div className={`${styles.TimerCard} ${styles.Card}`}>
            <h3 className={styles.TextPrimary}>15</h3>
            <h4 className={styles.TextPrimary2}>SECONDS</h4>
          </div>
        </div>
        <div className={styles.PriceContainer}>
          <div className={`${styles.PriceCard} ${styles.Card}`}>
            <h4 className={styles.TextPrimary}>USD RAISED</h4>
            <h3 className={styles.TextGreen}>$1,234,567</h3>
          </div>

          <div className={`${styles.PriceCard} ${styles.Card}`}>
            <h4 className={styles.TextPrimary}>1 $OWL</h4>
            <h3 className={styles.TextGreen}>$0.0045</h3>
            <img className={styles.OwlIcon} src={Owlet} alt="" />
          </div>
        </div>
        <fieldset className={styles.InputsContainer}>
          <div className={`${styles.InputCard} ${styles.Card}`}>
            <label className={styles.TextPrimary} htmlFor="USDT">
              USDT Amount{" "}
            </label>
            <input
              type="number"
              required
              placeholder="Enter amount"
              id="USDT"
              onChange={handlePriceChanged}
              // defaultValue={0}
            />
          </div>
          =
          <div className={`${styles.InputCard} ${styles.Card}`}>
            <label className={styles.TextPrimary} htmlFor="OWL">
              OWL Amount
            </label>
            <input
              type="number"
              required
              placeholder="Enter amount"
              id="OWL"
              disabled
              // defaultValue={0}
              value={owls}
            />
          </div>
        </fieldset>
        <ConnectKitButton.Custom>
          {({ show }) => {
            return isConnected ? (
              <button
                className={`${styles.TWButton} ${styles.BgPrimary}`}
                onClick={handleBuyOwlClicked}
              >
                Buy $OWL
              </button>
            ) : (
              <button
                className={`${styles.TWButton} ${styles.BgPrimary}`}
                onClick={show}
              >
                Connect to your wallet
              </button>
            );
          }}
        </ConnectKitButton.Custom>
      </div>
      <article>
        <h2 className={styles.TextPrimary}>Audited by</h2>
        <figure>
          <img src="./assets/coin-market.png" alt="" />
          <img src="./assets/coin-gecko.png" alt="" srcSet="" />
          <img src="./assets/medium.png" alt="" srcSet="" />
        </figure>
      </article>
    </section>
  );
};

export default PreSaleForm;
