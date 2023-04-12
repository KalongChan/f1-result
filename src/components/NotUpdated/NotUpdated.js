import {useRouter} from "next/router";

const NotUpdated = () => {
  const router = useRouter();

  const returnHandler = () => {
    router.push("/");
  };

  return (
    <div className="race">
      <div className="race__not-updated">
        <div className="race__not-updated-text">
          Race result has not been released yet or does not exist
        </div>
        <div className="race__not-updated-text"> Please try again later</div>
        <div
          className="race__not-updated-button"
          onClick={() => returnHandler()}
        >
          Return to homepage
        </div>
      </div>
    </div>
  );
};
export default NotUpdated;
