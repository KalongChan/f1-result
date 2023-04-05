import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const Navbar = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const [openMenu, setOpenMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const menuHandler = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  //Disable scroll if menu is opened
  openMenu
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <nav className="navbar">
      {/* Desktop Nav */}
      <div className="navbar__title">F1 Result App</div>
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

      {/* Mobile Nav */}
      <div className="navbar-mobile">
        <div className={`hamburger-container`} onClick={menuHandler}>
          <div
            className={`navbar-mobile__hamburger${openMenu ? "--active" : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`navbar-mobile__slide-menu${openMenu ? "--open" : ""}`}>
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
    </nav>
  );
};
export default Navbar;
