import React, { useEffect, useRef, useState } from "react";

const PaypalButton = () => {
  //  has  to maintain state for is paid and if any error
  // has to recieve  the total price
  // has to perform
  const paypalRef = useRef();
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your description",
                amount: {
                  currency_code: "INR",
                  value: 500.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          console.log(order);
        },
        onError: (err) => {
          //   setError(err),
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, []);

  return <div></div>;
};

export default PaypalButton;
