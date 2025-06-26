import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function BookingVerticalCard({ data, tab }) {
  const navigation = useNavigation();

  // Modified to handle the date format you're using (e.g., "26 Nov, Thursday")
  const displayDate = data?.date || "No date";
  const displayTime = data?.time || "No time";

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          {/* Left Column - Text Content */}
          <View style={styles.col1}>
            <Text style={styles.name}>{data?.name || "No name"}</Text>
            
            <View style={styles.phoneRow}>
              <Icon name="phone" size={16} color={'#909090'} />
              <Text style={styles.phone}>{data?.phoneNumber || "No phone"}</Text>
            </View>
            
            <View style={styles.categoryRow}>
              {data?.category?.map((cat, index) => (
                <View key={index} style={styles.categoryChip}>
                  <Text style={styles.categoryText}>{cat}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.subheading}>Date & Time</Text>
            <Text style={styles.date}>{displayDate}</Text>
            <Text style={styles.time}>{displayTime}</Text>
          </View>

          {/* Right Column - Image */}
          <View style={styles.col2}>
            <Image
              source={{ uri: data?.image || "https://via.placeholder.com/150" }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {tab === "ongoing" ? (
            <>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#FEEEEB" }]}
                onPress={() => {}}
              >
                <Text style={[styles.buttonText, { color: "#E72D04" }]}>
                  Cancel Booking
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('GaveReview')}
              >
                <Text style={styles.buttonText}>View Receipt</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#FEEEEB" }]}
                onPress={() => navigation.navigate('ViewReceipt')}
              >
                <Text style={[styles.buttonText, { color: "#E72D04" }]}>
                  View Receipt
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('GaveReview')}
              >
                <Text style={styles.buttonText}>Give Review</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: GlobalStyles.colors.white,
    borderRadius: 17,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: '#eeedf0',
    padding: 15,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  col1: {
    flex: 1,
    paddingRight: 10,
  },
  col2: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: GlobalStyles.colors.lightGray,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    color: "#121419",
    marginBottom: 5,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  phone: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    marginLeft: 5,
    color: "#909090",
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  categoryChip: {
    backgroundColor: "#FFF2E3",
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 5,
  },
  categoryText: {
    color: GlobalStyles.colors.ButtonColor,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  subheading: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    marginTop: 5,
    color: "#121419",
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#909090",
    marginTop: 3,
  },
  time: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#909090",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: GlobalStyles.colors.ButtonColor,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
});