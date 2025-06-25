import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GlobalStyles } from "../../Styles/GlobalStyles";

export default function PortfolioCards({ data }) {
  const screenWidth = Dimensions.get("window").width;
  return (
  
    <View
      style={[
        styles.card,
        screenWidth > 400 ? styles.middleCard : styles.sideCard,
      ]}
    >
      <ImageBackground
        source={{ uri: data?.url }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />

        <View style={styles.textContainer}>
          <View style={styles.row}>
            <Ionicons name="play-outline" size={18} color={GlobalStyles.colors.IconsColor} />
            <Text style={styles.details}>
              {data?.type}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
    
  );
}

const styles = StyleSheet.create({
  card: {
    width: '45%',
    marginHorizontal: 8,
    borderRadius: 10,
    overflow: "hidden",
    paddingTop:12,
  
  },
  image: {
    width: '100%',
    height: 190,
    justifyContent: "flex-end",
    
  },
  imageStyle: {
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 10,
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "white",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center", 
  },
  details: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "white",
    marginLeft: 4, 
  },
});