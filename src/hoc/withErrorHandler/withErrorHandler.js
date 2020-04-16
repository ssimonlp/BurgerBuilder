import React, { useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    let error = null;

    useEffect(() => {
        axios.interceptors.request.use(req => {
            error = null;
            return req
        })
        axios.interceptors.response.use(null, responseError =>{
            error = responseError;
        });
    }, []);

    return (
        props => (
            <Aux>
                <Modal show={error}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    )
}

export default withErrorHandler;
