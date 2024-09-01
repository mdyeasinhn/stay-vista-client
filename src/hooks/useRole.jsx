import { useState } from "react";
import useAuth from "./useAuth";

const useRole = () => {
    const [role, setRole] = useState();
    const {user}= useAuth();
    return role;
};

export default useRole;