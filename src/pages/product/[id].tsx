import { useRouter } from "next/router";
import {
  ProductContainer,
  ImgContainer,
  ProductDetails,
} from "../../styles/pages/product";

export default function Home() {
  const { query } = useRouter();

  return (
    <ProductContainer>
      <ImgContainer></ImgContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>78,99</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit veniam
          natus illo. Quidem quod reiciendis quae id quisquam dolorem
          consectetur odit itaque, quo excepturi est enim animi officia
          voluptates. Cupiditate.
        </p>
        <button>Compre Agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}
