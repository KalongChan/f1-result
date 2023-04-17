import {useRouter} from "next/router";
import {useEffect} from "react";

const standings = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("standings/driver");
  }, []);
};

export default standings;
