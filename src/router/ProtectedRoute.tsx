import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    // Login is disabled: always allow access
    return <>{children}</>;
}
