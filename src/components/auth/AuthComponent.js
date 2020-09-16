import React from 'react'
import { withRouter } from 'react-router-dom'

function AuthComponent({ loggedInUser, children, history }) {

    if (!loggedInUser) {
        return history.push('/')
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default withRouter(AuthComponent);