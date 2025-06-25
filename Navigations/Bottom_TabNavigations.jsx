import React from "react";
import { Platform, Dimensions, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BookingScreen from "../Screens/User_DashBoardScreens/BookingScreen.jsx";
import HomeScreen from "../Screens/User_DashBoardScreens/HomeScreen.jsx";
import InboxScreen from "../Screens/User_DashBoardScreens/InboxScreen.jsx";
import ProfileScreen from "../Screens/User_DashBoardScreens/ProfileScreen.jsx";
// import MyJobScreen from "../Screens/User_DashBoardScreens/MyJobsScreens";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GlobalStyles } from "../Styles/GlobalStyles";
import MyJobs from "../Screens/provider/MyJobs.jsx";
import Profile from "../Screens/provider/Profile.jsx";
import ProviderHomeScreen from "../Screens/provider/ServiceProviderScreens/HomeScreen.jsx";

const { width } = Dimensions.get("window");
const Tab = createBottomTabNavigator();

// Mock user data - replace this with your actual user management
const MOCK_USER = {
  type: "Provider", // Change to "Provider" to test provider flow
  profilePicture: "https://example.com/profile.jpg" // Replace with default or mock image
};

export default function TabNavigation() {
  // Replace with your actual user state management
  const user = MOCK_USER; // This replaces the Redux useSelector
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: GlobalStyles.colors.ButtonColor,
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "Profile") {
            return (
              <Image
                source={{
                  uri: user?.profilePicture || "https://via.placeholder.com/150",
                }}
                style={[styles.profileIcon, focused && styles.activeProfileIcon]}
              />
            );
          }

          let iconName;
          let activeIconName;
          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              activeIconName = "home";
              break;
            case "MyJobs":
              iconName = "account-group-outline";
              activeIconName = "account-group";
              break;
            case "Bookings":
              iconName = "clipboard-text-outline";
              activeIconName = "clipboard-text";
              break;
            case "Inbox":
              iconName = "chat-outline";
              activeIconName = "chat-processing";
              break;
          
              
          }
          return (
            <Icon
              name={focused ? activeIconName : iconName}
              size={size}
              color={color}
            />
          );
        },
        tabBarLabelStyle: styles.tabBarLabelStyle,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={user?.type === "Customer" ? HomeScreen : ProviderHomeScreen} 
      />
      
      {user?.type === "Customer" && (
        <Tab.Screen name="MyJobs" component={MyJobs} />
      )}
      
      <Tab.Screen name="Bookings" component={BookingScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "white",
    height: Platform.OS === "android" ? width * 0.15 : 80,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
  tabBarLabelStyle: {
    fontSize: Platform.OS === "android" ? width * 0.03 : width * 0.035,
    fontWeight: "600",
    paddingBottom: Platform.OS === "android" ? 5 : 0
  },
  profileIcon: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.04,
    marginBottom: Platform.OS === "ios" ? 0 : 4,
  },
  activeProfileIcon: {
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ButtonColor,
  },
});