import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LineHead from "../../CustomComponents/LineHead";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import CustomButton from "../../CustomComponents/CustomButton";
import CustomMessageModal from "../../CustomComponents/CustomMessageModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";

const { width, height } = Dimensions.get("window");

const GiveReviewScreen = ({ navigation }) => {
  // State for UI elements only
  const [rating, setRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");
  const [eventCategory, setEventCategory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [iconName, setIconName] = useState("alert-circle");

  // Mock data for UI demonstration
  const providerProfile = {
    profilePicUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    fullname: "John Doe",
    address: "123 Main St, City",
    services: [
      { name: "Photography" },
      { name: "Videography" },
      { name: "Event Planning" }
    ]
  };

  const ratingBreakdown = [
    { stars: 5, count: 16 },
    { stars: 4, count: 5 },
    { stars: 3, count: 2 },
    { stars: 2, count: 5 },
    { stars: 1, count: 6 },
  ];

  const totalRatings = ratingBreakdown.reduce((sum, item) => sum + item.count, 0);
  const averageRating = 4.2; // Mock average rating

  const subCategoryDropDown = [
    { label: "Photography", value: "1" },
    { label: "Videography", value: "2" },
    { label: "Catering", value: "3" },
    { label: "Decoration", value: "4" },
    { label: "Music", value: "5" },
  ];

  const RatingBreakdown = ({ stars, count, totalRatings }) => {
    const percentage = ((count / totalRatings) * 100).toFixed(1);
    return (
      <View style={styles.ratingBreakdownRow}>
        <View style={styles.starWithNumber}>
          <Icon name="star" size={18} color="#FFD700" style={styles.starIcon} />
          <Text style={styles.starNumber}>{stars}</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.countText}>{count}</Text>
      </View>
    );
  };

  const handleSubmit = () => {
    // Simple validation
    if (!rating || !reviewDescription || eventCategory.length === 0) {
      setMessage("Please fill all fields");
      setIconName("alert-circle");
      setModalVisible(true);
      return;
    }

    // Show success message
    setMessage("Review submitted successfully!");
    setIconName("check-circle");
    setModalVisible(true);
    
    // Optionally navigate after submission
    navigation.goBack();
  };

  return (
    <>
      <LineHead headerName="Give Review" headerState={true} />
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.screen}>
          <View style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: providerProfile.profilePicUrl }}
                style={styles.avatar}
              />
              <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{providerProfile.fullname}</Text>
                  <View style={styles.row}>
                    <Icon name="map-marker" size={16} color={"#909090"} />
                    <Text style={styles.details}>{providerProfile.address}</Text>
                  </View>
                  <View style={styles.expertiseContainer}>
                    {providerProfile.services.map((item, index) => (
                      <View key={index} style={styles.expertiseItem}>
                        <Text style={styles.expertiseText}>{item.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.reviewsTitle}>Reviews</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.leftContainer}>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingText}>{averageRating}</Text>
                <Text style={styles.maxRatingText}> / 5.0</Text>
              </View>
              <View style={styles.starsRow}>
                {[...Array(5)].map((_, index) => (
                  <Icon
                    key={index}
                    name={index < Math.floor(averageRating) ? "star" : "star-o"}
                    size={20}
                    color={index < Math.floor(averageRating) ? "#FFD700" : "#ccc"}
                    style={styles.starIcon}
                  />
                ))}
              </View>
              <Text style={styles.reviewsText}>{totalRatings} Reviews</Text>
            </View>
            <View style={styles.rightContainer}>
              {ratingBreakdown.map((item, index) => (
                <RatingBreakdown
                  key={index}
                  stars={item.stars}
                  count={item.count}
                  totalRatings={totalRatings}
                />
              ))}
            </View>
          </View>

          <Text style={styles.label}>Rating</Text>
          <View style={styles.starsRow2}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setRating(index + 1)}
              >
                <Icon
                  name="star"
                  size={26}
                  color={index < rating ? "#FFD700" : "#D8D8D8"}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Select Category:</Text>
          <MultiSelect
            style={styles.dropdown}
            search
            data={subCategoryDropDown}
            labelField="label"
            valueField="value"
            placeholder="Select Sub-Categories"
            searchPlaceholder="Search..."
            placeholderStyle={{ fontFamily: "Poppins-Thin" }}
            value={eventCategory}
            onChange={(items) => setEventCategory(items)}
            selectedStyle={{
              borderRadius: 12,
              borderColor: GlobalStyles.colors.ButtonColor,
            }}
          />

          <Text style={styles.label}>Review</Text>
          <TextInput
            style={[styles.input, { height: height * 0.15, marginBottom: height * 0.55 }]}
            placeholder="Write your review"
            multiline
            onChangeText={setReviewDescription}
            value={reviewDescription}
          />
        </View>

        <CustomMessageModal
          message={message}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          buttonNumbers={1}
          icon={iconName}
        />
      </KeyboardAwareScrollView>

      <View style={styles.buttonContainer}>
        <CustomButton title="Post Review" onPress={handleSubmit} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: "5%",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "2%",
    width: "100%",
  },
  leftContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingRight: 29,
  },
  dropdown: {
    height: height * 0.07,
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: height * 0.02,
  },
  buttonContainer: {
    width: "90%",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  ratingText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  maxRatingText: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  starsRow: {
    flexDirection: "row",
    marginTop: "15%",
  },
  starIcon: {
    marginRight: 3,
  },
  reviewsText: {
    fontSize: 14,
    color: "#777",
    marginTop: "15%",
  },
  reviewsTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#000000",
    marginTop: 10,
  },
  rightContainer: {
    flex: 2,
    justifyContent: "flex-start",
    paddingLeft: 20,
  },
  ratingBreakdownRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  starWithNumber: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: GlobalStyles.colors.ProgressBar,
  },
  countText: {
    fontSize: 14,
    color: "#777",
  },
  card: {
    padding: 3,
    marginTop: "10%",
  },
  expertiseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: "2%",
  },
  avatar: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: (width * 0.2) / 2,
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
  },
  textContainer: {
    marginBottom: 5,
  },
  expertiseText: {
    color: "black",
    fontSize: 12,
    backgroundColor: GlobalStyles.colors.chipColor,
    margin: 2,
    borderRadius: 10,
    padding: 6,
  },
  name: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "black",
    marginBottom: 1,
  },
  details: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "gray",
    marginTop: 2,
    marginRight: 5,
    marginLeft: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: width * 0.04,
    color: "#333",
    marginBottom: height * 0.01,
    fontFamily: "Poppins-Regular",
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.03,
    fontSize: width * 0.04,
    fontFamily: "Poppins-Medium",
    paddingTop: 10,
    textAlignVertical: "top",
  },
  starsRow2: {
    flexDirection: "row",
    marginTop: "1%",
    marginBottom: height * 0.02,
  },
});

export default GiveReviewScreen;