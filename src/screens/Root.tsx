/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStackParamList} from '../models/navigation';
import {
  Anasayfa,
  MKolay,
  MigrosTv,
  Migroskop,
  Profil,
  QrGenerate,
  Gecmisim,
} from './index';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Fontisto';
import {color, FONTS} from '../constants/index';
import {createStackNavigator} from '@react-navigation/stack';
const Tab = createBottomTabNavigator<MainStackParamList>();
const Stack = createStackNavigator<MainStackParamList>();
const MKolayStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MKolay"
        options={{
          headerStyle: {backgroundColor: color.primary},
          headerTitleStyle: {color: color.white},
        }}
        component={MKolay}
      />
      <Stack.Screen
        options={{
          headerStyle: {backgroundColor: color.primary},
          headerTitleStyle: {color: color.white},
          headerTitle: 'MKolay',
          headerBackTitleVisible: false,
          headerTintColor: 'black',
        }}
        name="QrGenerate"
        component={QrGenerate}
      />
      <Stack.Screen
        options={{
          headerStyle: {backgroundColor: color.primary},
          headerTitleStyle: {color: color.white},
          headerTitle: 'Alışveriş Geçmişim',
          headerBackTitleVisible: false,
          headerTintColor: 'black',
        }}
        name="Gecmisim"
        component={Gecmisim}
      />
    </Stack.Navigator>
  );
};
const MyTabs = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarStyle: {borderTopWidth: 0}}}>
      <Tab.Screen
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.txtBottomLabel,
                {color: focused ? color.primary : 'black'},
              ]}>
              Home
            </Text>
          ),
          tabBarIcon: ({size, focused}) => (
            <Icon
              name="home"
              color={focused ? color.primary : color.black}
              size={size}
            />
          ),
        }}
        name="Anasayfa"
        component={Anasayfa}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.txtBottomLabel,
                {color: focused ? color.primary : 'black'},
              ]}>
              Migroskop
            </Text>
          ),
          tabBarIcon: ({size, focused}) => (
            <Icon3
              name="pricetag-outline"
              color={focused ? color.primary : color.black}
              size={size}
            />
          ),
        }}
        name="Migroskop"
        component={Migroskop}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.txtBottomLabel,
                {color: focused ? color.primary : 'black'},
              ]}>
              MKolay
            </Text>
          ),
          tabBarIcon: ({size, focused}) => (
            <Icon4
              name="maxcdn"
              color={focused ? color.primary : color.black}
              size={size}
            />
          ),
        }}
        name="MKolay"
        component={MKolayStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.txtBottomLabel,
                {color: focused ? color.primary : 'black'},
              ]}>
              MigrosTv
            </Text>
          ),
          tabBarIcon: ({size, focused}) => (
            <Icon2
              name="tv"
              color={focused ? color.primary : color.black}
              size={size}
            />
          ),
        }}
        name="MigrosTv"
        component={MigrosTv}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.txtBottomLabel,
                {color: focused ? color.primary : 'black'},
              ]}>
              Profil
            </Text>
          ),
          tabBarIcon: ({size, focused}) => (
            <Icon
              name="user"
              color={focused ? color.primary : color.black}
              size={size}
            />
          ),
        }}
        name="Profil"
        component={Profil}
      />
    </Tab.Navigator>
  );
};
const Root = () => {
  return <MyTabs />;
};

export default Root;

const styles = StyleSheet.create({
  txtBottomLabel: {
    ...FONTS.f1,
  },
});
