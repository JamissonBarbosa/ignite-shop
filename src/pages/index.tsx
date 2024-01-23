import Image from "next/future/image";
import { HomeContainer, Product } from "../styles/pages/home";

import { useKeenSlider } from "keen-slider/react";

//import camisa from '../assets/logo.svg'
import camisa from "../assets/camisa-explorer.jpeg";

import "keen-slider/keen-slider.min.css";
import { GetServerSideProps } from "next";
import stripe from "stripe";

export default function Home(props) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <p>{JSON.stringify(props.list)}</p>
      <Product className="keen-slider__slide">
        <Image src={camisa} width={520} height={480} alt="" />
        <footer>
          <strong>Camisa X</strong>
          <span>R$ 79,99</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camisa} width={520} height={480} alt="" />
        <footer>
          <strong>Camisa Y</strong>
          <span>R$ 89,99</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camisa} width={520} height={480} alt="" />
        <footer>
          <strong>Camisa Z</strong>
          <span>R$ 99,99</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camisa} width={520} height={480} alt="" />
        <footer>
          <strong>Camisa W</strong>
          <span>R$ 99,99</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list();
  return {
    props: {
      list: [1, 2, 3],
    },
  };
};
