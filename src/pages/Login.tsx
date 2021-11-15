import { useContext } from "react";
import CustomInput from "../components/UI/input/CustomInput";
import { AuthContext } from "../context";

export default function Login() {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const login = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsAuth(true);
        localStorage.setItem('isAuth', 'true');
    }
    return (
        <div>
            <h1>Вход</h1>
            <form onSubmit={login}>
                <label htmlFor="username">Логин</label> 
                <CustomInput type="text" placeholder="Введите логин" id="username"/>
                <label htmlFor="password">Пароль</label> 
                <CustomInput type="password" placeholder="Введите пароль" id="password"/>
                <CustomInput 
                    type="submit" 
                    value="Войти"
                />
            </form>
        </div>
    );
};