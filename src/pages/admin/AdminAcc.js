import React, { useState } from "react";
import "./AdminAcc.css";
import { storage, firestore } from "../../_utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";

export const AdminAcc = () => {
  const [patternName, setPatternName] = useState("");
  const [patternImage, setPatternImage] = useState(null);
  const [patternType, setPatternType] = useState("");
  const [merchandiseName, setMerchandiseName] = useState("");
  const [merchandiseImage, setMerchandiseImage] = useState(null);
  const [merchandiseType, setMerchandiseType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [patternSubmitted, setPatternSubmitted] = useState(false); // Added state for pattern submission
  const [patternPrice, setPatternPrice] = useState("");

  const handlePatternSubmit = async (event) => {
    event.preventDefault();
    if (!patternName || !patternImage || !patternType || !patternPrice) {
      setErrorMessage("Please fill out all fields");
      return;
    }

    const storageLocation = "patterns/";
    const imageRef = ref(storage, `${storageLocation}${patternName}-${v4()}`);

    try {
      const snapshot = await uploadBytes(imageRef, patternImage);
      console.log("Pattern image uploaded successfully", snapshot);

      // After successful upload, get the URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Add pattern details to Firestore
      const docRef = await addDoc(collection(firestore, "patterns"), {
        name: patternName,
        type: patternType,
        price: patternPrice,
        imageUrl: imageUrl, // Store the URL of the uploaded image
      });

      console.log("Document written with ID: ", docRef.id);
      setErrorMessage("");
      setPatternName("");
      setPatternImage(null);
      setPatternType("");
      setPatternPrice("");
      setPatternSubmitted(true);
      setTimeout(() => setPatternSubmitted(false), 3000); // Reset patternSubmitted after 3 seconds
    } catch (error) {
      console.error(
        "Error uploading pattern image or adding document to Firestore:",
        error
      );
      setErrorMessage(
        "Error uploading pattern image or adding document to Firestore"
      );
    }
  };

  const handleMerchandiseSubmit = (event) => {
    event.preventDefault();
    if (!merchandiseName || !merchandiseImage || !merchandiseType) {
      setErrorMessage("Please fill out all fields");
      return;
    }

    // Your merchandise submission logic here

    // Reset merchandise form fields
    setMerchandiseName("");
    setMerchandiseImage(null);
    setMerchandiseType("");
    setErrorMessage("");
  };

  return (
    <div className="AdminPage space-x-4 justify-center bg-greyish">
      <form>
        <div className="pattern-box shadow-lg">
          <h1 className="text-3xl text-primary-200 font-light"> Add Pattern</h1>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="input-box">
            <div className="input-field">
              <input
                type="text"
                placeholder="Pattern Name"
                value={patternName}
                onChange={(e) => setPatternName(e.target.value)}
              />
            </div>
            <div className="input-field">
              <input
                type="file"
                placeholder="Pattern Image"
                onChange={(e) => setPatternImage(e.target.files[0])}
              />
            </div>
            <div className="input-field">
              <select
                value={patternType}
                onChange={(e) => setPatternType(e.target.value)}
              >
                <option value="">Select Pattern Type</option>
                <option value="Animal Prints">Animal Prints</option>
                <option value="Camouflage">Camouflage</option>
                <option value="Carbon Fiber">Carbon Fiber</option>
                <option value="Metal">Metal</option>
                <option value="Wood">Wood</option>
                <option value="Stone">Skulls</option>
                <option value="Flames">Flames</option>
                <option value="Random">Random</option>
              </select>
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="Pattern Price"
                value={patternPrice}
                onChange={(e) => setPatternPrice(e.target.value)}
              />
            </div>

            <div className="w-full py-3 bg-primary-300 text-white rounded-md cursor-pointer hover:bg-primary-400">
              <button type="submit" onClick={handlePatternSubmit}>
                Add pattern
              </button>
            </div>
          </div>
        </div>
      </form>

      <form>
        <div className="merchandise-box ">
          <h1 className="text-3xl text-primary-200 font-light"> Merchandise</h1>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="input-box">
            <div className="input-field">
              <input
                type="text"
                placeholder="Merchandise name"
                value={merchandiseName}
                onChange={(e) => setMerchandiseName(e.target.value)}
              />
            </div>
            <div className="input-field">
              <input
                type="file"
                placeholder="Merchandise image"
                onChange={(e) => setMerchandiseImage(e.target.files[0])}
              />
            </div>
            <div className="input-field">
              <select
                value={merchandiseType}
                onChange={(e) => setMerchandiseType(e.target.value)}
              >
                <option value="">Select Merchandise Type</option>
                <option value="Type A">Type A</option>
                <option value="Type B">Type B</option>
              </select>
            </div>
            <div className="w-full py-3 bg-primary-300 text-white rounded-md cursor-pointer hover:bg-primary-400">
              <button type="submit" onClick={handleMerchandiseSubmit}>
                Add Merchandise
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
