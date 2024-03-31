import React, { useState, useEffect } from "react";
import { storage } from "../../_utils/firebase";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject, getMetadata } from "firebase/storage";
import { v4 } from "uuid";
import "./AdminAcc.css";

export const AdminAcc = () => {
  const [patternName, setPatternName] = useState("");
  const [patternImage, setPatternImage] = useState(null);
  const [patternType, setPatternType] = useState("");
  const [patternPrice, setPatternPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [patterns, setPatterns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPatterns();
  }, []);

  const fetchPatterns = async () => {
    const patternsRef = ref(storage, 'patterns/');
    const snapshot = await listAll(patternsRef);
    const loadedPatterns = await Promise.all(
      snapshot.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        return { 
          name: metadata.customMetadata?.name, 
          url, 
          fullPath: itemRef.fullPath 
        };
      })
    );
    setPatterns(loadedPatterns);
  };

  const handlePatternSubmit = async (event) => {
    event.preventDefault();
    if (!patternName || !patternImage || !patternType || !patternPrice) {
      setErrorMessage("Please fill out all fields");
      return;
    }

    const storageLocation = "patterns/";
    const imageRef = ref(storage, `${storageLocation}${patternName}-${v4()}`);

    const customMetadata = {
      name: patternName,
      type: patternType,
      price: patternPrice.toString(),
    };

    const metadata = {
      contentType: patternImage.type,
      customMetadata: customMetadata
    };

    try {
      await uploadBytes(imageRef, patternImage, metadata);
      await fetchPatterns();
      setErrorMessage("");
      setPatternName("");
      setPatternImage(null);
      setPatternType("");
      setPatternPrice("");
    } catch (error) {
      console.error("Error uploading pattern image:", error);
      setErrorMessage("Error uploading pattern image");
    }
  };

  const handleRemovePattern = async (fullPath) => {
    if (window.confirm("Are you sure you want to delete this pattern?")) {
      const fileRef = ref(storage, fullPath);
      await deleteObject(fileRef);
      fetchPatterns(); // Refresh the list after deletion
    }
  };

  return (
    <div className="AdminPage space-x-4 justify-center bg-greyish">
      <div className="pattern-box shadow-lg">
        <h1 className="text-3xl text-primary-200 font-light">Add Pattern</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handlePatternSubmit}>
          <div className="input-box">
            <input type="text" placeholder="Pattern Name" value={patternName} onChange={(e) => setPatternName(e.target.value)} />
            <input type="file" onChange={(e) => setPatternImage(e.target.files[0])} />
            <select value={patternType} onChange={(e) => setPatternType(e.target.value)}>
              <option value="">Select Pattern Type</option>
              <option value="Animal Prints">Animal Prints</option>
              <option value="Animal Prints">Animal Prints</option>
                <option value="Camouflage">Camouflage</option>
                <option value="Carbon Fiber">Carbon Fiber</option>
                <option value="Metal">Metal</option>
                <option value="Wood">Wood</option>
                <option value="Stone">Skulls</option>
                <option value="Flames">Flames</option>
                <option value="Random">Random</option>
            </select>
            <input type="text" placeholder="Pattern Price" value={patternPrice} onChange={(e) => setPatternPrice(e.target.value)} />
            <button type="submit">Add pattern</button>
          </div>
        </form>
      </div>

      <div>
        <input type="text" placeholder="Search Patterns" onChange={(e) => setSearchTerm(e.target.value)} className="search-bar" />
        <div className="patterns-display grid grid-cols-4 gap-4">
          {patterns.filter(pattern => pattern.name.toLowerCase().includes(searchTerm.toLowerCase())).map((pattern, index) => (
            <div key={index} className="pattern-card">
              <img src={pattern.url} alt={pattern.name} style={{width: '100%', height: 'auto'}} />
              <div>{pattern.name}</div>
              <button onClick={() => handleRemovePattern(pattern.fullPath)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
