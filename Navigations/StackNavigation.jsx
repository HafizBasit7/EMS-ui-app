import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

// Auth & Welcome
import LoginScreen from "../Screens/user/AuthenticationScreens/LoginScreen";
import SignUpScreen from "../Screens/user/AuthenticationScreens/SignUpScreen.jsx";
import ForgetPasswordScreen from "../Screens/user/AuthenticationScreens/ForgetPasswordScreen.jsx";
import VerifyCodeScreen from "../Screens/user/AuthenticationScreens/VerifyCodeScreen";
import ResetPasswordScreen from "../Screens/user/AuthenticationScreens/ResetPasswordScreen";
import WelcomeScreenOne from "../Screens/WelcomeScreens/WelcomeScreen1";
import WelcomeScreenTwo from "../Screens/WelcomeScreens/WelcomeScreen2";
import WelcomeScreenThree from "../Screens/WelcomeScreens/WelcomeScreen3";

// Profile Setup
import BioScreen from "../Screens/user/AuthenticationScreens/setupProfile/BioScreen";
import SelectServicesScreen from "../Screens/user/AuthenticationScreens/setupProfile/SelectServices";
// import UploadPhotoScreen from "../Screens/user/AuthenticationScreens/setupProfile/uploadProfilePhoto";
// import WebsiteUrlScreen from "../Screens/user/AuthenticationScreens/setupProfile/WebsiteUrl";

// Main Navigation & Other Screens
import TabNavigation from "./Bottom_TabNavigations.jsx";
// import ProviderProfile from "../Screens/ProviderScreens/ProviderProfile";
import MyJobs from "../Screens/provider/MyJobs";
// import ReviewScreen from "../Screens/provider/Reviews";
import AddNewJob from "../Screens/AddNewJobScreen/AddnewJob";
// import GiveReviewScreen from "../Screens/User_DashBoardScreens/GiveReviewScreen";
// import MessageScreen from "../Screens/MessageScreens/MessageScreen";
// import ChangePassword from "../Screens/provider/ChangePassword";
// import EditProfile from "../Screens/provider/EditProfile";
// import NotificationSetting from "../Screens/provider/NotificationSetting";
// import OfferingJob from "../Screens/provider/OfferingJob";
// import TermsScreen from "../Screens/provider/TermsScreen";
// import PaymentScreen from "../Screens/PaymentScreens/PaymentScreen";
// import PaymentSuccessScreen from "../Screens/PaymentScreens/PaymentSucessScreen";
// import CreditCardDetailScreen from "../Screens/PaymentScreens/CreditCardDetailScreen";
// import AddServiceScreen from "../Screens/ProviderScreens/AddServiceScreen";
// import EditServiceScreen from "../Screens/ProviderScreens/EditServiceScreen";
import OfferingJobClicked from "../Screens/provider/ServiceProviderScreens/OfferJobScreen";
import JobDetailsScreen from "../Screens/provider/ServiceProviderScreens/JobDetailsScreen";
// import NotificationScreen from "../Screens/User_DashBoardScreens/NotificationScreen";
import JobDetails from "../Screens/provider/JobDetails";
// import EmployerProfile from "../Screens/ProviderScreens/EmployerProfile";
// import SendOffer from "../Screens/ProviderScreens/SendOfffer";
import ProviderProposal from "../Screens/provider/ProviderProposal";
// import BookingScreen from "../Screens/User_DashBoardScreens/BookingScreen";

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="WelcomeScreen1" screenOptions={{ headerShown: false }}>
          {/* Welcome & Auth */}
          <Stack.Screen name="WelcomeScreen1" component={WelcomeScreenOne} />
          <Stack.Screen name="WelcomeScreen2" component={WelcomeScreenTwo} />
          <Stack.Screen name="WelcomeScreen3" component={WelcomeScreenThree} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
          <Stack.Screen name="VerificationCode" component={VerifyCodeScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

          {/* Profile Setup */}
          <Stack.Screen name="BioScreen" component={BioScreen} />
          <Stack.Screen name="SelectServices" component={SelectServicesScreen} />
          {/* <Stack.Screen name="WebsiteUrl" component={WebsiteUrlScreen} /> */}
          {/* <Stack.Screen name="UploadPhotoScreen" component={UploadPhotoScreen} /> */}

          {/* Main App */}
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          {/* <Stack.Screen name="ProviderProfile" component={ProviderProfile} /> */}
          <Stack.Screen name="MyJobs" component={MyJobs} />
          {/* <Stack.Screen name="ReviewScreen" component={ReviewScreen} /> */}
          <Stack.Screen name="AddNewJob" component={AddNewJob} />
          {/* <Stack.Screen name="GiveReview" component={GiveReviewScreen} /> */}
          {/* <Stack.Screen name="MessageScreen" component={MessageScreen} /> */} 
          {/* <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="NotificationSetting" component={NotificationSetting} />
          <Stack.Screen name="OfferingJob" component={OfferingJob} />
          <Stack.Screen name="TermsScreen" component={TermsScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} /> */}
          {/* <Stack.Screen name="PaymentSuccessScreen" component={PaymentSuccessScreen} />
          <Stack.Screen name="CreditCardDetailScreen" component={CreditCardDetailScreen} /> */}
          {/* <Stack.Screen name="AddService" component={AddServiceScreen} />
          <Stack.Screen name="EditService" component={EditServiceScreen} /> */}
          {/* <Stack.Screen name="OfferSelectedJob" component={OfferingJobClicked} /> */}
          <Stack.Screen name="JobDetailsScreen" component={JobDetailsScreen} />
          {/* <Stack.Screen name="Notification" component={NotificationScreen} /> */}
          <Stack.Screen name="JobDetail" component={JobDetails} />
          {/* <Stack.Screen name="EmployerProfile" component={EmployerProfile} /> */}
          {/* <Stack.Screen name="SendOFfer" component={SendOffer} /> */}
          <Stack.Screen name="ProviderProposal" component={ProviderProposal} />
          {/* <Stack.Screen name="Booking" component={BookingScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
