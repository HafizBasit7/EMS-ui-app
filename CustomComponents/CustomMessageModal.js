import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  // Import MaterialCommunityIcons
import CustomButton from "./CustomButton";
import { GlobalStyles } from "../Styles/GlobalStyles";

const CustomMessageModal = ({
  visible,
  message,
  onClose,
  buttonNumbers = 2,
  icon = "bell",
  onYesClick 
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            {/* Icon in the center */}
            <Icon
              name={icon}  // Use the passed icon prop, default is "bell"
              size={50}  // Icon size
              color={GlobalStyles.colors.IconsColor}  // Icon color from GlobalStyles
              style={styles.icon}  // Apply custom styles to the icon
            />

            {/* Message Text */}
            <Text style={styles.modalMessage}>{message}</Text>

            {/* Buttons */}
            {buttonNumbers === 1 ? (
              <CustomButton title="Close" onPress={onClose}/>
            ) : (
              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.outlinedButton]} onPress={onClose}>
                  <Text style={[styles.buttonText, styles.outlinedButtonText]}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.filledButton]} onPress={onYesClick}>
                  <Text style={[styles.buttonText, styles.filledButtonText]}>Yes</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    elevation: 5,
  },
  icon: {
    marginBottom: 20,  // Space between the icon and the message
  },
  modalMessage: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  filledButton: {
    backgroundColor: GlobalStyles.colors.ButtonColor, // Primary color
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.ButtonColor,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  filledButtonText: {
    color: "#fff",
  },
  outlinedButtonText: {
    color: GlobalStyles.colors.ButtonColor,
  },
});

export default CustomMessageModal;
