import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import LoginPage from './LoginPage';
import TopTabNavigation from './TopTabNavigation';
import Cart from './Cart';
import ToDo from './ToDo';
import Pagination from './Pagination';


export type RootStackParamList = {
    // Home: undefined;
    // Profile: { userId: string };
    // Feed: { sort: 'latest' | 'top' } | undefined;
    LoginPage: undefined
    Home: any | undefined
    Cart: undefined
    ToDo: undefined
    Pagination: undefined
    TopTabNavigation: undefined



};

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = () => {
    return (
        <NavigationContainer >

            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='TopTabNavigation'>
                <Stack.Screen name="LoginPage" component={TopTabNavigation} />
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="ToDo" component={ToDo} />
                <Stack.Screen name="Pagination" component={Pagination} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation

const styles = StyleSheet.create({})

// import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native';
// import Home from './Home'
// import data from './jsonData.json'
// import Screen1 from './Screen1'

// const StackNavigation = () => {
//     const navigation = useNavigation();
//     const [isTab, setIsTab] = useState()
//     const [apiData, setApiData] = useState([])
//     const tabHandler = (value) => {
//         setIsTab(value)
//     }

//     useEffect(() => {
//         setApiData(data)
//     }, [])

//     // console.log("json Data", JSON.stringify(data));
//     // console.log("json apiData", JSON.stringify(apiData));

//     const renderItem = ({ item }) => {
//         return (

//             <View style={{ borderWidth: 1, borderColor: 'purple' }}>
//                 {item.pair == "You & Sohini" &&
//                     <View>
//                         <Text style={{ color: 'black' }}>{item.pair}</Text>
//                         <FlatList data={item?.Matches}
//                             renderItem={({ item }) => {
//                                 return (
//                                     <>
//                                         <Text style={{ color: 'red' }}>{item?.PairMatch == "Nakul & Sohini" ? item?.PairMatch : null}</Text>
//                                     </>
//                                 )
//                             }}
//                         />

//                     </View>
//                 }
//             </View>
//         )
//     }
//     const renderItem1 = ({ item }) => {
//         return (
//             <View style={{ borderWidth: 1, borderColor: 'blue', borderRadius: 20, }}>
//                 {item.pair == "You & Rohini" &&
//                     <View>
//                         <Text style={{ color: 'black' }}>{item.pair}</Text>
//                         {/* <Text style={{color:'blue'}}>{item?.Matches?.PairMatch}</Text>  */}
//                         <FlatList data={item?.Matches}
//                             renderItem={({ item }) => {
//                                 return (
//                                     <>
//                                         <Text style={{ color: 'red' }}>{item?.PairMatch == "Nakul & Rohini" ? item?.PairMatch : null}</Text>
//                                     </>
//                                 )
//                             }}
//                         />
//                     </View>
//                 }
//             </View>
//         )
//     }
//     const renderItem2 = ({ item }) => {
//         return (
//             <View style={{ borderWidth: 1, borderColor: 'red' }}>
//                 {item.pair == "You & Namrata" &&
//                     <View>
//                         <Text style={{ color: 'black' }}>{item.pair}</Text>
//                         {/* <Text style={{color:'blue'}}>{item?.Matches?.PairMatch}</Text>  */}
//                         <FlatList data={item?.Matches}
//                             renderItem={({ item }) => {
//                                 return (
//                                     <>
//                                         <Text style={{ color: 'red' }}>{item?.PairMatch == "Nakul & Namrata" ? item?.PairMatch : null}</Text>
//                                     </>
//                                 )
//                             }}
//                         />
//                     </View>}
//             </View>
//         )
//     }
//     return (
//         <View>
//             <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', shadowColor: 'red', shadowRadius: 1, shadowOffset: 3 }}>
//                 <TouchableOpacity onPress={() => tabHandler(1)} style={{ borderBottomWidth: isTab == 1 ? 2 : 0, borderBottomColor: isTab == 1 ? 'blue' : null, width: '25%', padding: 10, alignItems: 'center' }}>
//                     <Text>Home</Text>

//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => tabHandler(2)} style={{ borderBottomWidth: isTab == 2 ? 2 : 0, borderBottomColor: isTab == 2 ? 'blue' : null, width: '25%', padding: 10, alignItems: 'center' }}>
//                     <Text>Cart</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => tabHandler(3)} style={{ borderBottomWidth: isTab == 3 ? 2 : 0, borderBottomColor: isTab == 3 ? 'blue' : null, width: '25%', padding: 10, alignItems: 'center' }}>
//                     <Text>Home2</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => tabHandler(4)} style={{ borderBottomWidth: isTab == 4 ? 2 : 0, borderBottomColor: isTab == 4 ? 'blue' : null, width: '25%', padding: 10, alignItems: 'center' }}>
//                     <Text>Cart2</Text>
//                 </TouchableOpacity>
//             </View>
//             {
//                 isTab == 1 ? (
//                     <View>
//                         <Text>Home</Text>
//                         <FlatList
//                             data={apiData}
//                             renderItem={renderItem}
//                         />
//                     </View>
//                 ) : isTab == 2 ? (
//                     <View>
//                         <Text>Cart</Text>
//                         <FlatList
//                             data={apiData}
//                             renderItem={renderItem1}
//                         />
//                     </View>
//                 ) : isTab == 3 ? (
//                     <View>
//                         <Text>Home2</Text>
//                         <FlatList
//                             data={apiData}
//                             renderItem={renderItem2}
//                         />
//                     </View>
//                 ) : (
//                     <View>
//                         <Text>Cart2</Text>
//                        <TouchableOpacity onPress={()=>navigation.navigate('Screen1')}>
//                         <Text>GO TO TODO List</Text>
//                        </TouchableOpacity>
//                     </View>
//                 )
//             }
//             {/* <Text>StackNavigation</Text> */}
//         </View >
//     )
// }

// export default StackNavigation

// const styles = StyleSheet.create({})


