import {StyleProp} from 'react-native';
import environment from '../enums/environment';
import theme from '../enums/theme';
export interface SafepayCheckoutProps {
  amount: number;
  clientKey: string;
  currency: string;
  environment: environment;
  order_id: string;
  buttonStyle?: StyleProp<any>;
  buttonTheme: theme;
  onPaymentCancelled: () => void;
  onPaymentComplete: () => void;
  onErrorFetchingTracker: () => void;
};
