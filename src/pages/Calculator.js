import Cylinder from "./cylinder";
import Rectangle from "./rectangle";

export const Calculator = () => {
  return (
    <div>
      <p>{Cylinder(1, 2)}</p>
      <br></br>
      <p>{Rectangle(1, 2, 3)}</p>
    </div>
  );
};
