import { FlatList, View } from "react-native";
import tw from 'twrnc';
import { useRouter } from "expo-router";

import { ChatItem } from "./ChatItem";



export const ChatList = ({users, currentUser}) => {
    const router = useRouter();

    return (
        <View style={tw`flex-1`}>
            <FlatList 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={tw`py-5`}
                data={users}
                keyExtractor={user => user.id}
                renderItem={({item, index}) => {
                    return (
                        <ChatItem 
                            item={item} 
                            currentUser={currentUser} 
                            noBorder={index + 1 === users.length} 
                            router={router}
                        />
                    )
                }}
            />
        </View>
    )
}