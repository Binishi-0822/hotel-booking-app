import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    const {showToast} = useAppContext();
    const queryClient = useQueryClient();
    
    const mutation = useMutation<void, Error>({
        mutationFn: apiClient.signOut,
        onSuccess: async() => {
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
            showToast({message: "Signed Out!", type: "SUCCESS"})
        },
        onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR"})
        }
    });

    const handleClick = () => {
        mutation.mutate();
    }
    
        
    return (
        <button  className="text-blue-900 p-3 font-bold bg-white hover:bg-gray-100 rounded-md shadow-md transition duration-200 ease-in-out" onClick={handleClick}>Sign Out</button>
    )
}

export default SignOutButton