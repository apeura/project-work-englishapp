//Layout to tie content together, navbar

import { Outlet } from "react-router-dom";
import Navbar from "./Nav";

const Layout = () => {
  return (
    <>
      {" "}
      <Navbar /> <Outlet />{" "}
    </>
  );
};
export default Layout;

//The <Outlet/> element spits out the component routed to in step 5.
