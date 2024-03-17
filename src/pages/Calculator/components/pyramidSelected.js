export default function pyramidSelected({
  setHeight,
  setLength,
  setNumSides,
  height,
  length,
  numSides,
}) {
  return (
    <div className="bg-white">
      <label className="form-control w-full">Number of Sides</label>
      <input
        className="input input-bordered w-full"
        placeholder="0"
        type="number"
        value={numSides}
        min="0"
        step="0.01" // Set step to allow two decimal places
        onChange={(e) => {
          const inputValue = parseFloat(e.target.value);
          if (
            (!isNaN(inputValue) && inputValue >= 0) ||
            e.target.value === ""
          ) {
            setNumSides(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
          }
        }}
      />
      <label className="form-control w-full">Length (cm)</label>
      <input
        placeholder="0"
        className="input input-bordered w-full"
        type="number"
        value={length}
        min="0"
        step="0.01" // Set step to allow two decimal places
        onChange={(e) => {
          const inputValue = parseFloat(e.target.value);
          if (
            (!isNaN(inputValue) && inputValue >= 0) ||
            e.target.value === ""
          ) {
            setLength(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
          }
        }}
      />
      <label className="form-control w-full">Height (cm)</label>
      <input
        className="input input-bordered w-full"
        placeholder="0"
        type="number"
        value={height}
        min="0"
        step="0.01" // Set step to allow two decimal places
        onChange={(e) => {
          const inputValue = parseFloat(e.target.value);
          if (
            (!isNaN(inputValue) && inputValue >= 0) ||
            e.target.value === ""
          ) {
            setHeight(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
          }
        }}
      />
    </div>
  );
}
