import React from "react";
import ItemStat from "./itemStat";
import { useState, useEffect } from "react";
import { storage } from "../../../../_utils/firebase";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import Select from "react-select";
import "./itemCollapse.css";
export default function ItemCollapse({ items, setItems, handleDeleteItem }) {
  const [rate, setRate] = useState(0);
  const [patternList, setPatterns] = useState([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(""); //added this line
  const options = patternList.map((pattern, index) => ({
    value: pattern.price,
    label: `${pattern.name}: ${pattern.price} / cm`,
    image: { uri: pattern.imageUrl },
  }));

  useEffect(() => {
    const fetchPatterns = async () => {
      const storageRef = ref(storage, "patterns/");
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
  //handle rate change
  const handleRateChange = (selectedOption, index) => {
    setRate(selectedOption.value);
    setImgSrc(selectedOption.image.uri); //added this line
    const newItems = [...items];
    newItems[index].rate = parseInt(selectedOption.value);
    newItems[index].price = (
      (newItems[index].area * parseInt(selectedOption.value)) /
      100
    ).toFixed(2);
    newItems[index].pattern = selectedOption.label;
    newItems[index].patternUrl = selectedOption.image.uri;
    setItems(newItems);
  };
  return items.map((item, index) => (
    <div className="flex flex-col py-2 bg-white">
      <div className="card shadow-xl w-full bg-primary-50" key={index}>
        <div className="card-body w-full bg-primary-50">
          <h1 className="card-title">{item.name}</h1>
          <h2 className="card-title"></h2>
          <div className="flex flex-col bg-primary-50">
            <h1 className="font-bold text-black">Description</h1>
            <div className="flex flex-row h-full w-full bg-gray rounded-xl flex-wrap overflow-auto ">
              <p className="p-1 text-sm whitespace-normal text-black">
                {item.description}
              </p>
            </div>
          </div>
          <ItemStat item={item} rate={rate} />
          <label className="form-control w-full max-w-xs">Rate</label>

          <Select
            className="w-full"
            onChange={(selectedOption) =>
              handleRateChange(selectedOption, index)
            }
            onMenuOpen={() => setIsSelectOpen(true)}
            onMenuClose={() => setIsSelectOpen(false)}
            options={options}
            formatOptionLabel={(option) => (
              <div className="flex items-center bg-transparent ">
                <img
                  className={
                    "w-7 h-7 rounded-full css-2b097c-container" +
                    (isSelectOpen ? " animate-pulse" : "")
                  }
                  src={option.image.uri}
                  alt="pattern"
                />
                <span
                  className={`ml-2 text-sm css-2b097c-container ${
                    isSelectOpen ? " animate-pulse" : ""
                  }`}
                >
                  {option.label
                    ? option.label.split(":")[0] +
                      ": $" +
                      option.label.split(":")[1].substring(1)
                    : ""}
                  <sup>2</sup>
                </span>
              </div>
            )}
          />

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
    </div>
  ));
}
