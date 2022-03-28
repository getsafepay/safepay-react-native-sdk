This project aims to be a strong foundation for our merchants to consume safepay-payment-gateway in their applications

# Prerequisites

- Node.js > 12 and npm
- Watchman
- Xcode 12
- Cocoapods 1.10.1
- JDK > 11
- Android Studio and Android SDK
  
# Base Dependencies

- query-string
- react-native-webview

# Installation

Run `npm install` to install the dependencies in order to consume our sdk

- > npm i safepay-react-native-sdk --save

# Usage

> import SafepayCheckout from 'safepay-react-native-sdk';

#### SafepayCheckout

`SafepayCheckout` component is the main component which wraps everything and provides a couple of props (see Config below).

#### Example

following is the basic example to consume our component

``` ts
import React from 'react';
import SafepayCheckout from 'safepay-react-native';
import {StyleSheet} from 'react-native';

const Home: React.FC = () => {
  return (
    <>
      <SafepayCheckout
        amount={455}
        clientKey="sec_xxxx-yourkey"
        currency="PKR"
        environment="sandbox"
        order_id="12345"
        buttonTitle="Checkout"
        buttonStyle={styles.button}
        buttonTextStyle={styles.btn_text}
      />
    </>
  );
};
export default Home;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
  },
  btn_text: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
```

#### Props Configuration

| Property | Type | Description |
| :---         |     :---:      |          ---: |
| amount       | number         | use this to specify amount    |
| clientKey     | string       | use your client key      |
| currency     | string       | specify currency for your transactions |
| environment     | string       | use this to specify environment  |
| order_id     | string       | use this for your order id  |
| buttonTitle     | string       | use this to give title to your button|
| buttonStyle     | string      | use this to give styles to your button|
| buttonTextStyle | string | use this to give styles to your button text|
