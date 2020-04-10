import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredient => {
            return(
                <li key={ingredient}>
                    <span style={{textTransform: 'capitaliser'}}>
                        {ingredient}: {props.ingredients[ingredient]}
                    </span>
                </li>
            )
        });
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <Button>Cancel</Button>
        </Aux>
    )
}

export default orderSummary
