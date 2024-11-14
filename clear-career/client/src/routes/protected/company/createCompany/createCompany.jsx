import companyService from '../../../../services/companyService';
import { useNavigate } from "react-router-dom";
import FormView from "../../../../components/FormView/FormView";
import { toast } from "react-toastify";

export default function CreateCompany({

}) {
    const navigate = useNavigate();

    const onCompanyCreateSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData.entries());

        companyService.create(values)
            .then(res => {
                console.log(res);
                toast.success(res.message);
                navigate('/profile/companies');
            })
            .catch(err => {
                console.log(err);
            });
    }

    const inputFields = [
        {
            type: "text",
            name: "title",
            placeholder: "Add Company Title",
        },
        {
            type: "textarea",
            name: "description",
            placeholder: "Add Brief Company Description",
        },
        {
            type: "text",
            name: "imageUrl",
            placeholder: "Add Image URL",
        },
    ];

    return (
        // <h2>Hello</h2>
        <FormView
            onSubmitHandler={onCompanyCreateSubmitHandler}
            title={'Create Company'}
            inputFields={inputFields}
            buttonContent={'Create Company'}
        />
    );
}