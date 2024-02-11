import { Slot, useSegments, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { MenuProvider } from 'react-native-popup-menu';

import { AuthContextProvider, useAuth } from '../context/authContext';



const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();


    useEffect(() => {
        if (typeof isAuthenticated == "undefined") return;
        const inApp = segments[0] == '(app)';

        if (isAuthenticated && !inApp) {
            router.replace("home")
        } else if (!isAuthenticated) {
            router.replace("signIn")
        }

    }, [isAuthenticated])
    
    return <Slot />
}


export default RootLayout = () => {
    return (
        <MenuProvider>
            <AuthContextProvider>
                <MainLayout />
            </AuthContextProvider>
        </MenuProvider>
    )
}


