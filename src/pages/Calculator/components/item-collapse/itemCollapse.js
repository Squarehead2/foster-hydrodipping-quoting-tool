import React from "react";
import ItemStat from "./itemStat";
import { useState, useEffect } from "react";
import getAllPatternPrices from "./_utils/getAllPatternPrices";
export default function ItemCollapse({
  items,

  handleDeleteItem,
}) {
  const [rate, setRate] = useState(15);
  const [patternList, setPatternList] = useState([]);

  useEffect(() => {
    setPatternList(getAllPatternPrices());
  }, []);
  //handle rate change
  const handleRateChange = (e) => {
    setRate(e.target.value);
  };

  return items.map((item, index) => (
    <div className="flex flex-col py-2 bg-white">
      <div className="card shadow-xl w-full bg-primary-50" key={index}>
        <div className="card-body w-full bg-primary-50">
          <h1 className="card-title">{item.name}</h1>
          <h2 className="card-title"></h2>
          <div className="flex flex-col bg-primary-50">
            <h1 className="font-bold text-black">Description</h1>
            <div className="flex flex-row h-full w-full bg-gray rounded-xl flex-wrap overflow-auto ">
              <p className="p-1 text-sm whitespace-normal text-black">
                {item.description}
              </p>
            </div>
          </div>
          <ItemStat item={item} rate={rate} />
          <label className="form-control w-full max-w-xs">Rate</label>
          {patternList.length}
          <select
            className="select select-bordered select-xs w-full"
            onChange={handleRateChange}
            value={rate}
          ></select>
          <div className="card-actions justify-end bg-primary-50">
            <button
              className="btn btn-primary"
              onClick={() => handleDeleteItem(index)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  ));
}
