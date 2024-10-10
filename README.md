## About this project
This project is a CRUD (Create, Read, Update, Delete) web application that demonstrates the basic functionality of a web app, 
including data management and client-side routing using React Router. 
While real-world applications usually perform API calls to fetch and update data from a server, 
this project mimics real-world network behavior using browser storage and simulated network latency.
Sourced from [reactrouter.com](https://reactrouter.com/en/main/start/tutorial)

### Functionality of the app 
- Create new data entries
- Read and display existing data
- Search through data entries
- Update existing data
- Delete data entries 

### Technologies used
- React: For building the user interface
- React Router: For client-side routing and navigation
- Browser Storage: For local data persistence (instead of a server-based database)
- Simulated Network Latency: To mimic real-world network conditions

## React Router

Exploring React Router

### Traditional routing
Every navigation between pages required the client (browser) to request the full HTML document from the server, which included front-end assets like JavaScript and CSS.
This approach led to repeated asset downloads and re-evaluations on every page load, negatively impacting user experience (e.g., slower transitions between pages

### Why react Router
React Router enables client-side routing, which significantly improves user experience compared to traditional server-side routing.

The app is able to load pages UI seamlessly as they users navigate the website and only make data request with fetch to
update the various pages with new information when needed.

Client side routing is powered by creating a router & linking then allowing submission of data
via forms.


### Key concepts
1. Router
   - The router is the root component of the React Router library. It keeps the UI in sync with the URL.
   - A router defines the structure of your app’s routes. It allows navigation between different components and pages without refreshing the browser.
2. Root layouts or root route
   - The root route acts as the base layout for the entire app.
   - All other routes (pages) are nested inside the root layout. This layout usually includes common elements such as a navigation bar or a footer.

3. Handling Not Found Errors
   - You can handle 404 Not Found errors by defining an error element.
   - Use useRouteError() to access the error and display it on a custom error page.
   - This page is set using the errorElement property in the route definition.
4. Nested links
   - React Router supports nested routes, meaning child routes can be rendered inside parent routes.
   - This is useful for layouts that are consistent across multiple pages (e.g., a shared sidebar or navigation menu).
   - Use ```<Link>``` provided the ```react-router-dom``` instead of traditional <a> tags to allow seamless navigation without a full page reload.
   - The ```<Link>``` component accepts a prop that specifies the target route and ```to``` attribute in place of ```href```.
     e.g. for a Root page with a list of contacts, we can link to a contact detail page like this:
        ```jsx
            <Link to={`contact/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
        ```

5. Loading data and URL Params
      ### Loaders
      - As we navigate the UI, our app requires contextual data which must be loaded into the app.
      - URL segments, layouts and data are tied together therefore, react-router proposes a convention which 
       should be followed to load data easily.
      - We use ```loader``` & ```useLoaderData``` APIs to load data. 
      - The data loaded by ```loader``` functions can be accessed in components using ```useLoaderData()```.
      
      ```jsx
           export function Contact() {
               const contact = useLoaderData();
               return (
                   <div>
                       <h1>{contact.first} {contact.last}</h1>
                       <p>{contact.phone}</p>
                       <p>{contact.email}</p>
                   </div>
               );
           }
       ```
   
       - The loader function is an async function that fetches data from an API or other source.
   
      ```jsx
         export async function loader({ params }) {
             const response = await fetch(`/api/resources/${params.id}`);
             if (!response.ok) throw new Error(response.statusText);
             return response.json();
         }
      ```

      ### URL Params in Loaders
     - Params are dynamic segments in URL which matches dynamic(changing) values e.g. the Id of a single resource.
     - Params are passed to the loader with keys that match the dynamic segment like `resources/:id`
     
     ````jsx
         export async function loader({ params }) {
             const response = await fetch(`/api/resources/${params.id}`);
             if (!response.ok) throw new Error(response.statusText);
             return response.json();
         }
     ````

6. Working with forms and react-router 
    - Traditional HTML forms, would trigger submission of data to via ```GET``` or ```POST``` to the server including the URLSearchParams for GET.
    - react-router-dom provides its own Form element which instead of sending request direct to server, it uses
      client side routing to send it to a route action which may be a function making ```POST``` http request to APIs.
    - The actions make ```POST``` which means data has been updated which requires synchronization with the UI, this where
      ```react-route-dom``` internal mechanism comes in where the useLoaderData hooks triggers automatic UI update with the latest data.
    - In others words ```useLoaderData``` carries the work of ```useState ```hook, ```onSubmit``` handlers, ```useEffect``` hook etc
   
    - The React ```Form``` element prevents default form submission, the FormData in the body of the request is intercepted and sent to the action provided to the Form host route.
    - Each form field is accessed with ```formData.get(name)```. We could code the action like this:
     
   ```jsx
      export async function action({ request, params }) {
        const formData = await request.formData();
        const firstName = formData.get("first");
        const lastName = formData.get("last");
        // ...
       }
   ```
    - However, we can conveniently use ```Object.fromEntries``` to collect all fields.
   ```jsx
        export async function action({ request, params }) {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            // ...
         }
   ```
    - NB. FormData APIs like ```request.formData()``` and ```Object.fromEntries()``` are standard browser features that help simplify form handling.
    - Finally, the action must return a response, often a redirect page
    ```jsx
        export async function action({ request, params }) {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            // ...
            return redirect(`/resources/${id}`);
         }
    ```