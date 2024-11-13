import FormView from "../../components/FormView/FormView";

export default function createOffer() {
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
            options: [
                // Get user companies (from company builder)
                'IT',
                'Agriculture',
                'Restaurants and tourism',
                'Finance',
                'Psychology'
            ]
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