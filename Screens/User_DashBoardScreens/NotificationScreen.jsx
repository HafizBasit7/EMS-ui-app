// NotificationScreen.js
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  RefreshControl,
} from "react-native";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import NotificationCards, {
  NOTIFICATION_TYPES,
} from "../../CustomComponents/Cards/NotificationVerticalCard";

const { width } = Dimensions.get("window");

// correct-shape mock data
const initialNotifications = [
  {
    id: "1",
    type: NOTIFICATION_TYPES.NEW_MESSAGE,
    body: "You have received a new message from John",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 h ago
    read: false,
    action: "chat,123",
  },
  {
    id: "2",
    type: NOTIFICATION_TYPES.PROPOSAL_ACCEPTED,
    body: "Your booking for Photography service has been confirmed",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 d
    read: true,
    action: "booking,456",
  },
  {
    id: "3",
    type: NOTIFICATION_TYPES.NEW_REVIEW,
    body: "Payment of $200 has been received for your service",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 d
    read: true,
    action: "review,789",
  },
];

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate pulling newer items
    setTimeout(() => {
      setNotifications((prev) => [
        {
          id: String(Date.now()),
          type: NOTIFICATION_TYPES.NEW_PROPOSAL,
          body: "New proposal received for your job post",
          createdAt: new Date().toISOString(),
          read: false,
          action: "job,999",
        },
        ...prev,
      ]);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Notifications</Text>

      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Opps! No Notification Found!</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={({ item }) => <NotificationCards data={item} />}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
    paddingHorizontal: 16,
    paddingTop: "10%",
  },
  headingText: {
    color: "#293032",
    fontFamily: "Poppins-Medium",
    fontSize: 30,
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    color: GlobalStyles.colors.ButtonColor,
  },
  listContent: {
    paddingBottom: 20,
  },
});
