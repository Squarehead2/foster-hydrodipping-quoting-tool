import React, { useState } from "react";
import rectangle from "../../../pages/Calculator/Mathematics/Shapes/rectangle";
import { useEffect } from "react";

export default {};

const Template = (args) => {
  return (
    <>
      {rectangle(5, 3, 4)} <br /> {rectangle(0.5, 0.25, 2)} <br />{" "}
      {rectangle(-5, -4, -3)} <br /> {rectangle(0.4, -0.3, 0.2)} <br />
    </>
  );
};

export const Primary = Template.bind({});
