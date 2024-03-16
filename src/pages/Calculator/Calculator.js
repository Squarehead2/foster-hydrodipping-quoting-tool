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
import { auth, onAuthStateChanged } from "../../_utils/firebase";
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
  const [currentUser, setCurrentUser] = useState();

  const [itemDetails, setItemDetails] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
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
    <div className="">
      <div className="flex flex-col lg:flex-row-reverse pt-4 pr-4 pb-4 space-x-4 bg-primary-50">
        <div className="flex flex-col w-1/2 space-y-3 p-10 shadow-lg shadow-gray bg-white">
          {/* create a drop down that gives you the option to add a cylinder or a rectangle */}
          <label className="form-control w-full">
            Choose a shape for surface area estimate:
          </label>
          <select
            className="select select-bordered"
            np
            onChange={handleShapeChange}
            value={shape}
          >
            <option value="cylinder">Cylinder</option>
            <option value="rectangle">Rectangle</option>
            <option value="sphere">Sphere</option>
          </select>
          {/* if the shape is a cylinder, display the radius and height inputs */}

          {shape === "cylinder" && (
            <div class="bg-white">
              <label className="form-control w-full">Radius (m) </label>

              <input
                className="input input-bordered w-full"
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
              <label className="form-control w-full">Height (m)</label>
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
                className="input input-bordered w-full"
              />
            </div>
          )}
          {/* if the shape is a rectangle, display the length, width, and depth inputs */}
          {shape === "rectangle" && (
            <div>
              <label className="form-control w-full">Length</label>
              <input
                className="input input-bordered w-full"
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
              <label className="form-control w-full">Width</label>
              <input
                className="input input-bordered w-full"
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
              <label className="form-control w-full">Depth</label>
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
            <div className="bg-white">
              <label className="form-control w-full">Radius</label>
              <input
                className="input input-bordered w-full"
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

              <label className="form-control w-full">
                <strong>Optional: </strong>Radius of Slice to be Cut
              </label>
              <input
                className="input input-bordered w-full"
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
              <label className="form-control w-full max-w-xs">
                <strong>Optional: </strong>Length of Slice to be Cut
              </label>
              <input
                className="input input-bordered w-full max-w-xs"
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

          <button onClick={handleAdd} className="btn">
            Add
          </button>
        </div>
        {/* display the list of objects */}
        <div className="flex flex-col space-y-1 bg-transparent pr-5">
          {objects.map((object, index) => (
            <>
              <div
                tabIndex={0}
                className="collapse collapse-arrow border border-base-300 bg-white"
              >
                <div className="flex flex-row items-center justify-start collapse-title text-xl font-medium bg-white">
                  <button
                    className="btn btn-square bg-white border-white shadow-none mt-[-10%] w-1/4 h-1/4"
                    onClick={() => handleDeleteObject(index)}
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="mt-[-10%] bg-white">{object.name}</div>
                </div>
                <div className="collapse-content bg-white">
                  <p>
                    Surface Area: {object.area} m<sup>2</sup>
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>

        {/* create a form for adding a description and name to the item */}
        <div className="flex flex-col space-y-3 w-1/2 p-10 shadow-lg shadow-gray bg-white">
          <form className="w-full">
            <label className="form-control w-full max-w-xs">Name</label>
            <input
              className="input input-bordered w-full "
              placeholder="Dirt Bike Helmet"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="form-control w-full">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Extra details, color, style, shape, etc."
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </form>
          {/* create a button that adds the item to the list of items */}

          <button className="btn" onClick={handleConfirmItem}>
            Confirm Item
          </button>
          {/* display the list of items */}
          <ul>
            {items.map((item, index) => (
              <div className="card shadow-xl w-full bg-primary-50" key={index}>
                <div className="card-body w-full bg-primary-50">
                  <h1 className="card-title">{item.name}</h1>
                  <h2 className="card-title"></h2>
                  <p>${(item.area * item.rate).toFixed(2)}</p>
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
            ))}
          </ul>
          {currentUser ? (
            <button
              className="btn"
              disabled={items.length === 0}
              onClick={() => {
                runSendMailScript(email);
              }}
            >
              Accept Quote
            </button>
          ) : (
            <p>Please Login to Generate Quote</p>
          )}
        </div>
      </div>
    </div>
  );
};
