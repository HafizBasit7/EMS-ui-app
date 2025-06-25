import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { List } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GlobalStyles } from "../../Styles/GlobalStyles";
export default function ServicesCards({ data, providerId, userId, userType,onServiceSelect  }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedAccordion, setSelectedAccordion] = useState(null); 
  const screenWidth = Dimensions.get("window").width;
  const handlePress = () => setExpanded(!expanded);
  const handleSelect = () => {
    const newSelected = selectedAccordion === data?._id ? null : data?._id; // If already selected, deselect
    setSelectedAccordion(newSelected); // Update the selected state
    onServiceSelect(newSelected); // Trigger callback with the selected service ID
  };

  return (
    <View style={{ paddingTop: 20 }}>
      <View style={[styles.card,]}>
        {userType === "Customer" ? (
          <List.Accordion
            title={<Text style={styles.title}>{data?.name}</Text>}
            expanded={expanded}
            onPress={handlePress}
            style={styles.accordion}
            titleStyle={styles.title}
          >
            <Text style={styles.subtitle}>Starting from :  <Text style={{fontWeight:'bold'}}>${data?.price}</Text></Text>
            <Text style={styles.details}>{data?.description}</Text>
          </List.Accordion>
        ) : userId === providerId ? (
          <TouchableOpacity onPress={handleSelect}>
          <List.Accordion
            title={<Text style={styles.title}>
             
              {data?.name} {" "}    
              {selectedAccordion === data?._id ?
              <Icon
                name={"pencil"}
                size={20}
                color={GlobalStyles.colors.ButtonColor}
                
              />
              :null}
              </Text>}
            expanded={true}
            onPress={handlePress}
            style={styles.accordion}
            titleStyle={styles.title}
            right={() => (
              <Icon
                name={selectedAccordion === data?._id ? "check-circle" : "check-circle-outline"}
                size={24}
                color={GlobalStyles.colors.ButtonColor}
                style={styles.icon}
               
              />
            )}
          >
            <Text style={styles.subtitle}>Price: {data?.price}</Text>
            <Text style={styles.details}>{data?.description}</Text>
          </List.Accordion>
          </TouchableOpacity>
         
        ) : (
          <List.Accordion
            title={<Text style={styles.title}>{data?.name}</Text>}
            expanded={expanded}
            onPress={handlePress}
            style={styles.accordion}
            titleStyle={styles.title}
          >
            <Text style={styles.subtitle}>Price: {data?.price}</Text>
            <Text style={styles.details}>{data?.description}</Text>
          </List.Accordion>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 30,
    overflow: "hidden",
    paddingTop: 12,
    backgroundColor: GlobalStyles.colors.cardBackground,
    padding: 10,
    paddingTop: "1%",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "black",
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: GlobalStyles.colors.secondary,
    marginLeft: "5%",
    marginTop: "-5%",
  },
  details: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "gray",
    marginLeft: "5%",
  },
  accordion: {
    backgroundColor: GlobalStyles.colors.cardBackground,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedAccordion: {
    backgroundColor: GlobalStyles.colors.highlightBackground, 
  },
  icon: {
    position: "absolute",
    top:'50%',
  },
});
