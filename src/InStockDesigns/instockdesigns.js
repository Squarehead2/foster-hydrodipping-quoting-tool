import React, { useState, useEffect } from "react";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../_utils/firebase";
import "./InStockDesigns.css";

export default function InStockDesigns() {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // List and fetch images from 'patterns/type1/' location
      const patternsRef = ref(storage, "patterns/");
      const patternsSnapshot = await listAll(patternsRef);
      const patternsUrls = await Promise.all(
        patternsSnapshot.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return url;
        })
      );

      setImageList([...patternsUrls]);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-5 bg-white">
        {imageList.map((url, index) => (
          <>
            <div className="card w-96 h-[32rem] shadow-xl ">
              <figure className="shadow-xl">
                <img
                  className="w-96 h-96"
                  key={index}
                  src={url}
                  alt={`Image ${index}`}
                />
              </figure>
              <div className="card-body bg-primary-50">
                <h2 className="card-title">Name</h2>
                <p className="text-black text-sm">
                  Description of the product. This is a placeholder description
                </p>
                <div className="card-actions justify-end bg-primary-50 rounded-xl">
                  <div className="stats shadow bg-white w-full h-30">
                    <div className="stat bg-white w-full">
                      <div className="stat-title bg-white w-full">Price</div>
                      <div className="stat-value bg-white w-full">
                        $XX.XX / cm<sup>2</sup>
                      </div>
                    </div>
                  </div>
                  <div className="badge badge-outline">Type of Pattern</div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
