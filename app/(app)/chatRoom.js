import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, TextInput, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter, useSearchParams } from 'expo-router';
import tw from 'twrnc';
import { Feather } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { doc, setDoc } from "firebase/firestore";

import { ChatRoomHeader } from "../../components/ChatRoomHeader";
import { MessagesList } from "../../components/MessagesList";
import { KeyboardView } from '../../components/KeyboardView';
import { useAuth } from "../../context/authContext";
import { db, supabase } from "../../lib/supabase";
import { generateRoomId } from "../../utils";



export default ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const item = useLocalSearchParams();
    const router = useRouter();
    const { user } = useAuth();
    const inputRef = useRef(null);
    const valueRef = useRef(null);
    const flatlistRef = useRef(null);

    // useEffect(() => {
    //     if (!messages.length) return;

    //     updateFlatList();
    // }, [messages])


    useEffect(() => {
        const getChatRoomData = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('pair_id', generateRoomId(user.id, item.id))

                if (error) console.log(error);
                if (data && data.length) {
                    setMessages(data)
                }
        }
        getChatRoomData();

    }, [])



    useEffect(() => {
        const newChannel = supabase.channel('ass-channel')
            .on("postgres_changes", {
                event: '*', schema: "public", table: "current_message", filter: `pair_id=eq.${generateRoomId(user.id, item.id)}`
            }, async payload => {
                setMessages(prevState => [...prevState, {...payload.new, id: payload.new.id + Math.random()}])
                await setDoc(doc(db, `rooms/${payload.new.pair_id}`), {
                    ...payload.new
                })
            })
            .subscribe()

            const KeyboardDidShowListener = Keyboard.addListener(
                'keyboardDidShow', updateFlatList
            )

            
            return () => {
                supabase.removeChannel(newChannel);
                KeyboardDidShowListener.remove();
            }
    }, [])



    const sendMessage = async () => {
        if (!valueRef.current) return;

        try {
            const { data, error } = await supabase
            .from('current_message')
            .upsert({
                sender_id: user.id,
                receiver_id: item.id,
                pair_id: generateRoomId(user.id, item.id),
                content: valueRef.current
            })

            if (error) throw error;
        
            valueRef.current = '';
            inputRef.current?.clear(); 
        } catch(e) {
            console.log('error', e);
        }
    }


    const updateFlatList = useCallback(() => {
        setTimeout(() => {
            try {
                flatlistRef.current?.scrollToEnd({ animated: true });
            }
            catch(e) {
                console.log(e);
            }
        }, 400)
    }, [])


    return (
        // <KeyboardView inChat={true}>
            <View style={tw`flex-1 bg-white`}>
                <StatusBar style="dark" />
                <ChatRoomHeader user={item} router={router} />
                <View style={tw`h-3 border-b border-neutral-300`} />
                <View style={tw`flex-1 bg-neutral-100 justify-between overflow-visible`}>
                    <View style={tw`flex-1`}>
                        <MessagesList messages={messages} flatlistRef={flatlistRef} onContentSizeChange={updateFlatList} />    
                    </View>
                    <View style={tw.style(`pt-2 mx-3`, { marginBottom: hp(2.7) })}>
                        <View style={tw`flex-row justify-between items-center bg-white p-2 pl-4 border border-neutral-300 rounded-full`}>
                            <TextInput 
                                ref={inputRef}
                                onChangeText={text => valueRef.current = text}
                                placeholder="Type message..." 
                                style={tw.style(`flex-1 mr-2`, { fontSize: hp(2) })} 
                            />
                            <TouchableOpacity onPress={sendMessage} style={tw`bg-neutral-200 p-2 mr-[1px] rounded-full`}>
                                <Feather name="send" size={hp(3)} color="#737373" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        // </KeyboardView>
    )
}