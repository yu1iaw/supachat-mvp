import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Octicons } from "@expo/vector-icons";

import { KeyboardView } from "../components/KeyboardView";
import { useAuth } from "../context/authContext";



export default SignUp = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const emailRef = useRef("");
	const passwordRef = useRef("");
	const usernameRef = useRef("");
	const profileUrlRef = useRef("");
	const { register } = useAuth();


	const handleRegister = async () => {
		if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileUrlRef.current) {
			Alert.alert("Sign up", "Please, fill all the fields");
			return;
		}

		try {
			setLoading(true);
			const userData = await register(emailRef.current, passwordRef.current, usernameRef.current, profileUrlRef.current);
		} catch(error) {
			if (error instanceof Error) Alert.alert('Some error occurred!', error.message);
			setLoading(false);
		}
	};


	return (
		<KeyboardView>
			<StatusBar style="dark" />
			<View style={tw.style(`flex-1 gap-y-10`, { paddingTop: hp(7), paddingHorizontal: wp(5) })}>
				<View>
					<Image source={{uri: 'https://shorturl.at/qBCUW'}} resizeMode="contain" style={tw.style(`bg-blue-100 rounded-lg`, { height: hp(23) })} />
				</View>
				<View style={tw`gap-y-8`}>
					<Text style={tw.style(`font-bold text-[${hp(1)}] tracking-wider text-center text-neutral-800`, { fontSize: hp(4) })}>Sign Up</Text>
					<View style={tw`gap-y-4 pb-4`}>
                        <View style={tw.style({ height: hp(7) }, `flex-row gap-x-4 px-4 bg-neutral-100 items-center rounded-xl`)}>
                            <Octicons name="person" size={hp(2.7)} color="gray" />
                            <TextInput
                                style={tw.style(`flex-1 font-semibold text-neutral-700`, { fontSize: hp(2.4) })}
                                placeholder="Username"
                                placeholderTextColor="gray"
                                onChangeText={(text) => (usernameRef.current = text)}
                            />
                        </View>
						<View style={tw.style({ height: hp(7) }, `flex-row gap-x-4 px-4 bg-neutral-100 items-center rounded-xl`)}>
							<Octicons name="mail" size={hp(2.7)} color="gray" />
							<TextInput
								style={tw.style(`flex-1 font-semibold text-neutral-700`, { fontSize: hp(2.4) })}
								placeholder="Email address"
								placeholderTextColor="gray"
                                autoCapitalize="none"
                                keyboardType="email-address"
								onChangeText={(text) => (emailRef.current = text)}
							/>
						</View>
                        <View style={tw.style({ height: hp(7) }, `flex-row gap-x-4 px-4 bg-neutral-100 items-center rounded-xl`)}>
                            <Octicons name="lock" size={hp(2.7)} color="gray" />
                            <TextInput
                                style={tw.style(`flex-1 font-semibold text-neutral-700`, { fontSize: hp(2.4) })}
                                placeholder="Password"
                                placeholderTextColor="gray"
                                secureTextEntry
                                keyboardType="name-phone-pad"
                                onChangeText={(text) => (passwordRef.current = text)}
                            />
                        </View>
                        <View style={tw.style({ height: hp(7) }, `flex-row gap-x-4 px-4 bg-neutral-100 items-center rounded-xl`)}>
                            <Octicons name="image" size={hp(2.7)} color="gray" />
                            <TextInput
                                style={tw.style(`flex-1 font-semibold text-neutral-700`, { fontSize: hp(2.4) })}
                                placeholder="Profile url"
                                placeholderTextColor="gray"
                                autoCapitalize="none"
                                keyboardType="url"
                                onChangeText={(text) => (profileUrlRef.current = text)}
                            />
                        </View>

						{loading ? (
							<View style={tw`flex-row justify-center`}>
								<ActivityIndicator size="large" color="#6366f1" />
							</View>
						) : (
							<TouchableOpacity onPress={handleRegister} style={tw.style(`bg-indigo-500 justify-center items-center rounded-xl`, { height: hp(6.7) })}>
								<Text style={tw.style(`text-white text-[${hp(1)}] font-bold tracking-wider`, { fontSize: hp(2.7) })}>Sign Up</Text>
							</TouchableOpacity>
						)}

						<View style={tw`flex-row justify-center gap-x-1`}>
							<Text style={tw.style(`font-semibold text-neutral-500`, { fontSize: hp(2.6) })}>Already have an account?</Text>
							<Pressable onPress={() => router.push("signIn")}>
								<Text style={tw.style(`font-bold text-indigo-500`, { fontSize: hp(2.6) })}>Sign In</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</View>
		</KeyboardView>
	);
};
