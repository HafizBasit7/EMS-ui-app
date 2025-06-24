import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../../../CustomComponents/CustomButton";
import { GlobalStyles } from "../../../../Styles/GlobalStyles";
import CustomMessageModal from "../../../../CustomComponents/CustomMessageModal";

const { width, height } = Dimensions.get("window");

export default function BioScreen({ route, navigation }) {
  // Set default values for params
  const params = route.params || {};
  const { 
    email = "", 
    userType = "profile" // Default value if undefined
  } = params;

  const [bioText, setBioText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");
  const [skip, setSkip] = useState(false);

  const handleSave = () => {
    if (skip) {
      navigation.navigate('SelectServices', {
        ...params,
        bio: " "
      });
      return;
    }
    
    if (bioText.trim() === '') {
      setError("Please enter bio");
      setModalVisible(true);
      return;
    }
    
    navigation.navigate('SelectServices', {
      ...params,
      bio: bioText
    });
  };

  const handleSkip = () => {
    setSkip(true);
    handleSave();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bio Screen</Text>
      <Text style={styles.subheading}>Enter your {userType}</Text>
      
      <View style={styles.textBoxContainer}>
        <TextInput
          style={styles.textBox}
          placeholder="Write something about yourself..."
          placeholderTextColor="#aaa"
          multiline
          value={bioText}
          onChangeText={setBioText}
          maxLength={300}
        />
        <Text style={styles.charCount}>
          {bioText.length}/300 characters
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton
          title="Save"
          onPress={handleSave}
          style={styles.saveButton}
        />
        
        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={handleSkip}
        >
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <CustomMessageModal 
        visible={modalVisible} 
        message={error} 
        buttonNumbers={1} 
        icon="alert-circle"  
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    backgroundColor: "white",
  },
  heading: {
    fontSize: 24,
    fontFamily: "Poppins-Black",
    color: "#000",
    textAlign: "left",
    marginBottom: "2%",
    marginTop: '10%'
  },
  subheading: {
    fontSize: 16,
    fontFamily: "Poppins-Thin",
    color: "#333",
    textAlign: "left",
    marginBottom: "4%",
  },
  textBoxContainer: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: "6%",
    maxHeight: "35%",
    marginBottom: "5%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    height: '25%'
  },
  textBox: {
    flex: 1,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#888",
    textAlign: "right",
    marginTop: "2%",
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  saveButton: {
    width: "100%",
    marginVertical: "2%",
    marginLeft: '10%'
  },
  skipButton: {
    width: '100%',
    height: height * 0.07,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.02,
    marginLeft: '10%',
    borderWidth: 1,
    borderColor: GlobalStyles.colors.ButtonColor
  },
  buttonText: {
    color: GlobalStyles.colors.ButtonColor,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
});