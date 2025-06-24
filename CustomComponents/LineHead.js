import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Text } from "react-native";

const LineHead = ({ onPress ,headerName = "", headerState = false}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      {headerState && 
      <Text style={styles.title}>{headerName}</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0, // Fixed at the very top of the screen
    left: 0,
    right: 0,
    zIndex: 10, // Ensures it appears above other components
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:'white',
    padding: 10, // Adds padding inside the container
    paddingTop:'8%',
    
  },
  backButton: {
    padding: 5, // Adds padding around the back button
  },
  title: {
    flex: 1, // Takes up the remaining space
    textAlign: "center", // Centers the text horizontally
    color: "#000", // Text color
    fontSize: 19, // Text size
    fontFamily: "Poppins-Bold", // Custom font if used
    paddingRight:'10%'
  },
});

export default LineHead;
