import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import LineHead from "../../CustomComponents/LineHead";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import CustomButton from "../../CustomComponents/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import CustomMessageModal from "../../CustomComponents/CustomMessageModal";

const { width, height } = Dimensions.get("window");

export default function AddServiceScreen() {
  // Dummy dropdown data
  const dummyCategories = [
    { label: "Photography", value: "1" },
    { label: "Catering", value: "2" },
    { label: "Decoration", value: "3" },
  ];

  const [price, setPrice] = useState("");
  const [eventCategory, setEventCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageIcon, setMessageIcon] = useState("alert-circle");

  const handleSubmit = () => {
    setLoading(true);

    if (!price || !eventCategory || !description) {
      setMessage("Please fill all fields.");
      setShowMessageModal(true);
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      setMessage("Service added successfully!");
      setShowMessageModal(true);
    }, 1000);
  };

  return (
    <>
      <LineHead headerName="Add Service" headerState={true} />
      <View style={styles.container}>
        <ScrollView scrollEnabled={true}>
          <Text style={styles.label}>Price Starting From:</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="currency-usd"
              size={20}
              color="gray"
              style={styles.icon}
            />
            <TextInput
              style={styles.input2}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          <Text style={styles.label}>Select Category</Text>
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && { borderColor: GlobalStyles.colors.ButtonColor },
            ]}
            data={dummyCategories}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select Category" : "..."}
            placeholderStyle={{ fontFamily: "Poppins-Thin" }}
            searchPlaceholder="Search..."
            value={eventCategory}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setEventCategory(item.value);
              setIsFocus(false);
            }}
          />

          <Text style={styles.label}>Service Description</Text>
          <View
            style={{
              height: 150,
              width: "100%",
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <TextInput
              style={styles.input2}
              placeholder="Enter Description"
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <CustomButton
            title={
              loading ? <ActivityIndicator size={24} color="white" /> : "Add Service"
            }
            onPress={handleSubmit}
          />
        </View>

        <CustomMessageModal
          message={message}
          visible={showMessageModal}
          onClose={() => setShowMessageModal(false)}
          buttonNumbers={1}
          icon={messageIcon}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: "20%",
    paddingHorizontal: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: width * 0.04,
    color: "#333",
    marginBottom: height * 0.01,
    fontFamily: "Poppins-Regular",
  },
  dropdown: {
    height: height * 0.07,
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: height * 0.02,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input2: {
    flex: 1,
    paddingLeft: 10,
    fontSize: width * 0.04,
    fontFamily: "Poppins-Regular",
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
    marginLeft: "5%",
  },
  icon: {
    margin: 10,
  },
});
