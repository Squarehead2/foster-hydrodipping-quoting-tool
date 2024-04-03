import React, { useState } from "react";
import cone from "../../../pages/Calculator/Mathematics/Shapes/cone";
import { useEffect } from "react";

export default {};

const Template = (args) => {
  return (
    <>
      {cone(2, 5)} <br /> {cone(0.3, 0.25)} <br /> {cone(-5, -2)} <br />{" "}
      {cone(-0.3, -0.25)} <br />
    </>
  );
};

export const Primary = Template.bind({});
