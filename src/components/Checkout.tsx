import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import queryString from 'query-string';
import WebView, { WebViewNavigation } from 'react-native-webview';
import {SafepayCheckoutProps} from '../types/checkout';
import environment from '../enums/checkoutURL';

const PRODUCTION_BASEURL = 'https://api.getsafepay.com/';
const SANDBOX_BASEURL = 'https://sandbox.api.getsafepay.com/';


const SafepayCheckout: React.FC<SafepayCheckoutProps> = (
  props: SafepayCheckoutProps,
) => {
  const baseURL =
    props.environment === environment.PRODUCTION
      ? `${PRODUCTION_BASEURL}components`
      : `${SANDBOX_BASEURL}components`;

  const [modalVisible, setModalVisible] = useState(false);
  const [Token, setToken] = useState('');
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(`${SANDBOX_BASEURL}order/v1/init`, {
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
        console.error(error);
      }
    };
    if (modalVisible) {
      fetchToken();
    }
  }, [modalVisible, props]);

  const params = {
    beacon: `${Token}`,
    order_id: props.order_id,
    source: 'mobile',
    env: props.environment,
  };

  const qs = queryString.stringify(params);

  const checkoutUrl = `${baseURL}?${qs}`;

  return (
    <>
      <View style={styles.view}>
        <Text style={styles.text}>Checkout page SafePay</Text>
        <TouchableOpacity
          style={(styles.button, props.buttonStyle)}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={(styles.btn_text, props.buttonTextStyle)}>
            {props.buttonTitle}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <WebView
          source={{uri: checkoutUrl}}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          javaScriptEnabledAndroid={true}
          style={{flex: 1}}
          onNavigationStateChange={(event: WebViewNavigation) => {
            const url = event.url;
            const Params = url.split('?')[1];
            const parsed = queryString.parse(Params);
            if (parsed.action === 'cancelled') {
              setTimeout(() => {
                setModalVisible(!modalVisible);
                setToken('');
              }, 3000);
            }
            if (parsed.action === 'complete') {
              setTimeout(() => {
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
  view: {
    marginTop: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    textAlign: 'center',
    marginTop: '50%',
    marginBottom: '10%',
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  btn_text: {
    color: 'black',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
  },
});
