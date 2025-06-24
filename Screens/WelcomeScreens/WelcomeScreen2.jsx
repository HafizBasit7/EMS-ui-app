import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  TouchableOpacity 
} from "react-native";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import Frame2 from "../../assets/SVG/Frame2.svg";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreenTwo() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={{ marginTop: '10%' }}>
          <Frame2 />
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.heading}>Compare and Book Services with Ease</Text>
        <Text style={styles.description}>
          Filter by ratings, price, and availability to find your perfect match, then get competitive quotes.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.borderButton]} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.buttonText, { color: GlobalStyles.colors.ButtonColor }]}>
              Skip
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.solidButton]} 
            onPress={() => navigation.navigate('WelcomeScreen3')}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: "50%",
    width: "100%",
    borderBottomLeftRadius: width * 0.2,
    borderBottomRightRadius: width * 0.2,
    overflow: "hidden",
    marginBottom: "5%", 
    backgroundColor: '#f5e6dc',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.5,
    justifyContent: "center",
    paddingHorizontal: "5%",
  },
  heading: {
    fontSize: width * 0.07,
    fontFamily: "Poppins-Bold",
    color: "#333",
    textAlign: "center",
    marginBottom: "2.5%",
    marginTop: '20%',
  },
  description: {
    fontSize: width * 0.04,
    fontFamily: "Poppins-Regular",
    color: "#666",
    textAlign: "center",
    marginBottom: "7%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "10%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.015,
    borderRadius: width * 0.05,
    height: height * 0.07,
  },
  borderButton: {
    width: "40%",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.ButtonColor,
    backgroundColor: "white",
  },
  solidButton: {
    width: "40%",
    backgroundColor: GlobalStyles.colors.ButtonColor,
  },
  buttonText: {
    fontSize: width * 0.04,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
});
