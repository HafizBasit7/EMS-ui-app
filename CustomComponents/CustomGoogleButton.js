import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { GlobalStyles } from '../Styles/GlobalStyles';
const { height } = Dimensions.get('window');

const GoogleButton = ({ title, onPress, imageSource, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {imageSource && <Image source={imageSource} style={styles.image} />}
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: height * 0.07,
    borderColor: GlobalStyles.colors.borderColor,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: GlobalStyles.colors.ButtonColor,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginLeft: 8,
  },
  image: {
    marginRight: 8, // Adjust the spacing as needed
  },
});

export default GoogleButton;
