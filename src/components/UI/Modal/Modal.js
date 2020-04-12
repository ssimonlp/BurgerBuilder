import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

const modal = props => (
    <Aux>
        <Backdrop
            show={props.show}
            click={props.dismiss}
        />
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
        >
            {props.children}
        </div>

    </Aux>
);

const areEqual = (prevProps, nextProps) => (
    prevProps.show === nextProps.show
);

export default React.memo(modal, areEqual);
