import axios from "axios"
import { useNavigate } from "react-router-dom"
import { CsrfToken } from "../types"
import useStore from "../store"

export const useError = () => {
    const navigate = useNavigate()
    const resetEditedTask = useStore((state) => state.resetEditedTask)
    const getcsrfToken = async () => {
        const { data } = await axios.get<CsrfToken>(
            `${process.env.REACT_APP_API_URL}/csrf`
        )
        axios.defaults.headers.post["X-CSRF-TOKEN"] = data.csrf_token
    }

    const switchErrorHandling = (msg: string) => {
        switch (msg) {
            case 'invalid csrf token':
                getcsrfToken()
                alert('CSRF token is invalid, pliease try again.')
                break
            case 'invalid or expired jwt':
                alert(`access token expired, please login`)
                resetEditedTask()
                navigate('/')
                break
            case 'missing or malformed jwt':
                alert('access token is not valid, please login')
                resetEditedTask()
                navigate('/')
                break
            case 'duplicated key not allowed':
                alert('email already exist, please use another one')
                break
            case 'crpto/bcrypt: hashedPassword is not the hash of the giben password':
                alert('password is not correct')
                break
            case 'record not found':
                alert('email is not correct')
                break
            default:
                console.log(msg)
                alert(msg)
        }
    }
    return { switchErrorHandling }
}