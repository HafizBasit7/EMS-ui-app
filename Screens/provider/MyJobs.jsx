import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ClockSVG from "../../assets/SVG/ClockSVG.svg";
import CalendarSVG from "../../assets/SVG/CalendarSVG.svg";
import DollarSVG from "../../assets/SVG/DollarSVG.svg";
import MapSVG from "../../assets/SVG/MapSVG.svg";
import ProposalSVG from "../../assets/SVG/ProposalSVG";
import EyeSVG from "../../assets/SVG/EyeSVG.svg";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import VerticalSVG from "../../assets/SVG/VerticalSVG.svg";
import RightArrowSVG from "../../assets/SVG/RightArrowSVG.svg";
import BlackSVG from "../../assets/SVG/BlackSVG.svg";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const MyJobs = () => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [dateShow, setDateShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("all");
  const navigation = useNavigation();

  // Dummy data for UI demonstration
  const dummyJobs = [
    {
      id: "1",
      _id: "1",
      title: "Birthday Party Decoration",
      jobStatus: "pending",
      location: {
        address: "123 Main St, New York"
      },
      createdAt: new Date(),
      minBudget: 200,
      maxBudget: 300,
      description: "Need decoration for a birthday party with balloons and lights. Theme is superheroes. The venue is a medium-sized hall with about 50 guests expected.",
      servicesRequired: [
        { name: "Decoration" },
        { name: "Balloons" },
        { name: "Lighting" }
      ],
      views: 24,
      proposals: 5
    },
    {
      id: "2",
      _id: "2",
      title: "Wedding Catering Service",
      jobStatus: "assigned",
      location: {
        address: "456 Park Ave, Los Angeles"
      },
      createdAt: new Date(Date.now() - 86400000), // Yesterday
      minBudget: 1000,
      maxBudget: 1500,
      description: "Looking for catering services for a wedding reception with approximately 100 guests. We prefer a mix of vegetarian and non-vegetarian options with dessert.",
      servicesRequired: [
        { name: "Catering" },
        { name: "Wedding" }
      ],
      views: 42,
      proposals: 8
    },
    {
      id: "3",
      _id: "3",
      title: "Corporate Event Photography",
      jobStatus: "completed",
      location: {
        address: "789 Business Rd, Chicago"
      },
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
      minBudget: 500,
      maxBudget: 700,
      description: "Need professional photographer for annual corporate event. Full day coverage required (8 hours) with edited photos delivered within 3 days after the event.",
      servicesRequired: [
        { name: "Photography" },
        { name: "Corporate" }
      ],
      views: 18,
      proposals: 3
    }
  ];

  const filteredJobs = activeTab === "all" 
    ? dummyJobs 
    : dummyJobs.filter(job => job.jobStatus === activeTab);

  const toggleDescription = (jobId) => {
    setExpandedJobId((prev) => (prev === jobId ? null : jobId));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderJobCard = ({ item }) => {
    const isSelected = selectedJobId === item.id;
    const isExpanded = expandedJobId === item.id;

    return (
      <View style={[styles.card]}>
        <TouchableOpacity
          style={styles.cardHeader}
          onPress={() => setSelectedJobId(isSelected ? null : item.id)}
        >
          <Text style={styles.cardHeading}>{item.title}</Text>
         
          <View style={{flexDirection:'row' }}>
          <Text
            style={{
              backgroundColor:
                item.jobStatus === "assigned" ? "#b5d9b2" : 
                item.jobStatus === "completed" ? "#d9b5b5" : "#e3b74f",
              padding: 5,
              borderRadius: 5,
              color: "white",
              fontSize: 10,
              bottom:5,
              right:10
            }}
          >
            {item.jobStatus}
          </Text>
            <VerticalSVG width={12} height={12} />
          </View>
        </TouchableOpacity>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <MapSVG width={12} height={12} />
            <Text style={styles.detailText}>
              {item.location.address.length > 20
                ? `${item.location.address.slice(0, 20)}...`
                : item.location.address}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <CalendarSVG width={12} height={12} />
            <Text style={styles.detailText}>
              {formatDate(item.createdAt).split(" ").slice(0, 3).join(" ")}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <ClockSVG width={12} height={12} />
            <Text style={styles.detailText}>
              {formatDate(item.createdAt).split(" ").slice(3, 5).join(" ")}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <DollarSVG width={12} height={12} />
            <Text style={styles.detailTextLast}>
              ${item.minBudget}-${item.maxBudget}
            </Text>
          </View>
        </View>
        <View>
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
        </View>
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
          <TouchableOpacity
            onPress={() => navigation.navigate("JobDetail", { jobId: item._id })}
            style={styles.arrowIcon}
          >
            <RightArrowSVG width={18} height={15} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>My Jobs</Text>
          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={() => setDateShow(true)}>
              {!dateShow && <BlackSVG width={30} height={30} />}
            </TouchableOpacity>
            {dateShow && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(e, selectedDate) => {
                  setDateShow(false);
                  if (selectedDate) setDate(selectedDate);
                }}
                style={{
                  width: 200,
                  height: 40,
                  marginRight: "100%",
                }}
              />
            )}
          </View>
        </View>
        <View style={styles.filterButtonsRow}>
          {["all", "pending", "completed", "assigned"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeTab === filter && styles.activeFilterButton,
              ]}
              onPress={() => setActiveTab(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  activeTab === filter && styles.activeFilterButtonText,
                ]}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {filteredJobs.length === 0 ? (
          <View style={styles.noJobsContainer}>
            <Text style={styles.noJobsText}>Opps! No Jobs Found!</Text>
          </View>
        ) : (
          <FlatList
            data={filteredJobs}
            keyExtractor={(item) => item._id}
            renderItem={renderJobCard}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddNewJob")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// ... (keep all your existing styles the same)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 16,
    marginTop: "10%",
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    fontFamily: "Poppins-regular",
    marginLeft: 4,
    marginRight: "52%",
  },
  iconWrapper: {
    borderWidth: 0.1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
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
  filterButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: "5%",
  },
  filterButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingVertical: 8,
    marginHorizontal: 4,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.1,
  },
  activeFilterButton: {
    backgroundColor: "#FF7235",
    borderColor: "#FF7235",
  },
  filterButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  activeFilterButtonText: {
    color: "#fff",
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
    justifyContent: "flex-start",
    marginTop: 8,
    flexWrap: "wrap",
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
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF7235",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 36,
  },
  arrowIcon: {
    marginLeft: "auto",
  },
  noJobsContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  noJobsText: {
    textAlign: "center",
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    color: GlobalStyles.colors.ButtonColor,
  },
});

export default MyJobs;