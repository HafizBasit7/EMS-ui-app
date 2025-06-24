import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Dimensions,
  ImageBackground,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import HorizontalCard from "../../CustomComponents/Cards/HorizontolCard";
import VerticalCard from "../../CustomComponents/Cards/VerticalCard";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import { useSharedValue } from "react-native-reanimated";
import {
  dummyHorizontalData,
  dummyVerticalData,
} from "../../dummydata/dummydata.js";
import Searchfilter from "../../assets/SVG/searchfilter.svg";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import Animated from "react-native-reanimated";

const width = Dimensions.get("window").width;

export default function HomeScreen() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [eventsCards, setEventsCard] = useState([]);
  const [providerCards, setproviderCard] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [read, setread] = useState(true);
  const progress = useSharedValue(0);
  const navigation = useNavigation();

  const user = {
    name: "John Doe",
  };

  const fetchData = () => {
    setloading(true);
    setTimeout(() => {
      // Use dummyHorizontalData instead of defaultEvents
      setEventsCard(dummyHorizontalData.map(item => ({
        name: item.title,
        refPic: item.image,
        providerCount: item.serviceProviders
      })));
      
      // Use dummyVerticalData directly
      setproviderCard(dummyVerticalData);
      setloading(false);
    }, 1000);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setPageIndex(1);
      setTotalPages(1);
      fetchData();
    }, 1000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
      return () => backHandler.remove();
    }, [])
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeoutId = setTimeout(() => {
      if (search.trim() === "") {
        setproviderCard(dummyVerticalData);
        setPageIndex(1);
        setTotalPages(1);
        return;
      }

      const filtered = dummyVerticalData.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setproviderCard(filtered);
    }, 500);

    setDebounceTimeout(timeoutId);
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Text style={styles.welcomeText}>Hello, Welcome 🎉</Text>
          <Text style={styles.headingText}>Hi {user.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Notification")}
        >
          <Icon name="notifications" size={24} color={"black"} />
          {read && (
            <Icon
              name="exposure-plus-1"
              size={10}
              color={"red"}
              style={styles.plusIcon}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Search Box */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="search" size={20} color="gray" />
          <TextInput
            style={styles.textInput}
            placeholder="Search for service providers..."
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
          <Searchfilter />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subheadingText}>Categories</Text>
        {loading ? (
          <ActivityIndicator color={GlobalStyles.colors.ButtonColor} />
        ) : (
          <View style={styles.carouselContainer}>
            <Carousel
              loop
              width={width}
              height={width / 1.9}
              data={eventsCards}
              autoPlay={true}
              snapEnabled={true}
              scrollAnimationDuration={6000}
              renderItem={({ item }) => (
                <View style={styles.carouselItem}>
                  <ImageBackground
                    source={{ uri: item.refPic }}
                    style={styles.imageBackground}
                    imageStyle={styles.imageStyle}
                  >
                    <View style={styles.textContainer}>
                      <Text style={styles.title}>{item.name}</Text>
                      <Text style={styles.providerCount}>
                        {item.providerCount} service providers available
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.arrowContainer}
              onPress={() => {}}
            >
              <Icon name="keyboard-arrow-right" size={34} color="black" />
            </TouchableOpacity>
          </View>
        )}

        {/* Vertical List */}
        <Text style={styles.subheadingText}>Near By Providers</Text>
        {loading ? (
          <ActivityIndicator color={GlobalStyles.colors.ButtonColor} />
        ) : providerCards.length < 1 ? (
          <Text style={{ color: GlobalStyles.colors.ButtonColor, textAlign: "center" }}>
            No Providers Found
          </Text>
        ) : (
          <FlatList
            data={providerCards}
            renderItem={({ item }) => <VerticalCard data={item} />}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.verticalList}
            onEndReachedThreshold={0.7}
            onEndReached={() => {
              if (pageIndex < totalPages) {
                setPageIndex((prev) => prev + 1);
              }
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </ScrollView>
    </View>
  );
}

// ... (keep your existing styles the same)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 6,
  },
  arrowContainer: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: [{ translateY: -15 }],
    left: "90%",
  },
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    left: "5%",
  },
  scrollContent: {
    padding: 16,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -15,
    marginTop: 20,
    padding: 10,
  },
  welcomeText: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    color: "gray",
  },
  headingText: {
    fontFamily: "Poppins-Bold",
    fontSize: 35,
    color: "black",
  },
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  plusIcon: {
    position: "absolute",
    top: -1,
    right: -2,
  },
  searchContainer: {
    width: "100%",
    alignSelf: "center",
    marginBottom: -10,
    padding: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 60,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 8,
    fontFamily: "Poppins-Regular",
  },
  subheadingText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "black",
    marginVertical: 8,
    marginBottom: -5,
  },
  verticalList: {
    paddingBottom: 16,
  },
  carouselItem: {
    width: width * 0.9,
    height: width / 1.9,
    justifyContent: "center",
    borderRadius: 15,
    overflow: "hidden",
    padding: "2%",
    marginTop: "0%",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  textContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  providerCount: {
    fontSize: 16,
    color: "white",
    fontWeight: "300",
    marginTop: 5,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
});
