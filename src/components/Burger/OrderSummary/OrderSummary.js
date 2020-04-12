import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
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
            <p><strong>Total price: {props.price.toFixed(2)}$</strong></p>
            <Button
                btnType='Danger'
                click={props.clickCancel}
            >
                Cancel
            </Button>
            <Button
                btnType='Success'
                click={props.clickContinue}
            >
                Continue
            </Button>
        </Aux>
    )
}

export default orderSummary
