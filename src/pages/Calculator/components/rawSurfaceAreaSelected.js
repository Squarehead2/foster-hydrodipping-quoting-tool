export default function rawSurfaceAreaSelected({
  setSurfaceArea,
  surfaceArea,
}) {
  return (
    <div className="bg-white">
      <label className="form-control w-full">Surface Area (cm)</label>
      <input
        className="input input-bordered w-full"
        placeholder="0"
        type="number"
        value={surfaceArea}
        min="0"
        step="0.01" // Set step to allow two decimal places
        onChange={(e) => {
          const inputValue = parseFloat(e.target.value);
          if (
            (!isNaN(inputValue) && inputValue >= 0) ||
            e.target.value === ""
          ) {
            setSurfaceArea(parseFloat(inputValue.toFixed(2))); // Limit to two decimal places
          }
        }}
      />
      <p>Note: This is if you know the accurate surface area of your item</p>
    </div>
  );
}
