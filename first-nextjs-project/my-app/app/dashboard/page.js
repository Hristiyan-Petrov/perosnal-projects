import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";

export const metadata = {
    title: "FeelingFlow · Dashboard",
};

export default function DashboardPage() {

    const isAuthenticated = false;

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