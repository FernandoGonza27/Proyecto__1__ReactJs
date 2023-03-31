import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  getDoc,
  getDocs,
  where
} from "firebase/firestore";
import { db } from "./config";
import { getAuth, signOut} from "firebase/auth";

export const loadUser = (user) =>{ 
  console.log("save successful");     
  localStorage.setItem("usuario", JSON.stringify(user));

}

//cambiar meterdo con parametro de compartible de base 
export const saveWebsite = (newLink,collectionName) =>
  addDoc(collection(db, collectionName), newLink);

export const updateWebsite = (collectionname1,id, updatedFields) =>
  updateDoc(doc(db, collectionname1, id), updatedFields);


export const onGetLinks = (callback,collectionName) => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};

export const getWebsites = (collectionName) => getDocs(collection(db, collectionName));

export const deleteWebsite = (id,collectionName) => deleteDoc(doc(db, collectionName, id));

export const getWebsite = (id,collectionName) => getDoc(doc(db, collectionName, id));


export const usersExist = (uid) =>{
  const res = getDoc( doc(db, 'users', uid));
  console.log(res);
  
  return true;
}
export const getUserCarts = (collectionname1,userId) =>{
  const q = query(collection(db, collectionname1), where("userId", "==", userId));
  const carts= [];
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      carts.push(	{ ...doc.data(), id: doc.id });
    });
    
  });
  return carts;
}
  
