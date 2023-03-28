import {useState} from "react";

const TabSelector = ({selectorData, modeHandler}) => {
  const [activeSelection, setActiveSelection] = useState(selectorData[0]);
  return (
    <div className="selector">
      {selectorData.map((data) => (
        <div
          className={`selector__selection${
            data === activeSelection ? "--active" : ""
          }`}
          key={data}
          onClick={() => {
            modeHandler(data);
            setActiveSelection(data);
          }}
        >
          {data}
        </div>
      ))}
    </div>
  );
};
export default TabSelector;
