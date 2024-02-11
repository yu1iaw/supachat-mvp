import { Text, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import tw from 'twrnc';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Image } from "expo-image";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export const ChatRoomHeader = ({user, router}) => {
    return (
        <Stack.Screen
            options={{
                title: "",
                headerShadowVisible: false,
                headerLeft: () => (
                    <View style={tw`flex-row items-center gap-x-4`}>
                        <TouchableOpacity onPress={router.back}>
                            <Entypo name="chevron-left" size={hp(4)} color="#737373" />
                        </TouchableOpacity>
                        <View style={tw`flex-row items-center gap-x-3`}>
                            <Image
                                source={`https://${user?.avatar_url}`}
                                style={{height: hp(4.5), aspectRatio: 1, borderRadius: hp(2.25)}}
                            />
                            <Text style={tw.style(`font-semibold text-neutral-700`, { fontSize: hp(2.5) })}>{user?.username}</Text>
                        </View>
                    </View>
                ),
                headerRight: () => (
                    <View style={tw`flex-row items-center gap-x-8`}>
                        <TouchableOpacity>
                            <Ionicons name="call" size={hp(2.8)} color="#737373" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="videocam" size={hp(2.8)} color="#737373" />
                        </TouchableOpacity>
                    </View>
                )
            }}
        />

      
    )
}