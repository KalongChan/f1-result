import useDisplayMode from "@/utils/useDisplayMode";
import {useRouter} from "next/router";
import {Fragment, useEffect, useState} from "react";

const Navbar = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const mode = useDisplayMode();

  const [openMenu, setOpenMenu] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);

  const menuHandler = () => {
    setOpenMenu(!openMenu);
  };

  // useEffect(() => {
  //   setIsLoaded(true);
  // }, []);

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
          <div className="navbar__title" onClick={() => router.push("/")}>
            F1 Result App
          </div>
          <div className="navbar__list">
            <ul>
              <li
                className={`navbar__list-item${
                  currentPath === "/" || currentPath.includes("results")
                    ? "--active"
                    : ""
                }`}
                onClick={() => router.push("/")}
              >
                Race Result
              </li>
              <li
                className={`navbar__list-item${
                  currentPath === "/standings" ? "--active" : ""
                }`}
                onClick={() => router.push("/standings")}
              >
                Driver / Constructor Standing
              </li>
            </ul>
          </div>
        </Fragment>
      )}

      {/* Mobile Nav */}
      {mode === "mobile" && (
        <div className="navbar-mobile">
          <div className="navbar__title" onClick={() => router.push("/")}>
            F1 Result App
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
                  router.push("/");
                  menuHandler();
                }}
              >
                Race Result
              </li>
              <li
                className={`navbar-mobile__slide-menu-item${
                  currentPath === "/standings" ? "--active" : ""
                }`}
                onClick={() => {
                  router.push("/standings");
                  menuHandler();
                }}
              >
                Driver / Constructor Standing
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
