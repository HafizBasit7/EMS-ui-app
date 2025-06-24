import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

const { width, height } = Dimensions.get("window");

export default function VerifyCodeScreen({ route }) {
  const navigation = useNavigation();
  const { email } = route.params;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [fieldsDisabled, setFieldsDisabled] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setFieldsDisabled(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    if (otp.join("").length !== 4) {
      setError("Please enter a valid 4-digit OTP.");
      setModalVisible(true);
      return;
    }
    navigation.navigate("ResetPassword", { email });
  };

  const handleResendOtp = () => {
    setTimer(120);
    setFieldsDisabled(false);
    navigation.goBack();
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
        <View style={styles.logo}>
          <Text>Verification Code Image</Text>
        </View>
        
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.subheading}>
          A 4-digit code has been sent to {email}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              keyboardType="numeric"
              maxLength={1}
              editable={!fieldsDisabled}
            />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.verifyButton}
          onPress={handleVerify}
          disabled={fieldsDisabled}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <TouchableOpacity onPress={handleResendOtp} disabled={fieldsDisabled}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
          <Text style={styles.timerText}>
            {`${Math.floor(timer / 60)}:${
              timer % 60 < 10 ? `0${timer % 60}` : timer % 60
            } min left`}
          </Text>
        </View>
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
    width: width * 0.75,
    height: width * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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
  subheading: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: height * 0.03,
    color: "#666",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: height * 0.03,
  },
  otpInput: {
    width: width * 0.18,
    height: height * 0.07,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    backgroundColor: "#fff",
  },
  verifyButton: {
    width: '100%',
    height: 50,
    backgroundColor: GlobalStyles.colors.ButtonColor,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: height * 0.02,
  },
  resendText: {
    fontSize: 16,
    color: GlobalStyles.colors.LinkColor,
  },
  timerText: {
    fontSize: 14,
    color: "#666",
  },
});