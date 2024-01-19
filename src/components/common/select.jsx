import React from 'react';


const Select =(props)=>{

    return(
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <select className="form-control" onChange={props.onChange} value={props.value} name={props.name} id={props.name}>
                <option value="" />
                {props.options.map(option=>(
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
    </select>
            {props.error && <div className="alert alert-danger">{props.error}</div>}
        </div>

    )

}
export default Select