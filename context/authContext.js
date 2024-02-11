import { createContext, useContext, useEffect, useState } from "react";
import { makeRedirectUri } from "expo-auth-session";

import { supabase } from "../lib/supabase";

const redirectTo = makeRedirectUri();

export const AuthContext = createContext();



export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            // console.log('session: ', session?.user?.id)
        })
      
        const subscription = supabase.auth.onAuthStateChange((event, session) => {
            setIsAuthenticated(!!session);
            // console.log('sessionUpdated: ', event);
            
            session && setUser({ 
                id: session.user.id, 
                username: session.user.user_metadata.username,
                avatar: session.user.user_metadata.avatar_url
            })
        })

        // return () => {
        //     subscription.unsubscribe();
        // }
        
    }, [])


    const login = async (email, password) => {
        const { data, error, status } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) throw new Error(`${error.message}. Try again.`);
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error);
    }

    const register = async (email, password, username, profileUrl) => {
        const { data, error, status } = await supabase.auth.signUp({
            email, 
            password, 
            options: {
                data: {
                    username,
                    avatar_url: profileUrl,
                }
            }
        })     
        if (error) throw new Error(error.message);
        if (data) return data.user;
    }



    return (
        <AuthContext.Provider value={{user, isAuthenticated, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }

    return value;
}