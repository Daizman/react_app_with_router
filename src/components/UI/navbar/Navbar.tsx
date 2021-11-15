import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context";
import CustomButton from "../button/CustomButton";

export default function Navbar() {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('isAuth');
    };

    return (
        <div className="navbar">
            <CustomButton onClick={logout}>
                Выйти
            </CustomButton>
            <div className="navbar__items">
                {/* Link - замена <a>, чтобы мы не перезагружали страницу*/}
                <Link to="/about" className="nav__item">О сайте</Link>
                <Link to="/posts" className="nav__item">Посты</Link>
            </div>
        </div>
    );
};
