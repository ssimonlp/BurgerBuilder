import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p className={classes.CurrentPrice}>Current price : {props.price.toFixed(2)}</p>
        {controls.map(control =>
            <BuildControl
                label={control.label}
                key={control.label}
                added={() => props.ingredientAdded(control.type)}
                removed={() => props.ingredientRemoved(control.type)}
                disabled={props.disabled[control.type]}
            />
        )}
        <button
            onClick={props.purchasing}
            className={classes.OrderButton}
            disabled={!props.orderable}
            >
            ORDER NOW
        </button>
    </div>
);

export default buildControls;
