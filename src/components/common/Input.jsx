import React from "react";

const Input = (props) => {
    const { type, error,title, name,...rest } = props;
    return (
        <div className="mb-3">
        <label htmlFor={name} className="form-label">{title}</label>
        <input type={type} className="form-control" id={name} name={name} {...rest}/>
        {error && <div className="text-danger mt-2 mx-3">{error}</div>}
      </div>
                


    );

};

export default Input