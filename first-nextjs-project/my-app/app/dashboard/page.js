import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import { useAuth } from "@/context/AuthContext";

export const metadata = {
    title: "FeelingFlow · Dashboard",
};

export default function DashboardPage(children) {
    return (
        <Dashboard />
    )
}