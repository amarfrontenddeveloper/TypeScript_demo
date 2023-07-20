import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Cart from './Cart';
import Home from './Home';
import ToDo from './ToDo';





const Tab = createMaterialTopTabNavigator();

function TopTabNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="ToDo" component={ToDo} />
        </Tab.Navigator>
    );
}


export default TopTabNavigation

const styles = StyleSheet.create({})