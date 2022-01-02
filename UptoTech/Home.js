import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, FlatList, Dimensions, ImageBackground, ActivityIndicator, TouchableHighlight, TouchableHighlightComponent, ScrollView, Animated, Share} from 'react-native';
import {AntDesign, Ionicons, EvilIcons, MaterialIcons} from '@expo/vector-icons';
//import * as rssParser from 'react-native-rss-parser';
import axios from 'axios';
//import * as Linking from 'expo-linking';
import Modal from 'react-native-modal';
import Footer from './Footer';
// import Animated from 'react-native-reanimated';
//import {Link} from 'react-router-native';
//import {Swipeable} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './Profile';

export default function Home({navigation}) {
  const {width, height}= Dimensions.get('screen');
  const user= 'User112';

  const[data, setData]= useState([]);
  //const[filtered, setFiltered]= useState([]);
  const[visible, setVisible]= useState(false);
  const[contentVisible, setContentVisible]= useState(false);
  const[filter, setFilter]= useState({id: '001', link: 'http://techxplore.com/rss-feed/'});
  const[loading, setLoading]= useState(false);
  const[filterData, setFilterData]= useState([]);
  const[searchData, setSearchData]= useState([]);
  const[keyword, setKeyword]= useState('');
  const[clicked, setClicked]= useState('001');
  const[bookmark, setBookmark]= useState({id: '', stat: false});
  //const[markIndex, setMarkIndex]= useState([{id: '', stat: false}]);
  const[favorite, setFavorite]= useState([]);
  const[profileVisible, setProfileVisible]= useState(false);
  //const[clickedId, setClickedId]= useState('');

  const categories=[
    {
      id: '001',
      value: 'Latest',
      uri: require('./assets/trend_1.jpg'),
      link: 'http://techxplore.com/rss-feed/',
      color: '#59DB6A',
      ref: React.createRef()
    },
    {
      id: '002',
      value: 'Business',
      uri: require('./assets/business_1.jpg'),
      link: 'http://techxplore.com/rss-feed/business-tech-news/',
      color: '#3051BC',
      ref: React.createRef()
    },
    {
      id: '003',
      value: 'Energy & Green Tech',
      uri: require('./assets/green_tech.jpg'),
      link: 'http://techxplore.com/rss-feed/energy-green-tech-news/',
      color: '#3CD9A6',
      ref: React.createRef()
    },
    {
      id: '004',
      value: 'Internet',
      uri: require('./assets/internet.jpg'),
      link: 'http://techxplore.com/rss-feed/internet-news/',
      color: '#59DB6A',
      ref: React.createRef()
    },
    {
      id: '005',
      value: 'Security',
      uri: require('./assets/security.jpg'),
      link: 'http://techxplore.com/rss-feed/security-news/',
      color: '#5D49FC',
      ref: React.createRef()
    },
    {
      id: '006',
      value: 'Others',
      uri: require('./assets/others.jpg'),
      link: 'http://techxplore.com/rss-feed/other-news/',
      color: '#DE3067',
      ref: React.createRef()
    },
    {
      id: '007',
      value: 'Spotlight Stories',
      uri: require('./assets/others.jpg'),
      link: 'http://techxplore.com/rss-feed/breaking/',
      color: '#DEC02E',
      ref: React.createRef()
    },
    {
      id: '008',
      value: 'Engineering',
      uri: require('./assets/others.jpg'),
      link: 'http://techxplore.com/rss-feed/breaking/engineering-news/',
      color: '#CE4760',
      ref: React.createRef()
    },
    {
      id: '009',
      value: 'Hi-Tech & Innovation',
      uri: require('./assets/others.jpg'),
      link: 'http://techxplore.com/rss-feed/breaking/hi-tech-news/',
      color: '#07599A',
      ref: React.createRef()
    },
  ]

  //const mappedCat=categories.map(item=> (item));

  //const rssUrl= 'http://techxplore.com/rss-feed/';

  useEffect(()=> {
    showData();
    renderBookMark();
  },[filter])

  //const mapLink= setTimeout(()=> {filter.link.map(link=> (link))}, 3000);
  //const mainLink=filter.link.map(item=> (item));
  //console.log(mainLink);
  const rssUrl= filter.link;
  const api_key= 'vtuhslwxqisrsb6cvgztpxkjghdc1z4s8jlt07xm';

  const parseUrl= `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&api_key=${api_key}&order_by=pubDate&count=20`;

  const showData=()=> {
    setLoading(true);
    
  axios.get(parseUrl)
    .then(response=> response.data)
    .then(res=> {
      setData(res.items);
      setSearchData(res.items);
      setLoading(false);
    })
    .catch(err=>{console.error(err)})
  }
  
  const displayData=()=> {
    console.log('Modified Data',data);
  }

  const filteredData=()=> {
    setLoading(true);
    axios.get(parseUrl)
    .then(response=> response.data)
    .then(res=> {
      setData(res.items);
      setSearchData(res.items);
      setLoading(false);
    }).catch(err=> {console.error(err)})
  }

  const handleFilter=(index)=> {
      let filtered= categories.filter(item=> item.id===index)
      var filteredObj= filtered.map(item=> (item.link))

    setFilter({id: index, link: filteredObj.toString()})
    filteredData();
    
    if(index==='001'){
      showData();
    }
  }

  const handleVisible=()=> {
    setVisible(!visible);
  }

  const showModal=(index)=> {
    setContentVisible(!contentVisible);
    const modalData= searchData.filter((item)=> item.guid===index)
    setFilterData(modalData);
    console.log(modalData)
  }

  const handleChange=(value)=> {
     setKeyword(value);
     if(value!=="" && value.length> 2){
     const filterKeywordData= searchData.filter(item=> {
       const itemTitle= item.title.toUpperCase();
       const searchText= keyword.toUpperCase();
       return itemTitle.indexOf(searchText)> -1;
     });
     setSearchData(filterKeywordData);
     //console.log(filterKeywordData);
    }else{
      setSearchData(data);
    }
  }

  const onRefresh=()=> {
    //setLoading(true);
    showData();
  }

  const handleClick=(index)=> {
    //console.log(index);
    //setClickedId(index);
    setClicked(index);
    console.log(clicked);
  }

  const storeData = async (index,url,pic) => {
    //let fav=[];
    //fav.push(index);
    const newObj= Object.assign(bookmark, {id: index, stat: true});
    setBookmark(newObj);
    //setBookmark(...bookmark, {id: index, stat: true});
    //setMarkIndex([...markIndex,{id: index, stat: true}]);
    await AsyncStorage.getItem('fav').then(token=>{
      const res= JSON.parse(token);
      if(res!==null){
        let content= res.find(value=> value.index===index);
        if(content==null){
          res.push({index,url,pic});
          AsyncStorage.setItem('fav', JSON.stringify(res));
          alert('You Bookmarked a post');
        }
      }else{
        let fav=[];
        fav.push({index,url,pic});
        AsyncStorage.setItem('fav', JSON.stringify(fav));
      }
      
      console.log(res);
      setFavorite(res);
    })
    
  }
  console.log(favorite)

  const renderBookMark = async (index) => {
    await AsyncStorage.getItem('fav').then(token => {
        const res = JSON.parse(token);
        if (res != null) {
            let data = res.find(value => value.index === index);
            const newObj= Object.assign(bookmark, {id: index, stat: true});
            return data === null ? setBookmark(newObj) : setBookmark(newObj);
        }
    });
  };

  const removeData = async (index, url, pic) => {
    setBookmark(false);
    const fav= await AsyncStorage.getItem('fav').then(token=> {
      const res= JSON.parse(token);
      return res.filter(e=> e !== index);
    });
    await AsyncStorage.setItem('fav', JSON.stringify(fav));
    console.log(fav);
    console.log("Running");
  }

  const clearStorage=()=> {
    setBookmark(false);
    AsyncStorage.clear(()=> {
      console.log("Cleared Successfully...");
    })
  }

  const showProfile=()=> {
    setProfileVisible(true);
  }

  const sharing= async(title,link)=> {
    await Share.share({
      title: 'Send To Friend',
      url: link,
      message: link,
    });
     console.log(link);
  }

  const scrollX= React.useRef(new Animated.Value(0)).current;
  
  const Indicator=()=> {
    return <View
        style={{
          position: 'absolute', 
          height: 4,
          width: 100,
          backgroundColor: 'red',
          bottom: -10, 
        }}
    />
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#262626'}}> Welcome {user} </Text>
        <TouchableOpacity onPress={clearStorage}><Text>Remove</Text></TouchableOpacity>
        <Ionicons name="notifications" size={26} color="#282828" style={{marginLeft: 80, marginTop: 2}} onPress={()=>{navigation.navigate('card')}}/>
        <TouchableOpacity activeOpacity={0.9} onPress={()=>{navigation.navigate('profile', {postId: favorite, data: searchData}); showProfile();}}>
        <Image
          source={require('./assets/man(1).png')}
          fadeDuration={0}
          style={{ width: 40, height: 40, marginTop: -4 }}
        />
        </TouchableOpacity>
      </View>
      
      <View style={{flexDirection: 'row', marginTop: 40}}>
        <TextInput style={styles.search} placeholder="Search articles" placeholderTextColor="black" onChangeText={(val)=> handleChange(val)}/>
        <View style={{flexDirection: 'row', height: 45, width: 76, marginLeft: 272, backgroundColor: 'rgba(220,221,225,0.3)', borderTopRightRadius: 16, borderBottomRightRadius: 16,}}>
          {/* <AntDesign name="search1" size={22} color="gray" style={{marginTop: 12}}/> */}
          <View style={{width: 1, height: 26, marginLeft: 24, marginTop: 10, backgroundColor: 'gray'}}/>
          <Ionicons name="filter" size={22} color="gray" style={{marginLeft: 12, marginTop: 12,}}/>
        </View>
      </View>

      <View style={{marginTop: 24, marginLeft: 8, marginRight: 8}}>
      <FlatList
        data={categories}
        keyExtractor={item=> item.id}
        //ref={}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item})=> {
          return<View key={item.id} style={{marginLeft: 8, marginRight: 8}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity key={item.id} activeOpacity={0.4} style={[{backgroundColor: clicked===item.id ? item.color: 'transparent'}, {borderRadius: 5, alignItems: 'center'}]} onPress={()=> {handleClick(item.id); handleFilter(item.id)}}>
                <Text style={[{fontSize: 18, fontWeight: '600', textAlign: 'center', paddingVertical: 8, paddingHorizontal: 8}, {color: clicked===item.id ? 'white': 'black'}]} > {item.value} </Text>
              </TouchableOpacity>
              {/* <View style={{height: 20, width: 2, backgroundColor: 'gray', alignSelf: 'center', marginLeft: 4}}/> */}
            </View>
          </View>
        }}
      />
        <Indicator/>
      </View>
      
      <View style={{marginTop: 24, flex: 1}}>
        {
          loading ? <ActivityIndicator size='large' color='gray' style={{alignSelf: 'center'}}/> :
          <FlatList
            data={searchData}
            showsVerticalScrollIndicator={false}
            //contentContainerStyle={{marginTop: 12}}
            keyExtractor={item=> item.guid}
            ListFooterComponent={Footer}
            ListFooterComponentStyle={styles.footer}
            initialNumToRender={5}
            onRefresh={onRefresh}
            refreshing={loading}
            // onScroll={Animated.event(
            //   [{nativeEvent: {contentOffset: {x: scrollX}}}],
            //   {useNativeDriver: false}
            // )}
            renderItem={({item})=> {
            return<TouchableHighlight key={item.guid} style={{width: width/1.4, marginBottom: 12}} underlayColor="white" onPress={()=>navigation.navigate('webView', {itemUrl: item.link})}>
              <View style={{flexDirection: 'row', marginTop: 8, marginBottom: 8}}>
                <TouchableHighlight underlayColor="white" activeOpacity={0.8} onPress={()=>{showModal(item.guid)}}>
                  <Image source={{uri: item.thumbnail ? item.thumbnail : null}} style={{width: 90, height: 90, marginLeft: 8, borderRadius: 15}}/>
                </TouchableHighlight>
                {/* <View style={{flexDirection: 'column', marginLeft: 10, flexWrap: 'wrap', width: width/1.45}}> */}
                  {/* <Link to={{pathname: '/webview', state: {webLink: item.link}}}> */}
                    <Text style={{flexWrap: 'wrap', fontSize: 16, color: 'black', fontWeight: 'bold', alignSelf: 'flex-start', textAlign: 'auto', marginLeft: 12, marginTop: 12}} ellipsizeMode='clip' numberOfLines={2}>{item.title}</Text>
                  {/* </Link> */}
                  <View style={{position: 'absolute', top: -10, left: 74}}>
    
                    { bookmark.id===item.guid && bookmark.stat===true ? 
                    //markIndex.forEach(item=> item.id)===item.guid && markIndex.forEach(item=> item.stat)===true ?
                      <MaterialIcons name="bookmark" size={30} color="red" onPress={()=> {removeData(item.guid, item.link, item.thumbnail)}}/>
                      :
                      <MaterialIcons name="bookmark-border" size={30} color="black" onPress={()=> {storeData(item.guid, item.link, item.thumbnail)}}/>
                    }
                  </View>
                    <AntDesign name="sharealt" size={22} color="black" onPress={()=>sharing(item.title,item.link)} style={{position: 'absolute', top: 70, left: 120}}/>
                    <Text style={{fontSize: 14, color: 'gray', fontWeight: '500', alignSelf: 'flex-end', position : 'absolute', left: 245}}>{item.pubDate}</Text>
              
                    {/* <Text style={{fontSize: 14, color: 'gray', fontWeight: 'bold', alignSelf: 'flex-end', marginRight: 15, textDecorationLine: 'underline'}}>Read More</Text> */}
                 
                {/* </View> */}
              </View>
              {/* <View style={{width: width/1.1, height: 1, borderWidth: 0.2, opacity: 0.3, marginTop: 12, alignSelf: 'center'}}/> */}
            </TouchableHighlight>
            }}
          /> 
        }
      </View>

      <Modal
         animationInTiming={200}
         animationIn='fadeInUp'
         animationOutTiming={200}
         isVisible={contentVisible}
         onBackButtonPress={()=> {
           setContentVisible(!contentVisible)
         }}
         onBackdropPress={()=> {
           setContentVisible(!contentVisible)
         }}
      >
        <View style={styles.contentContainer}>
        { 
          filterData.map(item=> { 
            return<View key={item.guid}>
              <Image source={{uri: item.thumbnail}} style={{width: 90, height: 90, position: 'absolute', top: -50, marginLeft: 8, borderRadius: 10}}/>
              <Text style={styles.pubDate}>{item.pubDate}</Text>
              <Text style={styles.contentHeading} numberOfLines={2}> {item.title} </Text>
              <Text style={styles.content} numberOfLines={4}>{item.description}</Text>
              <EvilIcons name="external-link" size={32} color="black" style={{alignSelf: 'flex-end', marginRight: 12, marginTop: 8}} onPress={()=>{setContentVisible(!visible);navigation.navigate('webView', {itemUrl: item.link})}}/>
            </View>
          })
        }
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  header: {
    //flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    marginTop: 48,
    marginLeft: 4,
    marginRight: 12,
    justifyContent: 'space-between',
  },

  search: {
    position: 'absolute',
    backgroundColor: 'rgba(220,221,225,0.3)',
    width: 240,
    height: 45,
    paddingHorizontal: 16,
    marginLeft: 32,
    //alignSelf: 'center',
    //justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    textDecorationLine: 'none',
  },

  contentContainer: {
    width: 360,
    height: 240,
    alignSelf: 'center',
    //justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,1)', 
    borderRadius: 12
  },

  contentHeading: {
    fontSize: 19,
    fontWeight: 'bold',
    paddingLeft: 8,
    marginTop: 24,
  },

  pubDate: {
    alignSelf: 'flex-end',
    fontSize: 14, 
    fontWeight: '600',
    marginEnd: 12,
    marginTop: 12
  },

  content: {
    paddingVertical: 8, 
    fontSize: 15, 
    includeFontPadding: true,
    fontWeight: '500',
    textAlign: 'justify', 
    paddingHorizontal: 13,
  },

  footer: {
    marginTop: 12,
    marginBottom: 12,
    alignSelf: 'center',
    //color: 'rgba(240,240,240,0.2)',
  }
});
