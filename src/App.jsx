import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Root, {loader as rootLoader, action as rootAction} from "./routes/Root.jsx";

import ErrorPage from "./error-page.jsx";
import Contact,{loader as contactLoader} from "./routes/Contact.jsx";

import EditContact, {action as editAction} from "./routes/EditContact.jsx";

import {action as destroyAction} from "./routes/Destroy.jsx";

import Index from "./routes/Index.jsx";

import { action as contactAction } from "./routes/Contact.jsx"
export default function App() {
    const router = createBrowserRouter([
        {
            path:"/",
            element: <Root/>,
            errorElement: <ErrorPage/>,
            loader: rootLoader,
            action: rootAction,
            children:[
                {index:true, element: <Index/>},
                {
                    path:"contact/:contactId",
                    element: <Contact/>,
                    loader: contactLoader,
                    action: contactAction,
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
                    errorElement:
                        <div>Not happening. You can't delete a contact.<br/>
                            This error is just to show you how to handle errors in an action.<br/>
                            Disable in `Destroy.jsx` to proceed.<br/>
                        </div>
                }
            ]
        },
    ])

    return <RouterProvider router={router} />
}