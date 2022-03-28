import {StyleProp, TextStyle} from 'react-native';

export type SafepayCheckoutProps = {
  amount: number;
  clientKey: string;
  currency: string;
  environment: string;
  order_id: string;
  buttonTitle: string;
  buttonStyle?: StyleProp<any>;
  buttonTextStyle?: StyleProp<TextStyle>;
};
