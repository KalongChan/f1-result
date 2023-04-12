import {TailSpin} from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div
      className="loading"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <TailSpin
        height="50"
        width="50"
        color="#fed766"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
