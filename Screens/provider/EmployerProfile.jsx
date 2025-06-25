import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import LineHead from "../../CustomComponents/LineHead";
import CustomButton from "../../CustomComponents/CustomButton";

const { width } = Dimensions.get("window");

export default function EmployerProfile() {
  const navigation = useNavigation();

  // ─── Dummy static data ─────────────────────────────────────────
  const providerProfile = {
    fullname: "John Doe",
    country: "USA",
    profilePicUrl: "https://www.w3schools.com/howto/img_avatar.png",
  };

  const userJobs = [
    {
      id: "1",
      title: "Mobile App Developer",
      location: { address: "New York, NY" },
      createdAt: new Date(),
      minBudget: 1000,
      maxBudget: 2000,
      description: "We need a React Native developer for a short-term project.",
    },
    {
      id: "2",
      title: "UI/UX Designer",
      location: { address: "San Francisco, CA" },
      createdAt: new Date(),
      minBudget: 800,
      maxBudget: 1500,
      description:
        "Looking for a talented designer to create wireframes and UI screens.",
    },
  ];
  // ───────────────────────────────────────────────────────────────

  // ─── Renderers ────────────────────────────────────────────────
  const renderJobCard = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardHeader}>
        <Text style={styles.cardHeading}>{item.title}</Text>
      </TouchableOpacity>

      <View style={styles.details}>
        <Text style={styles.detailText}>{item.location.address.slice(0, 10)}</Text>
        <Text style={styles.detailText}>
          Posted: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.detailText}>
          Budget: ${item.minBudget}-${item.maxBudget}
        </Text>
      </View>

      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const listHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.profileRow}>
        <Image
          source={{ uri: providerProfile.profilePicUrl }}
          style={styles.avatar}
        />
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.name}>{providerProfile.fullname}</Text>
          <Text style={styles.location}>{providerProfile.country}</Text>
        </View>
      </View>

      <Text style={styles.newSectionHeading}>
        Jobs Posted By {providerProfile.fullname}
      </Text>
    </View>
  );
  // ───────────────────────────────────────────────────────────────

  return (
    <>
      <LineHead headerName="Employee Profile" headerState={true} />

      <View style={styles.mainContainer}>
        <FlatList
          data={userJobs}
          keyExtractor={(item) => item.id}
          renderItem={renderJobCard}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={
            <Text style={styles.noJobsText}>No jobs found</Text>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.buttonWrapper}>
        <CustomButton
  title={`Message ${providerProfile.fullname}`}
  onPress={() =>
    navigation.navigate("MessageScreen", {
      partnerName: providerProfile.fullname,
      partnerPic: providerProfile.profilePicUrl,
      partnerId: "dummy-id", // Replace with actual provider ID if needed
    })
  }
/>

        </View>
      </View>
    </>
  );
}

// ─── Styles ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // space for bottom button
    paddingTop: "14%",
  },
  headerContainer: {
    marginBottom: 16,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "14%",
  },
  avatar: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: (width * 0.2) / 2,
    marginRight: 15,
  },
  name: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "black",
  },
  location: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "gray",
  },
  newSectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Regular",
    marginTop: 24,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    borderColor: "#fff",
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardHeading: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Medium",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  detailText: {
    fontSize: 10,
    color: "#666",
  },
  description: {
    fontSize: 12,
    marginTop: 16,
    color: "#666",
    lineHeight: 16,
    fontFamily: "Poppins-Regular",
  },
  noJobsText: {
    textAlign: "center",
    fontSize: 16,
    color: GlobalStyles.colors.ButtonColor,
    marginTop: 20,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 20,
    left: "5%",
    width: "90%",
  },
});
