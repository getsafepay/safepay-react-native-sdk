import {StyleProp, TextStyle} from 'react-native';
import environment from '../enums/environment';
export interface SafepayCheckoutProps {
  amount: number;
  clientKey: string;
  currency: string;
  environment: environment;
  order_id: string;
  buttonTitle: string;
  buttonStyle?: StyleProp<any>;
  buttonTextStyle?: StyleProp<TextStyle>;
  onPaymentCancelled: () => void;
  onPaymentComplete: () => void;
  onErrorFetchingTracker: () => void;
};
