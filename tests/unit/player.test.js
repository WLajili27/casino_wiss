const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../index.js'); // Import the app instance from index.js
const Player = require('../../models/player');
const Game = require('../../models/game');

const { mongoTestConfig } = require('../../config/config');

beforeAll(async () => {
    await Player.deleteMany();
    await Game.deleteMany();
});
 
afterAll(async () => {
   //mongoose.connection.dropDatabase();  // todo : uncomment this , for now delete manual
   await Player.deleteMany();
   await Game.deleteMany();
   await mongoose.connection.close();
});
 
it('should create a new player', async () => {
    const playerData = {
        firstName: 'wissem',
        lastName: 'lajili',
        email: 'wissem.ljl@example.com',
        bornDate: '1992-01-01T00:00:00.000Z'
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
        bornDate: ''
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

it('should not update player', async () => {
    const playerID = '1'; 
    const playerData = {
        firstName: 'Dave',
        email: 'dave.doe@example.com'
    };
    // non-existing ID, it should fail with status 400
    // Call the updatePlayer method
    const response = await request(app)
        .put(`/api/players/${playerID}`)
        .send(playerData);

    expect(response.status).toBe(400);
});

it('should join the player to the game', async () => {

    const playerData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        bornDate: '1990-01-01T00:00:00.000Z'
    };
    const responsePlayer = await request(app)
        .post('/api/players/')
        .send(playerData);
    console.log("res = "+JSON.stringify(responsePlayer, null, 2));
    const gameData = {
        title: 'PUPG_12345577'        
    };
    const responseGame = await request(app)
        .post('/api/games/')
        .send(gameData);
    console.log("res = "+JSON.stringify(responseGame, null, 2));

    const validPlayerId =responsePlayer.body._id; 
    const validGameId = responseGame.body._id;

    const response = await request(app)
        .put(`/api/players/${validPlayerId}/join/${validGameId}`)
        .send();
    console.log(response);
    expect(response.status).toBe(200);
    
});

it('should return 404 if player or game not found', async () => {
    // id format needs to be valid otherwise, error :)
    const invalidPlayerId = '507f1f77bcf86cd799439011'; 
    const invalidGameId = '507f1f77bcf86cd799439012'; 

    const response = await request(app)
        .put(`/api/players/${invalidPlayerId}/join/${invalidGameId}`)
        .send();
    console.log("res = "+JSON.stringify(response, null, 2));
    expect(response.status).toBe(404);
    
});

it('should leave the game', async () => {

    const playerData = {
        firstName: 'yacin',
        lastName: 'dd',
        email: 'yacin.dd@example.com',
        bornDate: '1980-01-01T00:00:00.000Z'
    };
    const responsePlayer = await request(app)
        .post('/api/players/')
        .send(playerData);
    console.log("res = "+JSON.stringify(responsePlayer, null, 2));
    const gameData = {
        title: 'farm_house_12345577'        
    };
    const responseGame = await request(app)
        .post('/api/games/')
        .send(gameData);
    console.log("res = "+JSON.stringify(responseGame, null, 2));

    const validPlayerId =responsePlayer.body._id; 
    const validGameId = responseGame.body._id;

    const responseJoin = await request(app)
        .put(`/api/players/${validPlayerId}/join/${validGameId}`)
        .send();
    console.log(responseJoin);
    expect(responseJoin.status).toBe(200);

    const responseLeave = await request(app)
        .put(`/api/players/${validPlayerId}/leave/${validGameId}`)
        .send();
    console.log(responseLeave);
    expect(responseLeave.status).toBe(200);
    
});
