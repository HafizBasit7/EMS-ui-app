// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './navigation/AppNavigator';

// export default function App() {
//   return (
//     <NavigationContainer>
//       <AppNavigator />
//     </NavigationContainer>
//   );
// }


import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigation from "./Navigations/StackNavigation";
import useLoadFonts from "./Hooks/useLoadFonts_temp.js";

export default function App() {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <StackNavigation />
    </>
  );
}
