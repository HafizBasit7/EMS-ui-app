import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

const MessageScreenHeader = ({ onPress, name, image }) => (
  <View style={styles.header}>
    <View style={styles.leftSection}>
      <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Image source={{ uri: image }} style={styles.profileImage} />
      <Text style={styles.name}>{name}</Text>
    </View>
    <TouchableOpacity style={styles.iconContainer}>
      <Icon name="ellipsis-vertical" size={24} color="#fff" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: GlobalStyles.colors.ButtonColor,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    paddingBottom: "4%",
    zIndex: 1000,
  },
  leftSection: { flexDirection: "row", alignItems: "center" },
  iconContainer: { padding: 8 },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginLeft: 8 },
  name: { fontSize: 16, color: "white", marginLeft: 8 },
});

export default MessageScreenHeader;
