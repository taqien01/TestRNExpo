import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, Button, Pressable, Alert } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { apiUrl } from './app.json';
import axios from 'axios';
import base64 from 'react-native-base64';

const LoginScreen = ({navigation}) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [disabledBtn, setdisabledBtn] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    username === "" || password === "" ? setdisabledBtn(true) : setdisabledBtn(false)

  }, [username, password])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const login = () => {
    setFetching(true);
    setdisabledBtn(true);

    axios({
      url: apiUrl + '/login',
      method: 'post',
      data: {
        "user.id": username,
        "user.pass": base64.encode(password)
      }
    }).then(function (response) {
      setFetching(false);
      setdisabledBtn(false);

      if (response.data["response.code"] === "00") {
        // Alert.alert(response.data["response.desc"])
        navigation.navigate('Home', {name: username})
      } else {
        Alert.alert(response.data["response.desc"])
      }
    }).catch(function (error) {
      setFetching(false);
      setdisabledBtn(false);
      Alert.alert(error)

      console.log(error);
    })
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 16 }}>Welcome, please Login !!!</Text>
      <Text style={styles.text}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        textContentType={'password'}
      />
      <Pressable style={[styles.button, { backgroundColor: disabledBtn ? 'grey' : 'blue' }]}
        disabled={disabledBtn}
        onPress={login}
        >
        {fetching ? <ActivityIndicator /> : <Text style={{ color: 'white' }}>Login</Text>}
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 6,
    marginBottom: 8,
    borderColor: '#123',
    borderWidth: 1,
    padding: 10,
  },
  text: {
    marginTop: 8,
    marginBottom: 8
  },
  container: {
    flex: 1,
    margin: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 12,
    height: 45,
    width: "100%",
    marginTop: 8,
    textAlign: "center",
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default LoginScreen;