import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.scss';
import Title from '../Title/title';
import Label from '../Label/Label';
import Input from '../input/Input';


const Login = ({ param }) => {


    const [user, setUser] = useState('');
    const [data, setData] = useState(false);
    const [webCarts, setwebCarts] = useState([]);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();


    function handleChange(name, value) {
        if (name === 'usuario') {
            setUser(value);
            setHasError(false);
        } else {
            if (value.length < 6) {
                setPasswordError(true);
                setHasError(false);
            } else {
                setPasswordError(false)
                setPassword(value);
                setHasError(false);
            }
        }
    };

    useEffect(() => {
        axios
            .get("https://dummyjson.com/users")
            .then(function (response) {
                // handle success				
                setData(response.data.users);


            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);


    function ifMatch(param) {
        if (param.user.length > 0 && param.password.length > 0) {
            const newUsers = data.find((useru => useru.username === param.user));
            if (param.user === newUsers.username && param.password === newUsers.password) {
                const { user, password } = param;
                let ac = { user, password };
                let account = JSON.stringify(ac);
                localStorage.setItem('account', account);
                setIsLogin(true);

            } else {
                setIsLogin(false);
                setHasError(true);
            }
        } else {
            setIsLogin(false);
            setHasError(true);
        }
    };

    function handleSubmit() {
        let account = { user, password }
        if (account) {
            ifMatch(account)
        }
    };

    return (
        <div className='login-container'>
            {isLogin ? navigate('/carts') :
                <div className='login-content'>
                    <Title text='Login' />
                    {hasError &&
                        <label className='label-alert'>
                            Su contraseña o usuario son incorrectos, o no existen en nuestra plataforma
                        </label>
                    }
                    <Label text='Usuario' />
                    <Input
                        attribute={{
                            id: 'usuario',
                            name: 'usuario',
                            type: 'text',
                            placeholder: 'Ingrese su usuario'
                        }}
                        handleChange={handleChange}
                    />
                    <Label text='Contraseña' />
                    <Input
                        attribute={{
                            id: 'contraseña',
                            name: 'contraseña',
                            type: 'password',
                            placeholder: 'Ingrese su contraseña',
                        }}
                        handleChange={handleChange}
                        param={passwordError}
                    />

                    {passwordError &&
                        <label className='label-error'>
                            Contraseña incompleta
                        </label>
                    }
                    <div className='button-container'>
                        <button onClick={handleSubmit} className='submit-button'>
                            Ingresar
                        </button>
                    </div>
                </div>
            }
        </div>
    )
};

export default Login;