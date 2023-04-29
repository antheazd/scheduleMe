class GooglePayButton extends React.Component {
  constructor(props) {
      super(props);
      this.initiatePayment = this.initiatePayment.bind(this);
      this.onGooglePayLoaded = this.onGooglePayLoaded.bind(this);
      this.onPaymentAuthorized = this.onPaymentAuthorized.bind(this);
      this.onPaymentDataChanged = this.onPaymentDataChanged.bind(this);
      this.onPaymentError = this.onPaymentError.bind(this);
    }
  componentDidMount() {
      const script = document.createElement("script");
      script.src = "https://pay.google.com/gp/p/js/pay.js";
      script.async = true;
      document.body.appendChild(script);
      console.log("loaded", this.props.id);
    }

  onGooglePayLoaded() {}

  onPaymentAuthorized(paymentData) {
    const paymentToken = paymentData.paymentMethodData.tokenizationData.token;
    const url = "payments/" + this.props.id; 
    axios.post(url, {
      id: this.props.id,
      paymentToken: paymentToken
    })
    .catch((error) => {
      console.log(error);
    })
    window.location.reload();
  }

  onPaymentDataChanged(paymentData) {}

  onPaymentError(error) {
    console.log(error);
  }

  handlePaymentAuthorization = paymentData => {
      const paymentToken = paymentData.paymentMethodData.tokenizationData.token;
      this.setState({ paymentToken }, () => {
        fetch('/api/payment/success', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentToken }),
        })
          .catch(error => {
              console.log(error);
          });
      });
    }

  initiatePayment() {
      const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["AMEX", "DISCOVER", "MASTERCARD", "VISA"],
            },
            tokenizationSpecification: {
              type: "PAYMENT_GATEWAY",
              parameters: {
                gateway: "example",
                gatewayMerchantId: "exampleGatewayMerchantId",
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: "12345678901234567890",
          merchantName: "Example Merchant",
        },
        transactionInfo: {
          totalPriceStatus: "FINAL",
          totalPriceLabel: "Total",
          totalPrice: this.props.price.toString(),
          currencyCode: "USD",
          countryCode: "US",
        },
      };
    
      const paymentsClient = new google.payments.api.PaymentsClient({
        environment: "TEST",
      });
    
      paymentsClient
        .loadPaymentData(paymentDataRequest)
        .then((paymentData) => {
          this.onPaymentAuthorized(paymentData);
        })
        .catch((err) => {
          this.onPaymentError(err);
        });
    }

  render() {
    return (
      <button id="google-pay-button" onClick={this.initiatePayment} className="ui button">
        Pay
      </button>
    );
  }
}