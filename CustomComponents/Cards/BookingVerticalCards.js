import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";


const { width, height } = Dimensions.get("window");

export default function BookingVerticalCard({ data ,tab}) {
  
  const navigation = useNavigation();
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // E.g., "Dec"
    const year = date.getFullYear();
  
    return `${day}, ${month}, ${year}`;
  };
  
  const formatTime = (isoDate) => {
    const date = new Date(isoDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "pm" : "am";
  
    // Convert 24-hour time to 12-hour format
    const formattedHours = hours % 12 || 12; // 0 becomes 12 for midnight
    const formattedMinutes = minutes.toString().padStart(2, "0");
  
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.buttonRow}>
          <View style={styles.cardContent}>
            {/* Card Content: Two Columns and One Row */}
            <View style={styles.col1}>
              <Text style={styles.name}>{data?.provider?.fullname ||  data?.customer?.fullname}</Text>
              <View style={styles.phoneRow}>
                <Icon
                  name="phone"
                  size={16}
                  color={'#909090'}
                />
                <Text style={styles.phone}>{data?.provider?.phoneNo || data?.customer?.phoneNo}</Text>
              </View>
              <View style={styles.categoryRow}>
               
                  <View style={styles.categoryChip}>
                    <Text style={styles.categoryText}>{data?.eventName}</Text>
                  </View>
                
              </View>
              <Text style={styles.subheading}>Date & Time</Text>
              <Text style={styles.date}>{formatDate(data?.EventDate)}</Text>
              <Text style={styles.time}>{formatTime(data?.EventDate)}</Text>
            </View>
            {/* Column 2: Image */}
            <View style={styles.col2}>
              <Image
                source={{ uri: data?.provider?.profilePicUrl || data?.customer?.profilePicUrl  }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </View>
          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {tab === "Ongoing" ? (
              <>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#FEEEEB" }]}
              onPress={() => {}}
            >
              <Text style={[styles.buttonText, { color: "#E72D04" }]}>
                Cancel Booking
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GiveReview',{providerId:data?.customer?.customerId || data?.provider?.providerId})}>
              <Text style={styles.buttonText}>View Recipt</Text>
            </TouchableOpacity>
            </>
            ) : (
              <>
              <TouchableOpacity
              style={[styles.button, { backgroundColor: "#FEEEEB" }]}
              onPress={() => {}}
            >
              <Text style={[styles.buttonText, { color: "#E72D04" }]}>
                View Recipt 
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GiveReview',{providerId:data?.customer?.customerId || data?.provider?.providerId})}>
              <Text style={styles.buttonText}>Give Review</Text>
            </TouchableOpacity>
            </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: GlobalStyles.colors.white,
    borderRadius: 17,  // Reduced radius for smaller card
    overflow: "hidden",
    borderWidth: 1,
    borderColor: '#eeedf0',
    marginBottom: 8,  // Reduced margin
  },
  buttonRow: {
    flexDirection: "column",
    padding: 10,  // Reduced padding for compactness
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  col1: {
    flex: 1,
    paddingRight: 10,
  },
  col2: {
    width: width * 0.32,  // Reduced image width
    height: 150,  // Reduced image height
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: GlobalStyles.colors.lightGray,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  name: {
    fontSize: 14,  // Reduced font size
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    color: "#121419",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,  // Reduced margin
  },
  phone: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginLeft: 5,
    color: "#909090",
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 3,  // Reduced margin
  },
  categoryChip: {
    backgroundColor: "#FFF2E3",
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 4,  // Adjusted padding
    marginRight: 8,
    marginBottom: 2,
    flexDirection: "row",
  },
  categoryText: {
    color: GlobalStyles.colors.ButtonColor,
    fontSize: 12,  // Reduced font size
    fontFamily: "Poppins-Regular",
  },
  subheading: {
    fontSize: 12,  // Reduced font size
    fontFamily: "Poppins-Regular",
    marginTop: 6,
    color: "#121419",
    fontWeight: "bold",
  },
  date: {
    fontSize: 10,  // Reduced font size
    fontFamily: "Poppins-Regular",
    color: "#909090",
  },
  time: {
    fontSize: 10,  // Reduced font size
    fontFamily: "Poppins-Regular",
    color: "#909090",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,  // Reduced margin
  },
  button: {
    flex: 1,
    padding: 8,  // Reduced padding
    backgroundColor: GlobalStyles.colors.ButtonColor,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 13,  // Reduced font size
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
});
