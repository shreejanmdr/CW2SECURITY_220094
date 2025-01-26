const axios = require('axios');

const sendOtp = async (phone,otp) => {

    //setting state
    let isSent=false;

    
    //url to send otp
    const url='https://api.managepoint.co/api/sms/send';

    //paylod to send otp
    const payload = {
        'apiKey':'afdd2ef6-5c65-4c33-872b-cb098fc8e0d1',
        'to':phone,
        'message':`Your 6-digit OTP is : ${otp} `
    }

    try {
        const res=await axios.post(url,payload);

        if(res.status===200){
            isSent=true;
        }

    }catch(error){
        
        console.log('Error Sending OTP',error.message);
    }

    return isSent;
  
}

module.exports=sendOtp;