import {useLoginMutation} from "../../app/services/userApi.ts";
import {useState} from "react";
import type {LoginProps} from "../../app/services/types.ts";
import {useNavigate} from "react-router";
import {isErrorWithMessage, isFetchBaseQueryError} from "../../services/helpers.ts";

export const Login = () => {
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()
    const [formState, setFormState] = useState<LoginProps>({
        email: '',
        password: ''
    })
    const [error,setError] = useState<string|null>(null)

    const handleSubmit = async (e:React.SubmitEvent) => {
        e.preventDefault()
        try{
        await login({email:formState.email,password:formState.password}).unwrap()
            navigate("/dashboard");
        }catch(err){
            if (isFetchBaseQueryError(err)) {
                const errMsg = 'error' in err ? err.error : (err.data as{error?:string})?.error || 'Что-то пошло не так'
                setError(errMsg)
            } else if (isErrorWithMessage(err)) {
                setError(err.message)
            }
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <p>login</p>
                    <input type="text" value={formState.email} placeholder='email'
                           onChange={e => setFormState(prev => ({...prev, email: e.target.value}))}/>
                    <input type="text" value={formState.password} placeholder='password'
                           onChange={e => setFormState(prev => ({...prev, password: e.target.value}))}/>
                    {error && <p>{error}</p> }
                    <button disabled={isLoading} type='submit'>submit</button>
                </form>
            </div>
        </div>
    )
}