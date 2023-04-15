import Link from "next/link";

const NotUpdated = () => {
  return (
    <div className="race">
      <div className="race__not-updated">
        <div className="race__not-updated-text">
          Race result has not been released yet or does not exist
        </div>
        <div className="race__not-updated-text"> Please try again later</div>
        <div className="race__not-updated-button">
          <Link href={"/"}>Return to homepage</Link>
        </div>
      </div>
    </div>
  );
};
export default NotUpdated;
