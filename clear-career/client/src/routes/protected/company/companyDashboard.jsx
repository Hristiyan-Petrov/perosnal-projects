import { useNavigate, useParams } from "react-router-dom";
import { ITEM_MESSAGES, ITEM_TYPES, TITLES } from "../../../constants/messages";
import useCompanyOffers from "../../../hooks/useCompanyOffers";
import ItemsDashboardView from "../../../components/common/ItemsDashboardView/ItemsDashboardView";

export default function CompanyDashboard() {

    const navigate = useNavigate();
    const { companyId } = useParams();
    const { companyTitle, companyOffers, loading } = useCompanyOffers(companyId);

    const addClickHandler = () => {
        navigate('/offers/create', { state: { companySelected: companyTitle } });
    };

    return (
        <ItemsDashboardView
            loading={loading}
            items={companyOffers}
            title={`${TITLES.companyOffers} ${companyTitle}`}
            type={ITEM_TYPES.offer}
            emptyMessage={`${companyTitle} ${ITEM_MESSAGES.emptyCompanyOffersDashboard}`}
            buttonLabel={ITEM_MESSAGES.companyOffersDashboardAddButton}
            buttonClickHandler={addClickHandler}
        />
    );
}