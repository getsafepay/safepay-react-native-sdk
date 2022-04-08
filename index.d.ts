import React from "react";
import { SafepayCheckoutProps } from './src/types/checkout';
import environment from "./src/enums/environment";
import theme from "./src/enums/theme";
export { environment, theme };
declare const SafepayCheckout: React.FC<SafepayCheckoutProps>;
export default SafepayCheckout;