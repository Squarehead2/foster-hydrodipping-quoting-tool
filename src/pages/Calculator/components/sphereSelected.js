export default function sphereSelected({
  setCutLength,
  setCutRadius,
  setRadius,
  cutLength,
  cutRadius,
  radius,
}) {
  return (
    <div className="bg-white">
      <label className="form-control w-full">Radius (cm)</label>
      <input
        className="input input-bordered w-full"
        placeholder="0"
        type="number"
        value={radius}
        min="0"
        step="0.01" // Set step to allow two decimal places
        onChange={(e) => {
          const inputValue = parseFloat(e.target.value);
          if (
            (!isNaN(inputValue) && inputValue >= 0) ||
            e.target.value === ""
          ) {
            setRadius(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
          }
        }}
      />

      <label className="form-control w-full">
        <strong>Optional: </strong>Radius of Slice to be Cut (cm)
      </label>
      <input
        className="input input-bordered w-full"
        placeholder="0"
        type="number"
        value={cutRadius}
        min="0"
        step="0.01" // Set step to allow two decimal places
        onChange={(e) => {
          const inputValue = parseFloat(e.target.value);
          if (
            (!isNaN(inputValue) && inputValue >= 0) ||
            e.target.value === ""
          ) {
            setCutRadius(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
          }
        }}
      />
      <label className="form-control w-full max-w-xs">
        <strong>Optional: </strong>Length of Slice to be Cut (cm)
      </label>
      <input
        className="input input-bordered w-full max-w-xs"
        placeholder="0"
        type="number"
        value={cutLength}
        min="0"
        step="0.01" // Set step to allow two decimal places
        onChange={(e) => {
          const inputValue = parseFloat(e.target.value);
          if (
            (!isNaN(inputValue) && inputValue >= 0) ||
            e.target.value === ""
          ) {
            setCutLength(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
          }
        }}
      />
    </div>
  );
}
