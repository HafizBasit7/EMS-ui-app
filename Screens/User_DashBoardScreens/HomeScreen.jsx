/* ------------------------------------------------------------------
   HomeScreen – UI-only, big cards, smooth Reanimated carousel
------------------------------------------------------------------- */
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import { dummyHorizontalData, dummyVerticalData } from "../../dummydata/dummydata";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH  = Math.round(SCREEN_WIDTH * 0.85);
const CARD_HEIGHT = 160;

const HomeScreen = () => {
  const navigation = useNavigation();

  /* ----------- category slide ----------- */
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.categoryCard}
      onPress={() => navigation.navigate("CategoryProviders", { id: item.id, title: item.title })}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <View style={styles.overlay} />
      <View style={styles.categoryContent}>
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <Text style={styles.categorySubtitle}>👤 {item.serviceProviders} Providers</Text>
      </View>
    </TouchableOpacity>
  );

  /* ----------- provider card ----------- */
  const renderProvider = ({ item }) => (
    <View style={styles.providerCard}>
      <Image source={{ uri: item.profilePic }} style={styles.providerImage} />
      <View style={styles.providerContent}>
        <View style={styles.providerHeader}>
          <Text style={styles.providerName}>{item.name}</Text>
          <Text style={styles.providerLocation}>📍 {item.location}, USA</Text>
        </View>
        <View style={styles.tagsRow}>
          <Text style={styles.tag}>{item.expertise[0]}</Text>
          {item.expertise.length > 1 && (
            <Text style={styles.tag}>+{item.expertise.length - 1}</Text>
          )}
          <Text style={styles.experienceText}>15 yrs Experience</Text>
        </View>
        <View style={styles.ratingRow}>
          <Text style={styles.rating}>⭐ {item.reviews}</Text>
          <Text style={styles.reviewCount}>• 12 Reviews</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("ProviderProfile", { id: item.id })}
        >
          <Text style={styles.profileButtonText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  /* ----------- render ----------- */
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Hello, Welcome 🎉</Text>
            <Text style={styles.userName}>Hi Sofia!</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={() => navigation.navigate("Notification")}
          >
            <Ionicons name="notifications" size={22} color="black" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate("Search")}
          style={styles.searchContainer}
        >
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            pointerEvents="none"
            editable={false}
            placeholder="Search for Service providers"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
          <MaterialIcons name="tune" size={20} color="#888" />
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        <Carousel
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          data={dummyHorizontalData}
          autoPlay
          loop
          scrollAnimationDuration={3000}
          renderItem={({ item }) => renderCategory({ item })}
          style={{ alignSelf: "center", marginBottom: 16 }}
        />

        {/* Nearby Providers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Providers</Text>
          <TouchableOpacity onPress={() => navigation.navigate("NearbyProvidersList")}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dummyVerticalData}
          keyExtractor={(item) => item.id}
          renderItem={renderProvider}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 28 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

/* ---------------- styles ---------------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  /* header */
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  welcomeText: { fontSize: 16, color: "#555" },
  userName: { fontSize: 22, fontWeight: "bold", color: "#000" },
  notificationIcon: { position: "relative", padding: 5 },
  notificationDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
  },

  /* search */
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: { flex: 1, marginHorizontal: 8, fontSize: 14 },

  /* sections */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600" },
  viewAllText: { color: "orange", fontWeight: "600" },

  /* category card */
  categoryCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
  },
  categoryImage: { width: "100%", height: "100%" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.25)" },
  categoryContent: { position: "absolute", bottom: 10, left: 10 },
  categoryTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  categorySubtitle: { color: "#fff", fontSize: 12, marginTop: 4 },

  /* provider card */
  providerCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    flexDirection: "row",
    elevation: 3,
    padding: 12,
  },
  providerImage: { width: 70, height: 70, borderRadius: 35 },
  providerContent: { flex: 1, marginLeft: 12 },
  providerHeader: { marginBottom: 4 },
  providerName: { fontSize: 16, fontWeight: "bold" },
  providerLocation: { color: "#888", fontSize: 12 },
  tagsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 11,
    marginRight: 6,
  },
  experienceText: { marginLeft: 8, color: "#555", fontSize: 12 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  rating: { color: "#f7b500", fontSize: 13, fontWeight: "bold" },
  reviewCount: { marginLeft: 6, color: "#888", fontSize: 12 },
  profileButton: {
    marginTop: 8,
    backgroundColor: "orange",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 14,
    minWidth: 250,
  },
  profileButtonText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
});

export default HomeScreen;
