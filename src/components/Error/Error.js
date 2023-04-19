import {useRouter} from "next/router";
import {BiRefresh} from "react-icons/bi";

const Error = () => {
  const router = useRouter();
  const refreshHandler = () => {
    router.reload(window.location.pathname);
  };

  return (
    <div
      className={`error${
        router.pathname.includes("standings") ? "-standing" : ""
      }`}
    >
      <div className="error__text">Failed to load data</div>
      <div className="error__text">Please try again</div>
      <div className="error__icon" onClick={refreshHandler}>
        <BiRefresh />
      </div>
    </div>
  );
};

export default Error;
