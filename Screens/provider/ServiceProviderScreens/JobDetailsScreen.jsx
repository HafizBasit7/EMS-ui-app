import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import MapSVG from "../../../assets/SVG/MapSVG.svg";
import CalendarSVG from "../../../assets/SVG/CalendarSVG.svg";
import DollarSVG from "../../../assets/SVG/DollarSVG.svg";
import VerticalSVG from "../../../assets/SVG/VerticalSVG.svg";
import SearchSVG from "../../../assets/SVG/SearchSVG.svg";
import CandleSVG from "../../../assets/SVG/CandleSVG.svg";
import LineHead from "../../../CustomComponents/LineHead";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import { formatDate } from "../../../Hooks/formDate";

const mockJobs = [
  {
    jobId: "1",
    title: "Wedding Photography",
    location: { address: "123 Main St, Karachi" },
    createdAt: new Date().toISOString(),
    minBudget: 15000,
    maxBudget: 25000,
    description: "Need a professional photographer for wedding events...",
    services: "Photography,Editing,Printing",
  },
  {
    jobId: "2",
    title: "Birthday Decoration",
    location: { address: "Bahria Town, Lahore" },
    createdAt: new Date().toISOString(),
    minBudget: 5000,
    maxBudget: 8000,
    description: "Need someone to decorate for a kid's birthday party...",
    services: "Balloon,Stage,Lighting",
  },
];

const JobDetailsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const navigation = useNavigation();

  const jobs = mockJobs;
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleJobPress = (job) => {
    navigation.navigate("JobDetail", { job }); // Send job data to JobDetails screen
  };

  const renderJobCard = ({ item }) => (
    <TouchableOpacity onPress={() => handleJobPress(item)}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeading}>{item?.title}</Text>
          <VerticalSVG width={12} height={12} />
        </View>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <MapSVG width={12} height={12} />
            <Text style={styles.detailText}>{item?.location?.address}</Text>
          </View>
          <View style={styles.detailItem}>
            <CalendarSVG width={12} height={12} />
            <Text style={styles.detailText}>{formatDate(item?.createdAt)}</Text>
          </View>
          <View style={styles.detailItem}>
            <DollarSVG width={12} height={12} />
            <Text style={styles.detailTextLast}>
              ${item?.minBudget} - ${item?.maxBudget}
            </Text>
          </View>
        </View>
        <Text style={styles.description}>
          {item?.description?.slice(0, 110)}...
        </Text>
        <View style={styles.additionalTextRow}>
          {item?.services?.split(",").map((tag, index) => (
            <Text key={index} style={styles.additionalText}>
              #{tag}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <LineHead headerName="Jobs" headerState={true} />
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchSVG width={20} height={20} style={styles.leftIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <CandleSVG width={20} height={20} style={styles.rightIcon} />
        </View>

        <View style={styles.filterButtonsRow}>
          {["All", "HighRated"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.activeFilterButton,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === filter && styles.activeFilterButtonText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.jobId}
          renderItem={renderJobCard}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </>
  );
};

// ... same styles as before




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    paddingTop: "18%",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 6,
    marginTop: 16,
    backgroundColor: "#fff",
  },
  leftIcon: { marginRight: 10 },
  rightIcon: { marginLeft: 10 },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  filterButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: "5%",
  },
  filterButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 8,
    marginHorizontal: 4,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.1,
  },
  activeFilterButton: {
    backgroundColor: "#FF7235",
  },
  filterButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  activeFilterButtonText: {
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 12,
    marginLeft: 4,
    color: "#666",
  },
  detailTextLast: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 18,
    marginBottom: 8,
  },
  additionalTextRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  additionalText: {
    fontSize: 12,
    color: "#FF7235",
    backgroundColor: "#FFF2E3",
    padding: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
  },
});

export default JobDetailsScreen;
