import React, { useState } from "react";

const DropDown = ({ option = [], onClick }) => {
  const [show, setShow] = useState(false);

  const handleSelect = (item) => {
    onClick?.(item); // pass the selected item back
    setShow(false);  // close dropdown
  };

  return (
    <div className="relative w-full max-w-sm">
      <button
        onClick={() => setShow(!show)}
        className="w-full px-4 py-2 border flex  border-gray-300 rounded-md bg-white shadow-sm text-left"
      >
        <h2 className="text-gray-700">Select Project</h2>
        <span className="float-right">{show ? "▲" : "▼"}</span>
      </button>

      {show && (
        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md z-10">
          {option.length === 0 ? (
            <div className="px-4 py-2 text-gray-500 text-sm">No projects found</div>
          ) : (
            option.map((item) => (
              <div
                key={item._id}
                onClick={() => handleSelect(item)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
              >
                {item.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DropDown;
