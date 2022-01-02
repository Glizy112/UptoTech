import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'

const Card = () => {

    const {width, height}= Dimensions.get('window');
    return (
        <View style={styles.container}>
            <View style={{width: width/1.1, height: height/2, borderRadius: 15, borderWidth: 1, marginTop: 240}}>

            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
    },
})
