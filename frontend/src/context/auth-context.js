import React from 'react'

export const defaultAuthContext = {
    isLoggedIn: false,
    userId: null,
    token: null,
    tokenExpiration: null,
    login: (userId, token, tokenExpiration) => {},
    logout: () => {}
};

const AuthContext = React.createContext({
    ...defaultAuthContext
});

export default AuthContext