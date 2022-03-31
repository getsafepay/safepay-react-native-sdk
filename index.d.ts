import { SafepayCheckoutProps } from './src/types/checkout';
import {FunctionComponent} from 'react';

export type SafepayProps = SafepayCheckoutProps;
declare module 'SafepayCheckout' {
 const SafepayCheckout: FunctionComponent<SafepayProps>;
 export default SafepayCheckout;
}