import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

const MessageComponent = ({ message, currentUserId }) => {
  const isSender   = message.senderId === currentUserId;
  const isOffer    = message.messageBody.startsWith("Key=1234,OfferJob");

  return (
    <View
      style={[
        styles.messageContainer,
        isSender ? styles.sender : styles.receiver,
      ]}
    >
      {/*  normal text  */}
      {!isOffer && (
        <Text
          style={[
            styles.messageText,
            isSender ? styles.senderText : styles.receiverText,
          ]}
        >
          {message.messageBody}
        </Text>
      )}

      {/*  fake “offer job” card  */}
      {isOffer && (
        <View style={styles.offerCard}>
          <Text style={styles.offerTitle}>Job Offer</Text>
          <Text style={styles.offerBudget}>
            {message.messageBody.match(/price:(\d+)/)?.[1] || "N/A"} PKR
          </Text>
          <Text style={styles.offerDetails}>
            Event: {message.messageBody.match(/event:([a-zA-Z]+)/)?.[1] || "N/A"}
          </Text>
          <TouchableOpacity
            style={styles.offerButton}
            onPress={() => console.log("Job Offer Viewed")}
          >
            <Text style={styles.offerButtonText}>View Offer</Text>
          </TouchableOpacity>
        </View>
      )}

      {/*  time stamp  */}
      <Text
        style={[
          styles.timeText,
          isSender ? styles.senderText : styles.receiverText,
        ]}
      >
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
    marginHorizontal: 10,
  },
  sender:   { backgroundColor: "#FF7235", alignSelf: "flex-end" },
  receiver: { backgroundColor: "#f5eceb", alignSelf: "flex-start" },
  messageText: { fontSize: 14, marginBottom: 5 },
  senderText:   { color: "white" },
  receiverText: { color: "#333" },
  timeText: { fontSize: 10, color: "#888", marginTop: 5 },

  /* offer-job card */
  offerCard:     { marginTop: 5, padding: 15, borderRadius: 10 },
  offerTitle:    { fontWeight: "bold", fontSize: 16, marginBottom: 5, color: "white" },
  offerBudget:   { color: "white", marginBottom: 10, fontSize: 20, fontWeight: "bold" },
  offerDetails:  { fontSize: 14, color: "white", marginBottom: 10 },
  offerButton:   { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, borderWidth: 1, borderColor: "white" },
  offerButtonText: { color: "white", fontSize: 14, fontWeight: "bold" },
});

export default MessageComponent;
