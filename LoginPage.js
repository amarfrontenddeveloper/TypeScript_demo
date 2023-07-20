import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { customerSelectors, loginApi } from './redux/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';

const LoginPage = ({ navigation }) => {
    const dispatch = useDispatch()
    const { loginResponse } = customerSelectors()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')


    console.log("loginResponse", loginResponse)

    useEffect(() => {
        setData();
        // getData()
    }, [loginResponse])

    const setData = async () => {
        try {
            await AsyncStorage.setItem('tokenData', JSON.stringify(loginResponse))
        }
        catch (err) {
            console.log('err', err)
        }
    }

    // const getData = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('tokenData');
    //         const data = JSON.parse(jsonValue);
    //         console.log('datas', data?.token);
    //         setToken(data?.token)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    const set= async()=>{
        try {
            await AsyncStorage.setItem("key", JSON.stringify(data))
        }
        catch(err){
            console.log("errr",err)
        }
    }


    const loginData = {
        username: userName,
        password: password,
        // username: 'kminchelle',
        // password: '0lelplR',
    }

    const loginFunction = () => {
        dispatch(loginApi(loginData))

    }

    console.log(userName, password)

    return (
        <View style={styles.container}>
            <Text>Login</Text>

            <TouchableOpacity style={{ padding: 20, backgroundColor: 'red' }} onPress={() => navigation.navigate('Home')}>
                <Text>HOME</Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Enter your id'
                    onChangeText={(text) => setUserName(text)}
                    value={userName}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Enter your id'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
            </View>
            <TouchableOpacity onPress={() => loginFunction()}>
                <Text>
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        width: '70%',
        borderWidth: 1,
        paddingVertical: 1,
        borderColor: 'black',
        borderRadius: 25,
        marginTop: 5

    }
})