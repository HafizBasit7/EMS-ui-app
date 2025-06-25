import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import MessageVerticalCard from "../../CustomComponents/Cards/MessagesVerticalCardChats";

const dummyChats = [
  {
    chatId: "1",
    name: "John Doe",
    lastMessage: "Hey! How are you doing?",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    timestamp: new Date().toISOString(),  // optional for demo
    unseenCount: 2,
    status: "online",
    partnerId: "user1",
  },
  {
    chatId: "2",
    name: "Sarah Connor",
    lastMessage: "Your booking is confirmed. Thank you!",
    profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    timestamp: new Date().toISOString(),
    unseenCount: 0,
    status: "offline",
    partnerId: "user2",
  },
];


export default function InboxScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headingContainerRow}>
        <Text style={styles.headingText}>Inbox</Text>
        <TouchableOpacity
          style={styles.bellButton}
          onPress={() => navigation.navigate("Notification")}
        >
          <Icon name="bell" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {dummyChats.length === 0 ? (
        <Text style={styles.noChatText}>Oops! No Chat Found</Text>
      ) : (
        <FlatList
          data={dummyChats}
          renderItem={({ item }) => <MessageVerticalCard data={item} />}
          keyExtractor={(item) => item.chatId}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  headingContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "10%",
  },
  headingText: {
    color: "#293032",
    fontFamily: "Poppins-Medium",
    fontSize: 30,
  },
  bellButton: {
    borderRadius: 10,
    padding: 3,
    borderWidth: 1,
    borderColor: "#DDDAE1",
  },
  noChatText: {
    textAlign: "center",
    marginTop: "90%",
    fontFamily: "Poppins-Regular",
    color: GlobalStyles.colors.ButtonColor,
    fontWeight: "bold",
    fontSize: 15,
  },
});
