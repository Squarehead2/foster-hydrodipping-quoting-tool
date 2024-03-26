export default function itemCard({ item, rate, imgSrc }) {
  return (
    <div className="stats shadow bg-white text-sm">
      <div className="stat bg-white">
        <div className="stat-title bg-white">Price </div>
        <div className="stat-value bg-white text-[1.5rem]">
          ${((item.area * item.rate) / 100).toFixed(2)}
        </div>
      </div>

      <div className="stat bg-white">
        <div className="stat-title bg-white">Pattern</div>
        <div className="stat-value bg-white flex justify-center items-center">
          {item.patternUrl ? (
            <img
              className="text-sm w-10 h-10"
              src={item.patternUrl}
              alt="pattern"
            />
          ) : (
            <div className="text-sm">No Pattern</div>
          )}
        </div>
      </div>

      <div className="stat bg-white">
        <div className="stat-title bg-white">Surface Area</div>
        <div className="stat-value bg-white text-[1.5rem]">
          {item.area} cm<sup>2</sup>
        </div>
      </div>
    </div>
  );
}
