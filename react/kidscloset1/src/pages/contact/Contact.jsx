// import axios from 'axios';
// import React, { useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styled from 'styled-components';

// import './Contact.css'; // Import the CSS for styling

// // Wrapper for the entire page with background image
// const BackgroundWrapper = styled.div`
//   background: linear-gradient(
//         rgba(255, 255, 255, 0.7),
//         rgba(255, 255, 255, 0.7)
//       ),
//     url('https://assets-global.website-files.com/61e7be6e6f17f5346fc7ec9f/61e7be6f6f17f5a75bc7ed68_background-sign-in-tech-ui-kit-webflow-template.svg') no-repeat center center;
//   background-size: cover;
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 2rem;
// `;

// // Wrapper for the contact content to center it
// const ContactContentWrapper = styled.div`
//   background: #fff;
//   padding: 2rem;
//   border-radius: 10px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//   max-width: 500px;
//   width: 100%;
//   text-align: center;
// `;

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/contact/contact', formData);
//       toast.success(response.data.message || 'Form submitted successfully');
//       setFormData({ firstName: '', lastName: '', email: '', message: '' }); // Reset form only if successful
//     } catch (error) {
//       toast.error((error.response && error.response.data && error.response.data.message) || 'Error submitting form');
//     }
//   };

//   return (
//     <BackgroundWrapper>
//       <ContactContentWrapper>
//         <h1>Contact Us</h1>
//         <p>If you have any questions, feel free to reach out to us. We're here to help!</p>

//         <form onSubmit={handleSubmit} className="contact-form">
//           <label htmlFor="firstName">First Name</label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />

//           <label htmlFor="lastName">Last Name</label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
          
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
          
//           <label htmlFor="message">Message</label>
//           <textarea
//             id="message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             rows="4"
//             required
//           ></textarea>
          
//           <button type="submit">Send Message</button>
//         </form>

//         <div className="contact-details">
//           <h2>Contact Information</h2>
//           <p><strong>Email:</strong> support@KidsCloset.com</p>
//           <p><strong>Phone:</strong> +977 9876543210</p>
//           <p><strong>Address:</strong> DilliBazar,Softwarica College Of It And Ecommerce</p>
//         </div>
//       </ContactContentWrapper>
      
//       <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
//     </BackgroundWrapper>
//   );
// };

// export default Contact;



import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

import './Contact.css'; // Import the CSS for additional custom styling if needed

// Wrapper for the entire page with background image
const BackgroundWrapper = styled.div`
  background: linear-gradient(
        rgba(255, 255, 255, 0.85),
        rgba(255, 255, 255, 0.85)
      ),
    url('https://assets-global.website-files.com/61e7be6e6f17f5346fc7ec9f/61e7be6f6f17f5a75bc7ed68_background-sign-in-tech-ui-kit-webflow-template.svg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

// Wrapper for the contact content to center it
const ContactContentWrapper = styled.div`
  background: #ffffff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  width: 100%;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
  text-align: center;
`;

const Description = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
  line-height: 1.4;
  font-size: 0.9rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    font-weight: 600;
    margin-bottom: 0rem;
    color: #34495e;
    font-size: 0.9rem;
  }

  input,
  textarea {
    padding: 0.6rem;
    margin-bottom: 1rem;
    border-radius: 6px;
    border: 1px solid #dcdcdc;
    font-size: 0.9rem;
    color: #34495e;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #3498db;
      outline: none;
    }
  }

  button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 0.7rem 1rem;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2980b9;
    }
  }
`;

const ContactDetails = styled.div`
  margin-top: 1.5rem;
  text-align: center;

  h2 {
    font-size: 1.2rem;
    color: #2c3e50;
    margin-bottom: 0rem;
  }

  p {
    color: #7f8c8d;
    line-height: 1.4;
    margin-bottom: 0rem;
    font-size: 0.9rem;

    strong {
      color: #34495e;
      font-weight: 600;
    }
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact/contact', formData);
      toast.success(response.data.message || 'Form submitted successfully');
      setFormData({ firstName: '', lastName: '', email: '', message: '' }); // Reset form only if successful
    } catch (error) {
      toast.error((error.response && error.response.data && error.response.data.message) || 'Error submitting form');
    }
  };

  return (
    <BackgroundWrapper>
      <ContactContentWrapper>
        <Title>Contact Us</Title>
        <Description>If you have any questions, feel free to reach out.</Description>

        <Form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
          
          <button type="submit">Send Message</button>
        </Form>

        <ContactDetails className="contact-details">
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> support@SanoSansar.com</p>
          <p><strong>Phone:</strong> +977 9876543210</p>
          <p><strong>Address:</strong> DilliBazar, Softwarica College Of IT And Ecommerce</p>
        </ContactDetails>
      </ContactContentWrapper>
      
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </BackgroundWrapper>
  );
};

export default Contact;
