export default function itemCard({ item, rate }) {
  return (
    <div className="stats shadow bg-white text-sm">
      <div className="stat bg-white">
        <div className="stat-title bg-white">Price</div>
        <div className="stat-value bg-white text-[1.5rem]">
          ${((item.area / 100) * rate).toFixed(2)}
        </div>
      </div>

      <div className="stat bg-white">
        <div className="stat-title bg-white">Pattern</div>
        <div className="stat-value bg-white">
          <img className="text-sm" alt="pattern" />
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
