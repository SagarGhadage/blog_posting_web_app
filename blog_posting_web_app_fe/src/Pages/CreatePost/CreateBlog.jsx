import React from 'react'
import MyEditor from '../../components/Editor/MyEditor'
import { TextField, Typography } from '@mui/material'
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useState } from 'react';


export default function CreateBlog() {
  const [paymentInfo,setPaymentInfo]=useState({})
  return (
    <>
      <Typography variant="h1" textAlign={'center'} component="h1" sx={{ flexGrow: 1, color: 'text.secondary' }} mt={'1%'} >
        Create New Blog
      </Typography>

      <MyEditor > 
        <PayPalButtons
        style={{ layout: 'horizontal' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.01', // Replace with the actual amount
              },
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            console.log(data,"data",actions,details)
            setPaymentInfo(details)
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        }}
      />
      </MyEditor>

    </>
  )
}
