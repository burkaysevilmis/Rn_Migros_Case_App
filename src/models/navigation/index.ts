import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';


export type MainStackParamList = {
  Anasayfa: undefined;
  Migroskop: undefined;
  MKolay: undefined;
  MigrosTv: undefined;
  Profil: undefined;
  QrGenerate: undefined;
  Gecmisim: undefined;
};
export type MainPropsNavigation<T extends keyof MainStackParamList> =
  StackNavigationProp<MainStackParamList, T>;
export type MainPropsRoute<T extends keyof MainStackParamList> = RouteProp<
  MainStackParamList,
  T
>;
