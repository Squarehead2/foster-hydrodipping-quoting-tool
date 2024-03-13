import React, { useState } from 'react'; // Corrected import statement
import './AdminAcc.css';

export const AdminAcc = () => {
  // State to determine which form is shown
  const [isAddPattern, setIsAddPattern] = useState(true);

  // Toggle between "Add Pattern" and "Add Merchandise" forms
  const toggleForm = () => setIsAddPattern(!isAddPattern);

  return (
    <div className="AdminPage">
      <form> {/* Form element should wrap the conditional rendering */}
        {isAddPattern ? (
          <div className="form-box ">
            <h1> Add Pattern</h1>
            <div className="input-box">
              <div className="input-field">
                <input type="text" placeholder="Pattern Name" />
              </div>
              <div className="input-field">
                <input type="file" placeholder="Pattern Image" />
              </div>
              <div className="input-field">
                <select>
                  {/* Options should be added here */}
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div className="form-box">
            <h1> Add Merchandise</h1>
            <div className="input-box">
              <div className="input-field">
                <input type="text" placeholder="Merchandise Name" />
              </div>
              <div className="input-field">
                <input type="file" placeholder="Merchandise Image" />
              </div>
              <div className="input-field">
                <select>
                  {/* Options should be added here */}
                </select>
              </div>
            </div>
          </div>
        )}
        <div className="btns">
          <button type="button" onClick={toggleForm}>
            {isAddPattern ? "Switch to Add Merchandise" : "Switch to Add Pattern"}
          </button>
          <button type="submit">
            {isAddPattern ? "Add Pattern" : "Add Merchandise"}
          </button>
        </div>
      </form>
    </div>
  );
};