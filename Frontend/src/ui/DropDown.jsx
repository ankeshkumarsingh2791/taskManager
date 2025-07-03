import react, { useState } from "react";

const option = ["Ankesh", "Prafull", "Anuj"];
const DropDown = ({ title = "Click" }) => {
  const [show, setShow] = useState(false);
  return (
    <div onClick={() => setShow(!show)} className="w-full px-4 py-2   ">
      <h2>{title}</h2>
      {show && (
        <div className="w-full z-10   bg-white">
          {option.map((option, index) => (
            <div
              key={index}
              onClick={() => setShow(false)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-50 text-sm"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
