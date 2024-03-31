import React, { useState, useEffect } from "react";
import { storage } from "../_utils/firebase";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";

const DisplayPatterns = () => {
  const [patterns, setPatterns] = useState([]);
  const [filteredPatterns, setFilteredPatterns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
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
        setFilteredPatterns(patternsData); // Initialize filteredPatterns
      } catch (error) {
        console.error("Error fetching patterns:", error);
      }
    };

    fetchPatterns();
  }, []);

  useEffect(() => {
    // Filter patterns based on search term and selected type
    const filtered = patterns.filter(pattern => {
      return pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedType ? pattern.type === selectedType : true);
    });
    setFilteredPatterns(filtered);
  }, [searchTerm, selectedType, patterns]);

  return (
    <div className="p-5 bg-white">
      <div className="flex flex-col md:flex-row justify-between mb-5">
        <input
          type="text"
          placeholder="Search by name..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 md:mb-0 border p-2"
        />
        <select
          onChange={(e) => setSelectedType(e.target.value)}
          className="border p-2"
        >
          <option value="">All Types</option>
          {/* Dynamically generate type options based on available types or hardcode them */}
          <option value="Animal Prints">Animal Prints</option>
          <option value="Camouflage">Camouflage</option>
          <option value="Carbon Fiber">Carbon Fiber</option>
          {/* Add other types as needed */}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPatterns.map((pattern, index) => (
          <div key={index} className="card w-full h-auto shadow-xl">
            <figure className="shadow-xl">
              <img className="w-full" src={pattern.imageUrl} alt={`Pattern ${pattern.name}`} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Name: {pattern.name}</h2>
              <p>Type: {pattern.type}</p>
              <p>Price: {pattern.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayPatterns;
