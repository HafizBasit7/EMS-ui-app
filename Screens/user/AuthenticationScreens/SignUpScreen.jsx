import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
  ScrollView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../CustomComponents/CustomButton";
import GoogleButton from "../../../CustomComponents/CustomGoogleButton";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

const { width, height } = Dimensions.get("window");

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [activeTab, setActiveTab] = useState("Customer");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Male");
  const [country, setCountry] = useState("Pakistan");

  const CountryData = [
    { label: "Pakistan", value: "Pakistan" },
    { label: "India", value: "India" },
    { label: "USA", value: "USA" },
    { label: "Canada", value: "Canada" },
  ];
  const GenderData = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {["Customer", "Service Provider"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput style={styles.input} placeholder="Enter full name" value={fullname} onChangeText={setFullname} />

        <Text style={styles.label}>Email *</Text>
        <TextInput style={styles.input} placeholder="Enter email" keyboardType="email-address" value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Phone Number *</Text>
        <TextInput style={styles.input} placeholder="Enter phone number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

        <Text style={styles.label}>Country *</Text>
        <Dropdown
          style={styles.dropdown}
          data={CountryData}
          labelField="label"
          valueField="value"
          value={country}
          onChange={(item) => setCountry(item.value)}
          placeholder="Select Country"
        />

        <Text style={styles.label}>Gender *</Text>
        <Dropdown
          style={styles.dropdown}
          data={GenderData}
          labelField="label"
          valueField="value"
          value={gender}
          onChange={(item) => setGender(item.value)}
          placeholder="Select Gender"
        />

        {activeTab === "Service Provider" && (
          <>
            <Text style={styles.label}>Business Name *</Text>
            <TextInput style={styles.input} placeholder="Enter business name" value={businessName} onChangeText={setBusinessName} />

            <Text style={styles.label}>Address *</Text>
            <TextInput style={styles.input} placeholder="Enter address" value={address} onChangeText={setAddress} />
          </>
        )}

        <Text style={styles.label}>Password *</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            secureTextEntry={!showPassword}
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

        <View style={styles.checkboxRow}>
          <Checkbox
            status={isChecked ? "checked" : "unchecked"}
            onPress={() => setIsChecked(!isChecked)}
            color={GlobalStyles.colors.ButtonColor}
          />
          <Text style={styles.termsText}>
            I agree to the{" "}
            <Text style={styles.link}>Terms</Text> and <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Sign Up Button */}
        <CustomButton
          title="Sign Up"
          onPress={() =>
            navigation.navigate("BioScreen", {
              userType: activeTab === "Customer" ? "Customer" : "Provider",
              email,
            })
          }
        />

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>Or</Text>
          <View style={styles.line} />
        </View>

        {/* Google Button */}
        <GoogleButton
          title="Sign Up with Google"
          imageSource={require("../../../assets/Logos/googleLogo.png")}
        />

        {/* Login Link */}
        <View style={styles.footerText}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { padding: 20, paddingBottom: 100 },
  label: {
    fontSize: width * 0.04,
    color: "#333",
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: height * 0.065,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: height * 0.065,
    justifyContent: "center",
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  termsText: {
    flex: 1,
    fontSize: width * 0.035,
    color: "#333",
  },
  link: {
    color: GlobalStyles.colors.LinkColor,
    textDecorationLine: "underline",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#666",
  },
  footerText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#f2f2f2",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    backgroundColor: "#ddd",
  },
  activeTab: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
  },
  tabText: {
    fontSize: width * 0.04,
    color: "#555",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
