import { Alert, Button, FlatList, Image, StyleSheet, SafeAreaView, ActivityIndicator, Text, TextInput, TouchableOpacity, View, RefreshControl, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { apiCall, customerSelectors, otpApiCall, setCartData } from './redux/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loadingdata } from './App';


const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const { apiResponse, cartData } = customerSelectors()

    const [cart, setCart] = useState([]);
    const [data, setData] = useState([]);
    const [loding, setLoding] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    // const [masterDataSource, setMasterDataSource] = useState([]);
    console.log("cart data!!", cart.length)


    useEffect(() => {
        if(!apiResponse){
            setLoding(true)
        }
        else if (apiResponse)
        {(apiResponse)
            setLoding(false)
      
        setData(apiResponse)
        dispatch(setCartData(cart))
        getData()
        setFilteredDataSource(apiResponse);
        // setMasterDataSource(responseJson);
    }
    }, [cart, apiResponse])

    //console.log("data", data)


    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = data.filter(
                function (item) {
                    const itemData = item.title
                        ? item.title.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(data);
            setSearch(text);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        // Perform the necessary data fetching or updates here
        dispatch(apiCall())
        // Once the data fetching is complete, set refreshing to false
        setRefreshing(false);
    };

    const response = () => {
        dispatch(apiCall(data))
        dispatch(apiCall())
    }


    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('tokenData');
            const data = JSON.parse(jsonValue);
            // console.log('Token at Home', data?.token);
        } catch (error) {
            console.log(error);
        }
    };


    const addItem = (data) => {
        if (cartData.length == 0) {
            setCart([...cartData, { ...data, qty: 1 }])
            Alert.alert('Sucessfuly added')
            dispatch(setCartData(cartData))
        } else if (cartData.some((item) => item.id === data.id)) {
            Alert.alert('already added this item!')
        } else {
            setCart([...cartData, { ...data, qty: 1 }])
            Alert.alert('Sucessfuly added')
            dispatch(setCartData(cartData))
        }
    }

    const renderItem = ({ item }) => {

        return (
            <View style={styles.container}>
                <SafeAreaView >
                    {/* <ScrollView nestedScrollEnabled={true}
                        contentContainerStyle={styles.scrollView}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }>

                    </ScrollView> */}
                </SafeAreaView>
                <Image style={{
                    width: 200,
                    height: 150,
                    resizeMode: 'contain',
                }}
                    source={{ uri: item.image }} />
                <Text style={{ fontSize: 15, color: 'purple' }}>{item.title}</Text>
                <Text style={{ fontSize: 18, color: 'blue' }}>Category: {item.category}</Text>
                <Text style={{ fontSize: 20, color: 'black' }}>Price {item.price}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={styles.addItemBtn(item.id == item.id)} onPress={() => addItem(item)}>
                        <Text style={{ color: 'white' }}>Add Item</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rating} onPress={() => addItem(item)}>
                        <Text style={{ color: 'black' }}>Rating {item.rating.rate}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            
            {/* <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['red', 'green', 'blue']} />
            }>
            </ScrollView> */}
            {/* <Text onPress={onRefresh}>home page</Text> */}
            
            <View>
                <TextInput
                    placeholder='Search here..'
                    value={search}
                    onChangeText={(text) => {
                        searchFilterFunction(text)
                    }}

                />
            </View>
            <ActivityIndicator animating={loding} size="large" color="#00ff00" />
            <Button onPress={() => navigation.navigate('Pagination')} title='Go to Pagination page' />
           <Text>Welcome in home page</Text>
            <Button onPress={() => response()} title='click' />
            <Text>Total Cart Item: {cartData ? cartData.length : 0}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}><Text>Cart</Text></TouchableOpacity>
            <FlatList data={filteredDataSource}
                renderItem={renderItem}

            />


        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center',
        marginHorizontal: 12,
        paddingVertical: 15,
        borderWidth: 0.4,
        borderRadius: 20,
        //marginTop: 8,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addItemBtn: value => ({
        backgroundColor: value ? 'blue' : 'green',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
    }
    ),
    rating: {
        backgroundColor: 'pink',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
    }
})

// import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import React, { useState } from 'react'
// import axios from 'axios'

// const data = {
//     Mobile_No: '+917676767676',
//     pageNumber: 0,
//     pageSize: 50,
// }

// const Home = () => {
//     const [search, setSearch] = useState('');
//     const [filteredDataSource, setFilteredDataSource] = useState([]);
//     const [masterDataSource, setMasterDataSource] = useState([]);

//     const featchData = () => {
//         axios.get(`http://103.117.66.70:5013/api/Channel/GetChannelMasterList?Mobile_No=${data.Mobile_No}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`)
//             .then(res => console.log("amar!!", res.data))
//             .catch(err => console.log("errr", err))

//         fetch(`http://103.117.66.70:5013/api/Channel/GetChannelMasterList?Mobile_No=${data.Mobile_No}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`)
//             .then(res => res.json())
//             .then(res => {
//                 console.log("fetch get method with parameters", res)
//                 setFilteredDataSource(res?.items);
//                 setMasterDataSource(res?.items);
//             })
//             .catch(err => console.log("err!!!", err))

//         fetch('http://103.117.66.70:5013/api/Login/SendOTP', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 mobile_No: "+919898989898"
//             })
//         })
//             .then(res => res.json())
//             .then(res => console.log("fetch post res", res))
//             .catch(err => console.log("post err", err))

//         axios.post('http://103.117.66.70:5013/api/Login/SendOTP', {
//             mobile_No: "+919898989898"
//         })
//             .then(res => console.log("axios post res", res?.data))
//             .catch(err => console.log("axios post err", err))
//     }

//     const searchFilterFunction = (text) => {
//         if (text) {
//             const newData = masterDataSource.filter(
//                 function (item) {
//                     const itemData = item.name
//                         ? item.name.toUpperCase()
//                         : ''.toUpperCase();
//                     const textData = text.toUpperCase();
//                     return itemData.indexOf(textData) > -1;
//                 });
//             setFilteredDataSource(newData);
//             setSearch(text);
//         } else {
//             setFilteredDataSource(masterDataSource);
//             setSearch(text);
//         }
//     };


//     const renderItem = ({ item }) => {
//         return (
//             <View>
//                 <Text style={{ fontSize: 30, color: 'purple' }}>{item.name}</Text>
//             </View>
//         )
//     }

//     return (
//         <View>
//             <Text>Home</Text>
//             <TouchableOpacity onPress={() => featchData()}>
//                 <Text>
//                     Click here!
//                 </Text>
//             </TouchableOpacity>
//             <TextInput
//                 style={styles.textInputStyle}
//                 onChangeText={(text) => searchFilterFunction(text)}
//                 value={search}
//                 underlineColorAndroid="transparent"
//                 placeholder="Search Here"
//             />
//             <FlatList data={filteredDataSource}
//                 renderItem={renderItem} />
//         </View>
//     )
// }

// export default Home

// const styles = StyleSheet.create({
//     textInputStyle: {
//         height: 40,
//         borderWidth: 1,
//         paddingLeft: 20,
//         margin: 5,
//         borderColor: '#009688',
//         backgroundColor: '#FFFFFF',
//     },
// })