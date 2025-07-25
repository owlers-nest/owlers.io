import { useAccount } from "wagmi";

import NotConnected from "../components/not-connected";
import MySettings from "../components/my-settings";

const SettingsPage = () => {
    const { isConnected } = useAccount();
    if (isConnected) {
        return <MySettings />;
    }
    return <NotConnected />;
};

export default SettingsPage;