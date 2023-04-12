import {useEffect, useState} from "react";

const useDisplayMode = () => {
  //Desktop && Mobile mode checker
  const [displayMode, setDisplayMode] = useState("");
  const handleWindowResize = () => {
    if (window.innerWidth > 1280) {
      setDisplayMode("desktop");
    } else {
      setDisplayMode("mobile");
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      handleWindowResize();
      window.addEventListener("resize", handleWindowResize);
    }
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return displayMode;
};

export default useDisplayMode;
