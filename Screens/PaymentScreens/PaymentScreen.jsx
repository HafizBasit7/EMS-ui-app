import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import LineHead from "../../CustomComponents/LineHead";
import { Checkbox, RadioButton } from "react-native-paper";
import CustomButton from "../../CustomComponents/CustomButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import ApplePay from "../../assets/SVG/ApplePay.svg";
import PayPal from "../../assets/SVG/PayPayal.svg";
import { useNavigation } from "@react-navigation/native";

export default function PaymentScreen() {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState("applePay");

  const handlePayNow = () => {
    // Simple navigation without any backend processing
    navigation.navigate("PaymentConfirmation"); // Make sure this screen exists in your navigation stack
  };

  return (
    <>
      <LineHead headerName="Payment" headerState={true}/>
      <View style={styles.container}>
        <Text style={styles.heading}>Summary</Text>
        <View style={styles.summaryInfoTable}>
          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Text style={styles.label}>Offer</Text>
              <Text style={styles.label}>Commission</Text>
              <Text style={styles.label}>Slot 6 Feb 2023</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.value}>$100</Text>
              <Text style={styles.value}>$5</Text>
              <Text style={styles.value}>11:00 am - 11:30 am</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.total}>Total: $105</Text>
        </View>
        <Text style={styles.note}>
          Note: You can cancel your booking within 24 hours for free, penalty
          charges will apply for late cancellations.
        </Text>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked(!checked)}
            color={GlobalStyles.colors.ButtonColor}
          />
          <Text style={styles.checkboxText}>
            I accept the <Text style={styles.link}>terms</Text> and{" "}
            <Text style={styles.link}>privacy policy</Text>
          </Text>
        </View>
        <Text style={styles.subheading}>Payment Method</Text>
        <View style={styles.paymentMethodContainer}>
          <TouchableOpacity
            style={styles.paymentMethod}
            onPress={() => setSelectedPaymentMethod("applePay")}
          >
            <ApplePay />
            <View style={styles.paymentDetails}>
              <Text style={styles.methodName}>Apple Pay</Text>
              <Text style={styles.methodDetails}>*************0532</Text>
            </View>
            <RadioButton
              value="applePay"
              status={
                selectedPaymentMethod === "applePay" ? "checked" : "unchecked"
              }
              onPress={() => setSelectedPaymentMethod("applePay")}
              color={GlobalStyles.colors.ButtonColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentMethod}
            onPress={() => setSelectedPaymentMethod("paypal")}
          >
            <PayPal />
            <View style={styles.paymentDetails}>
              <Text style={styles.methodName}>PayPal</Text>
              <Text style={styles.methodDetails}>***dynegmail.com</Text>
            </View>
            <RadioButton
              value="paypal"
              status={
                selectedPaymentMethod === "paypal" ? "checked" : "unchecked"
              }
              onPress={() => setSelectedPaymentMethod("paypal")}
              color={GlobalStyles.colors.ButtonColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentMethod,
              { padding: "6%", justifyContent: "center" },
            ]}
            onPress={() => {}}
          >
            <Icon
              name="plus"
              size={24}
              color={GlobalStyles.colors.ButtonColor}
            />
            <Text style={styles.addMethodText}>Add new Method</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 20,
            width: "100%",
            marginLeft: "5%",
          }}
        >
          <CustomButton 
            title="Pay Now" 
            onPress={handlePayNow}
            disabled={!checked} // Disable button if terms not accepted
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: "5%",
    paddingTop: "18%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  summaryInfoTable: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
    alignItems: "flex-end",
  },
  label: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#d3d3d3",
    marginVertical: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "right",
  },
  note: {
    fontSize: 14,
    color: "red",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
  },
  link: {
    textDecorationLine: "underline",
    color: GlobalStyles.colors.ButtonColor,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  paymentMethodContainer: {
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
  },
  paymentDetails: {
    flex: 1,
    marginLeft: 10,
  },
  methodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  methodDetails: {
    fontSize: 14,
    color: "#555",
  },
  addMethodText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginLeft: 10,
  },
});