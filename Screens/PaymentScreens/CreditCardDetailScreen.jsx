import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LineHead from "../../CustomComponents/LineHead";
import { Dropdown } from "react-native-element-dropdown";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import CustomButton from "../../CustomComponents/CustomButton";
import CustomMessageModal from "../../CustomComponents/CustomMessageModal";

export default function CreditCardDetailScreen() {
  const navigation = useNavigation();
  const [isDefault, setIsDefault] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddCard = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigation.goBack();
  };

  return (
    <>
      <LineHead headerName="Add Card" headerState={true} />
      <View style={styles.container}>
        {/* Card Mockup */}
        <View style={styles.cardMockup}>
          <View style={styles.cardTopRow}>
            <View style={styles.chip} />
            <Text style={styles.cardBrand}>🏦</Text>
          </View>
          <Text style={styles.cardNumber}>**** **** **** 3947</Text>
          <View style={styles.cardBottomRow}>
            <View>
              <Text style={styles.cardLabel}>Card Holder Name</Text>
              <Text style={styles.cardValue}>John Henry</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Expiry Date</Text>
              <Text style={styles.cardValue}>05/23</Text>
            </View>
          </View>
        </View>

        {/* Input Fields */}
        <TextInput style={styles.input} placeholder="Name on Card" placeholderTextColor="#aaa" />
        <TextInput style={styles.input} placeholder="Card Number" placeholderTextColor="#aaa" keyboardType="numeric" />

        {/* Dropdowns */}
        <View style={styles.row}>
          <Dropdown
            style={styles.dropdown}
            placeholder="Month"
            data={[...Array(12).keys()].map(i => ({ label: `${(i + 1).toString().padStart(2, "0")}`, value: `${i + 1}` }))}
            labelField="label"
            valueField="value"
          />
          <Dropdown
            style={styles.dropdown}
            placeholder="Year"
            data={[2024, 2025, 2026, 2027, 2028, 2029].map(y => ({ label: `${y}`, value: `${y}` }))}
            labelField="label"
            valueField="value"
          />
        </View>

        {/* CVC */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 0.45 }]}
            placeholder="CVC"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
          <Text style={styles.helperText}>
            3 or 4 digits usually found on the signature strip
          </Text>
        </View>

        {/* Default Switch */}
        <View style={[styles.row, { marginTop: 20 }]}>
          <Switch
            value={isDefault}
            onValueChange={() => setIsDefault(!isDefault)}
            trackColor={{ false: "#ccc", true: "#FF7235" }}
            thumbColor={isDefault ? "#fff" : "#f4f3f4"}
          />
          <Text style={styles.switchText}>SET AS DEFAULT</Text>
        </View>

        {/* Add Card Button */}
        <View style={styles.buttonWrapper}>
          <CustomButton title="Add Card" onPress={handleAddCard} />
        </View>
      </View>

      {/* Success Modal */}
      <CustomMessageModal
        visible={showModal}
        message="Card Added Successfully"
        onClose={handleModalClose}
        icon="check-circle"
        buttonNumbers={1}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  cardMockup: {
    marginTop: 90,
    backgroundColor: "#1e1d2f",
    borderRadius: 12,
    padding: 20,
    height: 180,
    justifyContent: "space-between",
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chip: {
    width: 40,
    height: 30,
    borderRadius: 6,
    backgroundColor: "#f4cc4f",
  },
  cardBrand: {
    fontSize: 20,
    color: "#fff",
  },
  cardNumber: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    color: "#bbb",
    fontSize: 10,
  },
  cardValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
    fontSize: 14,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  dropdown: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
  },
  helperText: {
    flex: 1,
    fontSize: 12,
    color: "#777",
    marginLeft: 10,
  },
  switchText: {
    fontSize: 14,
    marginLeft: 12,
    color: "#FF7235",
    fontWeight: "500",
  },
  buttonWrapper: {
    marginTop: 30,
  },
});
