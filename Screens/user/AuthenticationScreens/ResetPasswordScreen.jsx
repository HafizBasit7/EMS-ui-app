import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomButton from "../../../CustomComponents/CustomButton";
// import ResetPasswordSVG from "../../assets/SVG/ResetPasswordSVG.svg";
import { useNavigation } from "@react-navigation/native";
import CustomMessageModal from "../../../CustomComponents/CustomMessageModal";

const { width, height } = Dimensions.get("window");

export default function ResetPasswordScreen({ route }) {
  const navigation = useNavigation();
  const { email } = route.params;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleReset = () => {
    if (!password || !confirmPassword) {
      setError("Please fill all fields.");
      setModalVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setModalVisible(true);
      return;
    }

    // Simulate success
    setError("Password reset successfully.");
    setModalVisible(true);
    setTimeout(() => {
      navigation.navigate("Login");
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* <ResetPasswordSVG style={styles.logo} /> */}
        <Text style={styles.title}>Reset Password</Text>

        <Text style={styles.label}>New Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <Icon
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color="#888"
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Icon
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color="#888"
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

        <CustomButton title="Reset Password" onPress={handleReset} />

        <CustomMessageModal
          message={error}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          buttonNumbers={1}
          icon="alert-circle"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingTop: Platform.OS === "ios" ? height * 0.1 : height * 0.05,
    paddingBottom: height * 0.05,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: "contain",
    marginBottom: height * 0.02,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    alignSelf: "flex-start",
    marginBottom: height * 0.02,
    fontWeight: "bold",
    color: "#000",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    color: "#333",
    marginBottom: height * 0.005,
  },
  input: {
    width: "100%",
    height: height * 0.07,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: height * 0.02,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
});
