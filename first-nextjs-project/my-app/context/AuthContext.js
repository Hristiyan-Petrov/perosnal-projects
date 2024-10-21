'use client'
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userDataObj, setUserDataObj] = useState({});
    const [loading, setLoading] = useState(true);

    // Auth Handlers
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        setUserDataObj({});
        setCurrentUser(null);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                // Set user to local context state
                console.log('fetching user data!');

                setLoading(true);
                setCurrentUser(user);

                if (!user) return;

                // If user exists fetch data from firestore db

                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                let firebaseData = {};
                if (docSnap.exists()) {
                    console.log('foun user data!');

                    firebaseData = docSnap.data();

                    console.log(firebaseData);
                }

                setUserDataObj(firebaseData);

            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        });
        return unsubscribe; // Clean up app when neccessary
    }, []);

    const value = {
        currentUser,
        userDataObj,
        signUp,
        login,
        logout,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}