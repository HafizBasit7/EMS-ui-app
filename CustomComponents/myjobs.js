import React, { useState, useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { Actionsheet } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../Styles/GlobalStyles";
import BottomButton from "./BottomButton";

// ─── Dummy SVG placeholders (delete if you have real SVGs) ─────────
const Placeholder = () => <View style={{ width: 12, height: 12 }} />;
const MapSVG = Placeholder;
const ClockSVG = Placeholder;
const CalendarSVG = Placeholder;
const DollarSVG = Placeholder;
// ───────────────────────────────────────────────────────────────────

function MyJobCustomActionSheet({ isOpen, onClose, providerId = "static-id" }) {
  // ─── Dummy data ────────────────────────────────────────────────
  const [userJobs, setUserJobs] = useState([
    {
      _id: "job1",
      title: "Wedding Photography",
      location: { address: "New York, NY" },
      createdAt: new Date().toISOString(),
      minBudget: 1000,
      maxBudget: 1500,
    },
    {
      _id: "job2",
      title: "Corporate Event Coverage",
      location: { address: "San Francisco, CA" },
      createdAt: new Date().toISOString(),
      minBudget: 800,
      maxBudget: 1200,
    },
  ]);

  const navigation = useNavigation();
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // purely visual

  // Pull-to-refresh (just a spinner for now)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  // ─── Card renderer ────────────────────────────────────────────
  const renderJobCard = ({ item }) => {
    const isSelected = selectedJobId === item._id;
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
          onPress={() => setSelectedJobId(isSelected ? null : item._id)}
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
            <MapSVG />
            <Text style={styles.detailText}>{item.location.address}</Text>
          </View>
          <View style={styles.detailItem}>
            <CalendarSVG />
            <Text style={styles.detailText}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <ClockSVG />
            <Text style={styles.detailText}>
              {new Date(item.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <DollarSVG />
            <Text style={styles.detailTextLast}>
              {item.minBudget}-{item.maxBudget}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // ─── Sheet UI ─────────────────────────────────────────────────
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content style={{ minHeight: "50%", maxHeight: 600 }}>
        <Text style={styles.heading}>Select a job to offer</Text>

        {showLoader ? (
          <ActivityIndicator
            size={24}
            color={GlobalStyles.colors.ButtonColor}
            style={styles.noJobsText}
          />
        ) : userJobs.length === 0 ? (
          <Text style={styles.noJobsText}>No jobs found</Text>
        ) : (
          <FlatList
            data={userJobs}
            keyExtractor={(item) => item._id}
            renderItem={renderJobCard}
            contentContainerStyle={{ paddingBottom: 100 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
          />
        )}

        {userJobs.length > 0 && (
          <View style={styles.buttonsContainer}>
            <BottomButton
              text="Offer Selected Job"
              onPress={() => {
                if (selectedJobId) {
                  navigation.navigate("OfferSelectedJob", {
                    jobId: selectedJobId,
                    providerId,
                  });
                  onClose?.();
                } else {
                  alert("Please select a job first.");
                }
              }}
            />
          </View>
        )}
      </Actionsheet.Content>
    </Actionsheet>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    marginBottom: 16,
    fontFamily: "Poppins-Bold",
  },
  noJobsText: {
    textAlign: "center",
    fontSize: 16,
    color: GlobalStyles.colors.ButtonColor,
    marginTop: "30%",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    fontFamily: "Poppins-Medium",
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
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyJobCustomActionSheet;
