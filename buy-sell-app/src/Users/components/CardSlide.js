import Carousel from "react-bootstrap/Carousel";
import bikes from "../Images/bikes.png"
import cars from "../Images/cars.png"
import mobiles from "../Images/mobiles.png"
export default function CardSlide() {
  return (
    <Carousel style={{marginBottom:"30px"}} data-bs-theme="dark">

      <Carousel.Item interval={1000}>
        <img src={cars} style={{width:"100%", height:"350px"}} alt="car"></img>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={1000}>
      <img src={bikes} style={{width:"100%" , height:"350px"}} alt="car"></img>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={1000}>
      <img src={mobiles} style={{width:"100%", height:"350px"}} alt="car"></img>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}
