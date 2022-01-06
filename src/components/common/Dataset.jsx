import React from "react";

const Dataset = (props) => {
    const { error,title, name,data, path,...rest } = props;
    return (
        <div className="mb-3">
        <label htmlFor={name} className="form-label">{title}</label>
        <input className="form-control" list={title} id={name}  name={name} placeholder="Type to search..." {...rest} />
            <datalist id={title}>
            {data.map(el => <option value={el[path] ? el[path] : el } key={el._id ? el._id : el} />)}
            </datalist>
        {error && <div className="text-danger mt-2 mx-3">{error}</div>}
      </div>
                


    );

};

export default Dataset