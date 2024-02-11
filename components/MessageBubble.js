import { Text, View } from "react-native";
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export const MessageBubble = ({item, myMessage, extraStyle}) => {
	return (
		<View style={tw.style(myMessage ? "items-end" : "items-start", extraStyle && 'pb-2')}>
			<View style={tw`p-2 max-w-[70%] shadow rounded-xl ${myMessage ? "bg-indigo-200" : "bg-white"}`}>
				<Text style={tw.style({ fontSize: hp(2.2) })}>{item.content}</Text>
			</View>
		</View>
	);
};
