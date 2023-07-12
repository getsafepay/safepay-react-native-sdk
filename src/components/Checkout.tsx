import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import queryString from 'query-string';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { SafepayCheckoutProps } from '../types/checkout';
import environment from '../enums/environment';
import theme from '../enums/theme';

const defaultLogo = require('../assets/safepay-logo-blue.png');
const lightLogo = require('../assets/safepay-logo-white.png');
const darkLogo = require('../assets/safepay-logo-dark.png');

const PRODUCTION_BASEURL = 'https://api.getsafepay.com/';
const SANDBOX_BASEURL = 'https://sandbox.api.getsafepay.com/';
const SANDBOX_CHECKOUT_URL = 'https://sandbox.api.getsafepay.com/';
const PRODUCTION_CHECKOUT_URL = 'https://getsafepay.com/';

const SafepayCheckout: React.FC<SafepayCheckoutProps> = (
  props: SafepayCheckoutProps
) => {
  const baseURL =
    props.environment === environment.PRODUCTION
      ? `${PRODUCTION_BASEURL}`
      : `${SANDBOX_BASEURL}`;

  const componentUrl =
    props.environment === environment.PRODUCTION
      ? `${PRODUCTION_CHECKOUT_URL}`
      : `${SANDBOX_CHECKOUT_URL}`;

  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState('');
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(`${baseURL}order/v1/init`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client: props.clientKey,
            amount: props.amount,
            currency: props.currency,
            environment: props.environment,
          }),
        });
        const json = await response.json();
        setToken(json.data.token);
      } catch (error) {
        props.onErrorFetchingTracker();
        console.error(error);
      }
    };
    if (modalVisible) {
      fetchToken();
    }
  }, [modalVisible, props]);

  const params = {
    beacon: `${token}`,
    order_id: props.order_id,
    source: 'mobile',
    webhooks: !!props.webhooks,
    env: props.environment,
  };

  const qs = queryString.stringify(params);
  const checkoutUrl = `${componentUrl}checkout/pay?${qs}`;

  const renderLogo = (th: theme = theme.DEFAULT) => {
    let srcLogo: any;
    switch (th) {
      case theme.DARK:
        srcLogo = lightLogo;
        break;
      case theme.LIGHT:
        srcLogo = darkLogo;
        break;
      default:
        srcLogo = defaultLogo;
        break;
    }
    return (
      <Image source={srcLogo} style={{ width: 100, resizeMode: 'contain' }} />
    );
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.button,
          props.buttonStyle,
          {
            backgroundColor: props.buttonTheme,
            borderColor:
              props.buttonTheme === theme.DEFAULT ? '#6A9ADB' : '#0e0e0e',
          },
        ]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        {renderLogo(props.buttonTheme)}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <WebView
          source={{ uri: checkoutUrl }}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          javaScriptEnabledAndroid={true}
          style={{ flex: 1 }}
          onNavigationStateChange={(event: WebViewNavigation) => {
            const url = event.url;
            const params = url.split('?')[1];
            const parsed = queryString.parse(params);
            if (parsed.action === 'cancelled') {
              setTimeout(() => {
                props.onPaymentCancelled();
                setModalVisible(!modalVisible);
                setToken('');
              }, 3000);
            }
            if (parsed.action === 'complete') {
              setTimeout(() => {
                props.onPaymentComplete();
                setModalVisible(!modalVisible);
              }, 3000);
            }
          }}
        />
      </Modal>
    </>
  );
};
export default SafepayCheckout;

const styles = StyleSheet.create({
  button: {
    marginTop: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
  },
});
