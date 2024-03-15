import React, { useState } from 'react';
import './AdminAcc.css';
import { storage } from '../../_utils/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

export const AdminAcc = () => {
  const [patternName, setPatternName] = useState('');
  const [patternImage, setPatternImage] = useState(null);
  const [patternType, setPatternType] = useState('');
  const [merchandiseName, setMerchandiseName] = useState('');
  const [merchandiseImage, setMerchandiseImage] = useState(null);
  const [merchandiseType, setMerchandiseType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [patternSubmitted, setPatternSubmitted] = useState(false); // Added state for pattern submission

  const handlePatternSubmit = (event) => {
    event.preventDefault();
    if (!patternName || !patternImage || !patternType) {
      setErrorMessage('Please fill out all fields');
      return;
    }
    
    let storageLocation = '';
    switch(patternType) {
      case 'Type 1':
        storageLocation = 'patterns/type1/';
        break;
      case 'Type 2':
        storageLocation = 'patterns/type2/';
        break;
      default:
        storageLocation = 'patterns/';
        break;
    }
    
    const imageRef = ref(storage, `${storageLocation}${patternName + v4()}`);
    uploadBytes(imageRef, patternImage).then(() => {
      console.log('Pattern image uploaded successfully');
      setErrorMessage('');
      setPatternName('');
      setPatternImage(null);
      setPatternType('');
      setPatternSubmitted(true);
      setTimeout(() => setPatternSubmitted(false), 3000); // Reset patternSubmitted after 3 seconds
    }).catch((error) => {
      console.error('Error uploading pattern image:', error);
      setErrorMessage('Error uploading pattern image');
    });
  };

  const handleMerchandiseSubmit = (event) => {
    event.preventDefault();
    if (!merchandiseName || !merchandiseImage || !merchandiseType) {
      setErrorMessage('Please fill out all fields');
      return;
    }
    
    // Your merchandise submission logic here
    
    // Reset merchandise form fields
    setMerchandiseName('');
    setMerchandiseImage(null);
    setMerchandiseType('');
    setErrorMessage('');
  };

  return (
    <div className="AdminPage flex justify-center">
      <form> 
        <div className="pattern-box">
          <h1 className="text-3xl text-primary-200 font-light"> Add Pattern</h1>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {patternSubmitted && <p className="text-green-500">Pattern added successfully</p>}
          <div className="input-box">
            <div className="input-field">
              <input
                type="text" 
                placeholder="Pattern Name" 
                value={patternName}
                onChange={(e) => setPatternName(e.target.value)} />
            </div>
            <div className="input-field">
              <input type="file"
                placeholder="Pattern Image" 
                onChange={(e) => setPatternImage(e.target.files[0])} />
            </div>
            <div className="input-field">
              <select
                value={patternType}
                onChange={(e) => setPatternType(e.target.value)}>
                <option value="">Select Pattern Type</option>
                <option value="Type 1">Type 1</option>
                <option value="Type 2">Type 2</option>
              </select>
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
          <h1 className='text-3xl text-primary-200 font-light'> Merchandise</h1>
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
