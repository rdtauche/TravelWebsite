var EURUSD = document.querySelector("#EURUSD");
var GBPUSD = document.querySelector("#GBPUSD");
var USDCAD = document.querySelector("#USDCAD");
var USDCHF = document.querySelector("#USDCHF");
var USDNOK = document.querySelector("#USDNOK");
var USDSEK = document.querySelector("#USDSEK");
var USDJPY = document.querySelector("#USDJPY");
var AUDUSD = document.querySelector("#AUDUSD");
var NZDUSD = document.querySelector("#NZDUSD");
var USDBRL = document.querySelector("#USDBRL");
var USDMXN = document.querySelector("#USDMXN");
var USDPHP = document.querySelector("#USDPHP");
var USDARS = document.querySelector("#USDARS");
var USDPEN = document.querySelector("#USDPEN");
var USDCRC = document.querySelector("#USDCRC");
var USDUYU = document.querySelector("#USDUYU");
var USDSAR = document.querySelector("#USDSAR");
var USDSGD = document.querySelector("#USDSGD");
var USDJPY = document.querySelector("#USDJPY");

let url = 'https://api.exchangeratesapi.io/v1';

function params(paramsObj) {
    return new URLSearchParams({
      access_key: '87372d954b00795a61264fb57533944a',
      ...paramsObj
    });
}

function getLatest(options) {
  fetch(`${url}/latest?${params(options)}`)
    .then(res => res.json())
    .then(displayData)
    .catch(error => {
        console.error('Error fetching data:', error);
      });

    function displayData(rates) {
        console.log(rates)
        // console.log(rates.rates)
        // console.log(rates.rates.EUR)
            EURUSD.innerText=`${"EUR/USD " + rates.rates.EUR}`;
            GBPUSD.innerText=`${"GBP/USD " + rates.rates.GBP}`;
            USDCAD.innerText=`${"USD/CAD " + rates.rates.CAD}`;
            USDCHF.innerText=`${"USD/CHF " + rates.rates.CHF}`;
            USDNOK.innerText=`${"USD/NOK " + rates.rates.NOK}`;
            USDSEK.innerText=`${"USD/SEK " + rates.rates.SEK}`;
            USDJPY.innerText=`${"USD/JPY " + rates.rates.JPY}`;
            AUDUSD.innerText=`${"AUD/USD " + rates.rates.AUD}`;
            NZDUSD.innerText=`${"NZD/USD " + rates.rates.NZD}`;
            USDBRL.innerText=`${"USD/BRL " + rates.rates.BRL}`;
            USDMXN.innerText=`${"USD/MXN " + rates.rates.MXN}`;
            USDPHP.innerText=`${"USD/PHP " + rates.rates.PHP}`;
            USDARS.innerText=`${"USD/ARS " + rates.rates.ARS}`;
            USDPEN.innerText=`${"USD/PEN " + rates.rates.PEN}`;
            USDCRC.innerText=`${"USD/CRC " + rates.rates.CRC}`;
            USDUYU.innerText=`${"USD/UYU " + rates.rates.UYU}`;
            USDSAR.innerText=`${"USD/SAR " + rates.rates.SAR}`;
            USDSGD.innerText=`${"USD/SGD " + rates.rates.SGD}`;
            USDJPY.innerText=`${"USD/JPY " + rates.rates.JPY}`;

    }
};

// remove these if you want everything
getLatest({base: 'USD'});
// getLatest({base: 'USD',symbols: 'USD,CAD,GBP'});

  // RT: display day.js todays date
  var today = dayjs();
  $("#day").text(today.format("[Today is] MMM D, YYYY"));


// Node Email --install express, body-parser, nodemailer and multer----------------------
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Configures multer to store uploaded files in the 'uploads' directory

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files like HTML, CSS from 'public' directory

// SMTP configuration for nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP host
    port: 465, // Common port for SMTP
    secure: false, // True for 465, false for other ports
    auth: {
        user: 'ross.tauchert@gmail.com', // Your email
        pass: 'Bear2023!!' // Your email password
    }
});

// Route to display the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust the file path accordingly
});

// Route to handle form submission
app.post('/send', upload.single('file'), (req, res) => {
    const { name, email, message } = req.body; // Extract form data
    const mailOptions = {
        from: 'you@yourdomain.com', // Sender address
        to: 'recipient@theirdomain.com', // List of recipients
        subject: 'New Contact Us Submission', // Subject line
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
        attachments: [
            {
                filename: req.file.originalname,
                path: req.file.path
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Redirect to a success page or send a response back
        res.send('Email sent successfully!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});