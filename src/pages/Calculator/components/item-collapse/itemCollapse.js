import React from "react";
import ItemStat from "./itemStat";
export default function itemCollapse({
  items,
  rate,
  handleRateChange,
  handleDeleteItem,
}) {
  return items.map((item, index) => (
    <div className="flex flex-col py-2 bg-white">
      <div className="card shadow-xl w-full bg-primary-50" key={index}>
        <div className="card-body w-full bg-primary-50">
          <h1 className="card-title">{item.name}</h1>
          <h2 className="card-title"></h2>
          <div className="flex flex-col bg-primary-50">
            <h1 className="font-bold">Description</h1>
            <div className="flex flex-row h-full w-full bg-gray rounded-xl flex-wrap overflow-auto ">
              <p className="p-1 pl-3 whitespace-normal">{item.description}</p>
            </div>
          </div>
          <ItemStat item={item} rate={rate} />
          <label className="form-control w-full max-w-xs">Rate</label>
          <select
            className="select select-bordered select-xs w-full"
            onChange={(e) => handleRateChange(e, index)}
            value={item.rate}
          >
            <option value="15">Generic Rate 1</option>
            <option value="20">Generic Rate 2</option>
          </select>
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
