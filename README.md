## About this project
Sourced from [reactrouter.com](https://reactrouter.com/en/main/start/tutorial)

### Functionality of the app 
- creating data
- reading data
- searching
- updating
- deleting data. 

Real world web apps do API calls from web server for data, this app uses browser storage and fakes some 
network latency to mimic real network behavior. 

## React Router

Exploring React Router

### Traditional routing
The client would request documents from the server, downloads and evaluates
the front-end assets(CSS & JS) then render the HTML.

To request another page, the user would click links and then the whole process would
repeat over and over again. The downside was the request of assets from server over again and then evaluation.
This impacted user experience, the client side routing promised to solve this by handling assets on the client side then requests
left for only for data fetch which needs frequent updating and be in sync as opposed to the assets.

### Why react Router
Enables client side routing.
Client side routing allows the app to update URL from a link clicks to navigate to
other pages without making server request for assets.

The app is able to load pages UI seamlessly as they users navigate the website and only make data request with fetch to
update the various pages with new information when needed.

Client side routing is powered by creating a router & linking then allowing submission of data
via forms.


### Key concepts
1. Router

2. Root layouts or root route
   - This is the first route where the rest if the routes renders inside.
   - It serves as root layout of the UI.

3. Handling Not Found Errors
   - create an error element and use useRouteError() to fetch errors and display on the error page.
   - This page is listed on the errorElement property of the route
4. Nested links
   - When pages are nested into via the children, the parent component or page shows
    across its children. Root page could contain a general layout of an application, common navigation bar or even common detail for all pages.
   - We use ```<Link>``` provided the ```react-router-dom``` which renders the requested UI route without sending a request(page refresh) as with traditional html <a> tag.

5. Loading data and URL Params
     ### Loaders
   - As we navigate the UI, our app requires contextual data which must be loaded into the app.
   - URL segments, layouts and data are tied together therefore, react-router proposes a convention which 
    should be followed to load data easily.
   - We use ```loader``` & ```useLoaderData``` APIs to load data. 
   - Loader functions are used to load data into the different pages mostly from backend APIs keeping the UI synchronized with the data source.
     ### URL Params in Loaders
    - Params are dynamic segments in URL which matches dynamic(changing) values e.g. the Id of a single resource.
    - Params are passed to the loader with keys that match the dynamic segment like `resources/:id`

6. Working with form and react-router 
    - Traditional HTML forms, would trigger submission of data to via ```GET``` or ```POST``` to the server including the URLSearchParams for GET.
    - react-router-dom provides its own Form element which instead of sending request direct to server, it uses
      client side routing to send it to a route action.
    - 
