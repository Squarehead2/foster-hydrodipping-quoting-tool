import React, { useState } from "react";
import PriceRate from "../../pages/Calculator/Mathematics/PriceRate";
import rectangle from "../../pages/Calculator/Mathematics/Shapes/rectangle";
import cylinder from "../../pages/Calculator/Mathematics/Shapes/cylinder";
import objectAddition from "../../pages/Calculator/Mathematics/objectAddition";
import { useEffect } from "react";
import object from "../../pages/Calculator/Objects/object";

export default {
  title: "PriceRate",
  component: PriceRate,
};

const Template = (args) => {
  const [objects, setObjects] = useState([
    object("Rectangle", rectangle(5, 3, 2)),
    object("Cylinder", cylinder(4, 3)),
  ]);

  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(objectAddition(objects), 15);
  }, [objects]);

  return <>{price}</>;
};

export const Primary = Template.bind({});
