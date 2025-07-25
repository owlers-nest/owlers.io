import Slider from "react-slick";
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
    return(
        <Slider {...settings}>
            { children }
        </Slider>
    );
};

export default SliderComponent;