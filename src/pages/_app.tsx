import { AppProps } from "next/app"
import { globalStyle } from "../styles/global"

globalStyle()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  
})

