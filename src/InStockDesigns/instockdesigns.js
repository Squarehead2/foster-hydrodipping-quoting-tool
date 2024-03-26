import React, { useState, useEffect } from "react";
import { storage } from "../_utils/firebase";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";

const DisplayPatterns = () => {
  const [patterns, setPatterns] = useState([]);

  useEffect(() => {
    const fetchPatterns = async () => {
      const storageRef = ref(storage, 'patterns/');
      const patternsList = await listAll(storageRef);
      const patternsData = await Promise.all(
        patternsList.items.map(async (itemRef) => {
          const imageUrl = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef);
          return {
            imageUrl,
            name: metadata.customMetadata?.name,
            type: metadata.customMetadata?.type,
            price: metadata.customMetadata?.price,
          };
        })
      );
      setPatterns(patternsData);
    };

    fetchPatterns();
  }, []);

  return (
    <div className="patterns-display">
      {patterns.map((pattern, index) => (
        <div key={index} className="pattern">
          <img src={pattern.imageUrl} alt={pattern.name} style={{ width: '100px', height: '100px' }} />
          <div>Name: {pattern.name}</div>
          <div>Type: {pattern.type}</div>
          <div>Price: {pattern.price}</div>
        </div>
      ))}
    </div>
  );
};

export default DisplayPatterns;
