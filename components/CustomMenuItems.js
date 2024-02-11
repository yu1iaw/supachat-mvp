import { Text, View } from "react-native";
import { MenuOption } from "react-native-popup-menu";
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export const MenuItem = ({text, action, value, icon}) => {
    return (
        <MenuOption onSelect={() => action(value)}>
            <View style={tw`flex-row justify-between items-center px-4 py-1`}>
                <Text style={tw.style(`font-semibold text-neutral-600`, { fontSize: hp(2) })}>{text}</Text>
                {icon}
            </View>
        </MenuOption>
    )
}