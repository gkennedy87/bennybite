import React from "./node_modules/react";
import PropTypes from "./node_modules/prop-types";
import { connect } from "./node_modules/react-redux";
import { Redirect } from "./node_modules/react-router-dom";

export default function withAuthentication( WrappedComponent ) {
    const WithAuthentication = ( props ) => {
        if ( !props.isAuthenticated ) {
            return <Redirect to="/auth/signin" />;
        }

        return ( <WrappedComponent { ...props } /> );
    };

    const { bool } = PropTypes;

    WithAuthentication.propTypes = {
        isAuthenticated: bool.isRequired,
    };

    const mapStateToProps = ( state ) => ( {
        isAuthenticated: state.auth.isAuthenticated,
    } );

    return connect( mapStateToProps )( WithAuthentication );
}
