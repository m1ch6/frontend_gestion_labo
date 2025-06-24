import GDBUseCasesPage from "../GDBUseCasesPage";
import TPUseCasesPage from "../../tp/TPUseCasesPage";

export default function DashboardPage() {
    const apiBaseUrl =
        localStorage.getItem("apiBaseUrl") || "http://localhost:8080/api";
    if (apiBaseUrl === "http://localhost:8081/api") {
        return <TPUseCasesPage />;
    }
    return <GDBUseCasesPage />;
}
