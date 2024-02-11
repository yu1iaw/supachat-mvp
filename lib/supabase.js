import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { EXPO_PUBLIC_SUPABASE_URL } from '@env';
import { EXPO_PUBLIC_SUPABASE_ANON_KEY } from '@env';
import { EXPO_PUBLIC_FIRESTORE_API_KEY } from '@env';
import { EXPO_PUBLIC_FIRESTORE_PROJECT_ID } from '@env';

// AsyncStorage.clear()

export const supabase = createClient(EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// AppState.addEventListener('change', (state) => {
//   console.log("app state")
//   if (state === 'active') {
//     supabase.auth.startAutoRefresh()
//     console.log('active!')
//   } else {
//     supabase.auth.stopAutoRefresh()
//     console.log('unactive!')
//   }
// })


const firebaseInit = () => {
    const firebaseConfig = {
      apiKey: EXPO_PUBLIC_FIRESTORE_API_KEY,
      projectId: EXPO_PUBLIC_FIRESTORE_PROJECT_ID,
    };

    return initializeApp(firebaseConfig);
}

const app = firebaseInit();
export const db = getFirestore(app);