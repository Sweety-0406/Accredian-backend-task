const { createReferral } = require('../models/referral');
const nodemailer = require("nodemailer");
const prisma = require('../database/index.js')

const createReferralHandler = async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

  try {
    // const newReferral = await createReferral({
    //   referrerName,
    //   referrerEmail,
    //   refereeName,
    //   refereeEmail,
    // });
    if(!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const info = await sendReferralEmail(referrerEmail, refereeName);

    const newReferral = await prisma.referral.create({
      data:{
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail
      }
    })
    const totaluser = await prisma.referral.findMany()
    console.log(totaluser)
    res.status(201).json(newReferral);
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const sendReferralEmail = async (referrerEmail, refereeName) => {
    console.log()
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        secure:true,
        port:465,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: referrerEmail,
        subject: 'Referral Confirmation',
        text: `Thank you for referring ${refereeName}!`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(info)
};

const getRefferalUsers = async (req,res)=>{
  try {
    const users = await prisma.referral.findMany();
    res.status(200).json(users)
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createReferralHandler,
  getRefferalUsers
};

