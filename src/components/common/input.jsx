import React from 'react';


const Input =(props)=>{

    return(
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <input type={props.type}
                name={props.name}
                className="form-control" 
                value={props.value} 
                onChange={props.onChange} 
                id={props.name} 
                placeholder={props.placeholder} 
            />
            {props.error && <div className="alert alert-danger">{props.error}</div>}
        </div>

    )

}
export default Input