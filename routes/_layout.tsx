import { PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export default function Layout({ Component }: PageProps) {
  // do something with state here
  return (
    <div class="Layout">
      <Header />
      <div class="Content">
      <Component />
      </div>
        <Footer />
    </div>
  );
}