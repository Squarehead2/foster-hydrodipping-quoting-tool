export default function rectangleSelected({
  setDepth,
  setLength,
  setWidth,
  depth,
  length,
  width,
}) {
  return (
    <div className="bg-white">
      <label className="form-control w-full">Length (cm)</label>
      <input
        className="input input-bordered w-full"
        placeholder="0"
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
      <label className="form-control w-full">Width (cm)</label>
      <input
        className="input input-bordered w-full"
        placeholder="0"
        type="number"
        value={width}
        min="0"
        step="0.01" // Set step to allow two decimal places
        onChange={(e) => {
          const inputValue = parseFloat(e.target.value);
          if (
            (!isNaN(inputValue) && inputValue >= 0) ||
            e.target.value === ""
          ) {
            setWidth(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
          }
        }}
      />
      <label className="form-control w-full">Depth (cm)</label>
      <input
        className="input input-bordered w-full"
        type="number"
        placeholder="0"
        value={depth}
        min="0"
        step="0.01" // Set step to allow two decimal places
        onChange={(e) => {
          const inputValue = parseFloat(e.target.value);
          if (
            (!isNaN(inputValue) && inputValue >= 0) ||
            e.target.value === ""
          ) {
            setDepth(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
          }
        }}
      />
    </div>
  );
}
