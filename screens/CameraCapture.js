import React, {useState, useEffect, useRef} from 'react';
import { View, ActivityIndicator, SafeAreaView, StyleSheet, Button } from 'react-native';
import { Text } from '@rneui/themed';
import { Camera, useCameraDevices, CameraDevice } from 'react-native-vision-camera';
import { Linking } from 'react-native';

// const photo = await Camera.current.takePhoto({
//     flash: 'on'
//   })

export default function CameraCapture() {
    const camera = useRef(CameraDevice);
    const devices = useCameraDevices();
    const cameraDevice = devices.back;

    const [showCamera, setShowCamera] = useState(false);
    const [imageSource, setImageSource] = useState(false);

    const [cameraPermission, setCameraPermission] = useState();
  
    useEffect(() => {
        async function getPermission() {
            const cameraPermission = await Camera.requestCameraPermission();
            console.log(`Camera permission status: ${cameraPermission}`);
            setCameraPermission(cameraPermission);
            if (cameraPermission === 'denied') await Linking.openSettings();
        }
        getPermission();
    }, []);

    const capturePhoto = async () => {
        console.log('function called' + camera.current);
        if (camera.current !== null) {
            const photo = await camera.current.takePhoto({});
            console.log('AK ' + photo.path);
            setImageSource(photo.path);
            setShowCamera(false);
        }
    }
  
    const renderDetectorContent = () => {
      if (cameraDevice && cameraPermission === 'authorized') {
        return (
          <Camera
            style={StyleSheet.absoluteFill}
            device={cameraDevice}
            isActive={true}
            photo={true}
          />
        );
      }
      return null;
    };
  
    return (
      <View >
        <SafeAreaView >
          <View >
            <Text >React Native Image Detector</Text>
          </View>
        </SafeAreaView>
  
        <View >
          <Text >
            Welcome To React-Native-Vision-Camera Tutorial
          </Text>
        </View>
  
        {renderDetectorContent()}
        <Button onPress={()=>capturePhoto() } title='test'></Button>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
        // must use "absoluteFillObject" in typescript
        ...StyleSheet.absoluteFillObject,
    }
})