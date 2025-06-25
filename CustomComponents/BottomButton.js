import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const BottomButton = ({ onPress, text }) => {
  return (
    <>
      <TouchableOpacity style={styles.offerButton} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  offerButton: {
    backgroundColor: "#FF7235", // Button background color
    width: "93%", // Width of the button
    alignSelf: "center", // Center the button horizontally
    paddingVertical: 16, // Vertical padding for height
    borderRadius: 22, // Rounded corners
    marginTop: 2, // Space above the button
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Shadow effect on Android
  },
  buttonText: {
    textAlign: "center", // Center the text horizontally
    color: "#fff", // White text color
    fontSize: 16, // Font size
    fontWeight: "bold", // Bold text
    fontFamily: "Poppins-Bold", // Custom font if used
  },
});

export default BottomButton;
