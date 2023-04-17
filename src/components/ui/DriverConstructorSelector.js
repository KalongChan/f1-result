import Link from "next/link";
import {useRouter} from "next/router";

const DriverConstructorSelector = () => {
  const router = useRouter();
  return (
    <div className="standing__mode">
      <div
        className={`standing__mode-button${
          router.pathname.includes("driver") ? "--active" : ""
        }`}
      >
        <Link href={"/standings/driver"}>Driver</Link>
      </div>
      <div
        className={`standing__mode-button${
          router.pathname.includes("constructor") ? "--active" : ""
        }`}
      >
        <Link href="/standings/constructor">Constructor</Link>
      </div>
    </div>
  );
};

export default DriverConstructorSelector;
