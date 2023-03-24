import "/node_modules/flag-icons/css/flag-icons.min.css";
var iso = require("iso-3166-1-alpha-2");

const test = () => {
  const countryName = "UK";
  const isoCode = iso.getCode(countryName);
  console.log(isoCode); // Output: 'US'

  return (
    <>
      <span className={`fi fi-${isoCode.toLowerCase()}`}></span>

      <br />
    </>
  );
};
export default test;
