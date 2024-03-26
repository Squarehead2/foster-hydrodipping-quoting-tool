import React from "react";
import { useEffect } from "react";

const item = (name, area, description, price, rate, pattern, patternUrl) => {
  price = ((area / 100) * rate).toFixed(2);
  return { name, area, description, price, rate, pattern, patternUrl };
};

export default item;
