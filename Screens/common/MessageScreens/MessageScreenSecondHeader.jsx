import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import MyJobCustomActionSheet from "../../../CustomComponents/myjobs.js";

const MessageScreenSecondHeader = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.secondHeader}>
      <TouchableOpacity style={styles.offerButton} onPress={() => setVisible(true)}>
        <Text style={styles.offerText}>Offer a Job</Text>
      </TouchableOpacity>

      {/* Static providerId used just for UI representation */}
      <MyJobCustomActionSheet
        isOpen={visible}
        onClose={() => setVisible(false)}
        providerId="static-provider-id"
      />
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
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
  },
  offerText: {
    fontSize: 16,
    color: "#FF7235",
    fontWeight: "bold",
  },
});

export default MessageScreenSecondHeader;
