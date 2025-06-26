import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";

const MessageScreenSecondHeader = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const openSheet = () => {
    setVisible(true);
    navigation.navigate("OfferingJob");

  };

  return (
    <View style={styles.secondHeader}>
      <TouchableOpacity style={styles.offerButton} onPress={openSheet}>
        <Text style={styles.offerText}>Offer a Job</Text>
      </TouchableOpacity>
      {/*  💡 replace Alert above with a real ActionSheet if you add one later */}
    </View>
  );
};

const styles = StyleSheet.create({
  secondHeader: {
    position: "absolute",
    top: "11%",
    width: "100%",
    height: "10%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  offerButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderColor: "#FF8A47",
    borderWidth: 1,
    width: "88%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  offerText: { fontSize: 16, color: "#FF7235", fontWeight: "bold" },
});

export default MessageScreenSecondHeader;
