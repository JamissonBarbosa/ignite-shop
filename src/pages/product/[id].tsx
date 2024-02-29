import {
  ProductContainer,
  ImgContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
import Image from "next/future/image";

import axios from "axios";
import { useState } from "react";
import Head from "next/head";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Home({ product }: ProductProps) {
  const [isCreateCheckoutSession, setIsCreateCheckoutSession] = useState(false);
  async function handleByProduct() {
    try {
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });

      const { checkoutURL } = response.data;
      setIsCreateCheckoutSession(true);
      window.location.href = checkoutURL;
    } catch (err) {
      setIsCreateCheckoutSession(false);
      alert("Falha ao redirecionamento ao checkout");
    }
  }
  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImgContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImgContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button disabled={isCreateCheckoutSession} onClick={handleByProduct}>
            Compre Agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_PQJYwYyX6tg3ZK" } }],
    fallback: "blocking",
  };
};

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
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1,
  };
};
