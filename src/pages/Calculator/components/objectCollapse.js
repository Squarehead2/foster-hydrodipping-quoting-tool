export default function objectCollapse({ objects, handleDeleteObject }) {
  return objects.map((object, index) => (
    <>
      <div
        tabIndex={0}
        className="collapse collapse-arrow border border-base-300 bg-white"
      >
        <div className="flex flex-row items-center justify-start collapse-title text-xl font-medium bg-white">
          <button
            className="btn btn-square bg-white border-white shadow-none mt-[-10%] w-1/4 h-1/4"
            onClick={() => handleDeleteObject(index)}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {object.name === "Raw Surface Area" ? (
            <div className="mt-[-10%] bg-white text-sm">{object.name}</div>
          ) : (
            <div className="mt-[-10%] bg-white text-[1rem]">{object.name}</div>
          )}
        </div>
        <div className="collapse-content bg-white">
          <div className="flex flex-row w-full items-center justify-center">
            <p className="text-black text-sm">Surface Area:</p>
            <p className="text-black text-sm">
              {object.area} cm<sup>2</sup>
            </p>
          </div>
        </div>
      </div>
    </>
  ));
}
