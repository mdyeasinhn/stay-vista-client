import useAuth from "./useAuth";
import useAxiosSecure, { axiosSecure } from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query'

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role ='', isLoading } = useQuery({
        queryKey: ['role'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/user/${user?.email}`)
            return data.role

        }
    })


    return [role, isLoading];

}

export default useRole;
