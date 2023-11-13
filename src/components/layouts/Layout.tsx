import { ReactPropsChildren } from "../../common/types";
import Main from "../molecules/Main";
import Navbar from "../molecules/Navbar";
import PropertiesContainer from "../molecules/PropertiesContainer";
import ShapesContainer from "../molecules/ShapesContainer";

export default function Layout({ children }: ReactPropsChildren) {
  return (
    <section className="w-all h-all bg-secondary">
      <Navbar />

      <section className="h-base w-full flex flex-row justify-between">
        <ShapesContainer />

        <Main>{children}</Main>

        <PropertiesContainer />
      </section>
    </section>
  );
}
