"use client";

import Cylinder from "./cylinder";
import Rectangle from "./rectangle";
import React from "react";
import object from "./object";
import { useEffect } from "react";
import { useState } from "react";
import item from "./item";
import objectAddition from "./objectAddition";

//create a usesate hook to store the objects

export const Calculator = () => {
  const [shape, setShape] = useState("cylinder");
  const [radius, setRadius] = useState(0);
  const [height, setHeight] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [depth, setDepth] = useState(0);
  const [objects, setObjects] = useState([]);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [rate, setRate] = useState(15);

  const handleRateChange = (e, index) => {
    const newItems = [...items];
    newItems[index].rate = parseInt(e.target.value);
    setItems(newItems);
  };
  const handleShapeChange = (e) => {
    setShape(e.target.value);
  };

  const handleConfirmItem = () => {
    let newItems = [...items];
    newItems.push(
      item(
        name,
        objectAddition(objects),
        description,
        objectAddition(objects) * rate,
        // Set the default rate to 15 for each new item
        rate
      )
    );
    setItems(newItems);
  };

  const handleAdd = () => {
    let newObjects = [...objects];
    if (shape === "cylinder") {
      newObjects.push(object("Cylinder", Cylinder(radius, height)));
    } else {
      newObjects.push(object("Rectangle", Rectangle(length, width, depth)));
    }
    setObjects(newObjects);
  };

  return (
    <div>
      {/* create a drop down that gives you the option to add a cylinder or a rectangle */}
      <select onChange={handleShapeChange} value={shape}>
        <option value="cylinder">Cylinder</option>
        <option value="rectangle">Rectangle</option>
      </select>
      {/* if the shape is a cylinder, display the radius and height inputs */}

      {shape === "cylinder" && (
        <div>
          <label>Radius</label>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />
          <label>Height</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      )}
      {/* if the shape is a rectangle, display the length, width, and depth inputs */}
      {shape === "rectangle" && (
        <div>
          <label>Length</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Width</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <label>Depth</label>
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
          />
        </div>
      )}
      {/* create a button that adds the shape to the list of objects */}
      <button onClick={handleAdd}>Add</button>
      {/* display the list of objects */}
      <ul>
        {objects.map((object) => (
          <li>
            {object.name}: {object.area}
          </li>
        ))}
      </ul>
      {/* create a form for adding a description and name to the item */}
      <form>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
      {/* create a button that adds the item to the list of items */}

      <button onClick={handleConfirmItem}>Confirm Item</button>
      {/* display the list of items */}
      <ul>
        {items.map((item, index) => (
          <ul key={index}>
            <li>
              {item.name}: {item.area} {item.description}{" "}
              {"$" + (item.area * item.rate).toFixed(2)}
            </li>
            <li>
              <label>Rate</label>
              <select
                onChange={(e) => handleRateChange(e, index)}
                value={item.rate}
              >
                <option value="15">Generic Rate 1</option>
                <option value="20">Generic Rate 2</option>
              </select>
            </li>
          </ul>
        ))}
      </ul>
    </div>
  );
};
