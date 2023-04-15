import useDisplayMode from "@/hooks/useDisplayMode";
import Link from "next/link";
import {useRouter} from "next/router";
import {Fragment, useState} from "react";

const Navbar = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const mode = useDisplayMode();

  const [openMenu, setOpenMenu] = useState(false);

  const menuHandler = () => {
    setOpenMenu(!openMenu);
  };

  //Disable scroll if menu is opened
  if (typeof window !== "undefined") {
    openMenu
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "scroll");
  }

  return (
    <nav className="navbar">
      {/* Desktop Nav */}
      {mode === "desktop" && (
        <Fragment>
          <div className="navbar__title">
            <Link href={"/"}>F1 Result App</Link>
          </div>
          <div className="navbar__list">
            <ul>
              <li
                className={`navbar__list-item${
                  currentPath === "/" || currentPath.includes("results")
                    ? "--active"
                    : ""
                }`}
              >
                <Link href={"/"}>Race Result</Link>
              </li>
              <li
                className={`navbar__list-item${
                  currentPath === "/standings" ? "--active" : ""
                }`}
              >
                <Link href={"/standings"}>Driver / Constructor Standing</Link>
              </li>
            </ul>
          </div>
        </Fragment>
      )}

      {/* Mobile Nav */}
      {mode === "mobile" && (
        <div className="navbar-mobile">
          <div className="navbar__title">
            <Link href={"/"}>F1 Result App</Link>
          </div>
          <div className={`hamburger-container`} onClick={menuHandler}>
            <div
              className={`navbar-mobile__hamburger${
                openMenu ? "--active" : ""
              }`}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div
            className={`navbar-mobile__slide-menu${openMenu ? "--open" : ""}`}
          >
            <ul className="navbar-mobile__slide-menu-list">
              <li
                className={`navbar-mobile__slide-menu-item${
                  currentPath === "/" || currentPath.includes("results")
                    ? "--active"
                    : ""
                }`}
                onClick={() => {
                  menuHandler();
                }}
              >
                <Link href={"/"}> Race Result</Link>
              </li>
              <li
                className={`navbar-mobile__slide-menu-item${
                  currentPath === "/standings" ? "--active" : ""
                }`}
                onClick={() => {
                  menuHandler();
                }}
              >
                <Link href={"/standings"}>Driver / Constructor Standing</Link>
              </li>
            </ul>
          </div>
          <div
            className={`navbar-mobile__overlay${openMenu ? "--open" : ""}`}
            onClick={menuHandler}
          ></div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
