import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Root from "./routes/Root.jsx";

import ErrorPage from "./error-page.jsx";
export default function App() {
    const router = createBrowserRouter([
        {
            path:"/",
            element: <Root/>,
            errorElement: <ErrorPage/>
        }
    ])

    return <RouterProvider router={router} />
}