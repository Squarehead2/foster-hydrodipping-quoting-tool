import React, { useState } from "react";
import pyramid from "../../../pages/Calculator/Mathematics/Shapes/pyramid";
import { useEffect } from "react";

export default {};

const Template = (args) => {
  return (
    <>
      {pyramid(2, 5, 3)} <br /> {pyramid(0.3, 0.25, 0.5)} <br />{" "}
      {pyramid(-5, -2, -3)} <br /> {pyramid(-0.3, -0.25, -0.5)} <br />
    </>
  );
};

export const Primary = Template.bind({});
