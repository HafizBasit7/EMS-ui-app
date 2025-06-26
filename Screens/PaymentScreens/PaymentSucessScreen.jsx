import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import LineHead from "../../CustomComponents/LineHead";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import CustomButton from "../../CustomComponents/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function PaymentSuccessScreen() {
  const navigation = useNavigation();

  const handleContinue = () => {
    // Simple navigation without any backend processing
   navigation.navigate('TabNavigation', { screen: 'Home' }); // Or wherever you want to navigate after payment success
  };

  return (
    <>
      <LineHead />
      <View style={styles.container}>
        {/* Payment Success Message */}
        <View style={styles.successContainer}>
          <Icon name="check-circle-outline" size={50} color="#23A26D" />
          <Text style={styles.successHeading}>Payment Success</Text>
          <Text style={styles.paymentAmount}>$100</Text>
        </View>

        {/* Payment Receipt Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeading}>Payment Receipt</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ref Number</Text>
            <Text style={styles.value}>000085752257</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Time</Text>
            <Text style={styles.value}>6-02-2024, 13:22:16</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Method</Text>
            <Text style={styles.value}>Apple Pay</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sender Name</Text>
            <Text style={styles.value}>John</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bithday Decoration</Text>
            <Text style={styles.value}>$100</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Amount</Text>
            <Text style={styles.value}>$105</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Status</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.status}>Success</Text>
            </View>
          </View>
        </View>

        {/* Bottom Button */}
        <View style={styles.bottomButton}>
          <CustomButton 
            title="Continue" 
            onPress={handleContinue} 
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
    paddingTop: "16%",
  },
  successContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  successHeading: {
    fontSize: 24,
    color: "#23A26D",
    marginTop: 10,
    fontFamily: 'Poppins-Regular'
  },
  paymentAmount: {
    fontSize: 27,
    fontFamily: 'Poppins-Regular',
    color: "#000",
    marginTop: 5,
  },
  table: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#FFF2E3",
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: "#FFF2E3",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    width: '100%',
    marginBottom: 10
  },
  tableHeading: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: GlobalStyles.colors.ButtonColor,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontSize: 15,
    color: "#555",
    paddingTop: 20,
    fontFamily: 'Poppins-Regular',
  },
  value: {
    fontSize: 15,
    color: "#000",
    paddingTop: 20,
    fontFamily: 'Poppins-Medium',
  },
  statusContainer: {
    paddingTop: 20,
  },
  status: {
    fontSize: 15,
    color: "#23A26D",
    backgroundColor: "#23A26D1A",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
    textAlign: "center",
    fontFamily: 'Poppins-Regular',
  },
  bottomButton: {
    position: "absolute",
    bottom: 20,
    width: "90%",
    alignSelf: "center",
  },
});