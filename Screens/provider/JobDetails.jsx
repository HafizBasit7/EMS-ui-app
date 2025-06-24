import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapSVG from "../../assets/SVG/MapSVG.svg";
import ClockSVG from "../../assets/SVG/ClockSVG.svg";
import CalendarSVG from "../../assets/SVG/CalendarSVG.svg";
import DollarSVG from "../../assets/SVG/DollarSVG.svg";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const JobDetails = () => {
  const navigation = useNavigation();
  const [showFullText, setShowFullText] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const job = {
    title: "Birthday Decoration Required",
    date: "18th December 2024 – 3:30PM",
    location: "NewYork, USA",
    description:
      "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.",
    tags: ["#balloons", "#Cake", "#Decoration", "#Cake", "#Decoration", "#Catering"],
    minBudget: 200,
    maxBudget: 220,
    images: [
      "https://via.placeholder.com/100/FFDF00",
      "https://via.placeholder.com/100/0000FF",
      "https://via.placeholder.com/100/808080",
    ],
    user: {
      name: "Jane Cooper",
      rating: 4.8,
      profilePicUrl: "https://via.placeholder.com/30",
    },
  };

  const handleImageClick = (uri) => setSelectedImage(uri);
  const handleCloseModal = () => setSelectedImage(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} />
        <Text style={styles.headerTitle}>Job Details</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {/* User Info */}
        <View style={styles.profileRow}>
          <View style={styles.profileInfo}>
            <Image source={{ uri: job.user.profilePicUrl }} style={styles.profileImage} />
            <Text style={styles.byText}>by {job.user.name}</Text>
            <Ionicons name="star" size={14} color="#FFCC00" />
            <Text style={styles.ratingText}>{job.user.rating}</Text>
          </View>

          <TouchableOpacity
            style={styles.viewProfileButton}
            onPress={() => navigation.navigate("EmployerProfile")}
          >
            <Text style={styles.viewProfileText}>View profile</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>{job.title}</Text>

        {/* Info Icons */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MapSVG width={12} height={12} />
            <Text style={styles.infoText}>New York</Text>
          </View>
          <View style={styles.infoItem}>
            <CalendarSVG width={12} height={12} />
            <Text style={styles.infoText}>1 day</Text>
          </View>
          <View style={styles.infoItem}>
            <ClockSVG width={12} height={12} />
            <Text style={styles.infoText}>29 min ago</Text>
          </View>
          <View style={styles.infoItem}>
            <DollarSVG width={12} height={12} />
            <Text style={styles.priceText}>${job.minBudget}–{job.maxBudget}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          {showFullText ? job.description : job.description.slice(0, 150) + "..."}
          <Text
            style={styles.seeMoreText}
            onPress={() => setShowFullText(!showFullText)}
          >
            {showFullText ? " See less" : " See more"}
          </Text>
        </Text>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {job.tags.map((tag, index) => (
            <Text style={styles.tag} key={index}>
              {tag}
            </Text>
          ))}
        </View>

        {/* Job Date & Address */}
        <Text style={styles.detailTitle}>Job Needed on:</Text>
        <Text style={styles.detailText}>{job.date}</Text>
        <Text style={styles.detailTitle}>Address:</Text>
        <Text style={styles.detailText}>{job.location}</Text>

        {/* Images */}
        <View style={styles.imageRow}>
          {job.images.map((uri, index) => (
            <TouchableOpacity key={`${uri}-${index}`} onPress={() => handleImageClick(uri)}>
              <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
          <View style={styles.moreImages}>
            <Text style={styles.moreImagesText}>+2</Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal for full-screen image */}
      <Modal visible={selectedImage !== null} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={handleCloseModal}>
          <Image source={{ uri: selectedImage }} style={styles.enlargedImage} />
        </TouchableOpacity>
      </Modal>

      {/* Bottom Button */}
      <TouchableOpacity
        style={styles.sendOfferBtn}
        onPress={() => navigation.navigate("SendOFfer")}
      >
        <Text style={styles.sendOfferText}>Send an Offer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { paddingHorizontal: 20, paddingBottom: 100 },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTitle: { fontSize: 16, fontWeight: "bold" },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  profileInfo: { flexDirection: "row", alignItems: "center", gap: 6 },
  profileImage: { width: 30, height: 30, borderRadius: 15 },
  byText: { fontSize: 12, color: "#333" },
  ratingText: { fontSize: 12 },
  viewProfileButton: {
    borderColor: "#FF7235",
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 15,
  },
  viewProfileText: { fontSize: 12, color: "#FF7235", fontWeight: "bold" },
  title: { fontSize: 18, fontWeight: "bold", marginTop: 16, color: "#000" },
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
    alignItems: "center",
  },
  infoItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  infoText: { fontSize: 12, color: "#909090" },
  priceText: { fontSize: 12, fontWeight: "bold", color: "#FF7235" },
  description: {
    fontSize: 14,
    color: "#333",
    marginTop: 12,
    lineHeight: 20,
  },
  seeMoreText: { color: "#FF7235", fontWeight: "bold" },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 8,
  },
  tag: {
    fontSize: 12,
    color: "#FF7235",
    backgroundColor: "#FFE0D2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  detailTitle: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  detailText: { fontSize: 14, color: "#000", marginTop: 2 },
  imageRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
    alignItems: "center",
  },
  image: { width: 60, height: 60, borderRadius: 8 },
  moreImages: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  moreImagesText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  enlargedImage: { width: screenWidth - 40, height: screenWidth - 40 },
  sendOfferBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#FF7235",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  sendOfferText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default JobDetails;
