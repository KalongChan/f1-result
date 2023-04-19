import {Fragment} from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = ({children}) => {
  return (
    <Fragment>
      <Navbar />
      <div className="home__container">{children}</div>
      <Footer />
    </Fragment>
  );
};
export default Layout;
