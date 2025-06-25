import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import BellSVG from "../../assets/SVG/BellSVG.svg";
import VectorSVG from "../../assets/SVG/VectorSVG.svg";
import CardSVG from "../../assets/SVG/CardSVG.svg";
import LockSVG from "../../assets/SVG/LockSVG.svg";
import NewLocationSVG from "../../assets/SVG/NewLocationSVG.svg";
import HelpSVG from "../../assets/SVG/HelpSVG.svg";
import TermsSVG from "../../assets/SVG/TermsSVG.svg";
import LogoutSVG from "../../assets/SVG/LogoutSVG.svg";
import NewBellSVG from "../../assets/SVG/NewBellSVG.svg";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../Styles/GlobalStyles";

const Profile = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation();
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  // Dummy user data
  const user = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/65.jpg",
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Profile</Text>
        <View style={styles.iconWrapper}>
          <BellSVG width={24} height={24} />
        </View>
      </View>

      <View style={styles.profileCard}>
        <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
        <View style={styles.details}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <Text style={styles.updateText}>Update Information</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.vectorWrapper}>
          <VectorSVG width={16} height={16} />
        </TouchableOpacity>
      </View>

      <View style={styles.biggerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("CreditCardDetailScreen")}>
          <View style={styles.smallContainer}>
            <CardSVG width={28} height={28} />
            <Text style={styles.smallContainerText}>Card Details</Text>
            <VectorSVG width={16} height={16} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
          <View style={styles.smallContainer}>
            <LockSVG width={28} height={28} />
            <Text style={styles.smallContainerText}>Change Password</Text>
            <VectorSVG width={16} height={16} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("NotificationSetting")}>
          <View style={styles.smallContainer}>
            <NewBellSVG width={28} height={28} />
            <Text style={styles.smallContainerText}>Notification Settings</Text>
            <VectorSVG width={16} height={16} />
          </View>
        </TouchableOpacity>

        <View style={styles.smallContainer}>
          <NewLocationSVG width={28} height={28} />
          <Text style={styles.smallContainerText}>Location</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#FF7235" }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#FF7235"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <TouchableOpacity>
          <View style={styles.smallContainer}>
            <HelpSVG width={28} height={28} />
            <Text style={styles.smallContainerText}>Help & Support</Text>
            <VectorSVG width={16} height={16} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("TermsScreen")}>
          <View style={styles.smallContainer}>
            <TermsSVG width={28} height={28} />
            <Text style={styles.smallContainerText}>Terms & Conditions</Text>
            <VectorSVG width={16} height={16} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <LogoutSVG width={24} height={24} />
            <Text style={styles.buttonText}>Logout</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.belowText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "6%",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    fontFamily: "Poppins-Regular",
    marginLeft: 4,
  },
  iconWrapper: {
    borderWidth: 0.1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  details: { flex: 1 },
  name: { fontSize: 18, fontWeight: "600", color: "#333" },
  email: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
    fontFamily: "Poppins-Regular",
  },
  updateText: {
    fontSize: 12,
    color: GlobalStyles.colors.hashTags,
    fontFamily: "Poppins-Regular",
  },
  vectorWrapper: { padding: 8 },
  biggerContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: "2%",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  smallContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
  },
  smallContainerText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins-Regular",
    marginLeft: 12,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    width: "95%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: GlobalStyles.colors.ButtonColor,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: GlobalStyles.colors.ButtonColor,
    marginLeft: 8,
  },
  belowText: {
    marginTop: 10,
    fontSize: 16,
    color: "red",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
});

export default Profile;
