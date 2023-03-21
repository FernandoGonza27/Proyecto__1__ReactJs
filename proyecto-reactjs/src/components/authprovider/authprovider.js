import { Children, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth,signInWithPopup,GoogleAuthProvider,onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';


const AuthProvider = ({
    children,
    onUserLoggedIn,
    onUserNotLoggedIn,
    onUserNotRegister
}) =>{
    const navigate = useNavigate(); 
    useEffect(
        ()=>{            
            onAuthStateChanged(auth, (user) => {
                if(user){
                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                            // User is signed in, see docs for a list of available properties
                            // https://firebase.google.com/docs/reference/js/firebase.User
                            const uid = user.uid;
                            onUserLoggedIn(user);                  
                            //console.log(user);
                        } else {
                            onUserNotRegister(user);
                        }
                      });                        
                }else{
                    onUserNotLoggedIn();
                }
    
            });
    
        },[navigate,onUserLoggedIn,onUserNotLoggedIn,onUserNotRegister]


    );
    return <div>{children}</div>
}

export default AuthProvider;