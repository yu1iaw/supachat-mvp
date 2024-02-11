import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";



const ios = Platform.OS === "ios";

export const KeyboardView = ({children, inChat}) => {
    let kavConfig = {};
    let scrollViewConfig = {};
    
    if (inChat) {
        kavConfig = { keyboardVerticalOffset: 80 };
        scrollViewConfig = { contentContainerStyle: { flex: 1 } }
    }
    
    return (
        <KeyboardAvoidingView 
            behavior={ios ? "padding" : "height"} 
            style={{flex: 1}}
            // {...kavConfig}
        >
            <ScrollView 
                bounces={false}
                style={{flex: 1}} 
                showsVerticalScrollIndicator={false}
                // {...scrollViewConfig}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}