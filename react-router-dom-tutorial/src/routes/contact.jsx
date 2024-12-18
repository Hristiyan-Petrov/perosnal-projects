import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { getContact, updateContact } from "../contacts";
import { useState } from "react";

export async function action({ request, params }) {
    const formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get('favorite') === 'true'
    });
}

export const loader = async ({ params }) => {
    console.log('Contact loader running...');

    // Wait for 1 seconds
    // await new Promise(resolve => setTimeout(resolve, 1000));

    const contact = await getContact(params.contactId);
    if (!contact) {
        throw new Error("Contact not found");
    }
    return contact;
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

    // Optimistic UI
    const favorite = fetcher.formData
    ? fetcher.formData.get('favorite') === 'true'
    : contact.favorite;
    
    const [isHovedred, setIsHovered] = useState(false);
    const toggleHover = () => setIsHovered(prevState => !prevState);

    return (
        <fetcher.Form method="post">
            <button
                className="favorite-button"
                name="favorite"
                value={favorite ? "false" : "true"}
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite
                    ? (isHovedred ? "☆" : "★")
                    : (isHovedred ? "★" : "☆")
                }

                {/* Textbox when hover with action */}
                {/* {isHovedred && <FavoriteLabel favorite={favorite} />} */}
            </button>
        </fetcher.Form>
    );
}

function FavoriteLabel({ favorite }) {
    return (
        <div className="favorite-hover-text">
            {favorite ? 'Remove from favorites' : 'Add to favorites'}
        </div>
    )
}