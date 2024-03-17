import React, { useState } from 'react'; // Corrected import statement
import './AdminAcc.css';
import 'firebase/database';

export const AdminAcc = () => {
  // State variables to store form input values and error message
  const [patternName, setPatternName] = useState('');
  const [patternImage, setPatternImage] = useState(null);
  const [patternType, setPatternType] = useState('');
  const [merchandiseName, setMerchandiseName] = useState('');
  const [merchandiseImage, setMerchandiseImage] = useState(null);
  const [merchandiseType, setMerchandiseType] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

// Function to handle pattern form submission
const handlePatternSubmit = (event) => {
  event.preventDefault();
  // Validate if all fields are filled
  if (!patternName || !patternImage || !patternType) {
    setErrorMessage('Please fill out all fields');
    console.error('Pattern form submission error: Please fill out all fields');
    return;
  }
  // Save pattern data to Firebase database
  /*firebase.database().ref('patterns').push({
    name: patternName,
    image: patternImage,
    type: patternType, 
  });*/
  // Reset form fields
  setPatternName('');
  setPatternImage(null);
  setPatternType('');
  setErrorMessage('');
};

 // Function to handle merchandise form submission
 const handleMerchandiseSubmit = (event) => {
  event.preventDefault();
  // Validate if all fields are filled
  if (!merchandiseName || !merchandiseImage || !merchandiseType) {
    setErrorMessage('Please fill out all fields');
    console.error('Merchandise form submission error: Please fill out all fields');
    return;
  }
  // Save merchandise data to Firebase database
  /*
  firebase.database().ref('merchandise').push({
    name: merchandiseName,
    image: merchandiseImage,
    type: merchandiseType,
  }); */
  // Reset form fields
  setMerchandiseName('');
  setMerchandiseImage(null);
  setMerchandiseType('');
  setErrorMessage('');

};

  return (
    <div className="AdminPage flex justify-center bg-greyish">
  <form> 
          <div className="pattern-box">
            <h1 className="text-3xl text-primary-200 font-light"> Add Pattern</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
                 onChange={(e) => setPatternImage(e.target.files[0])}
                 />
              </div>
              <div className="input-field">
                <select
                 value={patternType}
                 onChange={(e) => setPatternType(e.target.value)}
                 >
                <option value="">Select Pattern Type</option>
                <option value="Type 1">Type 1</option>
                <option value="Type 2">Type 2</option>
                  {/* Options should be added here */}
                </select>
              </div>
              <div class="w-full py-3 bg-primary-300 text-white rounded-md cursor-pointer hover:bg-primary-400">
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
                  {/* Options should be added here */}
                </select>
              </div>
              <div class="w-full py-3 bg-primary-300 text-white rounded-md cursor-pointer hover:bg-primary-400">
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