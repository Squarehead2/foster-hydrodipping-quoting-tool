import objectAddition from "../../../pages/Calculator/Mathematics/objectAddition";
import ObjectAddition from "../../../pages/Calculator/Mathematics/objectAddition";
import object from "../../../pages/Calculator/Objects/object";
import { use, useState } from "react";
import { useEffect } from "react";

export default {
  component: ObjectAddition,
};

const Template = (args) => {
  const [objects, setObjects] = useState([
    object("Rectangle", 100),
    object("Circle", 100),
  ]);

  useEffect(() => {
    setObjects((prevObjects) => [
      ...prevObjects,
      object("Triangle", 100),
      object("Square", 100),
    ]);
  }, []);

  const [objectSum, setObjectSum] = useState(0);

  useEffect(() => {
    setObjectSum(objectAddition(objects));
  }, [objects]);

  return (
    <>
      <h1>Object Addition</h1>
      <p>Objects: {JSON.stringify(objects)}</p>
      <br />
      objectSum: {objectSum}
    </>
  );
};

export const Primary = Template.bind({});
