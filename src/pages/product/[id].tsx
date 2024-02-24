import { useRouter } from "next/router";
import {
  ProductContainer,
  ImgContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { GetStaticProps } from "next";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
import Image from "next/future/image";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  };
}

export default function Home({ product }: ProductProps) {
  return (
    <ProductContainer>
      <ImgContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImgContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button>Compre Agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images,
        price: new Intl.NumberFormat("ptt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
      },
    },
    revalidate: 60 * 60 * 1,
  };
};
