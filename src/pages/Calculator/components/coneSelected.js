export default function coneSelected({ setHeight, setRadius, height, radius }) {
  return (
    <div class="bg-white">
      <label className="form-control w-full">Radius (cm) </label>
      <input
        className="input input-bordered w-full"
        type="number"
        value={radius}
        placeholder="0"
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
      <label className="form-control w-full">Height (cm)</label>
      <input
        type="number"
        placeholder="0"
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
        className="input input-bordered w-full"
      />
    </div>
  );
}
