
import { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import AuthProvider from '../authprovider/authprovider';
import { Link } from "react-router-dom";

const auth = getAuth();
const Login = () => {
    const navigate = useNavigate();         
    //const [currentuser, setCurrentUser] = useState(null);

    /*
    staet
    0 inicia
    1 loanding
    2 loging comnpletd
    3 login sin registro
    4 no hay nadie logueado 

    */
    const [state, setCurrentState] = useState(0);

    /*
    useEffect(()=>{
        setCurrentState(1);
        onAuthStateChanged(auth, (user) => {
            if(user){
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                      // User is signed in, see docs for a list of available properties
                      // https://firebase.google.com/docs/reference/js/firebase.User
                      const uid = user.uid;
                      navigate("/");
                      setCurrentState(2);                  
                      console.log(user);
                    } else {
                      // User is signed out
                      setCurrentState(3);
                    }
                  });                        
            }else{
                setCurrentState(4);
                console.log("no hay nadie autenticado ")
            }

        });

    },[navigate])
    */


    const handleOnClik =()=> {
        const provider = new GoogleAuthProvider();
        singInGoogle(provider);
    }
    
    const singInGoogle =(provider)=> {        
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;            
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    const handleUserLoggedIn = (user) => {
       navigate('/carts'); 
       console.log(user.accessToken);
    }
    const handleUserNotRegisterd = (user) => {
        //navigate('/');

    }
    const handleUserNotLoggedIn = () => {
        setCurrentState(4);
    }
    if ( state ==4){
        return (
            <>                            
                <div>
                    <Link
                                 
                    onClick={handleOnClik}

                    >
                    
                    Login
                    </Link>  
                </div>          
            </>            
        )
    }
    return(
        <AuthProvider
        onUserLoggedIn={handleUserLoggedIn} 
        onUserNotRegister={handleUserNotRegisterd} 
        onUserNotLoggedIn={handleUserNotLoggedIn}
        >
        <div>Loading...</div>
        </AuthProvider>
       );
    

    
}
export default Login;