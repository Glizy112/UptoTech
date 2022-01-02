import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Dimensions} from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
//import {Feather} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({route, id, data}){
    //const { postId, data }= route.params;
    const[post, setPost]= useState([]);
    const[loading, setLoading]= useState(false);
    //const[layout, setLayout]= useState([]);
    //const[tabPos, setTabPos]= useState(32);
    useEffect(()=> {
        getBookmark();
    },[]);

    const categs=[
        {
            id: '1',
            value: 'Bookmarks',
        },
        {
            id: '2',
            value: 'Likes',
        },
        {
            id: '3',
            value: 'Shares',
        },
    ]

    const {width, height}= Dimensions.get('window');
    //const pos= new Animated.Value(24);

    /*const animation=index=> {
        return {
            position: [
                { relative },
                {
                    left: offsetVal.interpolate({
                    inputRange: [
                        (index-1) * 
                    ],
                    outputRange: []
                })
                }
            ]
        }
    }*/
// const rightToLeft=()=> {
//     Animated.timing(
//         pos,
//         {
//             toValue: layout.width - 84,
//             duration: 1000,
//             useNativeDriver: false,
//         }
//     ).start();
// }

// const leftToRight=()=> {
//     Animated.timing(
//         pos,
//         {
//             toValue: layout.width + 60,
//             duration: 1000,
//             useNativeDriver: false,
//         }
//     ).start();
//     console.log(pos);
// }

// const animate=(index)=> {
//     Animated.spring(pos, {
//         toValue: layout.filter(item=> item.index==index).width + 32,
//         velocity: 10,
//         useNativeDriver: true,
//     }).start();
//     //setTabPos(pos);
//     // if(tabPos >= 24){
//     //     Animated.spring(pos, {
//     //         toValue: layout.width + 32,
//     //         velocity: 10,
//     //         useNativeDriver: true, 
//     //     }).start();
//     // }
//     console.log(tabPos);
// }
    
    // const getLayoutView= (event,index) => {
    //     let {width, height, x, y}= event.nativeEvent.layout;
    //     setLayout({index, width, height, x, y});
    //     //const layoutArr= layout.entries();

    //     //console.log(layout);
    // }

    //const {id, data}= props;
    // useEffect(() => {
    //     getData();
    // }, []);

    // const getData = async()=> {
    //     await AsyncStorage.getItem('fav').then(token=> {
    //         const res=JSON.parse(token);
    //         let data= res.map(item=> (item))
    //         console.log(data)
    //     })
    // }

    //console.log(postId);
    //console.log(id);
    //console.log(data);

    const getBookmark=async()=> {
        await AsyncStorage.getItem('fav').then(async(token)=> {
            const res= JSON.parse(token);
            setLoading(true);
            
            if(res) {
                setPost(res);
                //console.log('data', post);
                //const result= res.map(postId=> {
                    //return 'include[]'= + postId;
                //});
                //let qs= result.join('&');
                //const response= await fetch(`https: `)
            }
            //console.log('data', post);
        })        
    }
    console.log('data', post);

    const onRefresh=()=> {
        getBookmark();        
    }
    
    const translateX= useSharedValue(0);
    const translateY= useSharedValue(0);

    const panEvent= useAnimatedGestureHandler({
        onStart: (event,context)=> {
            context.translateX= translateX.value;
            context.translateY= translateY.value;
        },
        onActive: (event,context)=> {
            translateX.value= event.translationX + context.translateX;
            translateY.value= event.translationY + context.translateY;
            //console.log(event.translationX);
        },
        onEnd: ()=> {
            const distance= Math.sqrt(translateX.value ** 2 +translateY.value ** 2);
            if(distance< 240/2 - 84/2){
                translateX.value= withTiming(0);
                translateY.value= withTiming(0);
            }
        },
    })

    const reStyle= useAnimatedStyle(()=> {
        return {
            transform: [
                {
                    translateX: translateX.value
                },
                {
                    translateY: translateY.value
                },
            ]
        }
    })

    return(
        <View style={styles.container}>
            <View style={styles.header}> 
                <Image
                    source={require('./assets/man(1).png')}
                    fadeDuration={0}
                    style={{ width: 60, height: 60}}
                />
                <Text style={{fontSize: 20, fontWeight: 'bold', includeFontPadding: true}}> User 112 </Text>
            </View>
            {/* <View style={{flexDirection: 'row'}}> */}
            <View style={{flexDirection: 'row', justifyContent: 'center',}}>
            {
                categs.map(item=> {
                    return <View style={{marginTop: 24, alignItems: 'center'}}>
                            <Text style={{fontSize: 18, fontWeight: '800'}}> {item.value} </Text>
                        </View>
                })
            }
            </View>
            {/* <TouchableOpacity key={2} style={styles.content} onPress={animate} onLayout={getLayoutView}>
                <Feather name="bookmark" size={26} color="black" />
                <Text style={{fontSize: 15, fontWeight: '500',}}> Bookmarks </Text>
            </TouchableOpacity>
            <TouchableOpacity key={3} style={styles.content} onPress={animate} onLayout={getLayoutView}>
                <Feather name="bookmark" size={26} color="black" />
                <Text style={{fontSize: 15, fontWeight: '500',}}> Bookmarks </Text>
            </TouchableOpacity> */}
            {/* </View> */}

            {/* <Animated.View style={{borderWidth: 2, backgroundColor: 'gray', width: 32, borderRadius: 10, marginTop: 2, position:'relative', left: 30, transform: [{translateX: pos}]}}/> */}
            
            <FlatList
                data={post}
                keyExtractor={item=> item}
                contentContainerStyle={{paddingVertical: 12, borderWidth: 1, marginVertical: 12, justifyContent: 'center'}}
                //horizontal
                //numColumns={2}
                //showsVerticalScrollIndicator={false}
                //numColumns={2}
                //onRefresh={onRefresh}
                //refreshing={loading}
                renderItem={({item})=> {
                    return <View key={item} style={{paddingHorizontal: 4, paddingVertical: 12,}}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={{uri: item.pic}} style={{width: 120, height: 120, marginLeft: 8, borderRadius: 15}}/>
                                <Text style={{color: 'black', fontSize: 18, paddingVertical: 32, paddingHorizontal: 12}}>{item.index}</Text>
                            </View>
                        </View>
                }}
            />
            {/* <View style={{width: 240, height: 240, borderRadius: 120, alignSelf: 'center', marginTop: 48, borderColor: 'rgba(0,0,0,0.4)', borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
            <PanGestureHandler onGestureEvent={panEvent}>
                <Animated.View style={[{width: 84, height: 84, alignSelf: 'center', backgroundColor: 'rgba(255,255,255,1)', borderRadius: 15, elevation: 12}, reStyle]}/>
            </PanGestureHandler>
            </View> */}
        </View>
    );
}

const styles= StyleSheet.create({

    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    header: {
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 64,
        borderWidth: 1,
        
    },
    content: {
        flexDirection: 'row',
        marginLeft: 24,
        marginRight: 8,
        marginTop: 48, 
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black'
    },
});