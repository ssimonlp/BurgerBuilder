import React from 'react';
import classes from './Button.css'

const button = (props) => (
    <button
        className={[classes.Button, classes[props.btnStyle]].join(' ')}
        onClick={props.click}
    >
        {props.children}
    </button>
);

export default button;
