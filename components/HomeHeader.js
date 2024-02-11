import { Platform, StyleSheet, Text, View } from "react-native";
import tw from 'twrnc';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import { useAuth } from "../context/authContext";
import { MenuItem } from "./CustomMenuItems";
import { blurhash } from "../utils";

const ios = Platform.OS === "ios";



export const HomeHeader = () => {
    const { user, logout } = useAuth();
    const { top } = useSafeAreaInsets();


    const handleProfile = () => {
       
    }

    const handleSignOut = async () => {
        await logout();
    }


    return (
        <View style={tw.style(`flex-row justify-between px-5 pb-6 bg-indigo-400 rounded-b-3xl shadow`, {paddingTop: ios ? top : top + 10})}>
            <View>
                <Text style={tw.style(`font-medium text-white`, {fontSize: hp(3)})}>Chats</Text>
            </View>
            <View>
                <Menu>
                    <MenuTrigger customStyles={{
                        triggerWrapper: {

                        }
                    }}>
                        <Image
                            style={{height: hp(4.5), aspectRatio: 1, borderRadius: hp(2.25)}}
                            source={user?.avatar}
                            placeholder={blurhash}
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions
                        customStyles={{
                            optionsContainer: {
                                borderRadius: 10,
                                borderCurve: "continuous",
                                backgroundColor: "white",
                                marginTop: 30,
                                marginLeft: -25,
                                width: 160,
                                shadowOpacity: 0.2,
                                shadowOffset: {width: 0, height: 0 }

                            }
                        }} 
                    >
                        <MenuItem 
                            text="Profile" 
                            action={handleProfile} 
                            value={null} 
                            icon={<Octicons name="person" size={hp(2.7)} color="#737373" />} 
                        />
                        <Divider />
                        <MenuItem 
                            text="Sign Out" 
                            action={handleSignOut} 
                            value={null} 
                            icon={<MaterialCommunityIcons name="logout" size={hp(2.8)} color="#737373" style={tw`-mr-1`} />} 
                        />
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    )
}

const Divider = () => {
    return <View style={tw`p-[${StyleSheet.hairlineWidth}] bg-neutral-200`} />
}