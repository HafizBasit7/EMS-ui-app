/* ------------------------------------------------------------------
   JobDetails (UI-only)
   – no axios / redux / tokens
   – user type switch: const USER_TYPE = 'Customer' | 'Provider'
------------------------------------------------------------------- */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import LineHead from "../../CustomComponents/LineHead";
import CustomButton from "../../CustomComponents/CustomButton";
import ClockSVG from "../../assets/SVG/ClockSVG.svg";
import CalendarSVG from "../../assets/SVG/CalendarSVG.svg";
import DollarSVG from "../../assets/SVG/DollarSVG.svg";
import MapSVG from "../../assets/SVG/MapSVG.svg";

/* ─── change this to 'Provider' to test provider view ─── */
const USER_TYPE = "Customer"; // or "Provider"

/* ─── dummy job & proposal data ─── */
const DUMMY_JOB = {
  _id: "job-1",
  title: "Birthday Decoration Needed",
  description:
    "Looking for a creative decorator to set up a birthday party for my 6-year-old daughter at home. Theme: unicorn & pastel colours. Need balloons, backdrop, cake table décor and basic lighting.",
  minBudget: 200,
  maxBudget: 350,
  EventDate: new Date().toISOString(),
  location: { address: "123 Main Street, New York" },
  servicesRequired: [{ _id: "1", name: "Decoration" }],
  referencePictureUrls: [
    "https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg",
    "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg",
  ],
  user: {
    _id: "user-1",
    fullname: "Sofia Carter",
    profilePicUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
  },
};

const DUMMY_PROPOSALS = [
  {
    proposalId: "prop-1",
    price: 320,
    dateOfProposal: new Date().toISOString(),
    provider: {
      fullname: "John Anderson",
      profilePicUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240",
      avgRating: 4.8,
    },
  },
  {
    proposalId: "prop-2",
    price: 280,
    dateOfProposal: new Date().toISOString(),
    provider: {
      fullname: "Jane Smith",
      profilePicUrl:
        "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=240",
      avgRating: 4.5,
    },
  },
];

const JobDetails = () => {
  const navigation = useNavigation();
  const [showFullText, setShowFullText] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  /* ─── handlers ─── */
  const handleImageClick = (uri) => setSelectedImage(uri);
  const closeModal = () => setSelectedImage(null);

  /* ─── render proposal card ─── */
  const renderProposal = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.Newcard}>
        <Image source={{ uri: item.provider.profilePicUrl }} style={styles.cardProfileImage} />

        <View style={styles.cardTextContainer}>
          <Text style={styles.cardText}>Offer: ${item.price}</Text>
          <Text style={styles.cardText2}>by {item.provider.fullname}</Text>
          <Text style={styles.cardText3}>
            Offer received {new Date(item.dateOfProposal).toLocaleDateString()}
          </Text>

          <View style={styles.cardButtonContainer}>
            <TouchableOpacity
              style={styles.cardButton2}
              onPress={() => navigation.navigate("MessageScreen", { id: item.provider.fullname })}
            >
              <Text style={styles.cardButtonText2}>Send Message</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cardButton}
              onPress={() =>
                navigation.navigate("ProviderProposal", { proposalId: item.proposalId })
              }
            >
              <Text style={styles.cardButtonText}>View Proposal</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardRating}>
          <Icon name="star" size={16} color="gold" />
          <Text style={styles.cardRatingText}>
            {item.provider.avgRating ?? "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );

  /* ─── render ─── */
  return (
    <>
      <LineHead headerName="Job Details" headerState />

      <View style={{ paddingTop: USER_TYPE === "Provider" ? "15%" : "25%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* ───── CUSTOMER PROFILE (when provider views) ───── */}
          {USER_TYPE === "Provider" && (
            <View style={styles.container}>
              <View style={styles.profileSection}>
                <Image source={{ uri: DUMMY_JOB.user.profilePicUrl }} style={styles.profileImage} />
                <Text style={styles.userName}>by {DUMMY_JOB.user.fullname}</Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("EmployerProfile", { userId: DUMMY_JOB.user._id })}
              >
                <Text style={styles.buttonText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ───── JOB INFO ───── */}
          <View style={styles.newContainer}>
            <Text style={styles.heading}>{DUMMY_JOB.title}</Text>

            <View style={styles.iconsRow}>
              <Info icon={<MapSVG width={12} height={12} />} text={DUMMY_JOB.location.address} />
              <Info
                icon={<CalendarSVG width={12} height={12} />}
                text={new Date(DUMMY_JOB.EventDate).toDateString()}
              />
              <Info icon={<ClockSVG width={12} height={12} />} text="Posted now" />
              <Info
                icon={<DollarSVG width={12} height={12} />}
                text={`${DUMMY_JOB.minBudget}-${DUMMY_JOB.maxBudget}`}
                bold
              />
            </View>

            {/* description */}
            <Text style={styles.descriptionText}>
              {showFullText ? DUMMY_JOB.description : DUMMY_JOB.description.slice(0, 140)}
              {DUMMY_JOB.description.length > 140 && (
                <Text style={styles.seeMoreText} onPress={() => setShowFullText(!showFullText)}>
                  {showFullText ? "  See less" : " ...See more"}
                </Text>
              )}
            </Text>

            {/* tags */}
            <View style={styles.textRow}>
              {DUMMY_JOB.servicesRequired.map((srv) => (
                <Text key={srv._id} style={styles.textItem}>
                  #{srv.name}
                </Text>
              ))}
            </View>

            {/* extra details + reference pictures */}
            <View style={styles.newTextContainer}>
              <Detail label="Job Needed on:" value={new Date(DUMMY_JOB.EventDate).toLocaleString()} />
              <Detail label="Address:" value={DUMMY_JOB.location.address} />

              <FlatList
                data={DUMMY_JOB.referencePictureUrls}
                keyExtractor={(u) => u}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleImageClick(item)}>
                    <Image source={{ uri: item }} style={styles.image} />
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>

          {/* image modal */}
          <Modal visible={!!selectedImage} transparent animationType="fade">
            <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
              <Image source={{ uri: selectedImage }} style={styles.enlargedImage} />
            </TouchableOpacity>
          </Modal>

          {/* ───── PROPOSALS (customer) or SEND OFFER (provider) ───── */}
          {USER_TYPE === "Customer" ? (
            <>
              <Text style={styles.lastHeading}>Proposals ({DUMMY_PROPOSALS.length})</Text>
              {DUMMY_PROPOSALS.length === 0 ? (
                <Text style={styles.noDataText}>No proposals available</Text>
              ) : (
                <FlatList
                  data={DUMMY_PROPOSALS}
                  keyExtractor={(item) => item.proposalId}
                  renderItem={renderProposal}
                  scrollEnabled={false}
                  contentContainerStyle={{ paddingBottom: 40 }}
                />
              )}
            </>
          ) : (
            <View style={styles.offerWrap}>
              <CustomButton
                title="Send Offer"
                onPress={() => navigation.navigate("SendOFfer", { jobId: DUMMY_JOB._id })}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

/* ─── small reusable sub-components ─── */
const Info = ({ icon, text, bold }) => (
  <View style={styles.iconItem}>
    {icon}
    <Text style={[styles.iconText, bold && styles.iconTextBold]} numberOfLines={1}>
      {"  "}
      {text}
    </Text>
  </View>
);
const Detail = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.newTextItem}>{label}</Text>
    <Text style={styles.newTextItemBold}>{value}</Text>
  </View>
);

/* ─── styles (kept from your original) ─── */
const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20, marginTop: "5%" },
  profileSection: { flexDirection: "row", alignItems: "center" },
  profileImage: { width: 30, height: 30, borderRadius: 20, marginRight: 8 },
  userName: { fontSize: 14, fontWeight: "700" },
  button: { borderWidth: 1, borderColor: "#FF7235", borderRadius: 15, paddingVertical: "3%", paddingHorizontal: "6%" },
  buttonText: { color: "#FF7235", fontSize: 14, fontWeight: "bold" },

  newContainer: { padding: 20, marginTop: -20 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },

  iconsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  iconItem: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconText: { fontSize: 12, color: "#909090" },
  iconTextBold: { color: "#333", fontWeight: "bold" },

  descriptionText: { fontSize: 14, color: "#333", lineHeight: 20 },
  seeMoreText: { fontSize: 14, color: "#FF7235", fontWeight: "bold" },

  textRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginVertical: 10 },
  textItem: { fontSize: 12, backgroundColor: "#FFE0D2", color: "#FF7235", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },

  newTextContainer: { marginTop: 10 },
  row: { flexDirection: "row", marginBottom: 8 },
  newTextItem: { fontSize: 14, color: "#555" },
  newTextItemBold: { fontSize: 14, color: "#333", fontWeight: "bold", flexShrink: 1 },

  image: { width: 100, height: 100, marginRight: 10, borderRadius: 8 },

  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)" },
  enlargedImage: { width: 300, height: 300 },

  lastHeading: { fontSize: 18, marginLeft: 20, marginTop: 20, fontWeight: "600" },
  noDataText: { textAlign: "center", color: "#FF7235", marginTop: 20 },

  /* proposal cards */
  cardContainer: { paddingHorizontal: 20, marginTop: 10 },
  Newcard: { flexDirection: "row", alignItems: "center", padding: 15, borderWidth: 1, borderColor: "#ddd", borderRadius: 10 },
  cardProfileImage: { width: 70, height: 70, borderRadius: 35 },
  cardTextContainer: { flex: 1, marginLeft: 10 },
  cardText: { fontSize: 12, fontWeight: "bold" },
  cardText2: { fontSize: 12 },
  cardText3: { fontSize: 12, color: "#909090" },
  cardRating: { flexDirection: "row", alignItems: "center" },
  cardRatingText: { marginLeft: 4, fontSize: 12 },

  cardButtonContainer: { flexDirection: "row", marginTop: 10 },
  cardButton: { backgroundColor: "#FF7235", paddingVertical: 3, paddingHorizontal: 10, borderRadius: 10, marginHorizontal: 4 },
  cardButtonText: { color: "#fff", fontSize: 12 },
  cardButton2: { borderWidth: 1, borderColor: "#FF7235", paddingVertical: 3, paddingHorizontal: 10, borderRadius: 10, marginHorizontal: 4 },
  cardButtonText2: { color: "#FF7235", fontSize: 12 },

  offerWrap: { width: "80%", alignSelf: "center", marginTop: 60 },
});

export default JobDetails;
