import { Alert, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { apiCall, customerSelectors, otpApiCall, setCartData } from './redux/reducer';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';


const Cart = ({ navigation }) => {
    const dispatch = useDispatch()
    const { cartData } = customerSelectors()
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
        console.log('cardData', cartData)
        setData(cartData)
    }, [filterData, cartData])


    console.log("data", data);

    const qtyData = data.map((item) => item.qty)
    const sum = qtyData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const totalPrice = data.map((item) => item.qty * item.price)
    const SubTotalprice = totalPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


    const increaseItem = (id) => {
        const newData = cartData.filter((item) => item.id == id ? (item.qty < 5 ? item.qty++ : item.qty) : item)
        setData(newData)
    }

    const decreaseItem = (id) => {
        const newData = cartData.filter((item) => item.id == id ? (item.qty > 1 ? item.qty-- : item.qty) : item)
        setData(newData)
    }

    const removeItem = (id) => {
        const removeData = cartData.filter(item => item.id !== id)
        setFilterData(removeData)
        dispatch(setCartData(removeData))
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <Image style={{
                    width: 200,
                    height: 150,
                    resizeMode: 'contain',
                }}
                    source={{ uri: item?.image }} />
                <Text style={{ color: 'purple' }}>{item.title}</Text>
                <Text>Price {item.price}</Text>
                <Button title='Remove item' onPress={() => removeItem(item.id)} />
                <Text>Quantity</Text>
                <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 20 }}>
                    <TouchableOpacity onPress={() => { decreaseItem(item.id) }}><Text style={{ fontSize: 40, paddingHorizontal: 20 }}>-</Text></TouchableOpacity>
                    <Text style={{ fontSize: 40, paddingHorizontal: 20 }}>{item.qty}</Text>
                    <TouchableOpacity onPress={() => { increaseItem(item.id) }}><Text style={{ fontSize: 40, paddingHorizontal: 20 }}>+</Text></TouchableOpacity>
                </View>
                <Text>Amount {item.qty * item.price}</Text>


            </View>
        )
    }

    return (
        <View>
            <Text>Total Cart Items: {sum}</Text>
            <Text >Sub Total amount {SubTotalprice}</Text>
            <FlatList data={data}
                renderItem={renderItem}
                keyExtractor={(item, i) => i}

            />

        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 12,
        paddingVertical: 20,
    }
})
