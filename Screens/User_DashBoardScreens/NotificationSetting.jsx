import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import LineHead from "../../CustomComponents/LineHead";

const NotificationSetting = () => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);

  const [toggleCard2_1, setToggleCard2_1] = useState(false);
  const [toggleCard2_2, setToggleCard2_2] = useState(false);
  const [toggleCard2_3, setToggleCard2_3] = useState(false);
  const [toggleCard2_4, setToggleCard2_4] = useState(false);
  const [toggleCard2_5, setToggleCard2_5] = useState(false);

  const [toggleCard3_1, setToggleCard3_1] = useState(false);
  const [toggleCard3_2, setToggleCard3_2] = useState(false);

  return (
    <>
      <LineHead headerName="Notification & Settings" headerState={true} />
      <View style={styles.container}>
        {/* Card 1: Common */}
        <View style={styles.card}>
          <Text style={styles.heading}>Common</Text>
          <View style={styles.row}>
            <Text style={styles.text}>General Notifications</Text>
            <Switch
              value={toggle1}
              onValueChange={setToggle1}
              trackColor={{ false: "#ccc", true: "#FF7235" }}
              thumbColor={toggle1 ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Sound</Text>
            <Switch
              value={toggle2}
              onValueChange={setToggle2}
              trackColor={{ false: "#ccc", true: "#FF7235" }}
              thumbColor={toggle2 ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Vibrate</Text>
            <Switch
              value={toggle3}
              onValueChange={setToggle3}
              trackColor={{ false: "#ccc", true: "#FF7235" }}
              thumbColor={toggle3 ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Card 2: System & Services */}
        <View style={styles.card}>
          <Text style={styles.heading}>System & services update</Text>
          <View style={styles.row}>
            <Text style={styles.text}>App updates</Text>
            <Switch
              value={toggleCard2_1}
              onValueChange={setToggleCard2_1}
              trackColor={{ false: "#ccc", true: "#FF7235" }}
              thumbColor={toggleCard2_1 ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Bill Reminder</Text>
            <Switch
              value={toggleCard2_2}
              onValueChange={setToggleCard2_2}
              trackColor={{ false: "#ccc", true: "#FF7235" }}
              thumbColor={toggleCard2_2 ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Promotion</Text>
            <Switch
              value={toggleCard2_3}
              onValueChange={setToggleCard2_3}
              trackColor={{ false: "#ccc", true: "#FF7235" }}
              thumbColor={toggleCard2_3 ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Discount Available</Text>
            <Switch
              value={toggleCard2_4}
              onValueChange={setToggleCard2_4}
              trackColor={{ false: "#ccc", true: "#FF7235" }}
              thumbColor={toggleCard2_4 ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Payment Request</Text>
            <Switch
              value={toggleCard2_5}
              onValueChange={setToggleCard2_5}
              trackColor={{ false: "#ccc", true: "#FF7235" }}
              thumbColor={toggleCard2_5 ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Card 3: Others */}
        <View style={styles.card}>
          <Text style={styles.heading}>Others</Text>
          <View style={styles.row}>
            <Text style={styles.text}>New Service Available</Text>
            <Switch
              value={toggleCard3_1}
              onValueChange={setToggleCard3_1}
              trackColor={{ false: "#ccc", true: "#FF7235" }}
              thumbColor={toggleCard3_1 ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>New Tips Available</Text>
            <Switch
              value={toggleCard3_2}
              onValueChange={setToggleCard3_2}
              trackColor={{ false: "#ccc", true: "#FF7235" }}
              thumbColor={toggleCard3_2 ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 14,
    alignItems: "center",
  },
  card: {
    width: "100%",
    marginTop: "20%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: "-14%",
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    fontFamily: "Poppins-Regular",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -8,
  },
  text: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    fontFamily: "Poppins-Regular",
  },
});

export default NotificationSetting;
