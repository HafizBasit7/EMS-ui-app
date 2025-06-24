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

export default function HorizontalCard({ data }) {
  const screenWidth = Dimensions.get("window").width;
  return (
    <View
      style={[
        styles.card,
       
      ]}
    >
      <ImageBackground
        source={{ uri: data?.refPic }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.row}>
            <Ionicons name="person-circle-outline" size={18} color={'white'} />
            <Text style={styles.details}>
              {` Total ${data?.providerCount} service providers`}
             
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    marginHorizontal: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
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