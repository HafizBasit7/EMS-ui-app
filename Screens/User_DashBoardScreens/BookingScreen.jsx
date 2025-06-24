import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  RefreshControl,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import { useCallback, useEffect, useState } from "react";
const { width, height } = Dimensions.get("window");
import BookingVerticalCard from "../../CustomComponents/Cards/BookingVerticalCards";
import { bookingData } from "../../dummydata/dummydata";
import { ActivityIndicator } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function BookingScreen() {
  const [activeTab, setActiveTab] = useState("Ongoing");
  const [loading, setLoading] = useState(false);
  const [BookingData, setBookingData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dateShow, setDateShow] = useState(false);
  const [date, setdate] = useState(new Date());
  const [pageIndex, setPageIndex] = useState(1);
  const [tpage, setpage] = useState(1);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setPageIndex(1);
      fetchBookings();
    }, 500);
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    setBookingData([]);
    setTimeout(() => {
      const filteredData = bookingData.filter((item) =>
        activeTab === "Ongoing" ? item.status === "ongoing" : item.status === "past"
      );
      setBookingData(filteredData);
      setpage(1); // only one page of dummy data
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainerRow}>
        <Text style={styles.headingText}>Bookings</Text>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            padding: 3,
            borderWidth: 1,
            borderColor: "#DDDAE1",
          }}
          onPress={() => setDateShow(true)}
        >
          <Icon name="calendar-month-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Ongoing" && styles.activeTab]}
          onPress={() => handleTabChange("Ongoing")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Ongoing" && styles.activeTabText,
            ]}
          >
            Ongoing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Past" && styles.activeTab]}
          onPress={() => handleTabChange("Past")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Past" && styles.activeTabText,
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ justifyContent: "center", alignItems: "center", top: "30%" }}>
          <ActivityIndicator
            size="large"
            color={GlobalStyles.colors.ButtonColor}
          />
        </View>
      ) : BookingData.length === 0 ? (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <FlatList
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{ width: "100%" }}
            data={[{ name: "Oops! Nothing Found!", _id: 55 }]}
            renderItem={({ item }) => (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  fontFamily: "Poppins-SemiBold",
                  color: GlobalStyles.colors.ButtonColor,
                }}
              >
                {item.name}
              </Text>
            )}
            keyExtractor={(item) => item._id.toString()}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      ) : (
        <FlatList
          data={BookingData}
          renderItem={({ item }) => (
            <BookingVerticalCard data={item} tab={activeTab} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReachedThreshold={0.7}
          onEndReached={() => {
            if (pageIndex < tpage) {
              setPageIndex((prev) => prev + 1);
              fetchBookings();
            }
          }}
        />
      )}

      {dateShow && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(e, selectedDate) => {
            setDateShow(false);
            if (selectedDate) setdate(selectedDate);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  headingContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "10%",
  },
  headingText: {
    color: "#293032",
    fontFamily: "Poppins-Medium",
    fontSize: 30,
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: height * 0.01,
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: height * 0.01,
  },
  tab: {
    width: width * 0.4,
    paddingVertical: height * 0.02,
    borderRadius: 12,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
  },
  tabText: {
    fontSize: width * 0.04,
    color: GlobalStyles.colors.LinkColor,
  },
  activeTabText: {
    color: "#fff",
  },
});
