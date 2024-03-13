import React, { useState } from 'react'; // Corrected import statement
import './AdminAcc.css';

export const AdminAcc = () => {

  return (
    <div className="AdminPage flex justify-center">
  <form> {/* Form element should wrap the conditional rendering */}
          <div className="pattern-box">
            <h1 className="text-3xl text-primary-200 font-light"> Add Pattern</h1>
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
              <div class="w-full py-3 bg-primary-300 text-white rounded-md cursor-pointer hover:bg-primary-400">
            <button type="submit">
              Add pattern
            </button>
            </div>
            </div>
          </div>

          </form>

            <form>
          <div className="merchandise-box ">
            <h1 className='text-3xl text-primary-200 font-light'> Merchandise</h1>
            <div className="input-box">
              <div className="input-field">
                <input type="text" placeholder="Merchandise name" />
              </div>
              <div className="input-field">
                <input type="file" placeholder="Merchandise image" />
              </div>
              <div className="input-field">
                <select>
                  {/* Options should be added here */}
                </select>
              </div>
              <div class="w-full py-3 bg-primary-300 text-white rounded-md cursor-pointer hover:bg-primary-400">
            <button type="submit">
              Add Merchandise
            </button>
            </div>
            </div>
          </div>
          </form>
  </div>

  );
};