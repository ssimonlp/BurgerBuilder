import React, { Component } from 'react';
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        orderable: false,
        purchasing: false,
        loading: false
    }

    updateOrderableState = (ingredients) => {
        const quantities = Object.keys(ingredients)
            .map(ingredient => ingredients[ingredient])
            .reduce((acc, el) => acc + el, 0)
        this.setState({ orderable: quantities > 0 })
    }

    purchaseCancelHandler = () => {
        const purchasing = !this.state.purchasing
        this.setState({ purchasing: purchasing })
    }

    postOrder = async () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice
        }
        try {
            const post = await axios.post('/orders.json', order);
            this.setState(prevState => ({ loading: !prevState.loading, purchasing: !prevState.purchasing }));
        }
        catch(error) {
            this.setState(prevState => ({ loading: !prevState.loading, purchasing: !prevState.purchasing }));
            console.log(error)
        }
    }

    purchaseContinueHandler = () => {
        this.setState(prevState => ({ loading: !prevState.loading }), this.postOrder)
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
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
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
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updateOrderableState(updatedIngredients);
    };

    render() {
        const disabledInfos = {
            ...this.state.ingredients
        };
        for (let ingredient in disabledInfos) {
            disabledInfos[ingredient] = disabledInfos[ ingredient] <= 0
        }
        let orderSumary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            clickCancel={this.purchaseCancelHandler}
            clickContinue={this.purchaseContinueHandler}
        />
        if(this.state.loading) {
            orderSumary = <Spinner />
        }
        return(
            <Aux>
            <Modal
                show={this.state.purchasing}
                dismiss={this.purchaseCancelHandler}
            >
                {orderSumary}
            </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfos}
                    price={this.state.totalPrice}
                    orderable={this.state.orderable}
                    purchasing={this.purchaseCancelHandler}
                />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
