import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import BookingVerticalCard from "../../CustomComponents/Cards/BookingVerticalCards";
import { bookingData } from "../../dummydata/dummydata";
import DateTimePicker from "@react-native-community/datetimepicker";

const { width, height } = Dimensions.get("window");

export default function BookingScreen() {
  /* ----------------------- state ----------------------- */
  const [activeTab, setActiveTab] = useState("ongoing");
  const [refreshing, setRefreshing] = useState(false);
  const [dateShow, setDateShow] = useState(false);
  const [date, setDate] = useState(new Date());

  /* ----------------- pull-to-refresh ------------------- */
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  /* ------------- filter list by tab status ------------- */
  const filteredList = bookingData
    .filter((b) => b.status === activeTab)
    // Add unique index to each item to prevent duplicate keys
    .map((item, index) => ({ ...item, uniqueId: `${item.phoneNumber}-${index}` }));

  /* ------------------------ ui ------------------------ */
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headingRow}>
        <Text style={styles.heading}>Bookings</Text>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => setDateShow(true)}
        >
          <Icon name="calendar-month-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {/* tabs */}
      <View style={styles.tabsRow}>
        {["ongoing", "past"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* list or empty-state */}
      {filteredList.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTxt}>Oops! Nothing Found!</Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={filteredList}
            keyExtractor={(item) => item.uniqueId}
          renderItem={({ item }) => {
  console.log("Rendering item:", item.name);
  return <BookingVerticalCard data={item} tab={activeTab} />;
}}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <View style={styles.emptyWrap}>
                <Text style={styles.emptyTxt}>No bookings found</Text>
              </View>
            }
          />
        </View>
      )}

      {/* calendar picker */}
      {dateShow && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(e, selected) => {
            setDateShow(false);
            if (selected) setDate(selected);
          }}
        />
      )}
    </View>
  );
}

/* ---------------------- styles ---------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "3%",
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    color: "#293032",
    fontFamily: "Poppins-Medium",
  },
  calendarButton: {
    borderRadius: 10,
    padding: 3,
    borderWidth: 1,
    borderColor: "#DDDAE1",
  },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: height * 0.015,
    marginBottom: 10,
  },
  tab: {
    width: width * 0.4,
    paddingVertical: height * 0.02,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  activeTab: { backgroundColor: GlobalStyles.colors.ButtonColor },
  tabText: {
    fontSize: width * 0.04,
    color: GlobalStyles.colors.LinkColor,
    fontFamily: "Poppins-Regular",
  },
  activeTabText: { 
    color: "#fff", 
    fontFamily: "Poppins-SemiBold" 
  },
  listContainer: {
    flex: 1,  // This makes the list take up all available space
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,  // Important for empty states
  },
  emptyWrap: { 
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyTxt: {
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    color: GlobalStyles.colors.ButtonColor,
  },
});