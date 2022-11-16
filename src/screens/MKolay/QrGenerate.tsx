import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FONTS, sizes} from '../../constants';
import QRCode from 'react-native-qrcode-svg';
import database from '@react-native-firebase/database';
import {QrType} from '../../models/enum';
import {useNavigation} from '@react-navigation/native';
import {MainPropsNavigation} from '../../models/navigation';
import Icon from 'react-native-vector-icons/Entypo';
import crashlytics from '@react-native-firebase/crashlytics';
const QrGenerate = () => {
  const {navigate} = useNavigation<MainPropsNavigation<'QrGenerate'>>();
  const [qrValue, setQrValue] = useState('1');
  const _randomValueGenerator = () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    return r;
  };
  const _getData = () => {
    database()
      .ref('/status')
      .once('value')
      .then(snapshot => {
        if (!snapshot.val()) {
          database()
            .ref('/status')
            .set({
              statusValue: '',
            })
            .then(() => console.log('Data set.'));
        }
      });
  };
  const _changeQr = () => {
    const randomValue = _randomValueGenerator();
    setQrValue(randomValue);
  };
  useEffect(() => {
    _getData();
    _changeQr();
  }, []);
  useEffect(() => {
    const onValueChange = database()
      .ref('/status/statusValue')
      .on('value', snapshot => {
        const qrData = snapshot.val();
        if (qrData) {
          if (qrData == QrType.success) {
            navigate('Gecmisim');
          }
          if (qrData == QrType.refresh) {
            _changeQr();
          }
          if (qrData == QrType.crash) {
            crashlytics().log('1001 crash.');
            crashlytics().crash();
          }
        }
      });
    return () =>
      database().ref('/status/statusValue').off('value', onValueChange);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.txtHeader}>Hoş geldiniz.</Text>
      <Text style={styles.txtContent}>
        Mkolay Kantin’e giriş yapabilmek için QR kodu turnikeye okutman
        gerekiyor.
      </Text>
      <View style={styles.flex}>
        <View style={styles.qrBox}>
          <Image
            source={require('../../images/qrBox.png')}
            style={styles.qrImg}
          />
          <View style={styles.qrGenerateBox}>
            <QRCode value={qrValue} size={sizes.width * 0.6} />
          </View>
        </View>
      </View>
      <View style={styles.bottomBox}>
        <Pressable
          onPress={() => navigate('Gecmisim')}
          style={styles.bottomItemBox}>
          <View style={styles.bottomItemInBox}>
            <Icon name="text-document" color="#BA3063" size={24} />
            <Text>Alışveriş Geçmişim</Text>
          </View>
        </Pressable>
        <View style={styles.bottomItemBox}>
          <View style={styles.bottomItemInBox}>
            <Icon name="text-document" color="#BA3063" size={24} />
            <Text>Yeni Kart Ekle</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default QrGenerate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  flex: {},
  txtHeader: {
    ...FONTS.f7b,
    alignSelf: 'center',
    marginTop: 20,
  },
  bottomItemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizes.width / 2.5,
    borderWidth: 0.6,
    borderColor: 'gray',
  },
  bottomBox: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: sizes.width,
  },
  bottomItemInBox: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtContent: {
    ...FONTS.f6,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  qrImg: {
    resizeMode: 'contain',
    width: sizes.width * 0.8,
    height: sizes.height / 3,
    alignSelf: 'center',
  },
  qrBox: {
    width: sizes.width * 0.8,
    height: sizes.height / 3,
    alignSelf: 'center',
    marginTop: 50,
  },
  qrGenerateBox: {
    width: '80%',
    height: '80%',
    position: 'absolute',
    alignSelf: 'center',
    top: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
