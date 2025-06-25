import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import LineHead from "../../CustomComponents/LineHead";
import Ionicons from "react-native-vector-icons/Ionicons";
import ClockSVG from "../../assets/SVG/ClockSVG.svg";
import CalendarSVG from "../../assets/SVG/CalendarSVG.svg";
import DollarSVG from "../../assets/SVG/DollarSVG.svg";
import MapSVG from "../../assets/SVG/MapSVG.svg";
import ProposalSVG from "../../assets/SVG/ProposalSVG";
import EyeSVG from "../../assets/SVG/EyeSVG.svg";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import BottomButton from "../../CustomComponents/BottomButton";
import { useNavigation } from "@react-navigation/native";
import CustomMessageModal from "../../CustomComponents/CustomMessageModal";

const MOCK_JOBS = [
  {
    id: "1",
    title: "Plumbing Work Required",
    location: { address: "Model Town, Lahore" },
    createdAt: new Date().toISOString(),
    minBudget: 5000,
    maxBudget: 10000,
    description: "Need urgent plumbing services for a bathroom leakage.",
    servicesRequired: [{ name: "Plumbing" }, { name: "Repair" }],
    views: 15,
    proposals: 4,
  },
  {
    id: "2",
    title: "Graphic Design Project",
    location: { address: "DHA, Karachi" },
    createdAt: new Date().toISOString(),
    minBudget: 10000,
    maxBudget: 15000,
    description:
      "Looking for a designer to create social media banners and thumbnails.",
    servicesRequired: [{ name: "Design" }, { name: "Branding" }],
    views: 22,
    proposals: 6,
  },
];

const OfferingJob = ({ route }) => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { providerId } = route.params;

  const toggleDescription = (jobId) => {
    setExpandedJobId((prev) => (prev === jobId ? null : jobId));
  };

  const renderJobCard = ({ item }) => {
    const isSelected = selectedJobId === item.id;
    const isExpanded = expandedJobId === item.id;

    return (
      <View
        style={[
          styles.card,
          isSelected && {
            backgroundColor: "#fff2ec",
            borderColor: "#FF7235",
          },
        ]}
      >
        <TouchableOpacity
          style={styles.cardHeader}
          onPress={() => setSelectedJobId(isSelected ? null : item.id)}
        >
          <Text style={styles.cardHeading}>{item.title}</Text>
          <View
            style={[
              styles.radioButton,
              { backgroundColor: isSelected ? "#FFA500" : "#ccc" },
            ]}
          >
            <Ionicons name="checkmark" size={16} color="white" />
          </View>
        </TouchableOpacity>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <MapSVG width={12} height={12} />
            <Text style={styles.detailText}>{item.location.address}</Text>
          </View>
          <View style={styles.detailItem}>
            <CalendarSVG width={12} height={12} />
            <Text style={styles.detailText}>Today</Text>
          </View>
          <View style={styles.detailItem}>
            <ClockSVG width={12} height={12} />
            <Text style={styles.detailText}>12:00 PM</Text>
          </View>
          <View style={styles.detailItem}>
            <DollarSVG width={12} height={12} />
            <Text style={styles.detailTextLast}>
              {item.minBudget}-{item.maxBudget}
            </Text>
          </View>
        </View>

        <Text style={styles.description}>
          {isExpanded
            ? item.description
            : `${item.description.slice(0, 110)}...`}
          {item.description.length > 110 && (
            <Text
              style={styles.seeMoreText}
              onPress={() => toggleDescription(item.id)}
            >
              {isExpanded ? " See less" : " See more"}
            </Text>
          )}
        </Text>

        <View style={styles.additionalTextRow}>
          {item.servicesRequired.map((tag, index) => (
            <Text key={index} style={styles.additionalText}>
              #{tag.name}
            </Text>
          ))}
        </View>

        <View style={styles.svgsWithTextRow}>
          <View style={styles.svgTextPair}>
            <EyeSVG width={15} height={15} />
            <Text style={styles.svgText}>{item.views} Views</Text>
          </View>
          <View style={[styles.svgTextPair, { marginLeft: 20 }]}>
            <ProposalSVG width={15} height={15} />
            <Text style={styles.svgText}>{item.proposals} Proposals</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <LineHead headerName="My Jobs" headerState={true} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.heading}>Select a job to offer</Text>

          <FlatList
            data={MOCK_JOBS}
            keyExtractor={(item) => item.id}
            renderItem={renderJobCard}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />

          <CustomMessageModal
            visible={modalVisible}
            message={"Please Select a job"}
            buttonNumbers={1}
            icon="alert-circle"
            onClose={() => setModalVisible(false)}
          />
        </View>
      </View>

      <View style={{ bottom: "5%" }}>
        <BottomButton
          text={"Offer Selected Job"}
          onPress={() => {
            if (selectedJobId) {
              navigation.navigate("OfferSelectedJob", {
                jobId: selectedJobId,
                providerId,
              });
            } else {
              setModalVisible(true);
            }
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: "7%",
  },
  content: {
    padding: 16,
    marginTop: "10%",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    marginBottom: 16,
    fontFamily: "Poppins-Bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    marginBottom: 16,
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
    fontFamily: "Poppins-medium",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailTextLast: {
    fontSize: 10,
    marginLeft: 2,
    fontWeight: "bold",
  },
  detailText: {
    fontSize: 10,
    marginLeft: 2,
    color: "#666",
  },
  description: {
    fontSize: 12,
    marginTop: 16,
    color: "#666",
    lineHeight: 16,
    marginBottom: "1%",
    fontFamily: "Poppins-Regular",
  },
  seeMoreText: {
    color: "#FF7235",
    fontWeight: "400",
  },
  additionalTextRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  additionalText: {
    fontSize: 10,
    color: GlobalStyles.colors.hashTags,
    fontFamily: "Poppins-Regular",
    backgroundColor: "#FFF2E3",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 4,
  },
  svgsWithTextRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  svgTextPair: {
    flexDirection: "row",
    alignItems: "center",
  },
  svgText: {
    fontSize: 12,
    marginLeft: 4,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OfferingJob;
