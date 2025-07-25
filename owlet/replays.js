
const { OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT } = require("./constants");
const replays = {
    /** OWLET */
    WHAT_IS_OWLET: `
Welcome to <b><strong>Owlet</strong></b> 🦉✨

Owlet is your trusted AI assistant, empowering investors in ICOs & IPOs. Whether you're new to the world of crypto investments or an experienced investor, Owlet is here to help you discover, evaluate, and verify the legitimacy of projects before you commit.
    `,
    HOW_OWLET_IS_WORKING: `
        Owlet is using its own model to gather all the necessary information for specific ICOs and IPOs, then it will validate the data and conduct the first community owl.
    `,
    WHAT_ARE_OWLET_MAIN_FEATURE: `
        1. Collect all essential information about the project.
2. Validate all aspects, starting with basic details, project POC, shares, token distribution, and the project roadmap.
3. Conduct the first project owl to determine whether the project is legitimate or a scam.
4. Make predictions about the project's future performance.
    `,

    OWLET_TOKEN: `
Owlet Token (OWL)
The Owlet Token (OWL) is the cornerstone of the Owlers ecosystem, designed to empower and secure the community while driving decentralized decision-making and enhancing the platform’s functionality.

🔐 Community Governance
Owlet Token plays a pivotal role in the governance of the Owlet platform. Token holders are granted the ability to vote on key decisions and shape the future direction of the platform. By holding OWL, you actively contribute to the democratic process, ensuring that the Owlers community remains at the center of the platform's development.

💸 Main Payment for Owlet AI Assistance
OWL is the primary currency used to unlock premium features of the Owlet AI assistant. Whether you're accessing personalized advice, advanced analytics, or exclusive insights on ICOs and IPOs, Owlet Tokens are required to tap into these powerful tools. This makes OWL the go-to payment method for investors looking to enhance their strategies and make more informed decisions.

By holding and using Owlet Token, you're not only supporting a secure and transparent investment ecosystem but also taking an active role in shaping the platform that serves you. 🌍💡
    `,

    OWLERS_PRIVACY_AND_POLICY: {
        MAIN: `
<b>Owlers Community Privacy Policy</b>

At Owlers, we value the privacy and security of our community members. This Privacy Policy outlines how we collect, use, and protect your data while ensuring that your identity and financial information remain secure within our decentralized platform.

At Owlers, we are dedicated to providing a secure, anonymous, and decentralized platform for community members to collaborate, invest, and govern. By using your wallet address as your profile, we ensure your personal information remains private while you enjoy all the benefits of the Owlers ecosystem.

This Privacy Policy focuses on the security and privacy of the community while maintaining the core values of decentralization and anonymity. It reassures users that their personal details are not required and that the platform operates with minimal data collection.

    `,
        [OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_INTRO]: `
        <b><strong>Introduction</strong></b>
Owlers is committed to safeguarding your privacy. Our platform allows members to interact, collaborate, and invest in ICOs & IPOs while maintaining full control over their personal information. <b>Owlers does not require personal identification</b> to participate in the community. Instead, <b>you can use your own wallet address as your profile</b>, ensuring anonymity and security.
By using the Owlers platform, you agree to the practices outlined in this Privacy Policy.
    `,
        [OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_INFO]: `
        <b><strong>Information we do not collect</strong></b>
Owlers is designed to provide a decentralized, anonymous experience. We <b>do not</b> collect or store personal information such as:

Full names
Email addresses (unless provided voluntarily for notifications)
Physical addresses
Government-issued identification numbers
Bank account or credit card details
Your <b>wallet address</b> is the only piece of identifiable information that we use to identify you within the Owlers community. This address is linked to your profile for participation and governance within the platform.
    `,
    [OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_USE_OF_WALLET]: `
    <b><strong>Usage of wallet address</strong></b>
Your wallet address serves as your <b>unique, decentralized profile</b> within the Owlers community. This address is used to:

Participate in community governance (voting on platform decisions)
Securely make payments or access premium Owlet AI services
Interact with other community members in a fully anonymous way
<b>Note:</b> Your wallet address does not expose any personal information unless you choose to share additional details.
    `,
    [OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_DATA]: `
    <b><strong>Data storage and security</strong></b>
We prioritize the security of your data. All interactions with the Owlers platform are conducted through secure channels. Your wallet address is stored on the blockchain and is not vulnerable to traditional data breaches.

Owlers does not have access to your wallet, private keys, or transaction history. Your financial information and personal transactions remain <b>private and decentralized</b>.
    `,
    [OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_GOVERNANCE]: `
    <b><strong>Community governance</strong></b>
As a member of the Owlers community, your participation is essential to the governance of the platform. Voting rights, decision-making, and participation in key platform developments are granted based on the <b>Owlet Token</b> holdings associated with your wallet address.

Your wallet address may be used to:

Vote on community proposals
Participate in discussions regarding the development and future of the platform
However, the platform <b>does not</b> track your real-world identity or require you to reveal any personal information to participate in governance
    `,
    [OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_THIRD_PARTY]: `
    <b><strong>Third-Party services</strong></b>
Owlers may use third-party services to facilitate certain features (e.g., blockchain explorers or AI tools). These third-party services are used only to enhance your experience and may collect certain data on their own. Please review the privacy policies of these services to understand how they handle your data.

Owlers is <b>not responsible</b> for the data collection or practices of these third-party services.
    `,
    [OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_COOKIES]: `
    <b><strong>Cookies and tracking technologies</strong></b>
We may use cookies or similar tracking technologies to improve your experience on our platform. These cookies are primarily used for:

Ensuring functionality (e.g., remembering your language preference)
Analytics (understanding how the platform is used for improvement)
These cookies do not track personal information or identify you in the real world. You may disable cookies through your browser settings, but this may affect the functionality of certain features.
    `,
    [OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_RIGHTS_AND_CONTROL]: `
    <b><strong>Your rights and control</strong></b>
As a community member, you retain full control over your data. Here’s what you can do:

<b>Access:</b> You can access your wallet address and related activities at any time through your Owlers account.
<b>Data Removal:</b> You may choose to stop using the platform at any time, and your wallet address will be removed from the community's governance records.
<b>Anonymity:</b> You can remain fully anonymous as no personal data is required or collected to use Owlers. You have the option to participate in all community functions without revealing any identifying information beyond your wallet address.
    `,
    [OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_CHANGES]: `
    <b><strong>Changes to this policy</strong></b>
We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify the Owlers community of significant changes by posting the updated policy on the platform. Continued use of the platform after such changes will indicate your acceptance of the updated terms.
    `,
    [OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_CONTACT_US]: `
    <b><strong>Contact us</strong></b>
    If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at:
<b>Email:</b> [contact@owlers.io]
<b>Website:</b> www.owlers.io
    `
    },

    /** OWLERs */
    WHAT_IS_OWLERS: `
        <b>Owlers</b> is a community of investors in ICOs & IPOs | Uniting small & medium investors with legit projects | Helping you spot scams and invest smartly 🦉 | Add your project, get verified!
    `,

    SHOW_OWLERS_PLATFORM: `check out <a href="http://owlers.io">owlers platform</a> to learn more.`,
    SHOW_OWLERS_SOCIAL_LINKS: `
    <b>check out owlers social media links</b>
    <a href="https://x.com/Owlersnest"><tg-emoji emoji-id="5368324170671202286">𝕏</tg-emoji></a>`

}

module.exports = replays;