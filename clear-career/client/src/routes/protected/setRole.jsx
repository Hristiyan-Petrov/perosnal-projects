import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { setRoleService } from "../../services/authService";

export default function SetRole() {
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    const setRole = role => {
        setRoleService(user.sub, role)
            .then(res => res.json())
            .then(user => {
                console.log('NEW user created!');
                console.log(user);
                navigate('/dashboard');
            })
        .catch(err => console.log('Error setting role:', err));
}

return (
    <section>
        <h2>Choose Your Role</h2>
        <div className="role-options">
            <button onClick={() => setRole('job-seeker')}>Searching for a job</button>
            <button onClick={() => setRole('job-offerer')}>Offering job</button>
        </div>
    </section>
);
}