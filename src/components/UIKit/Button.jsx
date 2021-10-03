import React  from "react";

const Button = (props) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => props.onClick()}
         >
            {props.label}
      </button>
    );
};

export default Button; 