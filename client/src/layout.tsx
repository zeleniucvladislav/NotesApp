import { Navbar, ScrollOnTop } from "shared";

export const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <div className="pages-layout">{children}</div>
      <ScrollOnTop />
    </>
  );
};
