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
import { ActivityIndicator } from "react-native-paper";
import CustomButton from "../../../CustomComponents/CustomButton";
import CustomMessageModal from "../../../CustomComponents/CustomMessageModal";
// import ForgetPasswordSVG from "../../assets/SVG/ForgetPasswordSVG.svg";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function ForgetPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleVerifyEmail = () => {
    if (!email.trim()) {
      setError("Please enter your email address");
      setModalVisible(true);
      return;
    }

    // Simulate success
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("VerificationCode", { email });
    }, 1500);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* <ForgetPasswordSVG style={styles.logo} /> */}
          <Text style={styles.title}>Forget Password?</Text>
          <Text style={styles.subheading}>
            Don’t worry! It happens. Please enter the email address associated
            with your account.
          </Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </ScrollView>

        {/* Submit Button Fixed */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title={loading ? <ActivityIndicator color="white" /> : "Submit"}
            onPress={handleVerifyEmail}
            style={{ width: "87%" }}
          />
        </View>

        {/* Modal */}
        <CustomMessageModal
          message={error}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          buttonNumbers={1}
          icon="alert-circle"
        />
      </KeyboardAvoidingView>
    </>
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
    paddingBottom: "30%",
  },
  logo: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: "contain",
    marginBottom: height * 0.02,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    alignSelf: "flex-start",
    marginBottom: height * 0.02,
    color: "#000",
  },
  subheading: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: height * 0.02,
    color: "#666",
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
  },
  buttonContainer: {
    position: "absolute",
    bottom: height * 0.06,
    width: "100%",
    alignItems: "center",
  },
});
