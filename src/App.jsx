import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Root, {loader as rootLoader, action as rootAction} from "./routes/Root.jsx";

import ErrorPage from "./error-page.jsx";
import Contact,{loader as contactLoader} from "./routes/Contact.jsx";

import EditContact, {action as editAction} from "./routes/EditContact.jsx";

import {action as destroyAction} from "./routes/Destroy.jsx";
export default function App() {
    const router = createBrowserRouter([
        {
            path:"/",
            element: <Root/>,
            errorElement: <ErrorPage/>,
            loader: rootLoader,
            action: rootAction,
            children:[
                {
                    path:"contact/:contactId",
                    element: <Contact/>,
                    loader: contactLoader,
                },
                {
                    path:"contact/:contactId/edit",
                    element: <EditContact/>,
                    loader: contactLoader,
                    action: editAction,
                },
                {
                    path:"contact/:contactId/destroy",
                    action: destroyAction,
                }
            ]
        },
    ])

    return <RouterProvider router={router} />
}