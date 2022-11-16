import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, FONTS, sizes} from '../../constants';
import Icon from 'react-native-vector-icons/AntDesign';
import axios, {AxiosResponse} from 'axios';
import database from '@react-native-firebase/database';
import {Product} from '../../models/product/index';
import moment from 'moment';
const RenderCard: React.FC<Product> = ({title, price, endDate, id}) => {
  const [nowPrice, setnowPrice] = useState(price);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const momentReplace = new Date(endDate);
  const timeBetween = momentReplace - currentTime;
  const seconds = Math.floor((timeBetween / 1000) % 60);
  const minutes = Math.floor((timeBetween / 1000 / 60) % 60);
  const hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);
  // const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const onValueChange = database()
      .ref(`/products/${id}`)
      .on('value', snapshot => {
        const socketVal = snapshot.val();
        if (socketVal) {
          console.log(socketVal.price);
          if (socketVal.price != nowPrice) {
            setnowPrice(socketVal.price);
          }
        }
      });
    return () => database().ref(`/products/${id}`).off('value', onValueChange);
  }, []);
  return (
    <View style={styles.itemBox}>
      <View style={styles.itemAllBox}>
        <View style={styles.flex}>
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          <Text style={styles.time}>
            {' '}
            {hours < 1 ? 0 : hours} saat {minutes < 1 ? 0 : minutes} dakika{' '}
            {seconds < 1 ? 0 : seconds} saniye
          </Text>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.price}>{nowPrice} TL</Text>
          <Icon name="right" color="#65BAB0" size={24} />
        </View>
      </View>
    </View>
  );
};
const Gecmisim = () => {
  const [load, setload] = useState(true);
  const [productData, setProductData] = useState<Product[]>([]);
  const getProduct = async () => {
    const response: AxiosResponse<Product[]> = await axios.get(
      'https://fakestoreapi.com/products?limit=20',
    );
    if (response.data) {
      response.data.map(async (value, index) => {
        const endDate = moment()
          .add((index + 1) * 30, 'm')
          .toLocaleString();
        const newItem = {...value, endDate};
        await database()
          .ref(`/products/${value.id}`)
          .once('value')
          .then(snapshot => {
            if (snapshot.val() === null) {
              database()
                .ref(`/products/${value.id}`)
                .set(newItem)
                .then(() => console.log('Data set.'));
            }
          });
      });
    }
    await database()
      .ref('/products/')
      .once('value')
      .then(res => {
        console.log(res.val());
        if (res.val()) {
          let filterItem: Product[] = res.val();
          filterItem = filterItem.filter(res => res !== null);
          setProductData(filterItem);
        }
      })
      .finally(() => {
        setload(false);
      });
  };
  useEffect(() => {
    getProduct();
  }, []);
  if (load) {
    return (
      <View style={styles.loadBox}>
        <ActivityIndicator size="large" color={color.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.mainBox}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={productData}
          renderItem={({item}) => <RenderCard {...item} />}
        />
      </View>
    </View>
  );
};

export default Gecmisim;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  itemBox: {
    width: sizes.width * 0.9,
    backgroundColor: color.white,
    borderRadius: 12,
    padding: 10,
    ...color.shadow,
    alignSelf: 'center',
    marginVertical: 10,
  },
  mainBox: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 10,
  },
  title: {
    ...FONTS.f3,
    marginTop: 5,
  },
  time: {
    ...FONTS.f1,
    marginTop: 5,
  },
  price: {
    ...FONTS.f3b,
    marginRight: 5,
    color: '#65BAB0',
  },
  itemAllBox: {flexDirection: 'row', alignItems: 'center'},
  priceBox: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  loadBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
