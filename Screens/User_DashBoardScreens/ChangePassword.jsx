import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import LineHead from "../../CustomComponents/LineHead";
import CustomMessageModal from "../../CustomComponents/CustomMessageModal";
import { useNavigation } from "@react-navigation/native";

/* ────────────────────────────────────────────────────────── */
/*  PasswordInput                                              */
/* ────────────────────────────────────────────────────────── */
const PasswordInput = ({ label, value, onChangeText }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!isVisible}
          value={value}
          onChangeText={onChangeText}
          placeholder={`Enter ${label}`}
        />
        <TouchableOpacity
          onPress={() => setIsVisible((v) => !v)}
          style={styles.eyeIcon}
        >
          <Icon
            name={isVisible ? "visibility" : "visibility-off"}
            size={20}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* ────────────────────────────────────────────────────────── */
/*  ChangePassword (UI-only)                                   */
/* ────────────────────────────────────────────────────────── */
const ChangePassword = () => {
  const [oldPassword, setOldPassword]         = useState("");
  const [newPassword, setNewPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading]   = useState(false);
  const [modalText, setModalText]     = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  /* fake submit – local only */
  const handleSubmit = () => {
    // basic validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setModalText("Please fill all the fields");
      setModalVisible(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setModalText("Passwords do not match");
      setModalVisible(true);
      return;
    }

    // mock “loading…”
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalText("Password changed successfully (mock)");
      setModalVisible(true);
      // clear fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
     navigation.goBack()
    }, 1000);
  };

  return (
    <>
      <LineHead headerName="Change Password" headerState />
      <View style={styles.container}>
        <PasswordInput
          label="Old Password"
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <PasswordInput
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator size={24} color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
        </TouchableOpacity>

        <CustomMessageModal
          message={modalText}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          icon="alert-circle"
          buttonNumbers={1}
        />
      </View>
    </>
  );
};

export default ChangePassword;

/* ────────────────────────────────────────────────────────── */
/*  Styles (unchanged)                                         */
/* ────────────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    justifyContent: "center",
  },
  inputWrapper: { marginBottom: "10%" },
  label: { fontSize: 16, color: "#333", marginBottom: 4 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  input: { flex: 1, height: 50, fontSize: 16, color: "#333" },
  eyeIcon: { marginLeft: 8 },
  submitButton: {
    marginTop: 24,
    backgroundColor: GlobalStyles.colors.ButtonColor,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
