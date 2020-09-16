import React from "react";

import { Route } from 'react-router-dom';

import { getJwt, getUserJwt } from '../../helpers';

import AuthComponent from '../auth/AuthComponent';
import AdminPanelComponent from "../admin/AdminPanelComponent";


function WrapperComponent(props) {

    const [user, setUser] = React.useState({})

    async function fetchAuthUser() {
        const jwt = getJwt()
        console.log("JWT", jwt)
        if (!jwt) {
            return props.history.push('/')
        }

        const user = getUserJwt(jwt)

        setUser(user)
    }

    const loadRoutes = () => {
        const protectedIndex = [8, 9, 12, 15, 16, 17]

        const routes = [
            // { id: 1, path: '/', component: LandingPageComponent },
            { id: 1, path: '/admin', component: () => { return <AdminPanelComponent user={user} /> } },
        ];

        const publicRoutes = routes.filter(route => !protectedIndex.includes(route.id));

        const _routes = user.role === 'admin' ? routes : publicRoutes;

        return _routes.map((route) => {
            return <Route key={route.id} exact path={route.path} component={route.component} />

        })
    }

    React.useEffect(() => {
        fetchAuthUser()
    }, []);

    return (
        <div>
            <AuthComponent loggedInUser={user}>
                {loadRoutes()}
            </AuthComponent>
        </div>
    )
}

export default WrapperComponent;