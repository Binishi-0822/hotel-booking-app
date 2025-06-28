import { useMutation, useQueryClient } from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string,
    password: string,
}

const SignIn = () => {
    const navigate = useNavigate();
    const {showToast} = useAppContext();
    const queryClient = useQueryClient();

    const {register,  handleSubmit, formState: {errors}} = useForm<SignInFormData>();
    

    const mutation = useMutation<void, Error, SignInFormData>({
        mutationFn: apiClient.signIn,
        onSuccess: async () => {
            showToast({message: "Login Successful!", type: "SUCCESS"})
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
            navigate("/")
        },
        onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR"})
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>
    
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input type="email" className="border rounded w-full py-1 px-2 font-normal"
                {...register("email",{required: "This field is required"})}></input>
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal"
                {...register("password",{required: "This field is required", minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                }})}></input>
                {errors.password && (
                    <span className="text-red-800">{errors.password.message}</span>
                )}
            </label>
            <span className="flex items-center justify-between">
                <span className="text-sm"> Not Registered? <Link to="/register" className="text-blue-400">Create an account here</Link></span>
                <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-200">Login</button>
            </span>
        </form>
    )
}

export default SignIn