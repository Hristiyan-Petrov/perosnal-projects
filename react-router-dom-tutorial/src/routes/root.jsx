import { Outlet, useLoaderData, Form, NavLink, useNavigation } from "react-router-dom";
import { createContact, getContacts } from "../contacts";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export async function action() {
    console.log('Root action running...');

    const contact = await createContact();
    return { contact };
}

export async function loader() {
    console.log('Root loader running...');
    const contacts = await getContacts();
    return { contacts };
}

export default function Root() {
    const { contacts } = useLoaderData();
    const navigation = useNavigation();

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length
                        ? (<ul>
                            {contacts.map(contact => (
                                <li key={contact.id}>

                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? 'active'
                                                : isPending
                                                    ? 'pending'
                                                    : ''
                                        }
                                    >
                                        {contact.first || contact.last
                                            ? <>{contact.first} {contact.last}</>
                                            : <i>No name</i>
                                        }
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>)
                        : (
                            <p>
                                <i>No contacts</i>
                            </p>
                        )
                    }
                </nav>
            </div>
            <div id="detail">
                {
                    navigation.state === 'loading'
                        ? <LoadingSpinner />
                        // ? <SkeletonLoading />
                        : <Outlet />
                }
            </div>
        </>
    );
}

// Static skeleton 
function SkeletonLoading() {
    return (
        <div id="contact">
            <div style={{ width: '200px', height: '200px' }}>
                <Skeleton height="100%" />
            </div>
            <div style={{ flex: 1 }}>
                <h1><Skeleton width={300} height={40} /></h1>
                <div style={{ marginTop: '1rem' }}>
                    <Skeleton count={3} />
                </div>
            </div>
        </div>
    );
}