"use client";

import verifySurfaceArea from "./_utils/verifySurfaceArea";
import Cylinder from "./Mathematics/Shapes/cylinder";
import Rectangle from "./Mathematics/Shapes/rectangle";
import Sphere from "./Mathematics/Shapes/sphere";
import SphereSlice from "./Mathematics/Shapes/sphereSlice";
import React, { use } from "react";
import "./Calculator.css";
import object from "./Objects/object";
import { useEffect } from "react";
import { useState } from "react";
import item from "./Objects/item";
import objectAddition from "./Mathematics/objectAddition";
import runSendMailScript from "../../_utils/runSendMailScript";
//create a usestate hook to store the objects

export const Calculator = () => {
  const [shape, setShape] = useState("cylinder");
  const [radius, setRadius] = useState(0);
  const [cutRadius, setCutRadius] = useState(0);
  const [cutLength, setCutLength] = useState(0);
  const [height, setHeight] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [depth, setDepth] = useState(0);
  const [objects, setObjects] = useState([]);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [rate, setRate] = useState(15);
  const [totalPrice, setTotalPrice] = useState(0);
  const [email, setEmail] = useState("");

  const [itemDetails, setItemDetails] = useState("");
  //Item details mapping and formatting
  useEffect(() => {
    setItemDetails(
      items.map(
        (item) =>
          "<p><strong> " +
          item.name +
          "</strong></p>" +
          "<ul>" +
          "</li>" +
          "<li>Area: " +
          item.area +
          "</li>" +
          "<li>Description: " +
          item.description +
          "</li>" +
          "<li>Price:" +
          " $" +
          (item.area * item.rate).toFixed(2) +
          "</li>" +
          "</ul>"
      )
    );
  }, [items]);

  //Email formatting for all items details
  useEffect(() => {
    setEmail(
      "<h1> Total Price: </h1>" +
        "<p>$" +
        totalPrice +
        "CAD</p>" +
        "<br/>" +
        "<h1>Items: </h1>" +
        itemDetails
    );
  }, [totalPrice, items]);

  //Total price calculation
  useEffect(() => {
    setTotalPrice(
      items.reduce((acc, item) => acc + item.area * item.rate, 0).toFixed(2)
    );
  }, [items]);

  //function that handles the object deletion from object list
  const handleDeleteObject = (index) => {
    let newObjects = [...objects];
    newObjects.splice(index, 1);
    setObjects(newObjects);
  };

  //function that handles the item deletion from item list
  const handleDeleteItem = (index) => {
    let newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  //function that handles the rate change
  const handleRateChange = (e, index) => {
    const newItems = [...items];
    newItems[index].rate = parseInt(e.target.value);
    setItems(newItems);
  };

  //function that handles the shape change
  const handleShapeChange = (e) => {
    setShape(e.target.value);
  };

  //function that handles the item confirmation when the user clicks the confirm item button
  const handleConfirmItem = () => {
    let newItems = [...items];
    if (name === "" && description !== "") {
      alert("Please enter a name for the item.");
      return;
    } else if (description === "" && name !== "") {
      alert("Please enter a description for the item.");
      return;
    } else if (description === "" && name === "") {
      alert("Please enter a name and description for the item.");
      return;
    }

    if (
      items.some(
        (item) => item.name === name && item.description === description
      )
    ) {
      alert("An item with this name and description already exists.");
      return;
    } else if (items.some((item) => item.name === name) && items.some(item)) {
      alert("An item with this name already exists.");
      return;
    } else if (items.some((item) => item.description === description)) {
      alert("An item with this description already exists.");
      return;
    }
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

  //function that handles the addition of the object to the object list
  const handleAdd = () => {
    let newObjects = [...objects];

    // If the shape is a cylinder, create a new Cylinder object and add it to the newObjects array
    if (shape === "cylinder") {
      if (verifySurfaceArea(radius) && verifySurfaceArea(height)) {
        newObjects.push(object("Cylinder", Cylinder(radius, height)));
      } else {
        alert("Please enter a valid radius and height.");
      }
    }
    // If the shape is a rectangle, create a new Rectangle object and add it to the newObjects array
    else if (shape === "rectangle") {
      if (
        verifySurfaceArea(length) &&
        verifySurfaceArea(width) &&
        verifySurfaceArea(depth)
      ) {
        newObjects.push(object("Rectangle", Rectangle(length, width, depth)));
      } else {
        alert("Please enter a valid length, width, and depth.");
      }
    }
    // If the shape is a sphere, create a new Sphere object and add it to the newObjects array
    else if (shape === "sphere") {
      if (verifySurfaceArea(radius)) {
        if (cutRadius > 0 && cutLength > 0) {
          newObjects.push(
            object("Sphere", Sphere(radius, SphereSlice(cutRadius, cutLength)))
          );
        } else {
          newObjects.push(object("Sphere", Sphere(radius, 0)));
        }
      } else {
        alert("Please enter a valid radius.");
      }
    }
    // Set the objects state to the newObjects array
    setObjects(newObjects);
  };

  return (
    <div>
      {/* create a drop down that gives you the option to add a cylinder or a rectangle */}
      <label class="container">Choose a shape for surface area estimate:</label>
      <select onChange={handleShapeChange} value={shape}>
        <option value="cylinder">Cylinder</option>
        <option value="rectangle">Rectangle</option>
        <option value="sphere">Sphere</option>
      </select>
      {/* if the shape is a cylinder, display the radius and height inputs */}

      {shape === "cylinder" && (
        <div class="container">
          <label>Radius (m) </label>
          <input
            type="number"
            value={radius}
            placeholder="0"
            step="0.01" // Set step to allow two decimal places
            onChange={(e) => {
              const inputValue = parseFloat(e.target.value);
              if (
                (!isNaN(inputValue) && inputValue >= 0) ||
                e.target.value === ""
              ) {
                setRadius(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
              }
            }}
          />
          <label>Height (m)</label>
          <input
            type="number"
            value={height}
            min="0"
            step="0.01" // Set step to allow two decimal places
            onChange={(e) => {
              const inputValue = parseFloat(e.target.value);
              if (
                (!isNaN(inputValue) && inputValue >= 0) ||
                e.target.value === ""
              ) {
                setHeight(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
              }
            }}
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
            min="0"
            step="0.01" // Set step to allow two decimal places
            onChange={(e) => {
              const inputValue = parseFloat(e.target.value);
              if (
                (!isNaN(inputValue) && inputValue >= 0) ||
                e.target.value === ""
              ) {
                setLength(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
              }
            }}
          />
          <label>Width</label>
          <input
            type="number"
            value={width}
            min="0"
            step="0.01" // Set step to allow two decimal places
            onChange={(e) => {
              const inputValue = parseFloat(e.target.value);
              if (
                (!isNaN(inputValue) && inputValue >= 0) ||
                e.target.value === ""
              ) {
                setWidth(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
              }
            }}
          />
          <label>Depth</label>
          <input
            type="number"
            value={depth}
            min="0"
            step="0.01" // Set step to allow two decimal places
            onChange={(e) => {
              const inputValue = parseFloat(e.target.value);
              if (
                (!isNaN(inputValue) && inputValue >= 0) ||
                e.target.value === ""
              ) {
                setDepth(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
              }
            }}
          />
        </div>
      )}
      {shape === "sphere" && (
        <div>
          <label>Radius</label>
          <input
            type="number"
            value={radius}
            min="0"
            step="0.01" // Set step to allow two decimal places
            onChange={(e) => {
              const inputValue = parseFloat(e.target.value);
              if (
                (!isNaN(inputValue) && inputValue >= 0) ||
                e.target.value === ""
              ) {
                setRadius(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
              }
            }}
          />
          <label>
            <strong>Optional: </strong>Radius of Slice to be Cut
          </label>
          <input
            type="number"
            value={cutRadius}
            min="0"
            step="0.01" // Set step to allow two decimal places
            onChange={(e) => {
              const inputValue = parseFloat(e.target.value);
              if (
                (!isNaN(inputValue) && inputValue >= 0) ||
                e.target.value === ""
              ) {
                setCutRadius(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
              }
            }}
          />
          <label>
            <strong>Optional: </strong>Length of Slice to be Cut
          </label>
          <input
            type="number"
            value={cutLength}
            min="0"
            step="0.01" // Set step to allow two decimal places
            onChange={(e) => {
              const inputValue = parseFloat(e.target.value);
              if (
                (!isNaN(inputValue) && inputValue >= 0) ||
                e.target.value === ""
              ) {
                setCutLength(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
              }
            }}
          />
        </div>
      )}

      {/* create a button that adds the shape to the list of objects */}
      <button onClick={handleAdd}>Add</button>
      {/* display the list of objects */}
      <ul>
        {objects.map((object, index) => (
          <ul key={index}>
            <li>
              {object.name}: {object.area}
              <button onClick={() => handleDeleteObject(index)}>
                <strong>X</strong>
              </button>
            </li>
          </ul>
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
              <button onClick={() => handleDeleteItem(index)}>
                <strong>X</strong>
              </button>
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
      <button onClick={runSendMailScript}>Accept Quote</button>
    </div>
  );
};
