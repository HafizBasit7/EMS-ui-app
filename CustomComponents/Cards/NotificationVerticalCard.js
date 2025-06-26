import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

export const NOTIFICATION_TYPES = {
  NEW_PROPOSAL: "New_Proposal",
  NEW_REVIEW: "New_Review",
  PROPOSAL_ACCEPTED: "Proposal_Accepted",
  NEW_MESSAGE: "New_Message",
};

// helper -------------------------------------------------
const formatTitle = (item) => {
  // Prefer `type`; fall back to `title`; last-resort “Notification”
  const base = item.type || item.title || "Notification";
  return base
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const timeAgo = (dateString) => {
  const date = dateString ? new Date(dateString) : new Date();
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const map = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };
  for (const [unit, sec] of Object.entries(map)) {
    const val = Math.floor(seconds / sec);
    if (val >= 1) return `${val} ${unit}${val > 1 ? "s" : ""} ago`;
  }
  return "Just now";
};

// component -------------------------------------------------
export default function NotificationCards({ data }) {
  const navigation = useNavigation();
  if (!data) return null; // defensive

  const handlePress = () => {
    switch (data.type) {
      case NOTIFICATION_TYPES.NEW_PROPOSAL: {
        const [, jobId] = data.action?.split(",") || [];
        navigation.navigate("JobDetail", { jobId });
        break;
      }
      case NOTIFICATION_TYPES.NEW_REVIEW: {
        const [, providerId] = data.action?.split(",") || [];
        navigation.navigate("Review", { providerId });
        break;
      }
      case NOTIFICATION_TYPES.PROPOSAL_ACCEPTED:
        navigation.navigate("Booking");
        break;
      default:
        Alert.alert("Notification", "This is a mock notification interaction");
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Ionicons
            name="notifications-outline"
            size={34}
            color={GlobalStyles.colors.ButtonColor}
          />
          {/* unread badge */}
          {!data.read && <View style={styles.badge} />}
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.nameAndTimeContainer}>
            <Text style={styles.userName}>{formatTitle(data)}</Text>
            <Text style={styles.timeAgo}>{timeAgo(data.createdAt)}</Text>
          </View>

          <View style={styles.messageContainer}>
            <Text style={styles.lastMessage} numberOfLines={2}>
              {data.body}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}


// Keep all your original styles exactly the same
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
  infoContainer: {
    flex: 1,
    minWidth: "74%",
  },
  messageContainer: {
    marginTop: 4,
  },
  userName: {
    fontFamily: "Poppins-Bold",
    fontSize: width * 0.04,
    color: GlobalStyles.colors.ButtonColor,
    marginBottom: 2,
    flex: 1,
  },
  lastMessage: {
    fontFamily: "Poppins-Regular",
    fontSize: width * 0.035,
    color: GlobalStyles.colors.gray,
  },
    badge: {
    position: "absolute",
    right: -2,
    top: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
});