import React from "react";
import { connect } from "react-redux";

export default function withAuthentication(WrappedComponent) {
    const WithAuthentication = (props) => {
        if (!props.isAuthenticated) {
            return  props.navigation.navigate('Login');
        }

        return (<WrappedComponent {...props} />);
    };

    const mapStateToProps = (state) => ({
        isAuthenticated: state.auth.isAuthenticated,
    });

    return connect(mapStateToProps)(WithAuthentication);
}
