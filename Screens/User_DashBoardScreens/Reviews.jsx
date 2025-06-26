// screens/ReviewScreen.js  (UI-only mock)
/* eslint-disable react/no-array-index-key */
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LineHead from "../../CustomComponents/LineHead";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import ChatSVG from "../../assets/SVG/ChatSVG.svg";

// ────────────────────────────────────────────────────────────
//  🔹 MOCK DATA (feel free to replace / extend)
// ────────────────────────────────────────────────────────────
const MOCK_RATING_BREAKDOWN = [
  { stars: 5, count: 16 },
  { stars: 4, count: 5 },
  { stars: 3, count: 2 },
  { stars: 2, count: 1 },
  { stars: 1, count: 0 },
];

const MOCK_COMMENTS = [
  {
    id: "c1",
    rating: 5,
    review: "Outstanding work – highly recommended!",
    user: {
      fullname: "Alice Johnson",
      profilePicUrl:
        "https://randomuser.me/api/portraits/women/44.jpg",
    },
  },
  {
    id: "c2",
    rating: 4,
    review: "Good service, will hire again.",
    user: {
      fullname: "Bob Smith",
      profilePicUrl:
        "https://randomuser.me/api/portraits/men/22.jpg",
    },
  },
  {
    id: "c3",
    rating: 5,
    review: "Perfect delivery and great communication.",
    user: {
      fullname: "Clara Davis",
      profilePicUrl:
        "https://randomuser.me/api/portraits/women/55.jpg",
    },
  },
  {
    id: "c4",
    rating: 3,
    review: "Average experience. Room for improvement.",
    user: {
      fullname: "Daniel Lee",
      profilePicUrl:
        "https://randomuser.me/api/portraits/men/31.jpg",
    },
  },
  {
    id: "c5",
    rating: 4,
    review: "Solid job overall.",
    user: {
      fullname: "Eva Brown",
      profilePicUrl:
        "https://randomuser.me/api/portraits/women/65.jpg",
    },
  },
];

// derive basic stats
const TOTAL_REVIEWS = MOCK_RATING_BREAKDOWN.reduce(
  (sum, item) => sum + item.count,
  0
);
const AVERAGE_RATING =
  MOCK_RATING_BREAKDOWN.reduce(
    (sum, item) => sum + item.stars * item.count,
    0
  ) / TOTAL_REVIEWS;

const RatingBreakdown = ({ stars, count }) => {
  const percentage = ((count / TOTAL_REVIEWS) * 100).toFixed(1);
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

const CommentCard = ({ comment }) => (
  <View style={styles.commentCard}>
    <View style={styles.commentCardContent}>
      <Image
        source={{ uri: comment.user.profilePicUrl }}
        style={styles.profileImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{comment.user.fullname}</Text>
      </View>
      <View style={styles.starRating}>
        <Icon name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingNumber}>{comment.rating}</Text>
      </View>
    </View>
    <Text style={styles.userComment}>{comment.review}</Text>
  </View>
);

// ────────────────────────────────────────────────────────────
//  🔸 MAIN COMPONENT
// ────────────────────────────────────────────────────────────
const ReviewScreen = ({ route, navigation }) => {
  // keep provider info for navigation targets
  const { providerId = "mockProvider", name = "Provider", pic } =
    route.params || {};

  // local paging for comments (3 at a time)
  const [pageIndex, setPageIndex] = useState(1);
  const COMMENTS_PER_PAGE = 3;
  const visibleComments = MOCK_COMMENTS.slice(0, pageIndex * COMMENTS_PER_PAGE);
  const hasMore = visibleComments.length < MOCK_COMMENTS.length;

  const scrollRef = useRef(null);
  const scrollToBottom = () =>
    scrollRef.current?.scrollToEnd({ animated: true });

  const handleLoadMore = () => {
    setPageIndex((p) => p + 1);
    // small timeout so scroll happens after state update / re-render
    setTimeout(scrollToBottom, 100);
  };

  // pretend current user is a Customer
  const userType = "Customer";

  return (
    <>
      <LineHead headerName="Review & Ratings" headerState />
      <View style={styles.screen}>
        {/* overall summary */}
        <View style={styles.content}>
          <View style={styles.leftContainer}>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingText}>
                {AVERAGE_RATING.toFixed(1)}
              </Text>
              <Text style={styles.maxRatingText}> / 5.0</Text>
            </View>
            <View style={styles.starsRow}>
              {Array.from({ length: 5 }).map((_, idx) => (
                <Icon
                  key={idx}
                  name={idx < Math.floor(AVERAGE_RATING) ? "star" : "star-o"}
                  size={20}
                  color={idx < Math.floor(AVERAGE_RATING) ? "#FFD700" : "#ccc"}
                  style={styles.starIcon}
                />
              ))}
            </View>
            <Text style={styles.reviewsText}>{TOTAL_REVIEWS} Reviews</Text>
          </View>

          <View style={styles.rightContainer}>
            {MOCK_RATING_BREAKDOWN.map((item) => (
              <RatingBreakdown
                key={item.stars}
                stars={item.stars}
                count={item.count}
              />
            ))}
          </View>
        </View>

        {/* comments list */}
        {visibleComments.length ? (
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            style={styles.commentsContainer}
          >
            {visibleComments.map((c) => (
              <CommentCard key={c.id} comment={c} />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.noCommentsContainer}>
            <Text style={styles.noCommentsText}>No comments yet</Text>
          </View>
        )}

        {/* load more */}
        {hasMore && (
          <TouchableOpacity style={styles.viewAllContainer} onPress={handleLoadMore}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        )}

        {/* bottom buttons */}
        {userType === "Customer" && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => navigation.navigate("GaveReview", { providerId })}
            >
              <Text style={styles.buttonText}>Give Review</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.moreButton}
              onPress={() =>
                navigation.navigate("MessageScreen", {
                  partnerName: name,
                  partnerPic: pic,
                  partnerId: providerId,
                })
              }
            >
              <ChatSVG width={30} height={30} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

export default ReviewScreen;

// ────────────────────────────────────────────────────────────
//  💅 STYLES (unchanged except tiny additions)
// ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "15%",
  },
  leftContainer: { flex: 1, paddingRight: 20 },
  ratingRow: { flexDirection: "row", alignItems: "baseline" },
  ratingText: { fontSize: 40, fontWeight: "bold", color: "#333" },
  maxRatingText: { fontSize: 18, color: "#777", marginTop: 4 },
  starsRow: { flexDirection: "row", marginTop: "25%" },
  starIcon: { marginRight: 3 },
  reviewsText: { fontSize: 16, color: "#777", marginTop: "25%" },

  rightContainer: { flex: 2, paddingLeft: 20 },
  ratingBreakdownRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  starWithNumber: { flexDirection: "row", alignItems: "center", marginRight: 10 },
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
  countText: { fontSize: 14, color: "#777" },

  commentCard: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  commentCardContent: { flexDirection: "row", marginBottom: 10 },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { fontWeight: "bold", fontSize: 16 },
  starRating: { flexDirection: "row", alignItems: "center" },
  ratingNumber: { marginLeft: 5, fontSize: 14, color: "#333" },
  userComment: { fontSize: 16, color: "#555" },

  noCommentsContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  noCommentsText: { textAlign: "center", color: GlobalStyles.colors.ButtonColor },

  viewAllContainer: { marginVertical: 15, alignItems: "center" },
  viewAllText: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.ButtonColor,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  chatButton: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    width: "78%",
  },
  moreButton: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.ButtonColor,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    width: "20%",
  },
  buttonText: { fontSize: 18, color: "#fff", fontFamily: "Poppins-Black" },
});
