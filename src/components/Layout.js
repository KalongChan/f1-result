import {Fragment} from "react";
import Navbar from "./Navbar";

const Layout = ({children}) => {
  return (
    <Fragment>
      <Navbar />
      <div className="home__container">{children}</div>
    </Fragment>
  );
};
export default Layout;
