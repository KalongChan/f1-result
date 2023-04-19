import {useRouter} from "next/router";
import {useEffect} from "react";

const Standings = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("standings/driver");
  }, []);
};

export default Standings;
