const express = require('express');
const cors = require('cors');
const SSLCommerzPayment = require('sslcommerz-lts');
require('dotenv').config();

const app = express();
const port = 3000;

const store_id = process.env.SSLC_STORE_ID;
const store_passwd = process.env.SSLC_STORE_PASSWORD;
const is_live = false;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server is running fine and this is the home page');
});

app.post("/order", async (req, res) => {

        const trans_Id = `TXN_${Date.now()}`;



    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: trans_Id, // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

       const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.send({url: GatewayPageURL})
        console.log('Redirecting to: ', GatewayPageURL)
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
