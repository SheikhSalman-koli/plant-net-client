import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const UpdateUserModal = ({ isOpen, setIsOpen, user , refetch}) => {

    const { email, role } = user
    const [updatedRole, setUpdatedRole] = useState(role)
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    function close() {
        setIsOpen(false)
    }
    // console.log(updatedRole);

    const mutation = useMutation({
        mutationFn: async (role) => {
            const { data } = await axiosSecure.patch(`/update/user/role/${email}`,
                { role }
            )
            return data
        },
        onSuccess: () => {
            // refetch by prop drilling
            // refetch()
            toast.success('user role updated successfully!')
            setIsOpen(false)
            // refetch by invalidate Query
            queryClient.invalidateQueries(['users'])
        }, 
        onError: error => {
            toast.error(error.message)
        }
    })

    const handleSubmit = e => {
        e.preventDefault()
        mutation.mutate(updatedRole)
    }

    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-2xl"
                        >
                            <DialogTitle as="h3" className="text-3xl font-medium">
                                Update user role
                            </DialogTitle>
                            <form onSubmit={handleSubmit}>
                                <select
                                    value={updatedRole}
                                    onChange={e => setUpdatedRole(e.target.value)}
                                    name='role'
                                    className='w-full border-1 p-2 mt-3 rounded-2xl'>
                                    <option value="customer">Customer</option>
                                    <option value="seller">Seller</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <div className='flex justify-between mt-4'>
                                    <button
                                        className='btn bg-lime-400 rounded-full'
                                        type='submit'
                                    >update</button>

                                    <button
                                        className='btn bg-red-400 rounded-3xl '
                                        type='button'
                                        onClick={close}
                                    >close</button>
                                </div>
                            </form>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default UpdateUserModal