import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Root, {loader as rootLoader, action as rootAction} from "./routes/Root.jsx";

import ErrorPage from "./error-page.jsx";
import Contact,{loader as contactLoader} from "./routes/contact.jsx";
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
                }
            ]
        },
    ])

    return <RouterProvider router={router} />
}