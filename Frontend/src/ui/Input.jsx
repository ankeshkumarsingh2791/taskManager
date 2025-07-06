import react from "react";

const Input = ({type, text,value,onChange}) => {
  return (
    <>
      <label htmlFor="Email" className="relative">
        <input
          type={type}
          value={value}
          id={text}
          name={text}
          onChange={onChange}
          placeholder=""
          className="peer mt-0.5 w-full py-2 rounded ring-1 text-gray-500 border-gray-300 shadow-sm sm:text-sm"
        />

        <span className="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
          {text}
        </span>
      </label>
    </>
  );
};

export default Input;
