import React, { useState } from "react";

import { useEffect } from "react";

export default {};

const Template = (args) => {
  return (
    <>
      <input
        type="email"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs text-white"
      />
      <input
        type="password"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs text-white"
      />
    </>
  );
};

export const Primary = Template.bind({});
