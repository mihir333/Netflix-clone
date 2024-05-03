// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
         getAuth, 
         signInWithEmailAndPassword, 
         signOut} from "firebase/auth";
import { addDoc, 
         collection, 
         getFirestore } from "firebase/firestore";
         import { toast } from "react-toastify";


// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjy-BbcUiXR8z5CpnW6Ndv_VUkzGJMB_E",
  authDomain: "netflix-clone-139bd.firebaseapp.com",
  projectId: "netflix-clone-139bd",
  storageBucket: "netflix-clone-139bd.appspot.com",
  messagingSenderId: "999336190506",
  appId: "1:999336190506:web:83b41dfbdd62acd1245953"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid : user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" ").toUpperCase());
    }
}


const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" ").toUpperCase());

    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};