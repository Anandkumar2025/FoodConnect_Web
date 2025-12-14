const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');
const DonateFormModel=require('./models/Donateform');
const ConatctFormModel=require('./models/Contactform');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const JWT_SECRET=process.env.JWT_SECRET;



const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/data')
.then(()=>
    console.log("connected to mongoDB")
).catch((error)=>error)
    




app.post('/signup', async (req, res) => {
  const { name, email, organization, address, password } = req.body;
  FormDataModel.findOne({ email: email })
  .then(async user => {
      if (user) {
          return res.json("User already registered");
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new FormDataModel({
          name,
          email,
          organization,
          address,
          password: hashedPassword, 
      });

    
      newUser.save()
      .then(log=> {
          
          const token = jwt.sign({ email: log.email, id: log._id }, JWT_SECRET, {
              expiresIn: '1h', 
          });

          
          res.json({
              message: 'User registered successfully',
              user: {
                  id:log._id,
                  username: log.username,
                  email: log.email,
                  organization: log.organization,
                  address: log.address
              },
              token: token 
          });
      })
      .catch(err => res.json({ message: 'Error registering user', error: err }));
  })
  .catch(err => res.json({ message: 'Server error', error: err }));
});



app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await FormDataModel.findOne({ email: email });
    if (!user) {
      return res.json({ status: "No records found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ status: "Wrong password" });
    
    }else{
      const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
        expiresIn: '1d',   });

      return res.json({
        status: "Success",
        token: token,
        username: user.name,
        org: user.organization,
        id: user._id,
        uaddress: user.address
      });
    }

  } catch (err) {
    return res.status(500).json({ status: "Error", error: err.message });
  }
});


const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;  
    next();
  });
};

app.get('/restdash',verifyToken, async (req, res) => {
  const userId = req.userId;  

  try {

    const donations = await DonateFormModel.find({ userId }).sort({ createdAt: -1 }); 
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations', error });
  }
});


app.post('/donate', async (req, res) => {
  const { food, quantity, time,userId,expiry } = req.body;
  const newForm = new DonateFormModel({ food, quantity, time,userId,expiry });

  try {
    await newForm.save();
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit form', error });
  }
});



const verifyToken1 = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' }); // Return 403 if no token
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' }); // Return 401 if token is invalid
    }
    
    // If token is valid, save decoded user info in the request for later use
    req.user = decoded;
    next();
  });
};



app.get('/ngodash', verifyToken1, async (req, res) => {
  try {
    const donations = await DonateFormModel.find().sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations', error });
  }
});

app.post('/ngodash/:donationId', verifyToken1, async (req, res) => {
  const { donationId } = req.params;
  try {
    await DonateFormModel.findByIdAndUpdate(donationId, { claimed: true });
    res.status(200).json({ message: 'Donation claimed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to claim donation', error });
  }
});


app.get('/home', async (req, res) => {
    try {
      const ngoCount = await FormDataModel.countDocuments({ organization: 'ngo' });
      const restCount = await FormDataModel.countDocuments({ organization: 'restaurant' });
      const mealres=await  DonateFormModel.countDocuments();
  
      res.status(200).json({
        ngUserCount: ngoCount,
        restUserCount: restCount,
        meals:mealres,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user counts', error });
    }
  });


  const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
      user: 'anand8097876076@gmail.com',  
      pass: 'hlobuppqrccwknob'          
    }
  });
  
  app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
  
    try {
      const newContact = new ConatctFormModel({ name, email, message });
      await newContact.save();

      const mailOptions = {
        from: email,
        to: 'anand8097876076@gmail.com',
        subject: 'New Contact Form Submission',
        text: `You have received a new message from ${name} (${email}):\n\n${message}`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send('Error sending email');
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send('Message sent and saved to the database');
        }
      });
  
    } catch (error) {
      console.error('Error saving to database or sending email:', error);
      res.status(500).send('Server error');
    }
  });

app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");
    
});






