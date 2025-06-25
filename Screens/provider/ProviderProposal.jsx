import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import UploadedSVG from "../../assets/SVG/UploadedSVG.svg";
import { useNavigation } from "@react-navigation/native";

const ProviderProposal = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.container}>
        <View style={styles.leftSide}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Offer by John</Text>
            <Text style={styles.price}>$200</Text>
          </View>
        </View>

        <View style={styles.rightSide}>
          <View style={styles.rating}>
            <Ionicons name="star" size={20} color="#FFCC00" />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ProviderProfile", { userId: "mockId" })}
          >
            <Text style={styles.buttonText}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Proposal Details */}
      <View style={styles.newContainer}>
        <Text style={styles.newHeading}>Proposal Details</Text>
        <Text style={styles.newText}>
          Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt.
          Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum
          tempor Lorem incididunt.Pariatur sint culpa do incididunt eiusmod
          eiusmod culpa. laborum tempor Lorem incididunt.Mollit in laborum
          tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa
          do incididunt eiusmod eiusmod culpa.
        </Text>
      </View>

      {/* Attachments */}
      <View style={styles.uploadedContainer}>
        <Text style={styles.uploadedHeading}>Attachments:</Text>
        <UploadedSVG style={styles.uploadedSVG} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginTop: "10%",
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: 16,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    borderRadius: 50,
    overflow: "hidden",
    width: 60,
    height: 60,
    marginRight: 10,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userInfo: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  price: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
  rightSide: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: "#333",
    marginLeft: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: "#FF7235",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 14,
    color: "#FF7235",
    fontWeight: "bold",
  },
  newContainer: {
    padding: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    marginBottom: 16,
  },
  newHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  newText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
  uploadedContainer: {
    padding: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    marginBottom: 50,
  },
  uploadedHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  uploadedSVG: {
    width: 100,
    height: 100,
    alignSelf: "flex-start",
  },
});

export default ProviderProposal;
