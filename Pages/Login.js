import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Video
        source={require('./assets/Anim.mp4')} // Replace with your video path
        style={styles.video}
        muted={true}
        repeat={false}
        resizeMode="cover"
        rate={1.0}
        ignoreSilentSwitch="obey"
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});