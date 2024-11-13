import { useAuth0 } from "@auth0/auth0-react";
import FormView from "../../components/FormView/FormView";
import useUserCompanies from "../../hooks/useUserCompanies";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function createOffer() {
    const { user } = useAuth0();
    const navigate = useNavigate();
    const { userCompanies, loading, error } = useUserCompanies(user.sub);

    if (!loading && userCompanies.length === 0) {
        toast.warning('Create company profile first to create offer');
        return navigate('/profile/companies');
    }

    const userCompaniesFormatted = userCompanies.map(company => company.name);

    const inputFields = [
        {
            type: "text",
            name: "title",
            placeholder: "Title",
        },
        {
            type: "select",
            name: "category",
            placeholder: "Category",
            options: [
                // TODO: Extract them
                'IT',
                'Agriculture',
                'Restaurants and tourism',
                'Finance',
                'Psychology'
            ]
        },
        {
            type: "select",
            name: "company",
            placeholder: "Company",
            options: userCompaniesFormatted
        },
        {
            type: "textarea",
            name: "description",
            placeholder: "Description",
        },
        // {
        //     type: "TODO",   // Should be interactive somehow
        //     name: "requirements",
        //     placeholder: "Requirements",
        //     // rows: "4",
        //     // cols: "50",
        // },
        {
            type: "salary-range",   // Should be two inputs with texts 'from' 'to'
            name: "salary",
            placeholder: "Salary Range",
        },
    ]

    return (
        <FormView
            title={'Create Offer'}
            inputFields={inputFields}
            buttonContent={'Post Offer'}
        />
    );
}