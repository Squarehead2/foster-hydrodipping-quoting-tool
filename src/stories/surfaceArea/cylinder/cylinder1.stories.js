import React, { useState } from "react";
import cylinder from "../../../pages/Calculator/Mathematics/Shapes/cylinder";
import { useEffect } from "react";

export default {};

const Template = (args) => {
  return (
    <>
      {cylinder(2, 5)} <br /> {cylinder(0.3, 0.25)} <br /> {cylinder(-5, -2)}{" "}
      <br /> {cylinder(-0.3, -0.25)} <br />
    </>
  );
};

export const Primary = Template.bind({});
