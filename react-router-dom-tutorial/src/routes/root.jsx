import { Outlet, useLoaderData, Form, NavLink, useNavigation, useSubmit } from "react-router-dom";
import { createContact, getContacts } from "../contacts";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect } from "react";

export async function action() {
    console.log('Root action running...');
    const contact = await createContact();
    return { contact };
}

export async function loader({ request }) {
    console.log('Root loader running...');

    // Wait for 1 seconds
    // await new Promise(resolve => setTimeout(resolve, 2000));

    const url = new URL(request.url);
    const query = url.searchParams.get('query');

    const contacts = await getContacts(query);
    return { contacts, query };
}

export default function Root() {
    const { contacts, query } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    // console.log('Navigation: ' + navigation);

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has('query');

    useEffect(() => {
        document.getElementById('query').value = query;
    }, [query])

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="query"
                            // className={searching ? 'loading' : ''}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="query"
                            defaultValue={query}
                            onChange={e => {
                                const isFirstSearch = query == null;
                                submit(e.currentTarget.form, {
                                    replace: !isFirstSearch
                                });
                            }}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            // hidden={true}
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
                    {contacts.length
                        ? (<ul>
                            {contacts.map(contact => (
                                <li key={contact.id}>

                                    <NavLink
                                        to={query
                                            ? `contacts/${contact.id}/?query=${query}`
                                            : `contacts/${contact.id}`
                                        }
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