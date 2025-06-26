import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

import MessageScreenHeader      from "./MessageScreenHeader";
import MessageScreenSecondHeader from "./MessageScreenSecondHeader";
import MessageComponent         from "./MessageComponent";

/* ── MANUALLY pick who you are ────────────────────────── */
const CURRENT_USER = { userId: "u1", type: "Customer" }; // ⇦ change type to "Provider" or "Customer" when needed
/* ─────────────────────────────────────────────────────── */

export default function MessageScreen({ route, navigation }) {
  const { partnerName, partnerPic, partnerId } = route.params;

  // starter fake chat
  const INITIAL_MESSAGES = [
    {
      _id: "m1",
      senderId: partnerId,
      messageBody: "Hi there, thanks for reaching out!",
      createdAt: new Date(Date.now() - 1000 * 60 * 19),
    },
    {
      _id: "m2",
      senderId: CURRENT_USER.userId,
      messageBody: "Hello! I'm interested in your services.",
      createdAt: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      _id: "m3",
      senderId: partnerId,
      messageBody: "Sure – let me send you an offer.\nKey=1234,OfferJob,price:5000,event:wedding",
      createdAt: new Date(Date.now() - 1000 * 60 * 12),
    },
  ];

  const [messages, setMessages] = useState(INITIAL_MESSAGES.reverse()); // newest at top
  const [message, setMessage]   = useState("");
  const flatListRef             = useRef(null);

  const sendNewMessage = () => {
    if (!message.trim()) return;
    const newMsg = {
      _id: Date.now().toString(),
      senderId: CURRENT_USER.userId,
      messageBody: message.trim(),
      createdAt: new Date(),
    };
    setMessages((prev) => [newMsg, ...prev]);
    setMessage("");
  };

  return (
    <>
      <MessageScreenHeader
        name={partnerName}
        image={partnerPic}
        onPress={() => navigation.goBack()}
      />

      {/* second header only for Customers */}
      {CURRENT_USER.type === "Customer" && <MessageScreenSecondHeader />}

      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }} behavior="padding">
        {/* chat */}
        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            inverted   // newest at bottom visually
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <MessageComponent
                message={item}
                currentUserId={CURRENT_USER.userId}
              />
            )}
            contentContainerStyle={styles.messageListContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* composer */}
        <View style={styles.inputSection}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor={GlobalStyles.colors.textSecondary}
            multiline
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendNewMessage}>
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
  chatContainer:        { flex: 1, backgroundColor: GlobalStyles.colors.primaryLight },
  messageListContainer: { paddingTop: 8, paddingBottom: "50%", paddingHorizontal: 16 },
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
    maxHeight: 120,
    borderColor: GlobalStyles.colors.border,
    borderWidth: 0.2,
    borderRadius: 20,
    paddingHorizontal: 8,
    color: GlobalStyles.colors.text,
  },
  sendButton: {
    backgroundColor: GlobalStyles.colors.buttonBackground,
    padding: 10,
    borderRadius: 20,
    marginLeft: 6,
  },
});
