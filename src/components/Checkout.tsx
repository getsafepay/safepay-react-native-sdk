import React, {useState, useEffect} from 'react';
import {
  Modal,
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import queryString from 'query-string';
import WebView from 'react-native-webview';
import {SafepayCheckoutProps} from '../types/checkout';
import checkoutURL from '../enums/checkoutURL';

const PRODUCTION_BASEURL = 'https://api.getsafepay.com/';
const SANDBOX_BASEURL = 'https://sandbox.api.getsafepay.com/';
const components = 'components';

const SafepayCheckout: React.FC<SafepayCheckoutProps> = (
  props: SafepayCheckoutProps,
) => {
  const baseURL =
    process.env.ENVIRONMENT === checkoutURL.PRODUCTION
      ? `${PRODUCTION_BASEURL}${components}`
      : `${SANDBOX_BASEURL}${components}`;

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
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <WebView
          source={{uri: checkoutUrl}}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          javaScriptEnabledAndroid={true}
          style={{flex: 1}}
          onNavigationStateChange={event => {
            const url = event.url;
            const Params = url.split('?')[1];
            const parsed = queryString.parse(Params);
            if (parsed.action === 'cancelled') {
              setTimeout(() => {
                Alert.alert('Payment Cancelled!');
                setModalVisible(!modalVisible);
                setToken('');
              }, 3000);
            }
            if (parsed.action === 'complete') {
              setTimeout(() => {
                Alert.alert('Payment Successfull');
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
