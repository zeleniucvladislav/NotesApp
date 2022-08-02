import { Navbar, ScrollOnTop } from "shared";

const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <div className="pages-layout">{children}</div>
      <ScrollOnTop />
    </>
  );
};

export default Layout;
