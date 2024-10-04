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
repeat over and over again. The downside was the request of assests over network and then eavaluation over and over again.
This impacted user experience, the client side routing promised to solve this by handling assets on the client side then requests
left for data which needs frequent updating as opposed to the assets.

### Why react Router
Enables client side routing.
Client side routing allows the app to update URL from a link clicks to navigate to
other pages without making server request for assets.

The app is able to load pages UI seamlessly as they users navigate the website and only make data request with fetch to
update the various pages with new information when needed.

Client side routing is powered by creating a router & linking then allowing submission of data
via forms.


### Key concepts
1. Adding a Router



