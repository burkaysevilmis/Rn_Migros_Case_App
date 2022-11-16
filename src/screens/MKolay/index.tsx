import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {FONTS, sizes} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {MainPropsNavigation} from '../../models/navigation';

type RenderCardProps = {
  bgImage: ImageSourcePropType;
  logo: ImageSourcePropType;
  content: string;
  bgColor: string;
};
const RenderCard: React.FC<RenderCardProps> = ({
  bgImage,
  bgColor,
  logo,
  content,
}) => {
  const {navigate} = useNavigation<MainPropsNavigation<'MKolay'>>();
  const _handlePress = () => {
    navigate('QrGenerate');
  };
  return (
    <Pressable onPress={_handlePress} style={[styles.cardBox]}>
      <View style={[styles.imgBox]}>
        <Image resizeMode="cover" style={styles.img} source={bgImage} />
      </View>
      <View style={{backgroundColor: bgColor}}>
        <View style={[styles.bottomContent, {backgroundColor: bgColor}]}>
          <View style={styles.bottomLogoBox}>
            <Image resizeMode="contain" style={styles.img} source={logo} />
          </View>
          <Image
            resizeMode="contain"
            style={styles.imglogo}
            source={require('../../images/back.png')}
          />
        </View>
        <Text style={{padding: 15, ...FONTS.f4, color: 'white'}}>
          {content}
        </Text>
      </View>
    </Pressable>
  );
};
const MKolay = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <RenderCard
          logo={require('../../images/mKolay.png')}
          bgImage={require('../../images/bg1.png')}
          bgColor="#65BAB0"
          content="Mkolay Mağaza ile ürünlerinizi kolayca okutun, JetKasa ile ödeyin."
        />
        <RenderCard
          logo={require('../../images/mKolayKantin.png')}
          bgImage={require('../../images/bg2.png')}
          bgColor="#B93163"
          content="Mkolay Kantin ile ürünlerinizi kolayca okutun, telefonunuzdan ödeyin"
        />
      </ScrollView>
    </View>
  );
};

export default MKolay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardBox: {
    width: sizes.width * 0.9,
    display: 'flex',
    alignSelf: 'center',
    borderRadius: 12,
    marginVertical: 15,
    overflow: 'hidden',
  },
  imgBox: {
    height: sizes.height / 5,
    width: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  bottomContent: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  bottomLogoBox: {
    width: 120,
    height: 50,
  },
  imglogo: {
    width: 80,
    height: 40,
  },
});
