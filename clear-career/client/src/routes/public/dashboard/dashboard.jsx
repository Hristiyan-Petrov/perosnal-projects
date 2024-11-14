import { useAuth0 } from "@auth0/auth0-react";
import { useAuthNotification } from "../../../hooks/useAuthNotification";
import { AUTH_LOCAL_STORAGE_KEYS, AUTH_MESSAGES } from "../../../constants/messages";
import { useLoaderData } from "react-router-dom";
import styles from './dashboard.module.scss';
import DashboardCardView from "../../../components/offers/DashboardCardView/DashboardCardView";

// export const loader = () => {
//     return fetch('http://localhost:3000/status')
//         .then(res => res.json())
//         .then(res => {
//             // console.log(res)
//             return res;
//         })
//         .catch(err => console.log(err))
//         .finally(res => res);
// }

export default function Dashboard() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    useAuthNotification(isAuthenticated, isLoading, AUTH_MESSAGES.loginSuccess, AUTH_LOCAL_STORAGE_KEYS.loginNotification);

    const offers = [
        {
            _id: '1',
            title: 'Software Engineer',
            salary: '8000-8000',
            company: {
                name: 'PayHawk',
                imageUrl: './images/example1.png',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis atque asperiores, quia ullam sapiente quis delectus fuga dolor neque, ducimus quo culpa vel, illo ab incidunt laborum! Vero, expedita adipisci!'
            },
            category: 'IT',
            experience: 2,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum et earum aut, ipsa, molestias animi nam veritatis tempora adipisci nulla maiores, autem iusto pariatur nostrum sequi nemo qui id dolor facere similique cum? Maxime esse omnis ducimus sequi et iusto beatae perspiciatis modi minima deserunt, fuga ipsa, qui distinctio? Ullam error, corporis et quo quaerat nemo doloribus obcaecati quidem! Labore ipsam delectus nisi accusantium omnis, cumque corrupti vero impedit enim iure ex reprehenderit quidem nesciunt explicabo. Molestiae provident quisquam expedita qui architecto assumenda, totam voluptatibus ipsa laudantium illo, facilis quaerat. Doloremque ratione, maiores asperiores, accusantium voluptas magnam quasi quam incidunt repellat accusamus iste, ipsa quod saepe numquam amet! Numquam impedit laborum asperiores neque assumenda maiores ut quam odit natus obcaecati consequatur vel amet sint ab et sit provident dolores adipisci itaque, tenetur voluptates quo. Atque aperiam voluptas, quod autem fuga dolor ea iste magni iusto amet suscipit voluptatum, optio, odit a incidunt necessitatibus illo. Ducimus sed deserunt eaque doloremque sequi unde architecto consequuntur dolor mollitia. Doloribus omnis, odio tenetur ea reprehenderit ad ducimus incidunt delectus eaque, voluptatibus, corrupti quibusdam atque. Cum similique aliquam voluptatibus deserunt voluptate, laboriosam quos pariatur dolorem sit ipsam a aperiam ipsa consequatur corporis deleniti, doloribus recusandae?',
            // creator: null,
            requirements: '',
            applied: [],
        },
        {
            _id: '2',
            title: 'UI/UX Designer',
            salary: '6500-8000',
            company: {
                name: 'PayHawk',
                imageUrl: './images/example2.png',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis atque asperiores, quia ullam sapiente quis delectus fuga dolor neque, ducimus quo culpa vel, illo ab incidunt laborum! Vero, expedita adipisci!'
            },
            category: 'IT',
            experience: 0,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum et earum aut, ipsa, molestias animi nam veritatis tempora adipisci nulla maiores, autem iusto pariatur nostrum sequi nemo qui id dolor facere similique cum? Maxime esse omnis ducimus sequi et iusto beatae perspiciatis modi minima deserunt, fuga ipsa, qui distinctio? Ullam error, corporis et quo quaerat nemo doloribus obcaecati quidem! Labore ipsam delectus nisi accusantium omnis, cumque corrupti vero impedit enim iure ex reprehenderit quidem nesciunt explicabo. Molestiae provident quisquam expedita qui architecto assumenda, totam voluptatibus ipsa laudantium illo, facilis quaerat. Doloremque ratione, maiores asperiores, accusantium voluptas magnam quasi quam incidunt repellat accusamus iste, ipsa quod saepe numquam amet! Numquam impedit laborum asperiores neque assumenda maiores ut quam odit natus obcaecati consequatur vel amet sint ab et sit provident dolores adipisci itaque, tenetur voluptates quo. Atque aperiam voluptas, quod autem fuga dolor ea iste magni iusto amet suscipit voluptatum, optio, odit a incidunt necessitatibus illo. Ducimus sed deserunt eaque doloremque sequi unde architecto consequuntur dolor mollitia. Doloribus omnis, odio tenetur ea reprehenderit ad ducimus incidunt delectus eaque, voluptatibus, corrupti quibusdam atque. Cum similique aliquam voluptatibus deserunt voluptate, laboriosam quos pariatur dolorem sit ipsam a aperiam ipsa consequatur corporis deleniti, doloribus recusandae?',
            // creator: null,
            requirements: '',
            applied: [],

        },
        {
            _id: '3',
            title: 'Frontend Developer',
            salary: '8000-10000',
            company: {
                name: 'PayHawk',
                imageUrl: './images/example3.png',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis atque asperiores, quia ullam sapiente quis delectus fuga dolor neque, ducimus quo culpa vel, illo ab incidunt laborum! Vero, expedita adipisci!'
            },
            category: 'IT',
            experience: 5,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum et earum aut, ipsa, molestias animi nam veritatis tempora adipisci nulla maiores, autem iusto pariatur nostrum sequi nemo qui id dolor facere similique cum? Maxime esse omnis ducimus sequi et iusto beatae perspiciatis modi minima deserunt, fuga ipsa, qui distinctio? Ullam error, corporis et quo quaerat nemo doloribus obcaecati quidem! Labore ipsam delectus nisi accusantium omnis, cumque corrupti vero impedit enim iure ex reprehenderit quidem nesciunt explicabo. Molestiae provident quisquam expedita qui architecto assumenda, totam voluptatibus ipsa laudantium illo, facilis quaerat. Doloremque ratione, maiores asperiores, accusantium voluptas magnam quasi quam incidunt repellat accusamus iste, ipsa quod saepe numquam amet! Numquam impedit laborum asperiores neque assumenda maiores ut quam odit natus obcaecati consequatur vel amet sint ab et sit provident dolores adipisci itaque, tenetur voluptates quo. Atque aperiam voluptas, quod autem fuga dolor ea iste magni iusto amet suscipit voluptatum, optio, odit a incidunt necessitatibus illo. Ducimus sed deserunt eaque doloremque sequi unde architecto consequuntur dolor mollitia. Doloribus omnis, odio tenetur ea reprehenderit ad ducimus incidunt delectus eaque, voluptatibus, corrupti quibusdam atque. Cum similique aliquam voluptatibus deserunt voluptate, laboriosam quos pariatur dolorem sit ipsam a aperiam ipsa consequatur corporis deleniti, doloribus recusandae?',
            // creator: null,
            requirements: '',
            applied: [],

        },
        {
            _id: '4',
            title: 'Data Engineer',
            salary: '8000-9000',
            company: {
                name: 'PayHawk',
                imageUrl: './images/example1.png',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis atque asperiores, quia ullam sapiente quis delectus fuga dolor neque, ducimus quo culpa vel, illo ab incidunt laborum! Vero, expedita adipisci!'
            },
            category: 'IT',
            experience: 3,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum et earum aut, ipsa, molestias animi nam veritatis tempora adipisci nulla maiores, autem iusto pariatur nostrum sequi nemo qui id dolor facere similique cum? Maxime esse omnis ducimus sequi et iusto beatae perspiciatis modi minima deserunt, fuga ipsa, qui distinctio? Ullam error, corporis et quo quaerat nemo doloribus obcaecati quidem! Labore ipsam delectus nisi accusantium omnis, cumque corrupti vero impedit enim iure ex reprehenderit quidem nesciunt explicabo. Molestiae provident quisquam expedita qui architecto assumenda, totam voluptatibus ipsa laudantium illo, facilis quaerat. Doloremque ratione, maiores asperiores, accusantium voluptas magnam quasi quam incidunt repellat accusamus iste, ipsa quod saepe numquam amet! Numquam impedit laborum asperiores neque assumenda maiores ut quam odit natus obcaecati consequatur vel amet sint ab et sit provident dolores adipisci itaque, tenetur voluptates quo. Atque aperiam voluptas, quod autem fuga dolor ea iste magni iusto amet suscipit voluptatum, optio, odit a incidunt necessitatibus illo. Ducimus sed deserunt eaque doloremque sequi unde architecto consequuntur dolor mollitia. Doloribus omnis, odio tenetur ea reprehenderit ad ducimus incidunt delectus eaque, voluptatibus, corrupti quibusdam atque. Cum similique aliquam voluptatibus deserunt voluptate, laboriosam quos pariatur dolorem sit ipsam a aperiam ipsa consequatur corporis deleniti, doloribus recusandae?',
            // creator: null,
            requirements: '',
            applied: [],

        },
        {
            _id: '5',
            title: 'Farmer',
            salary: '6500-9000',
            company: {
                name: 'PayHawk',
                imageUrl: './images/example2.png',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis atque asperiores, quia ullam sapiente quis delectus fuga dolor neque, ducimus quo culpa vel, illo ab incidunt laborum! Vero, expedita adipisci!'
            },
            category: 'Agriculture',
            experience: 2,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum et earum aut, ipsa, molestias animi nam veritatis tempora adipisci nulla maiores, autem iusto pariatur nostrum sequi nemo qui id dolor facere similique cum? Maxime esse omnis ducimus sequi et iusto beatae perspiciatis modi minima deserunt, fuga ipsa, qui distinctio? Ullam error, corporis et quo quaerat nemo doloribus obcaecati quidem! Labore ipsam delectus nisi accusantium omnis, cumque corrupti vero impedit enim iure ex reprehenderit quidem nesciunt explicabo. Molestiae provident quisquam expedita qui architecto assumenda, totam voluptatibus ipsa laudantium illo, facilis quaerat. Doloremque ratione, maiores asperiores, accusantium voluptas magnam quasi quam incidunt repellat accusamus iste, ipsa quod saepe numquam amet! Numquam impedit laborum asperiores neque assumenda maiores ut quam odit natus obcaecati consequatur vel amet sint ab et sit provident dolores adipisci itaque, tenetur voluptates quo. Atque aperiam voluptas, quod autem fuga dolor ea iste magni iusto amet suscipit voluptatum, optio, odit a incidunt necessitatibus illo. Ducimus sed deserunt eaque doloremque sequi unde architecto consequuntur dolor mollitia. Doloribus omnis, odio tenetur ea reprehenderit ad ducimus incidunt delectus eaque, voluptatibus, corrupti quibusdam atque. Cum similique aliquam voluptatibus deserunt voluptate, laboriosam quos pariatur dolorem sit ipsam a aperiam ipsa consequatur corporis deleniti, doloribus recusandae?',
            // creator: null,
            requirements: '',
            applied: [],

        },
        {
            _id: '6',
            title: 'Backend Developer',
            // salary: '8000-9000',
            company: {
                name: 'PayHawk',
                imageUrl: './images/example1.png',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis atque asperiores, quia ullam sapiente quis delectus fuga dolor neque, ducimus quo culpa vel, illo ab incidunt laborum! Vero, expedita adipisci!'
            },
            category: 'IT',
            experience: 2,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum et earum aut, ipsa, molestias animi nam veritatis tempora adipisci nulla maiores, autem iusto pariatur nostrum sequi nemo qui id dolor facere similique cum? Maxime esse omnis ducimus sequi et iusto beatae perspiciatis modi minima deserunt, fuga ipsa, qui distinctio? Ullam error, corporis et quo quaerat nemo doloribus obcaecati quidem! Labore ipsam delectus nisi accusantium omnis, cumque corrupti vero impedit enim iure ex reprehenderit quidem nesciunt explicabo. Molestiae provident quisquam expedita qui architecto assumenda, totam voluptatibus ipsa laudantium illo, facilis quaerat. Doloremque ratione, maiores asperiores, accusantium voluptas magnam quasi quam incidunt repellat accusamus iste, ipsa quod saepe numquam amet! Numquam impedit laborum asperiores neque assumenda maiores ut quam odit natus obcaecati consequatur vel amet sint ab et sit provident dolores adipisci itaque, tenetur voluptates quo. Atque aperiam voluptas, quod autem fuga dolor ea iste magni iusto amet suscipit voluptatum, optio, odit a incidunt necessitatibus illo. Ducimus sed deserunt eaque doloremque sequi unde architecto consequuntur dolor mollitia. Doloribus omnis, odio tenetur ea reprehenderit ad ducimus incidunt delectus eaque, voluptatibus, corrupti quibusdam atque. Cum similique aliquam voluptatibus deserunt voluptate, laboriosam quos pariatur dolorem sit ipsam a aperiam ipsa consequatur corporis deleniti, doloribus recusandae?',
            // creator: null,
            requirements: '',
            applied: [],

        },

    ];

    if (offers.length == 0) {
        return <h2>No offers yet.</h2>
    }

    return (
        <section id="dashboard">
            <h2>Job Offers</h2>

            <div className={styles.offersContainer}>
                {offers.map((offer) => (
                    <DashboardCardView
                        key={offer._id}
                        type={'offer'}
                        {...offer}
                    />
                ))}
            </div>
        </section>
    );
}