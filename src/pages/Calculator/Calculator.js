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
import CylinderSelected from "./components/cylinderSelected";
import RectangleSelected from "./components/rectangleSelected";
import SphereSelected from "./components/sphereSelected";
import RawSurfaceAreaSelected from "./components/rawSurfaceAreaSelected";
import PyramidSelected from "./components/pyramidSelected";
import Pyramid from "./Mathematics/Shapes/pyramid";
import ConeSelected from "./components/coneSelected";
import Cone from "./Mathematics/Shapes/cone";
import ObjectCollapse from "./components/objectCollapse";
import ItemCollapse from "./components/item-collapse/itemCollapse";

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
  const [rawArea, setRawArea] = useState(0);
  const [numOfSides, setNumOfSides] = useState(0);
  const [inputValidation, setInputValidation] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  const [itemDetails, setItemDetails] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      setCurrentEmail(currentUser.email);
    }
  }, [currentUser]);

  //reset the object and item list
  const reset = () => {
    setObjects([]);
    setItems([]);
  };

  //function that handles the rate change
  const handleRateChange = (e, index) => {
    const newItems = [...items];
    newItems[index].rate = parseInt(e.target.value);
    setItems(newItems);
  };
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
        itemDetails +
        "<br/>" +
        "<p>From: </p>" +
        currentEmail
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

  //function that handles the shape change
  const handleShapeChange = (e) => {
    setHeight(0);
    setRadius(0);
    setLength(0);
    setWidth(0);
    setDepth(0);
    setCutRadius(0);
    setCutLength(0);
    setNumOfSides(0);
    setRawArea(0);

    setShape(e.target.value);
  };

  //function that handles the item confirmation when the user clicks the confirm item button
  const handleConfirmItem = () => {
    let newItems = [...items];
    if (name === "" && description !== "") {
      setInputValidation("Please enter a name for the item.");
      document.getElementById("my_modal_input").showModal();
      return;
    } else if (description === "" && name !== "") {
      setInputValidation("Please enter a description for the item.");
      document.getElementById("my_modal_input").showModal();
      return;
    } else if (description === "" && name === "") {
      setInputValidation("Please enter a name and description for the item.");
      document.getElementById("my_modal_input").showModal();
      return;
    }

    if (
      items.some(
        (item) => item.name === name && item.description === description
      )
    ) {
      setInputValidation(
        "An item with this name and description already exists."
      );
      document.getElementById("my_modal_input").showModal();
      return;
    } else if (items.some((item) => item.name === name) && items.some(item)) {
      setInputValidation("An item with this name already exists.");
      document.getElementById("my_modal_input").showModal();
      return;
    } else if (items.some((item) => item.description === description)) {
      setInputValidation("An item with this description already exists.");
      document.getElementById("my_modal_input").showModal();
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
    setDescription("");
    setName("");
  };

  const handleOpenHelp = () => {
    document.getElementById("my_modal_help").showModal();
  };

  //function that handles the addition of the object to the object list
  const handleAdd = () => {
    let newObjects = [...objects];

    // If the shape is a cylinder, create a new Cylinder object and add it to the newObjects array
    if (shape === "cylinder") {
      if (verifySurfaceArea(radius) && verifySurfaceArea(height)) {
        newObjects.push(object("Cylinder", Cylinder(radius, height)));
      } else {
        setInputValidation("Please enter a valid radius and height.");
        document.getElementById("my_modal_input").showModal();
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
        setInputValidation("Please enter a valid length, width, and depth.");
        document.getElementById("my_modal_input").showModal();
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
        setInputValidation("Please enter a valid radius.");
        document.getElementById("my_modal_input").showModal();
      }
    } else if (shape === "raw-surface-area") {
      if (verifySurfaceArea(rawArea)) {
        newObjects.push(object("Raw Surface Area", rawArea));
      } else {
        setInputValidation("Please enter a valid surface area.");
        document.getElementById("my_modal_input").showModal();
      }
    } else if (shape === "pyramid") {
      if (
        verifySurfaceArea(height) &&
        verifySurfaceArea(numOfSides) &&
        verifySurfaceArea(length)
      ) {
        newObjects.push(object("Pyramid", Pyramid(height, numOfSides, length)));
      } else {
        setInputValidation(
          "Please enter a valid height, number of sides, and length."
        );
        document.getElementById("my_modal_input").showModal();
      }
    } else if (shape === "cone") {
      if (verifySurfaceArea(radius) && verifySurfaceArea(height)) {
        newObjects.push(object("Cone", Cone(radius, height)));
      } else {
        setInputValidation("Please enter a valid radius and height.");
        document.getElementById("my_modal_input").showModal();
      }
    }

    // Set the objects state to the newObjects array
    setObjects(newObjects);
  };

  return (
    <>
      <div className="">
        <div className="flex flex-col lg:flex-row-reverse pt-4 pr-4 pb-4 space-x-4 bg-primary-50">
          <div className="flex flex-col w-1/2 space-y-3 p-10 shadow-lg shadow-gray bg-white h-full indicator">
            <button className="group" onClick={handleOpenHelp}>
              <span
                className="indicator-item indicator-bottom badge bg-primary-300 text-white group-hover:bg-primary-400"
                data-tip="hello"
              >
                <div
                  className="tooltip group-hover:tooltip-open group-hover:bg-primary-400 tbg-primary-300 h-full w-full bg-primary-300 text-white text-sm"
                  data-tip="Need Help?"
                >
                  ?
                </div>
              </span>
            </button>

            {/* create a drop down that gives you the option to add a cylinder or a rectangle */}
            <div className="flex flex-col bg-white justify-center items-center">
              <h1 className="form-control font-bold text-lg mt-[-4rem] ">
                Add an Object to Your Item
              </h1>
            </div>
            <label className="form-control w-full ">
              Choose a shape for surface area estimate:
            </label>
            <select
              className="select select-bordered"
              onChange={handleShapeChange}
              value={shape}
            >
              <option value="cylinder">Cylinder</option>
              <option value="rectangle">Rectangle</option>
              <option value="sphere">Sphere</option>
              <option value="raw-surface-area">Raw Surface Area</option>
              <option value="pyramid">Pyramid</option>
              <option value="cone">Cone</option>
            </select>
            {/* if the shape is a cylinder, display the radius and height inputs */}

            {shape === "cylinder" && (
              <CylinderSelected setHeight={setHeight} setRadius={setRadius} />
            )}
            {/* if the shape is a rectangle, display the length, width, and depth inputs */}

            {/* if the shape is a rectangle, display the length, width, and depth inputs */}
            {shape === "rectangle" && (
              <RectangleSelected
                setDepth={setDepth}
                setLength={setLength}
                setWidth={setWidth}
              />
            )}
            {shape === "sphere" && (
              <SphereSelected
                setRadius={setRadius}
                setCutRadius={setCutRadius}
                setCutLength={setCutLength}
              />
            )}
            {shape === "raw-surface-area" && (
              <RawSurfaceAreaSelected setSurfaceArea={setRawArea} />
            )}
            {shape === "pyramid" && (
              <PyramidSelected
                setHeight={setHeight}
                setNumSides={setNumOfSides}
                setLength={setLength}
              />
            )}
            {shape === "cone" && (
              <ConeSelected setHeight={setHeight} setRadius={setRadius} />
            )}

            {/* if the shape is a rectangle, display the length, width, and depth inputs */}

            {/* create a button that adds the shape to the list of objects */}

            <button onClick={handleAdd} className="btn">
              Add
            </button>
          </div>

          {/* display the list of objects */}
          <div className="flex flex-col space-y-1 bg-transparent pr-5">
            <ObjectCollapse
              objects={objects}
              handleDeleteObject={handleDeleteObject}
            />
          </div>

          {/* create a form for adding a description and name to the item */}
          <div className="flex flex-col space-y-3 w-1/2 p-10 shadow-lg shadow-gray bg-white">
            <div className="flex flex-col bg-white justify-center items-center">
              <h1 className="form-control font-bold text-lg mt-[-1rem] pb-4">
                Add an Item to The Quote
              </h1>
            </div>
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

            <button
              className="btn"
              disabled={objects.length === 0}
              onClick={handleConfirmItem}
            >
              Confirm Item
            </button>
            {/* display the list of items */}
            <ul>
              <ItemCollapse
                items={items}
                rate={rate}
                handleDeleteItem={handleDeleteItem}
              />
            </ul>
            {currentUser ? (
              <button
                className="btn"
                disabled={items.length === 0}
                onClick={() => {
                  document.getElementById("my_modal_accept").showModal();
                }}
              >
                Accept Quote
              </button>
            ) : (
              <button
                className="btn"
                disabled={true}
                onClick={() => {
                  document.getElementById("my_modal_accept").showModal();
                }}
              >
                Please Login to Accept Quote
              </button>
            )}
          </div>
        </div>
      </div>
      <>
        <dialog id="my_modal_input" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Enter Valid Input</h3>
            <p className="py-4 text-red-500 text-md">{inputValidation}</p>
            <div className="modal-action bg-white">
              <form method="dialog bg-white">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("my_modal_input").close();
                  }}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </>
      <>
        <dialog id="my_modal_accept" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Are you sure you want to accept?
            </h3>
            <p className="py-4 text-red-500 text-md">
              Are you sure you want to accept quote?
            </p>
            <div className="modal-action bg-white">
              <form
                method="dialog"
                className=" flex w-full space-x-3 flex-row-reverse border-3 border-solid border-purple-100 bg-white"
              >
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn ml-3"
                  onClick={() => {
                    runSendMailScript(email);
                    reset();
                  }}
                >
                  Yes
                </button>
                <button className="btn bg-red-300">No</button>
              </form>
            </div>
          </div>
        </dialog>
        <dialog id="my_modal_help" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">How to Generate Quote</h3>

            {/* create step by step list of instructions */}
            <ol className="list-decimal bg-white text-sm">
              <li>
                Add an object to the item by selecting the shape and entering
                the required dimensions.
              </li>
              <p className="text-xs text-black">
                <br />
                <strong>Note:</strong> you can add multiple objects together to
                create a polymorphic object. <br />
                <strong>Example: </strong> Microphone is a cylinder + sphere
              </p>
              <br />
              <li>
                Add a description and name to the item and click confirm item.
              </li>
              <li>Repeat steps 1 and 2 to add multiple items to the quote.</li>
              <li>
                Click accept quote to send the quote to your business owner to
                review your request.
              </li>
            </ol>
            <div className="modal-action ">
              <form
                method="dialog"
                className=" flex w-full space-x-3 flex-row-reverse border-3 border-solid border-purple-100 bg-white border-none"
              >
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn ml-3 bg-white border-none"
                  onClick={() => {}}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    </>
  );
};
