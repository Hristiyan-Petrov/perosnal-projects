import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";

export const metadata = {
    title: "Broodl · Dashboard",
};

export default function DashboardPage() {

    const isAuthenticated = true;

    let children = (
        <Login />
    )

    if (isAuthenticated) {
        children = (
            <Dashboard />
        )
    }

    return (
        <>{children}</>
    )
}