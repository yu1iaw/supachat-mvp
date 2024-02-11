import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image } from "expo-image";
import { doc, onSnapshot } from "firebase/firestore";

import { blurhash, generateRoomId } from "../utils";
import { db, supabase } from "../lib/supabase";



export const ChatItem = ({ item, currentUser, noBorder, router }) => {
	const [lastMessage, setLastMessage] = useState(undefined);
	const { avatar_url, ...rest } = item;


	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await supabase
				.from("current_message")
				.select()
				.eq("pair_id", generateRoomId(currentUser.id, rest.id))
				// .limit(1)
				.maybeSingle();

			if (error) console.log(error);
			if (data) {
				setLastMessage(data); 
			} else {
				setLastMessage(null);
			}
		};
		fetchData();
	}, []);


	useEffect(() => {
		const unsub = onSnapshot(doc(db, `rooms/${generateRoomId(currentUser.id, rest.id)}`), snapshot => {
			if (snapshot.exists()) {
				setLastMessage(snapshot.data())
			} 
		})

		return unsub;
	}, [])



	const openChatRoom = () => {
		router.push({ pathname: "/chatRoom", params: { ...rest, avatar_url: avatar_url.replace(/https:\/\//gi, "") } });
	};

	const renderTime = () => {
		return lastMessage ? new Date(lastMessage.created_at).toLocaleDateString([], { day: "numeric", month: "short" }) : "Time";
	};


	const renderLastMessage = () => {
		if (typeof lastMessage == "undefined") {
			return "Loading...";
		}

		if (lastMessage) {
			if (currentUser.id === lastMessage.sender_id) return `You: ${lastMessage.content}`;
			return lastMessage.content;
		} else {
			return "Say Hi 👋";
		}
	};


	return (
		<TouchableOpacity
			onPress={openChatRoom}
			style={tw`flex-row justify-between items-center mx-4 mb-4 pb-2 gap-x-3 ${noBorder ? "" : "border-b border-neutral-200"}`}>
			<Image style={{ height: hp(7), aspectRatio: 1, borderRadius: hp(3.5) }} source={item.avatar_url} placeholder={blurhash} transition={500} />
			<View style={tw`flex-1 gap-y-1`}>
				<View style={tw`flex-row justify-between`}>
					<Text style={tw.style(`font-bold text-neutral-800`, { fontSize: hp(2.3) })}>{item.username}</Text>
					<Text style={tw.style(`font-medium text-neutral-500`, { fontSize: hp(2.1) })}>{renderTime()}</Text>
				</View>
				<Text numberOfLines={1} style={tw.style(`font-medium text-neutral-500`, { fontSize: hp(2.1) })}>
					{renderLastMessage()}
				</Text>
			</View>
		</TouchableOpacity>
	);
};
