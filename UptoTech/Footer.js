import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

const Footer = () => {
    return (
        <View>
            <Text style={{fontSize: 18, fontWeight: '700', marginTop: 12, marginBottom: 12, color: 'rgba(210,210,210,1)'}}> That's all for today </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
})

export default Footer
