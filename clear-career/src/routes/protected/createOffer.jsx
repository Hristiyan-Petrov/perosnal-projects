import FormView from "../../components/FormView";

export default function createOffer() {
    const inputFields = [
        {
            type: "text",
            name: "title",
            id: "job-title",
            placeholder: "Title",
        },
        {
            type: "text",
            name: "imageUrl",
            id: "job-logo",
            placeholder: "Company logo url",
        },
        {
            type: "text",
            name: "category",
            id: "job-category",
            placeholder: "Category",
        },
        {
            id: "job-description",
            name: "description",
            placeholder: "Description",
            rows: "4",
            cols: "50",
        },
        {
            id: "job-requirements",
            name: "requirements",
            placeholder: "Requirements",
            rows: "4",
            cols: "50",
        },
        {
            type: "text",
            name: "salary",
            id: "job-salary",
            placeholder: "Salary",
        },
    ]
    return (
        <FormView
            title={'Create Offer'}
            inputFields={inputFields}
            buttonText={'Post Offer'}
        />
    );
}