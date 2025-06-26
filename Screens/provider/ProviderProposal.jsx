import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import CustomMessageModal from "../../CustomComponents/CustomMessageModal"; // Import your custom modal
import CustomButton from "../../CustomComponents/CustomButton"; // Import your custom button

const ProviderProposal = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleAcceptOffer = () => {
    setModalVisible(false);
    navigation.navigate("paymentScreen"); // Make sure you have this screen in your navigation stack
  };

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
            <Text style={styles.userName}>Offer by Jane</Text>
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
        <Text style={styles.newHeading}>Proposal:</Text>
        <Text style={styles.newText}>
          Mollit in laborum tempor Lorem Incididunt irure. Aute eu ex ad sunt. Peridur sint culpa do incididunt eiusmod eiusmod culpa. Laborum tempor Lorem Incididunt Peridur sint culpa do incididunt eiusmod eiusmod culpa. Laborum tempor Lorem Incididunt Mollit in laborum tempor Lorem Incididunt Irure. Aute eu ex ad sunt. Peridur sint culpa do incididunt eiusmod eiusmod culpa. Laborum tempor Lorem Incididunt Eiusmod eiusmod culpa. Laborum tempor Lorem Incididunt Mollit in laborum tempor Lorem Incididunt Irure. Aute eu ex ad sunt. Peridur sint culpa do incididunt eiusmod eiusmod culpa. Laborum tempor Lorem Incididunt Eiusmod eiusmod culpa. Laborum tempor Lorem Incididunt.
        </Text>
      </View>

      {/* Accept Offer Button */}
       <CustomButton
        title="Accept Offer"
        onPress={() => setModalVisible(true)}
        buttonStyle={styles.acceptButton}
        textStyle={styles.acceptButtonText}
      />

      {/* Custom Message Modal */}
      <CustomMessageModal
        visible={modalVisible}
        message="Are you sure you want to accept this offer?"
        onClose={() => setModalVisible(false)}
        buttonNumbers={2}
        icon="alert-circle" // You can change this to any icon from MaterialCommunityIcons
        onYesClick={handleAcceptOffer}
      />
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
  acceptButton: {
    backgroundColor: "#FF7235",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginVertical: 20,
  },
  acceptButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProviderProposal;