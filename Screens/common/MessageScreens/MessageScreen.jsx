import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { BackHandler } from "react-native";          // ← poly-fill starts
if (!BackHandler.removeEventListener) {
  BackHandler.removeEventListener = () => {};
}  
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import MessageScreenHeader from "./MessageScreenHeader";
import MessageScreenSecondHeader from "./MessageScreenSecondHeader";
import MessageComponent from "./MessageComponent";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

export default function MessageScreen({ route }) {
  const navigation = useNavigation();
  const { partnerName = "John Doe", partnerPic } = route.params ?? {};

  // ─── Chat State (dummy data) ──────────────────────────────────
  const [chatMessages, setChatMessages] = useState([
    {
      _id: "1",
      messageBody: "Key=1234,OfferJob,price:15000,event:Wedding",
      senderId: "user1",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      messageBody: "Thanks for the details. I’ll review the offer.",
      senderId: "user2",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [message, setMessage] = useState("");
  const flatListRef = useRef(null);
  // ──────────────────────────────────────────────────────────────

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const newMsg = {
      _id: Date.now().toString(),
      messageBody: trimmed,
      senderId: "user1", // mock sender
      createdAt: new Date().toISOString(),
    };

    setChatMessages((prev) => [newMsg, ...prev]);
    setMessage("");
  };

  return (
    <>
      <MessageScreenHeader
        name={partnerName}
        image={partnerPic}
        onPress={() => navigation.goBack()}
      />

      <MessageScreenSecondHeader />

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "white" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Chat list */}
        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={chatMessages}
            renderItem={({ item }) => <MessageComponent message={item} />}
            keyExtractor={(item) => item._id}
            inverted
            contentContainerStyle={styles.messageListContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Input row */}
        <View style={styles.inputSection}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor={GlobalStyles.colors.textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons
              name="send"
              size={24}
              color={GlobalStyles.colors.IconsColor}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primaryLight,
  },
  messageListContainer: {
    paddingTop: 8,
    paddingBottom: "50%",
    paddingHorizontal: 16,
    backgroundColor: "white",
    minHeight: "100%",
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 5,
    borderTopWidth: 0.5,
    borderTopColor: "#DDDAE1",
    marginBottom: 3,
  },
  textInput: {
    flex: 1,
    minHeight: 60,
    maxHeight: 100,
    borderColor: GlobalStyles.colors.border,
    borderWidth: 0.2,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: GlobalStyles.colors.text,
  },
  sendButton: {
    backgroundColor: GlobalStyles.colors.buttonBackground,
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
