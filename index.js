import SafepayCheckout from "./src/components/Checkout";
import environment from "./src/enums/environment";
import theme from "./src/enums/theme";

console.warn(
  "[@sfpy/react-native-sdk] This package is deprecated and no longer maintained. " +
    "Please migrate to https://github.com/getsafepay/sfpy-react-native"
);

export {environment, theme};

export default SafepayCheckout;