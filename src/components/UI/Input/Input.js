import React from 'react';
import classes from './Input.css';
const Input = (props) => {
    let input;
    let inputClasses=[classes.InputElem];
    if (props.invalid && props.req && props.touched)
    {
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case 'input':
            input = <input className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>;
            break;

        case 'textArea':
            input = <textarea className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} onChange={props.changed}/>;
            break;
        case 'select':
            input = (
                <select className={inputClasses.join(' ')}
                value={props.value} 
                onChange={props.changed}>
                    {props.elementConfig.options.map(
                        config=>{
                            return <option key={config.value} value={config.value}>
                                {config.displayValue}
                            </option>
                        }
                    )}
                </select>
            );
            break;
        default:
            input = <input className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>;
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {input}
        </div>
    );
}
export default Input;