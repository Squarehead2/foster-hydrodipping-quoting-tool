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

    <div>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-5 bg-white">
  {patterns.map((pattern, index) => (
    <div key={index} className="card w-96 h-[32rem] shadow-xl"> {/* Key is added here */}
      <figure className="shadow-xl">
        <img
          className="w-96 h-96"
          src={pattern.imageUrl}
          alt={`Pattern ${index}`}
        />
      </figure>
      <div className="card-body bg-primary-50">
        <h2 className="card-title">Name: {pattern.name}</h2>
        <p className="text-black text-sm">
          Description of the product. This is a placeholder description
        </p>
        <div className="card-actions justify-end bg-primary-50 rounded-xl">
          <div className="stats shadow bg-white w-full h-30">
            <div className="stat bg-white w-full">
              <div className="stat-title bg-white w-full">Price: {pattern.price}</div>
              <div className="stat-value bg-white w-full">
                $XX.XX / cm<sup>2</sup>
              </div>
            </div>
          </div>
          <div className="badge badge-outline">Type: {pattern.type}</div>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default DisplayPatterns;
