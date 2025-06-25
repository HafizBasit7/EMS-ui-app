import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import { bookingData } from "../../dummydata/dummydata";
import BookingVerticalCard from "../../CustomComponents/Cards/BookingVerticalCards"; // ⬅️ customer‑side card
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

/**
 * BookingScreen — UI‑only
 * Shows different layouts depending on `userType` ("Customer" vs "Provider").
 * Toggle the constant below in your demo or connect it to auth state later.
 */
export default function BookingScreen() {
  // 🔄  Toggle to "Customer" / "Provider" to preview both UIs
  const userType = "Customer"; // « change this and watch the card layout switch »

  /* -------------------------------- state -------------------------------- */
  const [activeTab, setActiveTab] = useState("Ongoing");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dateShow, setDateShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const navigation = useNavigation();

  /* ---------------------------- helper filter ---------------------------- */
  const filterBookings = useCallback(() => {
    const byStatus = bookingData.filter(
      (b) => b.status.toLowerCase() === activeTab.toLowerCase()
    );
    setFilteredBookings(byStatus);
  }, [activeTab]);

  useEffect(() => {
    filterBookings();
  }, [activeTab, filterBookings]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      filterBookings();
      setRefreshing(false);
    }, 600);
  };

  /* ------------------------------- render -------------------------------- */
  const renderProviderCard = (item) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={styles.infoColumn}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>+{item.phoneNumber}</Text>
          <Text style={styles.dateTimeLabel}>Date & Time</Text>
          <Text style={styles.dateTimeValue}>{item.date + "\n" + item.time}</Text>
        </View>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelTxt}>Cancel Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewBtn}>
          <Text style={styles.viewTxt}>View Job</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ---------- header ---------- */}
      <View style={styles.headingRow}>
        <Text style={styles.heading}>Bookings</Text>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => setDateShow(true)}
        >
          <Icon name="calendar-month-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {/* ---------- tabs ---------- */}
      <View style={styles.tabsRow}>
        {["Ongoing", "Past"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}> {tab} </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ---------- list ---------- */}
      {filteredBookings.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTxt}>Oops! Nothing Found!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredBookings}
          keyExtractor={(item, idx) => `${item.phoneNumber}-${idx}`}
          renderItem={({ item }) =>
            userType === "Provider"
              ? renderProviderCard(item)
              : (
                  <BookingVerticalCard
                    data={item}
                    tab={activeTab}
                    // navigation={navigation}
                  />
                )
          }
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* ---------- calendar ---------- */}
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

/* -------------------------------- styles -------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "10%",
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
    marginBottom: height * 0.01,
    backgroundColor: "#fff",
    paddingVertical: height * 0.01,
  },
  tab: {
    width: width * 0.4,
    paddingVertical: height * 0.02,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
  },
  tabText: {
    fontSize: width * 0.04,
    color: GlobalStyles.colors.LinkColor,
    fontFamily: "Poppins-Regular",
  },
  activeTabText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
  },
  /* ---------- empty ---------- */
  listContent: { paddingBottom: 20 },
  emptyWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyTxt: {
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    color: GlobalStyles.colors.ButtonColor,
  },
  /* ---------- provider card styles ---------- */
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoColumn: { flex: 1 },
  name: { fontFamily: "Poppins-Medium", fontSize: 16, color: "#293032" },
  phone: { fontFamily: "Poppins-Regular", fontSize: 12, color: "gray" },
  dateTimeLabel: {
    marginTop: 8,
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#555",
  },
  dateTimeValue: {
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  image: { width: 70, height: 70, borderRadius: 8, marginLeft: 12 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#FFE8E8",
    borderRadius: 8,
    marginRight: 8,
  },
  cancelTxt: {
    textAlign: "center",
    color: "#FF4B4B",
    fontFamily: "Poppins-Medium",
  },
  viewBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: GlobalStyles.colors.ButtonColor,
    borderRadius: 8,
  },
  viewTxt: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "Poppins-Medium",
  },
});
