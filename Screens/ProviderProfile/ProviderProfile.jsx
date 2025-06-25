import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

import LineHead from "../../CustomComponents/LineHead";
import PortfolioCards from "../../CustomComponents/Cards/PortfolioCards";
import ServicesCards from "../../CustomComponents/Cards/ServicesCards";
import { GlobalStyles } from "../../Styles/GlobalStyles";

const { width } = Dimensions.get("window");

/* ─── Dummy Data ───────────────────────────────────────────── */
const dummyProvider = {
  _id: "provider1",
  fullname: "Jane Smith",
  profilePicUrl:
    "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
  address: "Los Angeles, CA",
  profileDescription:
    "Seasoned wedding and portrait photographer with 8+ years of experience capturing unforgettable moments.",
  services: [
    { _id: "s1", name: "Photography", price: 1200 },
    { _id: "s2", name: "Videography", price: 2000 },
  ],
  averageRating: 4.7,
  totalReviews: 32,
};

const dummyPortfolio = [
  { _id: "p1", url: "https://picsum.photos/400/300?1", type: "Wedding" },
  { _id: "p2", url: "https://picsum.photos/400/300?2", type: "Engagement" },
  { _id: "p3", url: "https://picsum.photos/400/300?3", type: "Event" },
];

const dummyServices = [
  {
    _id: "s1",
    name: "Photography",
    price: 1200,
    description: "Professional event photography.",
  },
  {
    _id: "s2",
    name: "Videography",
    price: 2000,
    description: "Full-day cinematic videography.",
  },
];
/* ─────────────────────────────────────────────────────────── */

export default function ProviderProfile({ route }) {
  const navigation = useNavigation();
  const { providerId = "provider1" } = route.params ?? {};

  const userType = "Customer";          // ← change to "Customer" to test client view
  const [activeTab, setActiveTab] = useState("Portfolio");
  const [showFullBio, setShowFullBio] = useState(false);

  /* --- delete-select state --- */
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);

  /* ──────────────────────────────────────────────── */
  const handleServicePress = (serviceId) => {
    if (!isDeleting) return;
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleDeleteButton = () => {
    if (!isDeleting) {
      // start selecting
      setIsDeleting(true);
      setSelectedServiceIds([]);
      return;
    }

    // confirm delete (simulate)
    if (selectedServiceIds.length === 0) {
      alert("Select at least one service to delete.");
      return;
    }
    console.log("Deleting IDs:", selectedServiceIds);
    // ...call API here...
    // remove from dummy list locally (demo)
    selectedServiceIds.forEach((id) => {
      const idx = dummyServices.findIndex((s) => s._id === id);
      if (idx !== -1) dummyServices.splice(idx, 1);
    });
    setIsDeleting(false);
    setSelectedServiceIds([]);
  };

  /* ─── Render helpers ───────────────────────────── */
  const renderPortfolio = () =>
    dummyPortfolio.length ? (
      <FlatList
        key="portfolio"
        data={dummyPortfolio}
        renderItem={({ item }) => <PortfolioCards data={item} />}
        keyExtractor={(item) => item._id}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    ) : (
      <Text style={styles.noContentText}>No portfolio content</Text>
    );

  const renderServices = () =>
    dummyServices.length ? (
      <FlatList
        key="services"
        data={dummyServices}
        renderItem={({ item }) => (
          <ServicesCards
            data={item}
            providerId={providerId}
            userType={userType}
            onServiceSelect={() => handleServicePress(item._id)}
            isSelected={selectedServiceIds.includes(item._id)}
            isDeleting={isDeleting}
          />
        )}
        keyExtractor={(item) => item._id}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    ) : (
      <Text style={styles.noContentText}>No services listed</Text>
    );
  /* ───────────────────────────────────────────── */

  return (
    <>
      <LineHead headerName="Provider Profile" headerState={true} />

      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header card */}
          <View style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: dummyProvider.profilePicUrl }}
                style={styles.avatar}
              />
              <View style={styles.contentContainer}>
                <Text style={styles.name}>{dummyProvider.fullname}</Text>
                <View style={styles.row}>
                  <Icon
                    name="map-marker-radius"
                    size={16}
                    color={GlobalStyles.colors.IconsColor}
                  />
                  <Text style={styles.details}>{dummyProvider.address}</Text>
                </View>

                <View style={styles.expertiseContainer}>
                  {dummyProvider.services.map((s) => (
                    <Text key={s._id} style={styles.expertiseText}>
                      {s.name}
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            <Text style={styles.bioText}>
              {showFullBio
                ? dummyProvider.profileDescription
                : dummyProvider.profileDescription.slice(0, 150) + "..."}
              {dummyProvider.profileDescription.length > 150 && (
                <Text
                  style={styles.readMore}
                  onPress={() => setShowFullBio((p) => !p)}
                >
                  {showFullBio ? " See less" : " Read more"}
                </Text>
              )}
            </Text>

            <TouchableOpacity
              style={styles.rowOne}
              onPress={() =>
                navigation.navigate("Review", {
                  providerId,
                  pic: dummyProvider.profilePicUrl,
                  name: dummyProvider.fullname,
                })
              }
            >
              <Text style={styles.details}>{dummyProvider.totalReviews}</Text>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={{ marginRight: "15%" }}>
                {"   "}
                {dummyProvider.averageRating.toFixed(1)} Reviews
              </Text>
              <Icon name="arrow-right-thick" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {["Portfolio", "Services"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.button,
                  styles.tabsButton,
                  activeTab === tab && {
                    borderColor: GlobalStyles.colors.ButtonColor,
                  },
                ]}
                onPress={() => {
                  setActiveTab(tab);
                  setIsDeleting(false);
                  setSelectedServiceIds([]);
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    activeTab === tab && {
                      color: GlobalStyles.colors.ButtonColor,
                    },
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === "Portfolio" ? renderPortfolio() : renderServices()}
        </ScrollView>

        {/* ---- Provider Buttons ---- */}
        {userType === "Provider" && activeTab === "Portfolio" && (
          <View style={[styles.bottomButtonRow, styles.centerRow]}>
            <TouchableOpacity
              style={[styles.Bottombutton, { width: "90%" }]}
              onPress={() => navigation.navigate("UploadPortfolio")}
            >
              <Text style={[styles.buttonText, { color: "white" }]}>
                Upload Media
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {userType === "Provider" && activeTab === "Services" && (
          <View style={styles.bottomButtonRow}>
            <TouchableOpacity
              style={[
                styles.Bottombutton,
                {
                  width: "50%",
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: GlobalStyles.colors.ButtonColor,
                  marginRight: 10,
                },
              ]}
              onPress={handleDeleteButton}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: isDeleting
                      ? "red"
                      : GlobalStyles.colors.ButtonColor,
                  },
                ]}
              >
                {isDeleting ? "Confirm Delete" : "Delete Service"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.Bottombutton, { width: "50%" }]}
              onPress={() => navigation.navigate("AddService")}
            >
              <Text style={[styles.buttonText, { color: "white" }]}>
                Add Service
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ---- Customer Buttons ---- */}
        {userType === "Customer" && (
          <View style={styles.bottomButtonRow}>
            <TouchableOpacity
              style={styles.Bottombutton}
              onPress={() => navigation.navigate("OfferingJob", { providerId })}
            >
              <Text style={[styles.buttonText, { color: "white" }]}>
                Offer A Job
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBottomButton}
              onPress={() =>
                navigation.navigate("MessageScreen", {
                  partnerName: dummyProvider.fullname,
                  partnerPic: dummyProvider.profilePicUrl,
                  partnerId: providerId,
                })
              }
            >
              <Icon
                name="chat-processing"
                size={30}
                color={GlobalStyles.colors.IconsColor}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

/* ─── Styles ─────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "white" },
  container: { flex: 1, padding: "1%", marginTop: "14%" },
  scrollContent: { padding: 16 },
  card: { marginBottom: 20 },
  avatar: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: (width * 0.2) / 2,
    marginRight: 15,
  },
  name: { fontFamily: "Poppins-Bold", fontSize: 18, color: "black" },
  details: { fontFamily: "Poppins-Regular", fontSize: 14, color: "gray" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  rowOne: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  expertiseContainer: { flexDirection: "row", flexWrap: "wrap" },
  expertiseText: {
    color: "black",
    fontSize: 12,
    backgroundColor: GlobalStyles.colors.chipColor,
    margin: 2,
    borderRadius: 10,
    padding: 6,
  },
  bioText: { fontSize: 14, color: "gray", fontFamily: "Poppins-Regular" },
  readMore: { color: GlobalStyles.colors.ButtonColor },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  tabsButton: {
    borderBottomWidth: 2,
    borderColor: "transparent",
    paddingVertical: 10,
    width: "48%",
    alignItems: "center",
  },
  buttonText: { fontFamily: "Poppins-Bold", fontSize: 14, color: "black" },
  button: { paddingVertical: 10, alignItems: "center", width: "48%" },
  columnWrapper: { justifyContent: "space-between", marginBottom: 12 },
  noContentText: {
    textAlign: "center",
    fontSize: 16,
    color: GlobalStyles.colors.ButtonColor,
    marginTop: 20,
  },
  bottomButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
  },
  centerRow: {
    justifyContent: "center",
  },
  Bottombutton: {
    paddingVertical: 20,
    alignItems: "center",
    width: "82%",
    backgroundColor: GlobalStyles.colors.ButtonColor,
    borderRadius: 20,
  },
  iconBottomButton: {
    padding: 13,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.ButtonColor,
  },
});
