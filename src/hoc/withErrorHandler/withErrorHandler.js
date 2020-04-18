import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    const [error, setErrror] = useState(null);

    useEffect(() => {
        setErrror(null);
        axios.interceptors.request.use(req => {
            setErrror(null);
            return req
        })
        axios.interceptors.response.use(null, responseError =>{
            setErrror(responseError);
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
