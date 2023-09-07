import { createHashRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRouter'

import App from './App'
import Index from './pages/Index'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

import BaptismalCreate from './pages/baptismal/Create'
import BaptismalFind from './pages/baptismal/Find'

import ConfirmationCreate from './pages/confirmation/Create'
import ConfirmationFind from './pages/confirmation/Find'

import marriageCreate from './pages/marriage/Create'
import marriageFind from './pages/marriage/Find'

import RequestCreate from './pages/request/Create'
import RequestFindForDate from './pages/request/FindForDate'

import EventCreate from './pages/events/Create'
import EventFindDorDate from './pages/events/FindForDate'
import EventFindDorDateUsers from './pages/events/FindForDateUsers'

const Router = createHashRouter([
    {
        basename: '/',
        element: <App />,
        //errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/profile',
                element: (
                    <PrivateRoute
                        component={Profile}
                        role={['USER', 'ADMIN']}
                    />
                ),
            },
            {
                path: '/baptismal/create',
                element: (
                    <PrivateRoute
                        component={BaptismalCreate}
                        role={['ADMIN']}
                    />
                ),
            },

            {
                path: '/baptismal/find',
                element: (
                    <PrivateRoute component={BaptismalFind} role={['ADMIN']} />
                ),
            },

            {
                path: '/confirmation/create',
                element: (
                    <PrivateRoute
                        component={ConfirmationCreate}
                        role={['ADMIN']}
                    />
                ),
            },

            {
                path: '/confirmation/find',
                element: (
                    <PrivateRoute
                        component={ConfirmationFind}
                        role={['ADMIN']}
                    />
                ),
            },
            {
                path: '/marriage/create',
                element: (
                    <PrivateRoute component={marriageCreate} role={['ADMIN']} />
                ),
            },
            {
                path: '/marriage/find',
                element: (
                    <PrivateRoute component={marriageFind} role={['ADMIN']} />
                ),
            },

            {
                path: '/request/createRequest',
                element: (
                    <PrivateRoute
                        component={RequestCreate}
                        role={['USER', 'ADMIN']}
                    />
                ),
            },
            {
                path: '/request/getRequestsForDay',
                element: (
                    <PrivateRoute
                        component={RequestFindForDate}
                        role={['ADMIN']}
                    />
                ),
            },
            {
                path: '/event/create',
                element: (
                    <PrivateRoute component={EventCreate} role={['ADMIN']} />
                ),
            },
            {
                path: '/event/findForDate',
                element: (
                    <PrivateRoute
                        component={EventFindDorDate}
                        role={['ADMIN', 'USER']}
                    />
                ),
            },
            {
                path: '/event/findForDateUsers',
                element: (
                    <PrivateRoute
                        component={EventFindDorDateUsers}
                        role={['ADMIN']}
                    />
                ),
            },
        ],
    },
])

export default Router
