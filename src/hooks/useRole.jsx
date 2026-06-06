import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../providers/AuthProvider";
import { axiosSecure } from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useContext(AuthContext);

    const { data: role, isLoading: isRoleLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !loading && !!user?.email, // user load hoye gele hit korbe
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/role/${user.email}`);
            return res.data.role; // returns 'user', 'chef', or 'admin'
        }
    });

    return [role, isRoleLoading];
};

export default useRole;