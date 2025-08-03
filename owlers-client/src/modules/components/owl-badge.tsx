import { Badge, SkeletonText } from '@chakra-ui/react';
import Legit from "../../assets/legit.svg";
import Scam from "../../assets/scam.svg";
import NotSpecified from "../../assets/not-specified.svg";

export type Owl = 'Scam' | 'Legit' | 'NotSpecified' | 'Skeleton';

const BadgeStyle = {
    height: "25px",
    width: "auto", 
    fontWeight: "bold",
    borderRadius: "24px",
    padding: "3px 9px",
    fontSize: "14px"
};

const OwlBadge = ({ owl }: { owl: Owl }) => {
    switch (owl) {
        case "Legit": {
            return <Badge style={BadgeStyle} variant="solid" bg="green" justifyContent={"space-between"}>
                <img width="15" height="15" src={Legit} /> Legit
            </Badge>
        }
        case "Scam": {
            return <Badge style={BadgeStyle} variant="solid" bg="danger3" justifyContent={"space-between"}>
                <img width="15" height="15" src={Scam} /> Scam
            </Badge>
        }
        case "NotSpecified": {
            return <Badge style={BadgeStyle} variant="solid" bg="blue" justifyContent={"space-between"}>
                <img width="15" height="15" src={NotSpecified} /> Not Specified
            </Badge>
        }
        case 'Skeleton': {
            return <Badge style={BadgeStyle} justifyContent={"space-between"}>
                <SkeletonText noOfLines={1} width={"80px"} />
            </Badge>
        }
    }
}

export default OwlBadge;
