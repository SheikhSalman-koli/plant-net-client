import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const {user,loading} = useAuth()
    // const [role, setRole] = useState(null)
    // const [isRoleLoading, setisRoleLoading] = useState(true)
    const axiosSecure = useAxiosSecure()


    const {
        data: role,
        isLoading: isRoleLoading,
    } = useQuery({
        enabled:!loading && !!user?.email,
        queryKey: ['role', user?.email],
        queryFn: async()=>{
            const {data} = await axiosSecure(
                `/user/role/${user?.email}`
            )
            return data?.role
        }
    })


    // useEffect(()=>{
    //     const fetchRoleData = async ()=> {
    //         const {data} = await axiosSecure(
    //         `/user/role/${user?.email}`
    //     )
    //         setRole(data?.role)
    //         setisRoleLoading(false)
    //     }
    //     fetchRoleData()
    // },[user,axiosSecure])

    // console.log(role);

    return [role, isRoleLoading]
};

export default useRole;