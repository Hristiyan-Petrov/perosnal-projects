import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";


export async function action({ request, params }) {
    // throw new Error("oh dang!");
    await deleteContact(params.contactId);
    return redirect('/');
}