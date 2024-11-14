import { useAuth0 } from "@auth0/auth0-react";
import FormView from "../../components/FormView/FormView";
import useUserCompanies from "../../hooks/useUserCompanies";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as offerService from '../../services/offerService';
import LoadingAnimation from "../../components/LoadingAnimation";

export default function createOffer() {
    const { user } = useAuth0();
    const location = useLocation();
    const navigate = useNavigate();
    const { userCompanies, loading, error } = useUserCompanies(user.sub);

    if (loading) return <LoadingAnimation/>;

    if (userCompanies.length === 0) {
        toast.warning('Create company profile first to create offer');
        return navigate('/profile/companies');
    }

    const companySelected = location.state?.companySelected || null;

    const userCompaniesFormatted = userCompanies.map(company => company.title);

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
                // TODO: Extract them from constants
                'IT',
                'Agriculture',
                'Restaurants and tourism',
                'Finance',
                'Psychology'
            ]
        },
        {
            type: "select",
            name: "companyName",
            placeholder: "Company",
            options: userCompaniesFormatted
        },
        {
            type: "textarea",
            name: "description",
            placeholder: "Description",
        },
        {
            type: 'number',
            name: "experience",
            placeholder: 'Years of experience',
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
            optional: true
        },
    ];

    const onOfferCreateSubmitHandler = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData.entries());

        offerService.create(values)
            .then(res => {
                console.log(res);
                toast.success(res.message);
                navigate(`/companies/${res.offerCompanyId}`);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <FormView
            title={'Create Offer'}
            onSubmitHandler={onOfferCreateSubmitHandler}
            inputFields={inputFields}
            buttonContent={'Post Offer'}
            companySelected={companySelected}
        />
    );
}