import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import LineHead from "../../../CustomComponents/LineHead";
import Ionicons from "react-native-vector-icons/Ionicons";
import ClockSVG from "../../../assets/SVG/ClockSVG.svg";
import CalendarSVG from "../../../assets/SVG/CalendarSVG.svg";
import DollarSVG from "../../../assets/SVG/DollarSVG.svg";
import MapSVG from "../../../assets/SVG/MapSVG.svg";
import ProposalSVG from "../../../assets/SVG/ProposalSVG.svg";
import EyeSVG from "../../../assets/SVG/EyeSVG.svg";
import InDollarSVG from "../../../assets/SVG/InDollarSVG.svg";
import CustomButton from "../../../CustomComponents/CustomButton";
import CustomMessageModal from "../../../CustomComponents/CustomMessageModal";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

const OfferingJobClicked = () => {
  const navigation = useNavigation();
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [yesclick, setyesclick] = useState(false);
  const [message, setmessage] = useState("");
  const [icon, seticon] = useState("alert-circle");
  const [showModal, setShowModal] = useState(false);
  const [buttonNumber, setButtonNumber] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [userJobs, setUserJobs] = useState([
    {
      id: "job1",
      title: "Need Event Photographer",
      description: "Looking for a skilled photographer for a 3-hour birthday party event. Preferably with previous event experience.",
      location: { address: "123 Main Street" },
      createdAt: new Date(),
      minBudget: 200,
      maxBudget: 400,
      servicesRequired: [{ name: "Photography" }, { name: "Event" }],
      views: 25,
      proposals: 5,
      isExpanded: false,
    },
  ]);

  const handleSelect = (jobId) => {
    setSelectedJobId((prevId) => (prevId === jobId ? null : jobId));
  };

  const toggleDescription = (jobId) => {
    setUserJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, isExpanded: !job.isExpanded } : job
      )
    );
  };

  const handleSave = () => {
    if (!yesclick) {
      setmessage("Are you sure you want to send the offer?");
      seticon("clock-alert-outline");
      setButtonNumber(2);
      setShowModal(true);
      setyesclick(true);
      return;
    }

    if (!inputValue) {
      setmessage("Please enter a price.");
      seticon("alert-circle");
      setButtonNumber(1);
      setShowModal(true);
      setyesclick(false);
      return;
    }

    // Show success message first
    setmessage("Offer sent successfully!");
    seticon("check-circle");
    setButtonNumber(1);
    setShowSuccessModal(true);
    setyesclick(false);
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    // Navigate to Home tab after success confirmation
    navigation.reset({
      index: 0,
      routes: [{ name: 'TabNavigation', params: { screen: 'Home' } }],
    });
  };

  return (
    <>
      <LineHead headerName="My Jobs" headerState={true} />
      <View style={styles.container}>
        <View style={styles.content}>
          {userJobs.map((job) => (
            <View
              key={job.id}
              style={[
                styles.card,
                selectedJobId === job.id && {
                  backgroundColor: "#fff2ec",
                  borderColor: "#FF7235",
                },
              ]}
            >
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => handleSelect(job.id)}
              >
                <Text style={styles.cardHeading}>{job.title}</Text>
                <View
                  style={[
                    styles.radioButton,
                    {
                      backgroundColor:
                        selectedJobId === job.id ? "#FFA500" : "#ccc",
                    },
                  ]}
                >
                  <Ionicons name="checkmark" size={16} color="white" />
                </View>
              </TouchableOpacity>

              <View style={styles.details}>
                <View style={styles.detailItem}>
                  <MapSVG width={12} height={12} />
                  <Text style={styles.detailText}>
                    {job?.location?.address}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <CalendarSVG width={12} height={12} />
                  <Text style={styles.detailText}>
                    {new Date(job?.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <ClockSVG width={12} height={12} />
                  <Text style={styles.detailText}>
                    {new Date(job?.createdAt).toLocaleTimeString()}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <DollarSVG width={12} height={12} />
                  <Text style={styles.detailTextLast}>
                    {job?.minBudget} - {job?.maxBudget}
                  </Text>
                </View>
              </View>

              <Text style={styles.description}>
                {job.isExpanded
                  ? job.description
                  : `${job?.description?.slice(0, 110)}...`}
                {job.description.length > 110 && (
                  <Text
                    style={styles.seeMoreText}
                    onPress={() => toggleDescription(job.id)}
                  >
                    {job.isExpanded ? " See less" : " See more"}
                  </Text>
                )}
              </Text>

              <View style={styles.additionalTextRow}>
                {job?.servicesRequired?.map((tag, index) => (
                  <Text key={index} style={styles.additionalText}>
                    #{tag.name}
                  </Text>
                ))}
              </View>

              <View style={styles.svgsWithTextRow}>
                <View style={styles.svgTextPair}>
                  <EyeSVG width={15} height={15} />
                  <Text style={styles.svgText}>{job?.views} Views</Text>
                </View>
                <View style={[styles.svgTextPair, { marginLeft: 20 }]}>
                  <ProposalSVG width={15} height={15} />
                  <Text style={styles.svgText}>
                    {job?.proposals} Proposals
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputHeading}>Offer a price for your Job</Text>
          <View style={styles.inputContainer}>
            <InDollarSVG width={24} height={24} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="000.00"
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <CustomButton
            title={yesclick ? "Give An Offer" : "Offer Job"}
            style={styles.saveButton}
            onPress={handleSave}
          />
        </View>

        {/* Confirmation Modal */}
        <CustomMessageModal
          buttonNumbers={buttonNumber}
          visible={showModal}
          message={message}
          onYesClick={handleSave} // Will proceed to show success modal
          icon={icon}
          onClose={() => setShowModal(false)}
        />

        {/* Success Modal */}
        <CustomMessageModal
          buttonNumbers={1}
          visible={showSuccessModal}
          message={message}
          onYesClick={handleSuccessConfirm}
          icon={icon}
          onClose={handleSuccessConfirm}
        />
      </View>
    </>
  );
};

// ... (keep your existing styles)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: "10%",
  },
  content: {
    padding: 16,
    marginTop: "10%",
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 20,
    width: "90%",
    alignItems: "center",
    marginLeft: "5%",
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
  },
  additionalTextRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 8,
    flexWrap: "wrap",
  },
  additionalText: {
    fontSize: 10,
    color: GlobalStyles.colors.hashTags,
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
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  inputHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    marginLeft: "5%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "90%",
    marginLeft: "5%",
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
});

export default OfferingJobClicked;
