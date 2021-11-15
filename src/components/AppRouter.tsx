import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context';
import { publicRoutes, privateRoutes } from '../router';
import Loader from './UI/loader/Loader';


export default function AppRouter() {
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading) {
        return <Loader />;
    }

    return (
        <>
            {isAuth 
                ? <Routes> {
                    privateRoutes.map(route => 
                        <Route 
                            path={route.path} 
                            element={<route.compontent />} 
                            key={route.path}
                        />
                    )
                } </Routes>
                : <Routes> {
                    publicRoutes.map(route => 
                        <Route 
                            path={route.path} 
                            element={<route.compontent />} 
                            key={route.path}
                        />
                    )
                } </Routes>
            }
        </>
    );
};