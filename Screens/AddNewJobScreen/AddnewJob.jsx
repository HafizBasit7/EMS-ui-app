import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import LineHead from "../../CustomComponents/LineHead.js";
import CustomButton from "../../CustomComponents/CustomButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from "react-native-element-dropdown";
import { MultiSelect } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";
import WebView from "react-native-webview";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import CustomMessageModal from "../../CustomComponents/CustomMessageModal";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function AddNewJob() {
  const [activeTab, setActiveTab] = useState("Primary");
  const [selectedImages, setSelectedImages] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selected, setSelected] = useState([]);
  const webViewRef = useRef(null);
  const [dateShow, setDateShow] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const [date, setDate] = useState(new Date());
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageIcon, setMessageIcon] = useState("alert-circle");
  const navigation = useNavigation();
  

  // Form state
  const [jobTitle, setJobTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");
  const [radius, setRadius] = useState(10);
  const [loading, setLoading] = useState(false);

  // Dummy data for dropdowns
  const [dropDownData, setDropDownData] = useState([
    { label: "Birthday Celebration", value: "1" },
    { label: "Wedding Celebration", value: "2" },
    { label: "Corporate Events", value: "3" },
  ]);

  const [subCategoryDropDown, setSubcategoryDropDown] = useState([
    { label: "Decoration", value: "1" },
    { label: "Catering", value: "2" },
    { label: "Photography", value: "3" },
    { label: "Entertainment", value: "4" },
  ]);

  const sendCommandToEditor = (command, value = null) => {
    const jsCode = value
      ? `document.execCommand('${command}', false, '${value}');`
      : `document.execCommand('${command}', false, null);`;
    webViewRef.current?.injectJavaScript(jsCode);
  };

  const handleSelectImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImages(result.assets);
    }
  };

  const handleRemoveImage = (uri) => {
    setSelectedImages(selectedImages.filter((img) => img.uri !== uri));
  };

  const formatDate = (date) => {
    const eventDate = new Date(date);
    const year = eventDate.getFullYear();
    const month = String(eventDate.getMonth() + 1).padStart(2, "0");
    const day = String(eventDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Simple validation
    if (activeTab === "Primary") {
      if (!jobTitle || !eventCategory || subcategories.length === 0) {
        setMessage("All Primary Details are required");
        setShowMessageModal(true);
        setLoading(false);
        return;
      }
      setActiveTab("Secondary");
    } else {
      if (!minimumPrice || !maximumPrice || !location || !date || selectedImages.length === 0) {
        setMessage("All Secondary Details are required");
        setShowMessageModal(true);
        setLoading(false);
        return;
      }
      if (parseInt(minimumPrice) > parseInt(maximumPrice)) {
        setMessage("Minimum price should be less than maximum price");
        setShowMessageModal(true);
        setLoading(false);
        return;
      }
      
      // Simulate successful submission
      setMessageIcon("check-outline");
      setMessage("Job created successfully!");
      setShowMessageModal(true);
      navigation.navigate("TabNavigation")
    }
    setLoading(false);
  };

  return (
    <>
      <LineHead headerName="Add New Job" headerState={true} />
      <StatusBar style="auto" />

      <KeyboardAwareScrollView
        style={styles.scrollContainer}
        scrollEnabled={true}
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === "Primary" && styles.activeTab]}
              onPress={() => setActiveTab("Primary")}
            />
            <TouchableOpacity
              style={[styles.tabButton, activeTab === "Secondary" && styles.activeTab]}
              onPress={() => setActiveTab("Secondary")}
            />
          </View>

          {/* Heading */}
          <Text style={styles.headingText}>
            {activeTab === "Primary" ? "Primary Details" : "Secondary Details"}
          </Text>
          <Text style={styles.subHeadingText}>
            You are about to post a job, please cross-check every information
            you add before posting.
          </Text>

          {/* Form */}
          <View style={styles.formContainer}>
            {activeTab === "Primary" ? (
              <>
                <Text style={styles.label}>Job Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Job Title"
                  value={jobTitle}
                  onChangeText={setJobTitle}
                />

                <Text style={styles.label}>Event Category</Text>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: GlobalStyles.colors.ButtonColor }]}
                  data={dropDownData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select Event Category" : "..."}
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

                {eventCategory && (
                  <>
                    <Text style={styles.label}>Sub-Categories</Text>
                    <MultiSelect
                      style={styles.dropdown}
                      search
                      data={subCategoryDropDown}
                      labelField="label"
                      valueField="value"
                      searchPlaceholder="Search..."
                      placeholderStyle={{ fontFamily: "Poppins-Thin" }}
                      value={subcategories}
                      onChange={setSubcategories}
                      selectedStyle={{
                        borderRadius: 12,
                        borderColor: GlobalStyles.colors.ButtonColor,
                      }}
                      placeholder={
                        subcategories.length > 0
                          ? subCategoryDropDown
                              .filter((item) => subcategories.includes(item.value))
                              .map((item) => item.label)
                              .join(", ")
                          : "Select Sub-Categories"
                      }
                    />
                  </>
                )}

                <Text style={styles.label}>Job Description</Text>
                <View style={styles.editorContainer}>
                  <View style={styles.editorToolbar}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => sendCommandToEditor("bold")}
                    >
                      <Text style={styles.buttonText}>B</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => sendCommandToEditor("italic")}
                    >
                      <Text style={styles.buttonText}>I</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => sendCommandToEditor("underline")}
                    >
                      <Text style={styles.buttonText}>U</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => sendCommandToEditor("insertOrderedList")}
                    >
                      <Text style={styles.buttonText}>1.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => sendCommandToEditor("insertUnorderedList")}
                    >
                      <Text style={styles.buttonText}>•</Text>
                    </TouchableOpacity>
                  </View>
                  <WebView
                    ref={webViewRef}
                    originWhitelist={["*"]}
                    source={{
                      html: `
                        <!DOCTYPE html>
                        <html>
                          <head>
                            <style>
                              body {
                                font-size: 10vh;
                                padding: 10px;
                                margin: 0;
                              }
                            </style>
                          </head>
                          <body contenteditable="true" style="min-height: 100vh;"></body>
                        </html>
                      `,
                    }}
                    style={styles.editor}
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.label}>Minimum Estimated Budget</Text>
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
                    value={minimumPrice}
                    onChangeText={setMinimumPrice}
                  />
                </View>

                <Text style={styles.label}>Maximum Estimated Budget</Text>
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
                    value={maximumPrice}
                    onChangeText={setMaximumPrice}
                  />
                </View>

                <Text style={styles.label}>Address</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input2}
                    placeholder="Enter your address"
                    value={location}
                    onChangeText={setLocation}
                  />
                </View>

                <Text style={styles.label}>Get Offers From: {radius} km</Text>
                <View style={styles.sliderContainer}>
                  <Text style={styles.sliderLabel}>0</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={radius}
                    onValueChange={setRadius}
                    minimumTrackTintColor={GlobalStyles.colors.ButtonColor}
                    maximumTrackTintColor="#d3d3d3"
                    thumbTintColor={GlobalStyles.colors.ButtonColor}
                  />
                  <Text style={styles.sliderLabel}>100</Text>
                </View>

                <Text style={styles.label}>Select Required Job Date & Time</Text>
                <View style={styles.inputContainer}>
                  <TouchableOpacity
                    style={styles.input2}
                    onPress={() => setDateShow(true)}
                  >
                    <Text style={styles.dateText}>
                      {date ? formatDate(date) : "Select Required Job Date & Time"}
                    </Text>
                  </TouchableOpacity>
                  {dateShow && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={(e, selectedDate) => {
                        setDateShow(false);
                        if (selectedDate) setDate(selectedDate);
                      }}
                    />
                  )}
                </View>

                {selectedImages.length === 0 ? (
                  <TouchableOpacity
                    style={styles.imageUploadContainer}
                    onPress={handleSelectImages}
                  >
                    <Icon
                      name="camera"
                      size={60}
                      color={GlobalStyles.colors.IconsColor}
                      style={{ marginBottom: 5 }}
                    />
                    <Text style={styles.imageUploadText}>
                      Allowed Format:{" "}
                      <Text style={{ color: GlobalStyles.colors.LinkColor }}>
                        SVG,JPEG,PNG
                      </Text>
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.imagePreviewContainer}>
                    {selectedImages.map((image) => (
                      <View key={image.uri} style={styles.imageWrapper}>
                        <Image
                          source={{ uri: image.uri }}
                          style={styles.previewImage}
                        />
                        <TouchableOpacity
                          style={styles.removeImageButton}
                          onPress={() => handleRemoveImage(image.uri)}
                        >
                          <Text style={styles.removeImageText}>×</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <CustomMessageModal
          message={message}
          onClose={() => setShowMessageModal(false)}
          visible={showMessageModal}
          buttonNumbers={1}
          icon={messageIcon}
        />
      </KeyboardAwareScrollView>

      <View style={styles.submitButtonContainer}>
        <CustomButton
          title={
            loading ? (
              <ActivityIndicator color="white" />
            ) : activeTab === "Primary" ? (
              "Next"
            ) : (
              "Submit"
            )
          }
          onPress={handleSubmit}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: "5%",
  },
  scrollContent: {
    paddingBottom: height * 0.3,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: "18%",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: GlobalStyles.colors.borderColor,
    backgroundColor: "white",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
    borderColor: GlobalStyles.colors.ButtonColor,
  },
  headingText: {
    fontSize: 22,
    marginBottom: 10,
    color: GlobalStyles.colors.textColor,
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
  subHeadingText: {
    fontSize: 14,
    color: GlobalStyles.colors.textSecondary,
    marginBottom: 20,
    fontFamily: "Poppins-Thin",
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: width * 0.04,
    color: "#333",
    marginBottom: height * 0.01,
    fontFamily: "Poppins-Regular",
  },
  input: {
    width: "100%",
    height: height * 0.07,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.03,
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
    fontFamily: "Poppins-Thin",
  },
  dropdown: {
    height: height * 0.07,
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: height * 0.02,
  },
  editorContainer: {
    height: "35%",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  editorToolbar: {
    top: 0,
    width: "100%",
    height: "30%",
    backgroundColor: "#EBEBEB",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 2,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  button: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  editor: {
    flex: 1,
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
    width: "100%",
    height: height * 0.07,
    fontSize: width * 0.04,
    fontFamily: "Poppins-Thin",
  },
  icon: {
    marginRight: 10,
  },
  sliderContainer: {
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  slider: {
    width: "80%",
    height: 40,
  },
  sliderLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  dateText: {
    fontWeight: "thin",
    marginTop: "5%",
    fontFamily: "Poppins-Thin",
  },
  imageUploadContainer: {
    height: "30%",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  imageUploadText: {
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
    fontSize: 14,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
    marginBottom: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 15,
    padding: 2,
  },
  removeImageText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
  },
  submitButtonContainer: {
    width: "92%",
    position: "absolute",
    top: "88%",
    marginLeft: "4%",
    bottom: '10%'
  },
});