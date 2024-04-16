import React, { useState } from "react";
import sphere from "../../../pages/Calculator/Mathematics/Shapes/sphere";
import { useEffect } from "react";

export default {};

const Template = (args) => {
  return (
    <>
      {sphere(2, 0)} <br /> {sphere(0.3, 0)} <br /> {sphere(-5, 0)} <br />{" "}
      {sphere(-0.3, 0)} <br />
    </>
  );
};

export const Primary = Template.bind({});
