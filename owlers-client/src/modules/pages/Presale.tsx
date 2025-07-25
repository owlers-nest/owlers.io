import styles from "./Presale.module.scss";
import Logo from "../../assets/logo.svg";
import Chart from "../../assets/chart.png";
import OwlersFooter from "../../assets/Owlers-footer.png";
import PreSaleForm from "../components/presale-form/presale-form";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import { ConnectKitButton } from "connectkit";
import { FC } from "react";
import { shortWalletAddress } from "../utilities/wallet";
import { PRESALE_ABI, PRESALE_CONTRACT_ADDRESS } from "../../constants";
import { config } from "../web3/provider";
import { formatUnits } from "viem";
import { useNavigate } from "react-router-dom";
import UserProfileAvatar from "../components/user-profile-avatar/UserProfileAvatar";
import SocialMediaIcon from "../components/social-media-icon";
import { Flex } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import { RiArrowRightLine } from "react-icons/ri";

const ConnectButton: FC = () => {
  return (
    <ConnectKitButton.Custom>
      {({ show }) => (
        <button className={styles.TWButton} onClick={show}>
          Connect
        </button>
      )}
    </ConnectKitButton.Custom>
  );
};

const PreSalePage = () => {
  const navigate = useNavigate();
  const { isConnected, address } = useAccount();

  const getSaleTokenPrice = async () => {
    // const result = await readContract(config, {
    //   abi: PRESALE_ABI,
    //   address: PRESALE_CONTRACT_ADDRESS,
    //   functionName: 'getSaleTokenPrice',
    // });

    // const result2 = await readContract(config, {
    //   abi: PRESALE_ABI,
    //   address: PRESALE_CONTRACT_ADDRESS,
    //   functionName: 'getRemainingTokens',
    // });

    // const result3 = await readContract(config, {
    //   abi: PRESALE_ABI,
    //   address: PRESALE_CONTRACT_ADDRESS,
    //   functionName: 'getUserAllocation',
    //   args: [address]
    // });

    // const userAllocation = await readContract(config, {
    //   abi: PRESALE_ABI,
    //   address: PRESALE_CONTRACT_ADDRESS,
    //   functionName: 'getUserAllocation',
    //   args: [address]
    // });

    // console.log(formatUnits(userAllocation as any, 18));

    const tokenAmount = await readContract(config, {
      abi: PRESALE_ABI,
      address: PRESALE_CONTRACT_ADDRESS,
      functionName: "previewTokenAmount",
      args: [100000000],
    });

    console.log(
      "tokenAmount",
      Number(formatUnits(tokenAmount as any, 18)).toFixed(2)
    );
  };

  getSaleTokenPrice();
  return (
    <>
      <header className={styles.Header}>
        <nav className={`${styles.Navbar} ${styles.Container}`}>
          <a href="#">
            <img className={`${styles.TwLogo}`} src={Logo} alt="" />
          </a>
          {!isConnected ? (
            <ConnectButton />
          ) : (
            <UserProfileAvatar
              onClick={() => navigate("/my-settings")}
              name={
                shortWalletAddress(address || "")[0] +
                " " +
                shortWalletAddress(address || "")[
                  shortWalletAddress(address || "").length - 1
                ]
              }
            />
          )}
        </nav>
      </header>

      <main>
        <PreSaleForm />
        <section
          id="about-tokens"
          className={`${styles.AboutTokensSection} ${styles.Container}`}
        >
          <h2
            className={`${styles.TWBadge} ${styles.TWBadge2} ${styles.GradientBlue}`}
          >
            Our Token
          </h2>
          <h2 className={styles.TWHeading2}>
            $Owl Token: Empowering the Owlers Community with Secure, Transparent
            Decisions
          </h2>
          <p className={styles.TWParagraph1}>
            The <strong className={styles.TWTextRed}>$Owl Token</strong> is the
            backbone of the Owlers platform, providing both security and
            transparency to the decisions made within our community. By
            integrating the Owlet Token into every voting process, we ensure
            that all community decisions—from project reviews to scam alerts—are
            decentralized and based on collective, validated input. Owlet Token
            holders gain the power to vote on important matters, including the
            verification of ICOs and IPOs, and participate in the governance of
            the platform. This system prevents manipulation and ensures that
            only legitimate, community-backed projects are highlighted, offering
            a higher level of trust and accountability for all investors. With
            <strong className={styles.TWTextRed}>$Owl Token</strong>, your voice
            matters. Secure, transparent, and fair decisions are at the core of
            Owlers, and the Owlet Token ensures that the community remains in
            control, fostering a safer investment environment for all.
          </p>
        </section>
        <figure
          id="chart"
          className={`${styles.ChartSection} ${styles.Container}`}
        >
          <img src={Chart} alt="" srcSet="" />
        </figure>

        <section
          id="roadmap"
          className={`${styles.RoadmapSection} ${styles.Container}`}
        >
          <div className="headings">
            <h2
              className={`${styles.TWBadge} ${styles.TWBadge2} ${styles.GradientBlue}`}
            >
              Roadmap
            </h2>
            <h2 className={styles.TWHeading2}>
              Owlers Community & Owlet AI Roadmap
            </h2>
          </div>
          <div className={styles.CardContainer}>
            <details className={styles.DetailsAnimation}>
              <summary>
                <h2 className={styles.Title}>
                  Phase 1: Conceptualization & Foundation
                </h2>
                <svg
                  className={styles.DropdownIcon}
                  viewBox="0 0 33 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6325 4.83565L4.11332 17.3552C3.68693 17.7813 3.16554 17.9961 2.54916 17.9994C1.93277 18.0027 1.40221 17.7912 0.957489 17.3648C0.51249 16.9198 0.28999 16.3852 0.28999 15.7611C0.28999 15.1369 0.512489 14.6025 0.957489 14.1577L14.0462 1.05482C14.4129 0.688151 14.8199 0.419124 15.2671 0.247735C15.7143 0.0760679 16.1694 -0.00976542 16.6325 -0.00976543C17.0955 -0.00976544 17.5507 0.0760679 17.9979 0.247735C18.4451 0.419123 18.8521 0.688151 19.2187 1.05482L32.3492 14.1852C32.7942 14.6302 33.011 15.1586 32.9996 15.7702C32.9885 16.3819 32.7657 16.9102 32.3312 17.3552C31.8862 17.7813 31.3564 17.9991 30.7417 18.0086C30.1267 18.0177 29.5967 17.8 29.1517 17.3552L16.6325 4.83565Z"
                    fill="white"
                  />
                </svg>
              </summary>
              <ol>
                <li>Research & Community Building</li>
                <ul>
                  <li>
                    <strong> Owlers Community</strong>: Conduct thorough market
                    research to identify investor pain points in ICO and IPO
                    spaces. Focus on building a strong foundation with early
                    adopters and contributors.
                  </li>
                  <li>
                    <strong> Owlet AI</strong>: Define the core functionalities
                    of the AI assistant, such as scam detection, ICO/IPO
                    analysis, and real-time market insights.
                  </li>
                  <li>
                    Launch <strong> Owlers Community</strong> on social media
                    platforms (Telegram, Twitter) to create awareness and build
                    a trusted community.
                  </li>
                  <li>
                    Develop the initial <strong>Owlet AI</strong> prototype to
                    begin testing ICO/IPO data aggregation and early-stage scam
                    detection algorithms.
                  </li>
                </ul>
                <li>Tokenomics & Platform Design</li>
                <ul>
                  <li>
                    Design a tokenomics model for the
                    <strong> Owlers Community Token</strong>
                    that incentivizes active participation and staking for
                    rewards.
                  </li>
                  <li>
                    Develop the <strong>Owlet AI</strong> infrastructure,
                    focusing on integrating with data sources like ICO/IPO
                    trackers, news APIs, and blockchain analysis tools.
                  </li>
                </ul>
                <li>Partnerships & Legal Framework</li>
                <ul>
                  <li>
                    Secure early partnerships with reputable ICO/IPO platforms
                    and legal advisors to ensure compliance and legitimacy
                  </li>
                  <li>
                    Start preparing the legal framework for launching token
                    sales or airdrops for early adopters.
                  </li>
                </ul>
              </ol>
            </details>
            <details className={styles.DetailsAnimation}>
              <summary>
                <h2 className={styles.Title}>
                  Phase 2: Community Expansion & Initial Product Launch
                </h2>
                <svg
                  className={styles.DropdownIcon}
                  viewBox="0 0 33 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6325 4.83565L4.11332 17.3552C3.68693 17.7813 3.16554 17.9961 2.54916 17.9994C1.93277 18.0027 1.40221 17.7912 0.957489 17.3648C0.51249 16.9198 0.28999 16.3852 0.28999 15.7611C0.28999 15.1369 0.512489 14.6025 0.957489 14.1577L14.0462 1.05482C14.4129 0.688151 14.8199 0.419124 15.2671 0.247735C15.7143 0.0760679 16.1694 -0.00976542 16.6325 -0.00976543C17.0955 -0.00976544 17.5507 0.0760679 17.9979 0.247735C18.4451 0.419123 18.8521 0.688151 19.2187 1.05482L32.3492 14.1852C32.7942 14.6302 33.011 15.1586 32.9996 15.7702C32.9885 16.3819 32.7657 16.9102 32.3312 17.3552C31.8862 17.7813 31.3564 17.9991 30.7417 18.0086C30.1267 18.0177 29.5967 17.8 29.1517 17.3552L16.6325 4.83565Z"
                    fill="white"
                  />
                </svg>
              </summary>
              <ol>
                <li>Research & Community Building</li>
                <ul>
                  <li>
                    <strong> Owlers Community</strong>: Conduct thorough market
                    research to identify investor pain points in ICO and IPO
                    spaces. Focus on building a strong foundation with early
                    adopters and contributors.
                  </li>
                  <li>
                    <strong> Owlet AI</strong>: Define the core functionalities
                    of the AI assistant, such as scam detection, ICO/IPO
                    analysis, and real-time market insights.
                  </li>
                  <li>
                    Launch <strong> Owlers Community</strong> on social media
                    platforms (Telegram, Twitter) to create awareness and build
                    a trusted community.
                  </li>
                  <li>
                    Develop the initial <strong>Owlet AI</strong> prototype to
                    begin testing ICO/IPO data aggregation and early-stage scam
                    detection algorithms.
                  </li>
                </ul>
                <li>Tokenomics & Platform Design</li>
                <ul>
                  <li>
                    Design a tokenomics model for the
                    <strong> Owlers Community Token</strong>
                    that incentivizes active participation and staking for
                    rewards.
                  </li>
                  <li>
                    Develop the <strong>Owlet AI</strong> infrastructure,
                    focusing on integrating with data sources like ICO/IPO
                    trackers, news APIs, and blockchain analysis tools.
                  </li>
                </ul>
                <li>Partnerships & Legal Framework</li>
                <ul>
                  <li>
                    Secure early partnerships with reputable ICO/IPO platforms
                    and legal advisors to ensure compliance and legitimacy
                  </li>
                  <li>
                    Start preparing the legal framework for launching token
                    sales or airdrops for early adopters.
                  </li>
                </ul>
              </ol>
            </details>
            <details className={styles.DetailsAnimation}>
              <summary>
                <h2 className={styles.Title}>
                  Phase 3: Platform Growth & AI Integration
                </h2>
                <svg
                  className={styles.DropdownIcon}
                  viewBox="0 0 33 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6325 4.83565L4.11332 17.3552C3.68693 17.7813 3.16554 17.9961 2.54916 17.9994C1.93277 18.0027 1.40221 17.7912 0.957489 17.3648C0.51249 16.9198 0.28999 16.3852 0.28999 15.7611C0.28999 15.1369 0.512489 14.6025 0.957489 14.1577L14.0462 1.05482C14.4129 0.688151 14.8199 0.419124 15.2671 0.247735C15.7143 0.0760679 16.1694 -0.00976542 16.6325 -0.00976543C17.0955 -0.00976544 17.5507 0.0760679 17.9979 0.247735C18.4451 0.419123 18.8521 0.688151 19.2187 1.05482L32.3492 14.1852C32.7942 14.6302 33.011 15.1586 32.9996 15.7702C32.9885 16.3819 32.7657 16.9102 32.3312 17.3552C31.8862 17.7813 31.3564 17.9991 30.7417 18.0086C30.1267 18.0177 29.5967 17.8 29.1517 17.3552L16.6325 4.83565Z"
                    fill="white"
                  />
                </svg>
              </summary>
              <ol>
                <li>Research & Community Building</li>
                <ul>
                  <li>
                    <strong> Owlers Community</strong>: Conduct thorough market
                    research to identify investor pain points in ICO and IPO
                    spaces. Focus on building a strong foundation with early
                    adopters and contributors.
                  </li>
                  <li>
                    <strong> Owlet AI</strong>: Define the core functionalities
                    of the AI assistant, such as scam detection, ICO/IPO
                    analysis, and real-time market insights.
                  </li>
                  <li>
                    Launch <strong> Owlers Community</strong> on social media
                    platforms (Telegram, Twitter) to create awareness and build
                    a trusted community.
                  </li>
                  <li>
                    Develop the initial <strong>Owlet AI</strong> prototype to
                    begin testing ICO/IPO data aggregation and early-stage scam
                    detection algorithms.
                  </li>
                </ul>
                <li>Tokenomics & Platform Design</li>
                <ul>
                  <li>
                    Design a tokenomics model for the
                    <strong> Owlers Community Token</strong>
                    that incentivizes active participation and staking for
                    rewards.
                  </li>
                  <li>
                    Develop the <strong>Owlet AI</strong> infrastructure,
                    focusing on integrating with data sources like ICO/IPO
                    trackers, news APIs, and blockchain analysis tools.
                  </li>
                </ul>
                <li>Partnerships & Legal Framework</li>
                <ul>
                  <li>
                    Secure early partnerships with reputable ICO/IPO platforms
                    and legal advisors to ensure compliance and legitimacy
                  </li>
                  <li>
                    Start preparing the legal framework for launching token
                    sales or airdrops for early adopters.
                  </li>
                </ul>
              </ol>
            </details>
            <details className={styles.DetailsAnimation}>
              <summary>
                <h2 className={styles.Title}>
                  Phase 4: Global Expansion & Marketing
                </h2>
                <svg
                  className={styles.DropdownIcon}
                  viewBox="0 0 33 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6325 4.83565L4.11332 17.3552C3.68693 17.7813 3.16554 17.9961 2.54916 17.9994C1.93277 18.0027 1.40221 17.7912 0.957489 17.3648C0.51249 16.9198 0.28999 16.3852 0.28999 15.7611C0.28999 15.1369 0.512489 14.6025 0.957489 14.1577L14.0462 1.05482C14.4129 0.688151 14.8199 0.419124 15.2671 0.247735C15.7143 0.0760679 16.1694 -0.00976542 16.6325 -0.00976543C17.0955 -0.00976544 17.5507 0.0760679 17.9979 0.247735C18.4451 0.419123 18.8521 0.688151 19.2187 1.05482L32.3492 14.1852C32.7942 14.6302 33.011 15.1586 32.9996 15.7702C32.9885 16.3819 32.7657 16.9102 32.3312 17.3552C31.8862 17.7813 31.3564 17.9991 30.7417 18.0086C30.1267 18.0177 29.5967 17.8 29.1517 17.3552L16.6325 4.83565Z"
                    fill="white"
                  />
                </svg>
              </summary>
              <ol>
                <li>Research & Community Building</li>
                <ul>
                  <li>
                    <strong> Owlers Community</strong>: Conduct thorough market
                    research to identify investor pain points in ICO and IPO
                    spaces. Focus on building a strong foundation with early
                    adopters and contributors.
                  </li>
                  <li>
                    <strong> Owlet AI</strong>: Define the core functionalities
                    of the AI assistant, such as scam detection, ICO/IPO
                    analysis, and real-time market insights.
                  </li>
                  <li>
                    Launch <strong> Owlers Community</strong> on social media
                    platforms (Telegram, Twitter) to create awareness and build
                    a trusted community.
                  </li>
                  <li>
                    Develop the initial <strong>Owlet AI</strong> prototype to
                    begin testing ICO/IPO data aggregation and early-stage scam
                    detection algorithms.
                  </li>
                </ul>
                <li>Tokenomics & Platform Design</li>
                <ul>
                  <li>
                    Design a tokenomics model for the
                    <strong> Owlers Community Token</strong>
                    that incentivizes active participation and staking for
                    rewards.
                  </li>
                  <li>
                    Develop the <strong>Owlet AI</strong> infrastructure,
                    focusing on integrating with data sources like ICO/IPO
                    trackers, news APIs, and blockchain analysis tools.
                  </li>
                </ul>
                <li>Partnerships & Legal Framework</li>
                <ul>
                  <li>
                    Secure early partnerships with reputable ICO/IPO platforms
                    and legal advisors to ensure compliance and legitimacy
                  </li>
                  <li>
                    Start preparing the legal framework for launching token
                    sales or airdrops for early adopters.
                  </li>
                </ul>
              </ol>
            </details>
            <details className={styles.DetailsAnimation}>
              <summary>
                <h2 className={styles.Title}>
                  Phase 5: Maturity & Long-Term Sustainability
                </h2>
                <svg
                  className={styles.DropdownIcon}
                  viewBox="0 0 33 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6325 4.83565L4.11332 17.3552C3.68693 17.7813 3.16554 17.9961 2.54916 17.9994C1.93277 18.0027 1.40221 17.7912 0.957489 17.3648C0.51249 16.9198 0.28999 16.3852 0.28999 15.7611C0.28999 15.1369 0.512489 14.6025 0.957489 14.1577L14.0462 1.05482C14.4129 0.688151 14.8199 0.419124 15.2671 0.247735C15.7143 0.0760679 16.1694 -0.00976542 16.6325 -0.00976543C17.0955 -0.00976544 17.5507 0.0760679 17.9979 0.247735C18.4451 0.419123 18.8521 0.688151 19.2187 1.05482L32.3492 14.1852C32.7942 14.6302 33.011 15.1586 32.9996 15.7702C32.9885 16.3819 32.7657 16.9102 32.3312 17.3552C31.8862 17.7813 31.3564 17.9991 30.7417 18.0086C30.1267 18.0177 29.5967 17.8 29.1517 17.3552L16.6325 4.83565Z"
                    fill="white"
                  />
                </svg>
              </summary>
              <ol>
                <li>Research & Community Building</li>
                <ul>
                  <li>
                    <strong> Owlers Community</strong>: Conduct thorough market
                    research to identify investor pain points in ICO and IPO
                    spaces. Focus on building a strong foundation with early
                    adopters and contributors.
                  </li>
                  <li>
                    <strong> Owlet AI</strong>: Define the core functionalities
                    of the AI assistant, such as scam detection, ICO/IPO
                    analysis, and real-time market insights.
                  </li>
                  <li>
                    Launch <strong> Owlers Community</strong> on social media
                    platforms (Telegram, Twitter) to create awareness and build
                    a trusted community.
                  </li>
                  <li>
                    Develop the initial <strong>Owlet AI</strong> prototype to
                    begin testing ICO/IPO data aggregation and early-stage scam
                    detection algorithms.
                  </li>
                </ul>
                <li>Tokenomics & Platform Design</li>
                <ul>
                  <li>
                    Design a tokenomics model for the
                    <strong> Owlers Community Token</strong>
                    that incentivizes active participation and staking for
                    rewards.
                  </li>
                  <li>
                    Develop the <strong>Owlet AI</strong> infrastructure,
                    focusing on integrating with data sources like ICO/IPO
                    trackers, news APIs, and blockchain analysis tools.
                  </li>
                </ul>
                <li>Partnerships & Legal Framework</li>
                <ul>
                  <li>
                    Secure early partnerships with reputable ICO/IPO platforms
                    and legal advisors to ensure compliance and legitimacy
                  </li>
                  <li>
                    Start preparing the legal framework for launching token
                    sales or airdrops for early adopters.
                  </li>
                </ul>
              </ol>
            </details>
          </div>
        </section>
      </main>

      <footer className={styles.Footer}>
        <Flex justifyContent={"space-between"} width={"100%"}>
          <Flex direction={"column"} justifyContent={'space-between'} alignItems={'start'}>
            <a href="#">
              <img className={styles.TwLogo} src={OwlersFooter} alt="" />
            </a>

            <Button
            colorPalette={'white'}
                rounded={100}
                color={'white'}
                variant={"outline"}
                marginTop={5}
              >
                Let's Owl <RiArrowRightLine />
              </Button>

              <Flex justifyContent={'space-around'} marginTop={5}>
                <SocialMediaIcon
                  link={""}
                  type={"telegram"}
                  // colorVariant="light"
                />
                <SocialMediaIcon link={""} type={"x"} 
                // colorVariant="light" 
                />
                <SocialMediaIcon
                  link={""}
                  type={"medium"}
                  // colorVariant="light"
                />
              </Flex>
          </Flex>
          <div className={styles.FooterContent}>
            <Flex flexDirection={'column'}>
              <h2 style={{ opacity: 0.7, fontWeight: 'bold', fontSize: '18px' }}>Company</h2>
              <ul className={styles.FooterLinks}>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#features">Presale</a>
                </li>
                <li>
                  <a href="#about">Privacy Policy</a>
                </li>
              </ul>
            </Flex>
            {/* <div className={styles.FooterContent}>
            <Flex flexDirection={"column"} alignItems={"center"} justifyContent={'flex-start'} height={"100%"}>
            <h2 style={{ opacity: 0.7, fontWeight: 'bold', fontSize: '18px' }}>Follow us</h2>
              <Flex>
                <SocialMediaIcon
                  link={""}
                  type={"telegram"}
                  colorVariant="light"
                />
                <SocialMediaIcon link={""} type={"x"} colorVariant="light" />
                <SocialMediaIcon
                  link={""}
                  type={"medium"}
                  colorVariant="light"
                />
              </Flex>
            </Flex>
            </div> */}
          </div>
          
        </Flex>
        <div style={{width: '100%'}}>
            <Flex justifyContent={'space-between'} >
              <p>All rights reserved Owlers 2025 &copy;</p>
            </Flex>
            </div>
      </footer>
    </>
  );
};

export default PreSalePage;
