import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom";
import useUserCompanies from "../../../hooks/useUserCompanies";
import ItemsDashboardView from "../../../components/common/ItemsDashboardView/ItemsDashboardView";
import { ITEM_MESSAGES, ITEM_TYPES, TITLES } from "../../../constants/messages";

export default function Companies() {
    const { user } = useAuth0();
    const { userCompanies, loading, error } = useUserCompanies(user.sub);
    const navigate = useNavigate();

    const addClickHandler = () => {
        navigate('create');
    };

    return (
        <ItemsDashboardView
            loading={loading}
            items={userCompanies}
            title={TITLES.companiesDashboard}
            type={ITEM_TYPES.company}
            emptyMessage={ITEM_MESSAGES.emptyCompaniesDashboard}
            buttonLabel={ITEM_MESSAGES.companiesDashboardAddButton}
            buttonClickHandler={addClickHandler}
        />
    );
};