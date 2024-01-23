import { AppProps } from "next/app"
import { globalStyle } from "../styles/global"
import logoImg from '../assets/logo.svg'
import { Container, Header } from "../styles/pages/app"
import Image from "next/future/image"

globalStyle()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} width={400} alt="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  
)}

