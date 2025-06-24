import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Platform,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomButton from "../../../CustomComponents/CustomButton";
import GoogleButton from "../../../CustomComponents/CustomGoogleButton";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomMessageModal from "../../../CustomComponents/CustomMessageModal";
// import LoginSVG from "../../assets/SVG/LoginSVG.svg";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleLogin = () => {
    setLoading(true);
    if (!email || !password) {
      setError("Email and password are required");
      setModalOpen(true);
      setLoading(false);
      return;
    }
    // Future logic placeholder
    navigation.navigate("TabNavigation");
    setLoading(false);
  };

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

const renderButtonContent = () => {
  return loading ? (
    <ActivityIndicator color="white" />
  ) : (
    <Text style={styles.buttonText}>Login</Text>
  );
};

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.svgContainer}>
            {/* <LoginSVG width={width * 0.8} height={height * 0.25} /> */}
          </View>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={styles.rememberContainer}>
              <Checkbox
                status={isChecked ? "checked" : "unchecked"}
                onPress={() => setIsChecked(!isChecked)}
                color={GlobalStyles.colors.ButtonColor}
              />
              <Text style={styles.rememberText}>Remember Me</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {!keyboardVisible && (
            <View style={styles.normal}>
              <CustomButton onPress={handleLogin}>
                {renderButtonContent()}
              </CustomButton>
            </View>
          )}
          

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.line} />
          </View>

          <GoogleButton
            title="Login with Google"
            imageSource={require("../../../assets/Logos/googleLogo.png")}
          />

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <CustomMessageModal
            visible={modalOpen}
            message={error}
            onClose={() => setModalOpen(false)}
            buttonNumbers={1}
            icon="alert-circle"
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {keyboardVisible && (
        <View style={styles.absoluteButton}>
          <CustomButton onPress={handleLogin} style={styles.keyboardButton}>
            {renderButtonContent()}
          </CustomButton>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingTop: Platform.OS === "ios" ? height * 0.05 : height * 0.03,
    paddingBottom: height * 0.1,
  },
  svgContainer: {
    marginBottom: height * 0.02,
  },
  absoluteButton: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  keyboardButton: {
    width: "100%",
  },
  normal: {
    width: "100%",
    marginTop: 10,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: width * 0.07,
    alignSelf: "flex-start",
    marginBottom: height * 0.03,
    color: GlobalStyles.colors.primaryText,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: width * 0.04,
    color: GlobalStyles.colors.secondaryText,
    marginBottom: height * 0.01,
    fontFamily: "Poppins-Regular",
  },
  input: {
    width: "100%",
    height: height * 0.07,
    borderColor: GlobalStyles.colors.borderColor,
    borderWidth: 1,
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.04,
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
    fontFamily: "Poppins-Regular",
    color: GlobalStyles.colors.primaryText,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    padding: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: height * 0.02,
    alignItems: "center",
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    color: GlobalStyles.colors.secondaryText,
    fontSize: width * 0.035,
    marginLeft: width * 0.02,
    fontFamily: "Poppins-Regular",
  },
  forgotPasswordText: {
    color: GlobalStyles.colors.LinkColor,
    fontFamily: "Poppins-Regular",
    fontSize: width * 0.035,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: height * 0.02,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: GlobalStyles.colors.borderColor,
  },
  dividerText: {
    marginHorizontal: width * 0.02,
    fontSize: width * 0.035,
    color: GlobalStyles.colors.secondaryText,
    fontFamily: "Poppins-Regular",
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: height * 0.02,
  },
  signUpText: {
    fontSize: width * 0.035,
    color: GlobalStyles.colors.secondaryText,
    fontFamily: "Poppins-Regular",
  },
  signUpLink: {
    fontSize: width * 0.035,
    color: GlobalStyles.colors.LinkColor,
    textDecorationLine: "underline",
    fontFamily: "Poppins-SemiBold",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
});