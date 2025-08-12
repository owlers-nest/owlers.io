import Slider from "react-slick";
import { useSelector } from "react-redux";
import { getIsMediumTableAndSmallLaptop, getIsSmallMobile, getIsTabletAndLargeMobile } from "../../store/selectors/ui";
import NextArrow from "./next-arrow";
import PrevArrow from "./prev-arrow";

interface Props {
    children: string | JSX.Element | JSX.Element[];
}

const settings = {
    initialSlide: 0,
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
};
  

const SliderComponent = ({ children }: Props) => {
    const isSmallMobile = useSelector(getIsSmallMobile);
    const isTabletAndLargeMobile = useSelector(getIsTabletAndLargeMobile);
    const isMediumTableAndSmallLaptop = useSelector(getIsMediumTableAndSmallLaptop);
    const getSlideToShow = () => {
        if (isSmallMobile || isTabletAndLargeMobile) {
            return 1;
        } else if (isMediumTableAndSmallLaptop) {
            return 2;
        }
        return 4;
    }
    settings.slidesToShow = getSlideToShow();
    return(
        <Slider {...settings}>
            { children }
        </Slider>
    );
};

export default SliderComponent;