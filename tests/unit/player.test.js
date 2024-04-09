const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../index.js'); // Import the app instance from index.js
const Player = require('../../models/player');
 
const { mongoTestConfig } = require('../../config/config');
 
beforeAll(async () => {
    await Player.deleteMany();
   // console.log('connected_wiss: '+ mongoTestConfig.uri);
});
 
afterAll(async () => {
   //mongoose.connection.dropDatabase();  // todo : uncomment this , for now delete manual
   //await Player.deleteMany();
   await mongoose.connection.close();
});
 
it('should create a new player', async () => {
    const playerData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        bornDate: '1990-01-01T00:00:00.000Z'
    };
 
    // Send POST request to create a new player
    const response = await request(app)
        .post('/api/players/')
        .send(playerData);
 
        //console.log("res = "+JSON.stringify(response, null, 2));
    // Check if response status is 201 (created)
    expect(response.status).toBe(201);
 
    // Check if the response body contains the created player data
    expect(response.body).toMatchObject(playerData);
 
    // Verify that the player was created in the database
    const createdPlayer = await Player.findOne({ email: playerData.email });
    expect(createdPlayer).toBeTruthy();
    expect(createdPlayer.firstName).toBe(playerData.firstName);
    expect(createdPlayer.lastName).toBe(playerData.lastName);
    expect(createdPlayer.email).toBe(playerData.email);
});
 
it('should return 400 if request body is invalid', async () => {
    // Send POST request with invalid data
    const response = await request(app)
        .post('/api/players')
        .send({});
 
    // Check if response status is 400 (bad request)
    expect(response.status).toBe(400);
 
    // Check if the response body contains an error message
    expect(response.body).toHaveProperty('message');
});
 
it('should return 400 if request bornDate is missing', async () => {
    const playerData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        bornDate: '1990-01-01T00:00:00.000Z'
    };
 
    const response = await request(app)
        .post('/api/players')
        .send(playerData);
 
    // Check if response status is 400 (bad request)
    expect(response.status).toBe(400);
 
    // Check if the response body contains an error message
    expect(response.body).toHaveProperty('message');
});
 
it('should retrieve all players', async () => { 
    // Call the getAllPlayers function
    const response = await request(app)         
    .get('/api/players')         
    .send();     
    // Assert that the result contains the expected number of players
    expect(response.body.length).toBe(1); });