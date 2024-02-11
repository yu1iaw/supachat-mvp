import { ActivityIndicator, View } from "react-native";
import tw from 'twrnc';



export default StartPage = () => {
    return (
        <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" />
        </View>
    )
}