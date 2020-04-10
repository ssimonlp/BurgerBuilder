import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    meat: 2,
    cheese: 1,
    bacon: 1
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        orderable: false
    }
    updateOrderableState = (ingredients) => {
        const quantities = Object.keys(ingredients)
            .map(ingredient => ingredients[ingredient])
            .reduce((acc, el) => acc + el, 0)
        this.setState({orderable: quantities > 0})
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENTS_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updateOrderableState(updatedIngredients);
    };

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENTS_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updateOrderableState(updatedIngredients);
    };

    render() {
        const disabledInfos = {
            ...this.state.ingredients
        };
        for (let ingredient in disabledInfos) {
            disabledInfos[ingredient] = disabledInfos[ ingredient] <= 0
        }
        return(
            <Aux>
            <Modal />
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfos}
                    price={this.state.totalPrice}
                    orderable={this.state.orderable}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
