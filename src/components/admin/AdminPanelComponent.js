import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { getJwt, getUserJwt } from '../../helpers'
import CreateQuestionCompoenent from './CreateQuestionComponent';


function AdminPanelComponent({ history }) {

    const [user, setUser] = useState(null)

    if (user && user.role === 0) {
        history.push('/')
    }

    useEffect(() => {
        const token = getJwt()
        if (token) {
            const loggedInUser = getUserJwt(token);
            setUser(loggedInUser)
        }
    }, [])

    return (
        <div >
            {user && user.role === 1 && (
                <div>
                    <h1>Admin panel</h1>
                    <h2>Create new question</h2>
                    <CreateQuestionCompoenent />
                </div>
            )}

        </div>
    )
}

export default withRouter(AdminPanelComponent);
