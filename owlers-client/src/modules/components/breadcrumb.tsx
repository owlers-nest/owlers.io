import { useNavigate } from "react-router-dom";
import { BreadcrumbCurrentLink, BreadcrumbRoot, BreadcrumbLink } from "../../components/ui/breadcrumb"


interface Link {
    href: string;
    isCurrent: boolean,
    title: string;
}

interface Props {
    links: Link[];
}

const BreadCrumbLinks = ({ links }: Props) => {
    const navigate = useNavigate();
    return (
        <BreadcrumbRoot>
            {links.map(link => (
                link.isCurrent ?
                    (<BreadcrumbCurrentLink>{link.title}</BreadcrumbCurrentLink>)
                    : (<BreadcrumbLink style={{ cursor: "pointer" }} onClick={() => navigate(link.href)}>{link.title}</BreadcrumbLink>)
            ))}

        </BreadcrumbRoot>
    );
}

export default BreadCrumbLinks;