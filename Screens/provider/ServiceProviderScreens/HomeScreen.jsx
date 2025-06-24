import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import BellSVG from "../../../assets/SVG/BellSVG.svg";
import ShopSVG from "../../../assets/SVG/ShopSVG.svg";
import ClockSVG from "../../../assets/SVG/ClockSVG.svg";
import CalendarSVG from "../../../assets/SVG/CalendarSVG.svg";
import DollarSVG from "../../../assets/SVG/DollarSVG.svg";
import MapSVG from "../../../assets/SVG/MapSVG.svg";
import VerticalSVG from "../../../assets/SVG/VerticalSVG.svg";
import RightArrowSVG from "../../../assets/SVG/RightArrowSVG.svg";
import Decrement from "../../../assets/SVG/decrement.svg";
import Increment from "../../../assets/SVG/increment.svg";
import Shape from "../../../assets/SVG/shape.svg";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

const mockUser = { name: "Basit", userId: "123" };
const mockStats = {
  totalCompletedJobs: 12,
  totalPendingJobs: 5,
  totalPendingProposals: 4,
  totalServices: 7,
};
const mockJobs = [
  {
    jobId: "1",
    title: "Plumbing Repair",
    location: "Lahore",
    createdAt: new Date().toString(),
    minBudget: 100,
    maxBudget: 200,
    description: "Fix leaky pipes and replace fittings.",
    servicesRequired: [{ name: "Plumbing" }],
    user: {
      fullname: "Ali Raza",
      profilePicUrl: "https://via.placeholder.com/50",
    },
  },
  {
    jobId: "2",
    title: "Electric Wiring",
    location: "Karachi",
    createdAt: new Date().toString(),
    minBudget: 500,
    maxBudget: 800,
    description: "Install new electric wires in home.",
    servicesRequired: [{ name: "Electrician" }],
    user: {
      fullname: "Sana Khan",
      profilePicUrl: "https://via.placeholder.com/50",
    },
  },
];

const ProviderHomeScreen = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState(mockJobs);
  const [stats] = useState(mockStats);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [read] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getHeader = () => (
    <>
      <View style={styles.cardsContainer}>
        <View style={[styles.card, styles.card1]}>
          <Text style={[styles.cardHeading, styles.card1Text]}>
            Total Earnings
          </Text>
          <Text style={[styles.cardText, styles.card1Text]}>$20k</Text>
        </View>
        <View style={[styles.card, styles.otherCards]}>
          <Text style={styles.cardHeading}>Jobs Completed</Text>
          <Text style={styles.cardText}>{stats.totalCompletedJobs}</Text>
          <View style={{ flexDirection: "row" }}>
            <Decrement />
            <Text style={styles.statChange}>1.3%</Text>
          </View>
        </View>
        <View style={[styles.card, styles.otherCards]}>
          <Text style={styles.cardHeading}>Jobs Pending</Text>
          <Text style={styles.cardText}>{stats.totalPendingJobs}</Text>
          <View style={{ flexDirection: "row" }}>
            <Increment />
            <Text style={styles.statChange}>1.3%</Text>
          </View>
        </View>
        <View style={[styles.card, styles.otherCards]}>
          <Text style={styles.cardHeading}>Offers</Text>
          <Text style={styles.cardText}>{stats.totalPendingProposals}</Text>
          <View style={{ flexDirection: "row" }}>
            <Decrement />
            <Text style={styles.statChange}>1.3%</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.fullWidthCard}
        onPress={() => navigation.navigate("ProviderProfile", { providerId: mockUser.userId })}
      >
        <View style={styles.fullWidthCardContent}>
          <View>
            <ShopSVG width={30} height={30} />
            <Text style={styles.fullWidthCardHeading}>My Services Profile</Text>
            <Text style={styles.fullWidthCardText}>{stats.totalServices} Services</Text>
          </View>
          <View style={{ marginLeft: "30%" }}>
            <Shape />
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.newSection}>
        <Text style={styles.newSectionHeading}>Latest jobs</Text>
        <TouchableOpacity onPress={() => navigation.navigate("JobDetailsScreen")}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderJobCard = ({ item }) => {
    const isExpanded = selectedJobId === item.jobId;

    return (
      <View style={styles.card2}>
        <TouchableOpacity
          style={styles.cardHeader2}
          onPress={() => setSelectedJobId(isExpanded ? null : item.jobId)}
        >
          <Text style={styles.cardHeading}>{item.title}</Text>
          <VerticalSVG width={12} height={12} />
        </TouchableOpacity>
        <View style={styles.details2}>
          <View style={styles.detailItem2}>
            <MapSVG width={12} height={12} />
            <Text style={styles.detailText2}>{item.location}</Text>
          </View>
          <View style={styles.detailItem2}>
            <CalendarSVG width={12} height={12} />
            <Text style={styles.detailText2}>Today</Text>
          </View>
          <View style={styles.detailItem2}>
            <ClockSVG width={12} height={12} />
            <Text style={styles.detailText2}>Now</Text>
          </View>
          <View style={styles.detailItem2}>
            <DollarSVG width={12} height={12} />
            <Text style={styles.detailTextLast2}>
              {item.minBudget} - {item.maxBudget}
            </Text>
          </View>
        </View>
        <Text style={styles.description}>
          {isExpanded ? item.description : `${item.description.slice(0, 100)}...`}
          {item.description.length > 100 && (
            <Text
              style={styles.seeMoreText}
              onPress={() => setSelectedJobId(isExpanded ? null : item.jobId)}
            >
              {isExpanded ? " See less" : " See more"}
            </Text>
          )}
        </Text>
        <View style={styles.additionalTextRow}>
          {item.servicesRequired.map((tag, index) => (
            <Text key={index} style={styles.additionalText}>#{tag.name}</Text>
          ))}
        </View>
        <View style={styles.svgsWithTextRow}>
          <View style={styles.svgTextPair}>
            <Image source={{ uri: item.user.profilePicUrl }} style={styles.profileImage} />
            <Text style={styles.svgText}>By {item.user.fullname}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("JobDetail", { jobId: item.jobId })}>
            <RightArrowSVG width={18} height={15} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.textContainer}>
          <Text style={styles.heading1}>Hello Welcome 🎉</Text>
          <Text style={styles.heading2}>Hi {mockUser.name}!</Text>
          <Text style={styles.heading3}>Dashboard</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <BellSVG width={24} height={24} />
          {read && (
            <View style={styles.badge}>
              <Icon name="exposure-plus-1" size={12} color={"white"} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Job List */}
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.jobId}
        renderItem={renderJobCard}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={getHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          loading && (
            <ActivityIndicator size="small" color={GlobalStyles.colors.ButtonColor} />
          )
        }
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  iconContainer: {
    position: "relative",
    alignItems: "center", // Center the notifications icon
    justifyContent: "center",
  },
  plusIcon: {
    position: "absolute",
   
  },
  badge: {
    position: 'absolute',
    top: 32,
    right: 0,
    width: 18, // Adjust size of badge
    height: 18,
    left:10,
    borderRadius: 9, // Makes it circular
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white', // Optional border for better visibility
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: "10%",
  },
  textContainer: {
    flexDirection: "column",
  },
  heading1: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  heading2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5%",
    fontFamily: "Poppins-Regular",
  },
  heading3: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  bellContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8%",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 120,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
    padding: 8,
  },
  card1: {
    backgroundColor: "#FF7235",
  },
  otherCards: {
    backgroundColor: "#FFF2E3",
  },
  cardHeading: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    fontFamily: "Poppins-Regular",
  },
  cardText: {
    fontSize: 24,
    fontWeight: "400",
    color: "#333",
    marginLeft: "5%",
    fontFamily: "Poppins-Regular",
  },
  card1Text: {
    color: "#FFF",
  },
  fullWidthCard: {
    width: "100%",
    backgroundColor: "#FFF2E3",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16, // Adjust spacing before the new section
  },
  fullWidthCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  shopIcon: {
    marginRight: 12,
    marginBottom: "10%",
  },
  fullWidthCardHeading: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
    fontFamily: "Poppins-Regular",
  },
  fullWidthCardText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  newSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  newSectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Regular",
    marginLeft: "1%",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF7235", // Blue color for "View All"
    fontFamily: "Poppins-Regular",
  },
  svgTextPair: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  svgText: {
    fontSize: 12,
    color: "#666",
  },
  arrowIcon: {
    marginLeft: "auto",
  },
  svgsWithTextRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
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
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 18,
    marginBottom: 8,
  },
  seeMoreText: {
    color: "#FF7235",
    fontWeight: "bold",
  },
  detailText2: {
    fontSize: 12,
    marginLeft: 4,
    color: "#666",
  },
  detailTextLast2: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "bold",
  },
  cardHeading2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  details2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailItem2: {
    flexDirection: "row",
    alignItems: "center",
  },
  card2: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});

export default ProviderHomeScreen;
