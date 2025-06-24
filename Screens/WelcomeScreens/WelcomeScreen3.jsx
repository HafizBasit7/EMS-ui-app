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
import Frame3 from '../../assets/SVG/Frame3.svg'

const { width, height } = Dimensions.get("window");

export default function WelcomeScreenThree() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
  console.log("Attempting to navigate to Login");
  try {
    navigation.navigate('Login');
    console.log("Navigation successful");
  } catch (error) {
    console.error("Navigation failed:", error);
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={{ marginTop: '10%' }}>
          {/* Placeholder for your SVG */}
          <View style={{marginTop:'10%'}}>
         <Frame3/>
         </View>
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.heading}>Track and Manage Your Bookings</Text>
        <Text style={styles.description}>
          Use your dashboard to stay on top of requests, bookings, and direct messages with providers.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleGetStarted}
          >
            <Text style={styles.buttonText}>Let's Get Started</Text>
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
    marginTop: "10%",
    alignItems: "center",
  },
  button: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
    padding: 15,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});