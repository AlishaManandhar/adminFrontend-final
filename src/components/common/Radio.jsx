import React from "react";

const Radio = (props) => {
    const {  title, name, data, ...rest } = props;
    return (
        <div className="mb-3">
        <label htmlFor={name} className="form-label pe-3">{title}</label><br />
        {data.map(el => {
            return (
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name={name} id={el.value} value={el.value} {...rest} />
                    <label className="form-check-label" htmlFor={el.value}>{el.title}</label>
                 </div>
            )
        })}
      </div>
                


    );

};

export default Radio