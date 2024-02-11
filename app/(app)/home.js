import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useAuth } from "../../context/authContext";
import { supabase } from "../../lib/supabase";
import { ChatList } from "../../components/ChatList";



export default Home = () => {
    const [users, setUsers] = useState([]);
    const { user } = useAuth();


    useEffect(() => {
        if (!user?.id) return;

        const getUsers = async () => {
            const { data: profiles, error } = await supabase
                .from('profiles')
                .select(`*`)
                .order('username', { ascending: false })
                // .neq('id', user?.id)

            if (error) console.log(error);
            if (profiles) setUsers(profiles.filter(u => u.id !== user?.id));
        }
        getUsers();
    }, [])


    useEffect(() => {
        const channel = supabase.channel('news-channel')
            .on("postgres_changes", {
                event: '*', schema: "public", table: "profiles"
            }, payload => {
                setUsers(prevState => [...prevState, payload.new])
            })
            .subscribe()


            return () => {
                supabase.removeChannel(channel);
            }
    }, [])

    

    return (
        <View style={tw`flex-1 bg-white`}>
            <StatusBar style="light" />
            {
                users.length ? (
                    <ChatList users={users} currentUser={user}/>
                ) : (
                    <View style={tw.style(`items-center`, { top: hp(30) })}>
                        <ActivityIndicator size="large" />
                    </View>
                )
            }
        </View>
    )
}