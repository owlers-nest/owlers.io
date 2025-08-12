import { Badge, SkeletonText } from '@chakra-ui/react';
import Legit from "../../../assets/legit.svg";
import Scam from "../../../assets/scam.svg";
import NotSpecified from "../../../assets/not-specified.svg";
import styles from "./owl-badge.module.scss";

export type Owl = 'Scam' | 'Legit' | 'NotSpecified' | 'Skeleton';


const OwlBadge = ({ owl }: { owl: Owl }) => {
    switch (owl) {
        case "Legit": {
            return <Badge variant="solid" bg="green" justifyContent={"space-between"} className={styles.badge}>
                <img width="15" height="15" src={Legit} /> Legit
            </Badge>
        }
        case "Scam": {
            return <Badge  variant="solid" bg="danger3" justifyContent={"space-between"} className={styles.badge}>
                <img width="15" height="15" src={Scam} /> Scam
            </Badge>
        }
        case "NotSpecified": {
            return <Badge  variant="solid" bg="blue" justifyContent={"space-between"} className={styles.badge}>
                <img src={NotSpecified} className={styles.icon} /> Not Specified
            </Badge>
        }
        case 'Skeleton': {
            return <Badge  justifyContent={"space-between"} className={styles.badge}>
                <SkeletonText noOfLines={1} width={"80px"} />
            </Badge>
        }
    }
}

export default OwlBadge;
