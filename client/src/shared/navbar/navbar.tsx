import { useViewport } from "utils/hooks/useViewport";
import { NavDesktop, NavMobile } from "./components";

const Navbar = () => {
  const { width } = useViewport();

  const breakpoint = 550;
  const isDesktop = width > breakpoint;

  return isDesktop ? <NavDesktop /> : <NavMobile />;
};

export default Navbar;
