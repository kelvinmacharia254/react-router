import {redirect} from 'react-router-dom'

import { deleteContact} from "../contacts.js";

export async function action({params}){
    throw new Error("Can't delete contact")
    await deleteContact(params.contactId);
    return redirect("/")
}