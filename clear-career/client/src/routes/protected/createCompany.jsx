import FormView from "../../components/FormView/FormView";

export default function CreateCompany({

}) {

    const inputFields = [
        {
            type: "text",
            name: "name",
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
            title={'Create Company'}
            inputFields={inputFields}
            buttonContent={'Create Company'}
        />
    );
}