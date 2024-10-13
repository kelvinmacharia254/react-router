import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import {getContacts, createContact} from "../contacts.js";
import {useEffect} from "react";

export async function loader({request}){
  // get search query
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return {contacts, q}
}

export async function action(){
  const contact = await createContact();
  return redirect(`/contact/${contact.id}/edit`)
}


export default function Root() {
  const {contacts, q} = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  // set boolean to check if search is in progress
  // two conditions includes: if location exists and if the query exists
  // if both conditions are met, set searching to true and vice versa
  // this will be used to show the spinner conditionally
  const searching =
      navigation.location && new URLSearchParams(navigation.location.search).has("q");
    useEffect(()=>{
      document.getElementById("q").value = q;
    })

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange ={(event) => {
                // check if the search is the first search
                const isFirstSearch = q == null
                // submit the form with the replace option
                submit(event.currentTarget.form,{replace:isFirstSearch})
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                      to={`contact/${contact.id}`}
                      className={({isActive,isPending})=>
                      isActive? "active": isPending? "pending": ""}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail"
           className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet/>
      </div>
    </>
  );
}
