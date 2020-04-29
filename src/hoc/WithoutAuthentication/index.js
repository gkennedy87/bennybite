import React from "react";
import { connect } from "react-redux";

export default function withoutAuthentication(WrappedComponent) {
    const WithoutAuthentication = (props) => {
        if (props.isAuthenticated) {
            return  props.navigation.navigate('Events');
        }

        return (<WrappedComponent {...props} />);
    };

    const mapStateToProps = (state) => ({
        isAuthenticated: state.auth.isAuthenticated,
    });

    return connect(mapStateToProps)(WithoutAuthentication);
}
