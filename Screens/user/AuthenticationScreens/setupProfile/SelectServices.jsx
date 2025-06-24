import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from "react-native";
import CustomButton from "../../../../CustomComponents/CustomButton";
import { GlobalStyles } from "../../../../Styles/GlobalStyles";
import { MultiSelect } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomMessageModal from "../../../../CustomComponents/CustomMessageModal";

const { width, height } = Dimensions.get("window");

// Mock services data
const MOCK_SERVICES = [
  { _id: "1", name: "Photography" },
  { _id: "2", name: "Videography" },
  { _id: "3", name: "Catering" },
  { _id: "4", name: "Decoration" },
  { _id: "5", name: "Music" },
  { _id: "6", name: "Venue" },
];

export default function SelectServicesScreen({ route, navigation }) {
  // Set default values for params
  const params = route.params || {};
  
  const [services, setServices] = useState(MOCK_SERVICES);
  const [selectedServices, setSelectedServices] = useState([]);
  const [descriptions, setDescriptions] = useState({});
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false); // Set to false since we're using mock data
  const [messageModal, setMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const [skip, setSkip] = useState(false);

  // Handle saving selected services with their descriptions and prices
  const handleSave = () => {
    if (skip) {
      navigation.navigate("Login", { 
        ...params, 
        services: [] 
      });
      return;
    }

    const incompleteFields = selectedServices.some(
      (serviceId) => !descriptions[serviceId] || !prices[serviceId]
    );

    if (incompleteFields) {
      setMessage("All fields are required for the selected services.");
      setMessageModal(true);
      return;
    }

    const servicesWithDetails = selectedServices.map((serviceId) => {
      const service = services.find((s) => s._id === serviceId);
      return {
        category: serviceId,
        name: service?.name || "Unknown Service",
        description: descriptions[serviceId],
        price: prices[serviceId],
      };
    });

    navigation.navigate("Login", { 
      ...params, 
      services: servicesWithDetails 
    });
  };

  const handleSelectService = (selected) => {
    if (selected.length > 10) {
      setMessage("You can select a maximum of 10 services.");
      setMessageModal(true);
      return;
    }
    setSelectedServices(selected);
  };

  const handleDescriptionChange = (serviceId, text) => {
    setDescriptions((prev) => ({
      ...prev,
      [serviceId]: text,
    }));
  };

  const handlePriceChange = (serviceId, text) => {
    // Basic validation to allow only numbers
    if (text === '' || /^[0-9]*$/.test(text)) {
      setPrices((prev) => ({
        ...prev,
        [serviceId]: text,
      }));
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={GlobalStyles.colors.ButtonColor} size={24} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Select Services</Text>
        <Text style={styles.subheading}>Enter your desired services</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Services</Text>
         
          <MultiSelect
            style={styles.dropdown}
            data={services.map((service) => ({
              label: service.name,
              value: service._id,
            }))}
            labelField="label"
            valueField="value"
            placeholder="Select Services"
            value={selectedServices}
            onChange={handleSelectService}
            search
            searchPlaceholder="Search..."
            selectedStyle={{
              borderRadius: 12,
              borderColor: GlobalStyles.colors.ButtonColor,
            }}
          />

          {selectedServices.map((serviceId) => {
            const service = services.find((s) => s._id === serviceId);
            return (
              <View key={serviceId} style={styles.serviceForm}>
                <Text style={styles.label}>Description for {service?.name || 'Service'}</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Enter description"
                  value={descriptions[serviceId] || ""}
                  onChangeText={(text) => handleDescriptionChange(serviceId, text)}
                  multiline
                />

                <Text style={styles.label}>Starting Price for {service?.name || 'Service'}</Text>
                <View style={styles.inputContainer}>
                  <Icon name="currency-usd" size={20} color="gray" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={prices[serviceId] || ""}
                    onChangeText={(text) => handlePriceChange(serviceId, text)}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <CustomButton 
          title="Save" 
          onPress={handleSave} 
          style={styles.saveButton} 
        />
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => {
            setSkip(true);
            handleSave();
          }}
        >
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <CustomMessageModal
        visible={messageModal}
        message={message}
        onClose={() => setMessageModal(false)}
        buttonNumbers={1}
        icon="alert-circle"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100, // Extra space for buttons
    backgroundColor: "white",
  },
  heading: {
    fontSize: 24,
    fontFamily: "Poppins-Black",
    color: "#000",
    marginBottom: 10,
    marginTop: 10,
  },
  subheading: {
    fontSize: 16,
    fontFamily: "Poppins-Thin",
    color: "#555",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginVertical: 5,
  },
  dropdown: {
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  textArea: {
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    height: 100,
    textAlignVertical: 'top',
  },
  serviceForm: {
    marginBottom: 20,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  saveButton: {
    width: "100%",
    marginBottom: 10,
  },
  skipButton: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.ButtonColor,
  },
  buttonText: {
    color: GlobalStyles.colors.ButtonColor,
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
});