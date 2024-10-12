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

3. Handling Errors
   - Errors like 404 Not Found can be handled by defining an error element.
   - Use useRouteError() to access the error details to display on a custom error page.
   - We can have an errorElement for each route or set one on the root element to ensure a consistent error page across the app.

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

6. Form submission 
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
   
   ### Action Matching
   - The form’s action attribute is crucial for routing. It must correspond to a defined route that can handle the operation.
   - For example, if the form specifies ```action="destroy"```, there needs to be a route defined e.g., ```contact/:contactId/destroy``` that can process this action.
   - The action route must be defined in the router and have an action function that processes the form submission.
   
7. Active Link Styling
   - Active link styling is a common feature in web apps that highlights the current page in the navigation bar.
   - Allows users to know where they are on the page they are currently on.
   - React Router provides a NavLink component that allows you to style active links.
   - We can still use <a> to refer to the <NavLink>, CSS will still apply because NavLink renders an anchor tag (<a>) under the hood.

8. App Responsiveness cues.
   - App responsiveness cues are visual indicators that inform users that the app is working on a task.
   - They are especially useful when the app is performing a task that takes time to complete.
   - React Router provides a some hooks that can signal to the user that the application is busy doing something.
   - We can use useNavigation() hook to add a global pending UI.
   - The useNavigation hook is used to determine the current navigation state of the application, it returns the current navigation state which can be one of "idle" | "submitting" | "loading".
   - Depending on the state we can apply some CSS to show the user that the app is busy by using this state to apply css class conditionally.
   - Due to caching, the response is usually faster as the data is not fetched again, so the CSS may not be visible at times

9. Index Routes
   - Index routes are routes that are displayed when the user navigates to the root URL of the app.
   - They are useful for displaying a default page when the user lands on the app. The index routes are also known as default child route.
   - React Router provides a Route component that can be used to define index routes.
   - We use ```{index: true}``` to define an index route instead of ```{path: """}``` like with all other path.

10. Navigation in react router using code.
- Navigation in React Router can be done using the useNavigate hook which is put inside say button click event handler.
   - In this project, we implement this on the ```cancel button``` on the ```EditContact``` route.

11. URL Search Params
   - forms can be used to submit data to the server using the GET method, which appends the form data to the URL as query parameters.
   - GET method is usually default for forms.
   - The request contains an url that can be used to get the search params.
   - The search params can be used to get the query parameters from the URL.
   - When the form is submitted, the URL is updated with the query parameters.
    ```http://127.0.0.1:5173/?q=goodluck```, the query parameter is ```q=goodluck```
   - The search params can be used to get the query parameters from the URL. like this:
   ```jsx
       export async function loader({ request }) {
           const searchParams = new URL(request.url);
           const query = searchParams.get("q"); // q is the name given to the form input field
           // ...
       }
   ```

   - Note, unlike POST, GET method does not require an action to be defined in the router.
   - When submitting a form with the GET method, the form data is appended to the URL as query parameters which is like clicking a link 
     only that the URL is updated with the form data which the loader uses to filter.

12. Synchronizing URLs to Form State
   - When a form is submitted, the URL is updated with the form data.
   - The form data is used to filter the data displayed on the page.
     ### How are forms and the URL out of sync?
   - i. However, if you click the browser back button after search, the form still retains the search query but the URL does not, also the data is not filtered.
   - ii. If the page is refreshed, the search query is cleared on the form but the URL still retains the search query, again the data is not filtered.
     
     ### How to synchronize the form and the URL?
      First things first, the query should be stored when a search is trigger, then:
   - i. Sync form and url when back button is pressed by use of useEffect() hook to clear the form input by setting it to the value of search query which is empty.
   - ii. Sync form and url when page is refreshed by including a default value to the form input field.
     