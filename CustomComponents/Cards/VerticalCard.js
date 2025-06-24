import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

export default function VerticalCard({ data }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{flexDirection:'row'}}> 
        <Image source={{ uri: data?.profilePicUrl }} style={styles.avatar} />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{data?.fullname}</Text>
            <View style={styles.row}>
              <Icon name="location-on" size={16} color={GlobalStyles.colors.IconsColor} />
              <Text style={styles.details}>{data?.address}</Text>
            </View>
            <View style={styles.expertiseContainer}>
              {/* {data.expertise?.slice(0, 3).map((item, index) => (
                  <View key={index} style={styles.expertiseItem}>
                    <Text style={styles.expertiseText}>{item}</Text>
                  </View>
                ))} */}
                 <View  style={styles.expertiseItem}>
                    <Text style={styles.expertiseText}>{data?.servicesOffered}</Text>
                  </View>
              </View>
            <View style={styles.row}>
              <Text >
              {data.reviewsCount}
              </Text>
              <Icon name="star" size={16} color="#FFD700" />
              <Text>{data?.overallRating  === "N/A"? 'No': data?.overallRating}.Reviews</Text>
            </View>
          </View>
        </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('ProviderProfile',{providerId:data._id})}>
            <Text style={styles.buttonText}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "5%",
    backgroundColor: "white",
    marginVertical: "2%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: "97%",
    alignSelf: "center",
    borderWidth:1,
    borderColor: "#ddd",
   
  },
  expertiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    marginBottom: '2%',
  },
  card: {},
  avatar: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: (width * 0.2) / 2,
    marginRight: "5%",
  },
  contentContainer: {
    flex: 1,
  },
  textContainer: {
    marginBottom: "3%",
  },
  expertiseText: {
    color: 'black',
    fontSize: 12,
    backgroundColor:GlobalStyles.colors.chipColor,
    margin:2,
    borderRadius:10,
    padding:2,
    fontFamily:'Poppins-Regular'
  },
  name: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "black",
    marginBottom: "2%",
    fontWeight:'700'
  
  },
  details: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "gray",
    marginLeft: "4%",
   
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "2%",
  },
  buttonContainer: {
    marginTop: "auto",
    width: "100%",
  },
  button: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "white",
  },
});
