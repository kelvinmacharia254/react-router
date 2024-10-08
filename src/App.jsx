import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Root, {loader as rootLoader} from "./routes/Root.jsx";

import ErrorPage from "./error-page.jsx";
import Contact from "./routes/contact.jsx";
export default function App() {
    const router = createBrowserRouter([
        {
            path:"/",
            element: <Root/>,
            errorElement: <ErrorPage/>,
            loader: rootLoader,
            children:[
                {
                    path:"contact/:contactId",
                    element: <Contact/>,
                }
            ]
        },
    ])

    return <RouterProvider router={router} />
}