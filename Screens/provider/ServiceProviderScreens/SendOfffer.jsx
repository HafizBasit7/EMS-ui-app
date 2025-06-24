import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import LineHead from "../../../CustomComponents/LineHead";
import CustomButton from "../../../CustomComponents/CustomButton";
import CustomMessageModal from "../../../CustomComponents/CustomMessageModal";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

export default function SendOffer({ route }) {
  const [loading, setLoading] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const navigation = useNavigation();

  const handleSelectImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
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

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setMessage("This is just a UI demo.Offer sent Successfully.");
      setShowMessageModal(true);
      setLoading(false);
      navigation.navigate("ProviderHomeScreen")
    }, 1000);
  };

  return (
    <>
      <LineHead headerName="Send Offer" headerState={true} />
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.label}>Your Offer</Text>
          <View style={styles.inputContainer}>
            <Icon name="currency-usd" size={20} color="gray" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          <Text style={styles.label}>Service Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter description"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* <Text style={styles.label}>Upload Images</Text> */}
          {/* <TouchableOpacity style={styles.uploadContainer} onPress={handleSelectImages}>
            <Icon name="camera" size={50} color={GlobalStyles.colors.IconsColor} />
            <Text style={styles.uploadText}>
              Allowed Formats: <Text style={styles.uploadTextHighlight}>SVG, JPEG, PNG</Text>
            </Text>
          </TouchableOpacity> */}

          {selectedImages.length > 0 && (
            <ScrollView horizontal style={styles.imagePreviewContainer}>
              {selectedImages.map((image) => (
                <View key={image.uri} style={styles.imageWrapper}>
                  <Image source={{ uri: image.uri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeIcon}
                    onPress={() => handleRemoveImage(image.uri)}
                  >
                    <Icon name="close-circle" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </ScrollView>

        <CustomMessageModal
          message={message}
          visible={showMessageModal}
          onClose={() => setShowMessageModal(false)}
          buttonNumbers={1}
          icon="alert-circle"
        />
      </View>

      <View style={{ position: 'absolute', width: "90%", marginLeft: "5%", top: "87%" }}>
        <CustomButton
          title={loading ? <ActivityIndicator size="small" color="white" /> : "Send Offer"}
          onPress={handleSubmit}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop: "18%",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
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
  input: {
    flex: 1,
    padding: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  uploadContainer: {
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  uploadText: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  uploadTextHighlight: {
    color: GlobalStyles.colors.LinkColor,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  imageWrapper: {
    marginRight: 10,
    position: "relative",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});
