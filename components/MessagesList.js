import { FlatList } from "react-native";
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import { useAuth } from "../context/authContext";
import { MessageBubble } from "./MessageBubble";




export const MessagesList = ({messages, flatlistRef, onContentSizeChange}) => {
    const { user } = useAuth();

    return (
        <FlatList 
            ref={ref => flatlistRef.current = ref}
            onContentSizeChange={onContentSizeChange}
            contentContainerStyle={tw`p-3 gap-y-[${hp(0.5)}]`}
            showsVerticalScrollIndicator={false}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
                const myMessage = item.sender_id === user.id;

                return (
                   <MessageBubble item={item} extraStyle={index === messages.length - 1} myMessage={myMessage}  />
                )
            }}
        />
    )
}