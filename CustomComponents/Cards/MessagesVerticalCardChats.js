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
import { timeAgo } from "../../Hooks/timeAgo";
import { formatDate } from "../../Hooks/formDate";
const { width } = Dimensions.get("window");



export default function MessageVerticalCard({ data }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("MessageScreen", {
          partnerName: data?.name,
          partnerPic: data?.profilePic,
          partnerId: data?.partnerId,
        })
      }
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: data?.profilePic }} style={styles.userImage} />
          {data?.status === "online" && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.nameAndTimeContainer}>
            <Text style={styles.userName}>{data?.name}</Text>
            <Text style={styles.timeAgo}>{formatDate(data?.timestamp)?.slice(0, 20)}</Text>
          </View>
          <View style={styles.nameAndTimeContainer}>
          <Text style={styles.lastMessage}>
            {data?.lastMessage?.slice(0, 30)}...
          </Text>
          {data?.unseenCount > 0 && (
          <View style={styles.unseenMessagesContainer}>
            <Text style={styles.unseenMessagesText}>{data?.unseenCount}</Text>
          </View>
        )}
          </View>
         
        </View> 
        

        
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.white,
    borderRadius: 20,
    padding: "4%",
    width: "100%",
    right: "2%",
  },
  imageContainer: {
    position: "relative",
    marginRight: "4%",
  },
  nameAndTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "100%",
   
  },
  timeAgo: {
    fontSize: 14,
    color: "gray",
    fontFamily: "Poppins-Regular",
    textAlign: "right",
    flexShrink: 1,
   
  },
  userImage: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    backgroundColor: GlobalStyles.colors.lightGray,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: width * 0.04,
    height: width * 0.04,
    backgroundColor: "#2b8248",
    borderRadius: width * 0.025,
  },
  infoContainer: {
    flex: 1,
  
    minWidth:'74%'
  },
  userName: {
    fontFamily: "Poppins-Bold",
    fontSize: width * 0.04,
    color: GlobalStyles.colors.black,
    marginBottom: 2,
    flex: 1,
  },
  lastMessage: {
    fontFamily: "Poppins-Regular",
    fontSize: width * 0.035,
    color: GlobalStyles.colors.gray,
  },
  unseenMessagesContainer: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: (width * 0.08) / 2,
    justifyContent: "center",
    alignItems: "center",
    
  },
  unseenMessagesText: {
    fontFamily: "Poppins-Regular",
    fontSize: width * 0.035,
    color: "white",
    fontWeight: "bold",
  },
});
