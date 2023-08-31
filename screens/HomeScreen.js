import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar,TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import CameraCapture  from '../screens/CameraCapture';

const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      // <View style={styles.container}>
      //   <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
      //   <Text style={{color: colors.text}}>Home Screen</Text>
      // <Button
      //   title="Go to details screen"
      //   onPress={() => navigation.navigate("DetailsScreen")}
      // />
  <CameraCapture />
      // </View>
    );
};



export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
