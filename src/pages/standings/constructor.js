import ConstructorStanding from "@/components/Standings/ConstructorStanding/ConstructorStanding";
import DriverConstructorSelector from "@/components/ui/DriverConstructorSelector";

const constructor = () => {
  return (
    <div className="standing">
      <DriverConstructorSelector />
      <div className="standing__table">
        <ConstructorStanding />
      </div>
    </div>
  );
};

export default constructor;
