import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import EditSVG from "../../assets/SVG/EditSVG.svg";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";

const { width } = Dimensions.get("window");

const EditProfile = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("John Wick");
  const [email, setEmail] = useState("john1@gmail.com");
  const [phone, setPhone] = useState("123-456-7890");

  const [dob, setDob] = useState(new Date("1998-06-26"));
  const [dateShow, setDateShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState("https://randomuser.me/api/portraits/men/75.jpg");

  // Country Dropdown
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryValue, setCountryValue] = useState("United States");
  const [countryItems, setCountryItems] = useState([
    { label: "United States", value: "United States" },
    { label: "Pakistan", value: "Pakistan" },
    { label: "India", value: "India" },
    { label: "Canada", value: "Canada" },
    { label: "UK", value: "UK" },
  ]);

  // Gender Dropdown
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState("Male");
  const [genderItems, setGenderItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ]);

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]?.uri);
    }
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={{ uri: selectedImage }} style={styles.profileImage} />
          <TouchableOpacity style={styles.editIcon} onPress={handleSelectImage}>
            <EditSVG width={16} height={16} />
          </TouchableOpacity>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          {/* Country and Gender Dropdowns */}
          <View style={styles.row}>
            <View style={[styles.half, { zIndex: 2 }]}>
              <DropDownPicker
                open={countryOpen}
                value={countryValue}
                items={countryItems}
                setOpen={setCountryOpen}
                setValue={setCountryValue}
                setItems={setCountryItems}
                placeholder="Select Country"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownBox}
              />
            </View>
            <View style={[styles.half, { zIndex: 1 }]}>
              <DropDownPicker
                open={genderOpen}
                value={genderValue}
                items={genderItems}
                setOpen={setGenderOpen}
                setValue={setGenderValue}
                setItems={setGenderItems}
                placeholder="Select Gender"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownBox}
              />
            </View>
          </View>

          {/* DOB */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setDateShow(true)}
          >
            <Text style={styles.dateText}>{formatDate(dob)}</Text>
          </TouchableOpacity>
          {dateShow && (
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              onChange={(e, selectedDate) => {
                setDateShow(false);
                if (selectedDate) setDob(selectedDate);
              }}
            />
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dismissButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.dismissButtonText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#FEFEFC",
    alignItems: "center",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: width / 2 - 90,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    color: "#333",
  },
  profileEmail: {
    fontSize: 14,
    color: "#777",
  },
  form: {
    width: "100%",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    fontSize: 15,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 15,
  },
  half: {
    width: "48%",
  },
  dropdown: {
    borderRadius: 10,
    borderColor: "#ccc",
    minHeight: 50,
  },
  dropdownBox: {
    borderRadius: 10,
    borderColor: "#ccc",
  },
  dateText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 50,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#FF6B2C",
    width: "100%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dismissButton: {
    borderWidth: 1.5,
    borderColor: "#FF6B2C",
    width: "100%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  dismissButtonText: {
    color: "#FF6B2C",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EditProfile;
