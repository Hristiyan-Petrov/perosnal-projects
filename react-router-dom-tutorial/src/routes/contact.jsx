import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export async function action({ request, params }) {
    const formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get('favorite') === 'true'
    });
}

export const loader = async ({ params }) => {
    console.log('Contact loader running...');

    // Wait for 1 seconds
    await new Promise(resolve => setTimeout(resolve, 1000));

    return getContact(params.contactId);
};

export default function Contact() {
    const contact = useLoaderData();

    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={
                        contact.avatar ||
                        `https://robohash.org/${contact.id}.png?size=200x200`
                    }
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last
                        ? (
                            <>
                                {contact.first} {contact.last}
                            </>
                        )
                        : (
                            <i>No Name</i>
                        )}{" "}

                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div className="contact-options">
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={destroyHandler}
                    >
                        <button type="submit" className="delete">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

function destroyHandler(e) {
    if (
        !confirm(
            "Please confirm you want to delete this record."
        )
    ) {
        e.preventDefault();
    }
}

function Favorite({ contact }) {
    const fetcher = useFetcher();
    const favorite = contact.favorite;

    return (
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}