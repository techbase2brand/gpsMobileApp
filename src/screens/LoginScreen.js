import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  //   CheckBox,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {IMAGE_BACKGROUND_IMAGE} from '../assests/images';
import { orangeColor } from '../constants/Color';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  return (
    <ImageBackground
      style={styles.container}
      source={IMAGE_BACKGROUND_IMAGE}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome back to the app</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="hello@example.com"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordRow}>
          <Text style={styles.label}>Password</Text>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forget Password?</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="**********"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('mainscreens')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or sign in with</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupContainer}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={styles.signupLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#444',
    marginBottom: 30,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    height: 45,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgot: {
    fontSize: 13,
    color: '#888',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: orangeColor,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 40,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#888',
  },
  googleButton: {
    borderWidth: 1,
    borderColor: orangeColor,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  googleButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  signupContainer: {
    alignItems: 'center',
    marginTop: 200,
  },
  signupText: {
    color: '#333',
  },
  signupLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
