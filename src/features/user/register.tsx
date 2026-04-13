import {useRegisterMutation} from "../../app/services/userApi.ts";
import {useState} from "react";
import type {RegisterProps} from "../../app/services/types.ts";

export const Register = () => {
    const [register, {isLoading}] = useRegisterMutation()
    const [formState, setFormState] = useState<RegisterProps>({
        email: '',
        password: '',
        name: ''
    })

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        register({email: formState.email, password: formState.password, name: formState.password})
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <p>Register</p>
                    <input type="text" value={formState.name} placeholder='name'
                           onChange={e => setFormState(prev => ({...prev, name: e.target.value}))}/>
                    <input type="text" value={formState.email} placeholder='email'
                           onChange={e => setFormState(prev => ({...prev, email: e.target.value}))}/>
                    <input type="text" value={formState.password} placeholder='password'
                           onChange={e => setFormState(prev => ({...prev, password: e.target.value}))}/>
                    <button disabled={isLoading} type='submit'>submit</button>
                </form>
            </div>
        </div>
    )
}