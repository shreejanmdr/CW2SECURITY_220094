const request = require('supertest');
const app = require('../index');
const ContactMessage = require('../models/contactModel'); // Make sure the path is correct
 
// Test token for admin (use an actual token from your environment)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Njk5MmM2ZWQwMDc2OWIwZDdlOTc3YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxOTExOTQ4MH0.0i3pQARQljKKFNij9zYpNWz6uIJ4tV2r-_XzcT50QAM';
const productId = '66b4787f8eb6361d72e2493c';
describe('Testing API', () => {
     //testing '/test' api case
     it('GET /test | Response with text', async () => {
        //request sending and receiving response
        const response = await request(app).get('/test') //check in index.js file
 
        //if its sucessfull, then status code should be 200
        expect(response.statusCode).toBe(200)
 
        //Compare received text with expected text
        expect(response.text).toEqual('Test API is Working!...')
 
    })
   
          // Test for fetching all products
    it('GET /api/product/get_all_products | Should fetch all products', async () => {
        const response = await request(app)
            .get('/api/product/get_all_products')
            .set('Authorization', `Bearer ${token}`);
 
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.products).toBeDefined();
        expect(Array.isArray(response.body.products)).toBe(true);
    });

        // Test for fetching a single product by ID
        it('GET /api/product/get_single_product/:id | Should fetch a single product by ID', async () => {
            const productId = '66b477058eb6361d72e248c4'; // Replace with a valid product ID
            const response = await request(app)
                .get(`/api/product/get_single_product/${productId}`)
                .set('Authorization', `Bearer ${token}`);
     
            expect(response.statusCode).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.product).toBeDefined();
        });
 

        it('POST /api/user/create |Response with body', async () => {

        const response = await request(app).post('/api/user/create').send({
            'name' : 'test',
            'email' : 'test@gmail.com',
            'phone' : '9658236540',
            'password' : 'Test@123'
        })

        //if condition
        if(!response.body.success){
            expect(response.body.message).toEqual('User Already Exists!')
        }
        else{

            expect(response.body.message).toEqual('User Created Successfully!')
        }
    })

        it('POST /api/user/login | Response with body', async () => {        

        const response = await request(app).post('/api/user/login').send({
            'email' : 'test@gmail.com',
            'password' : 'Test@123'
        })

        //if condition
        if(!response.body.success){
            expect(response.body.message).toEqual('User Not Found!')
        }

        else if(!response.body.token){
            expect(response.body.message).toEqual('Incorrect Password!')        
        }

        else{

            expect(response.body.message).toEqual('Logged In Successfully!')
        }
    })

    
    //testing '/test' api case
    it('GET /test | Response with text', async () => {
        //request sending and receiving response
        const response = await request(app).get('/test') //check in index.js file

        //if its sucessfull, then status code should be 200
        expect(response.statusCode).toBe(200)

        //Compare received text with expected text
        expect(response.text).toEqual('Test API is Working!...')

    })


    // Test for incorrect login
    it('POST /api/user/login | Should fail with incorrect password', async () => {
        const response = await request(app).post('/api/user/login').send({
            'email': 'test@gmail.com',
            'password': 'wrongpassword'
        });
 
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toEqual('Password not matched!');
    });
 

 
    // Test for fetching all products
    it('GET /api/product/get_all_products | Should fetch all products', async () => {
        const response = await request(app)
            .get('/api/product/get_all_products')
            .set('Authorization', `Bearer ${token}`);
 
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.products).toBeDefined();
        expect(Array.isArray(response.body.products)).toBe(true);
    });
 
 
        // Test for fetching reviews by product ID
        it('GET /api/rating/product/:productId | Should fetch reviews for a product', async () => {
            const response = await request(app)
                .get(`/api/rating/product/${productId}`)
                .set('Authorization', `Bearer ${token}`);
     
            expect(response.statusCode).toBe(200);
            expect(response.body.reviews).toBeDefined();
            expect(Array.isArray(response.body.reviews)).toBe(true);
        });
       
 
   
 
    // Test for updating a cart item
    it('PUT /api/cart/update/:id | Should update a cart item', async () => {
        const cartItemId = '66b47a7e8eb6361d72e24a81'; // Replace with a valid cart item ID
        const response = await request(app)
            .put(`/api/cart/update/${cartItemId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                quantity: 3,
                total: 300
            });
 
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('Item updated successfully');
    });
   
   
 
 
});
 
describe('Testing Reviews and Favorites API', () => {
   
   
 
    // Test for fetching reviews by product ID
    it('GET /api/rating/product/:productId | Should fetch reviews for a product', async () => {
        const response = await request(app)
            .get(`/api/rating/product/${productId}`)
            .set('Authorization', `Bearer ${token}`);
 
        expect(response.statusCode).toBe(200);
        expect(response.body.reviews).toBeDefined();
        expect(Array.isArray(response.body.reviews)).toBe(true);
    });
   
 
   
});

// Helper function to create a test contact message
const createTestContactMessage = async () => {
    const message = new ContactMessage({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        message: 'This is a test message.'
    });
    await message.save();
    return message;
};
 
describe('Contact API', () => {
    // Test for submitting a contact form
 
 
    // Test for getting all contact messages
    it('GET /api/contact/all | Should fetch all contact messages', async () => {
        await createTestContactMessage();
 
        const response = await request(app).get('/api/contact/all');
 
        expect(response.statusCode).toBe(200);
        expect(response.body.contacts).toBeDefined();
        expect(Array.isArray(response.body.contacts)).toBe(true);
        expect(response.body.contacts.length).toBeGreaterThan(0);
        expect(response.body.contacts[0]).toHaveProperty('firstName');
        expect(response.body.contacts[0]).toHaveProperty('lastName');
        expect(response.body.contacts[0]).toHaveProperty('email');
        expect(response.body.contacts[0]).toHaveProperty('message');
    });
 
     // Test for server error when retrieving contacts
     it('GET /api/contact/all | Should return server error on failure', async () => {
        // Mock the ContactMessage model to simulate an error
        jest.spyOn(ContactMessage, 'find').mockImplementation(() => {
            throw new Error('Simulated error');
        });
        const response = await request(app).get('/api/contact/all');
 
        expect(response.statusCode).toBe(500);
        expect(response.text).toContain('Server error');
    });
});
 































