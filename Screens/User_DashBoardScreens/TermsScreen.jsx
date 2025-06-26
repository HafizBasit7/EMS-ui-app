import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StarSVG from "../../assets/SVG/StarSVG.svg"; // Importing your SVG

const TermsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Term &</Text>
        <Text style={styles.heading2}>Conditions</Text>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Rows with SVG and Text */}
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <StarSVG width={16} height={16} style={styles.svg} />
          </View>
          <Text style={styles.text}>
            Enim magni ipsum nostrum culpa ipsum voluptatum occaecati aut fugit.
            Est mollitia asperiores ut pariatur voluptas magni laudantium labore
            exercitationem.
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <StarSVG width={16} height={16} style={styles.svg} />
          </View>
          <Text style={styles.text}>
            Enim magni ipsum nostrum culpa ipsum voluptatum occaecati aut fugit.
            Est mollitia asperiores ut pariatur voluptas magni laudantium labore
            exercitationem.
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <StarSVG width={16} height={16} style={styles.svg} />
          </View>
          <Text style={styles.text}>
            Enim magni ipsum nostrum culpa ipsum voluptatum occaecati aut fugit.
            Est mollitia asperiores ut pariatur voluptas magni laudantium labore
            exercitationem.
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <StarSVG width={16} height={16} style={styles.svg} />
          </View>
          <Text style={styles.text}>
            Enim magni ipsum nostrum culpa ipsum voluptatum occaecati aut fugit.
            Est mollitia asperiores ut pariatur voluptas magni laudantium labore
            exercitationem.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  headingContainer: {
    marginTop: "15%",
    marginBottom: 20,
    alignItems: "flex-start",
  },
  heading: {
    fontSize: 26,
    fontWeight: "500",
    color: "#333",
    lineHeight: 30,
    fontFamily: "Poppins-Regular",
  },
  heading2: {
    fontSize: 26,
    fontWeight: "500",
    color: "#FF7235",
    lineHeight: 34,
    fontFamily: "Poppins-Regular",
  },
  contentContainer: {
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start", // Aligns icon and text at the top
    marginBottom: 16,
  },
  iconContainer: {
    width: 12, // Ensures equal width for the icon container
    alignItems: "center", // Centers the SVG horizontally within the container
  },
  svg: {
    marginRight: 14,
  },
  text: {
    fontSize: 14,
    color: "#A5A5AB",
    fontFamily: "Poppins-Regular",
    lineHeight: 20, // Adjust line height for better readability
  },
});

export default TermsScreen;
