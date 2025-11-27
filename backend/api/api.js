const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');
const { request } = require('http');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

//! ------------------------------------------------------------------- //

let wordList = ['aa','bb','cc'];
 
router.post('/addWord', (request, response) => {
    let { word } = request.body;
    word = word.toString().toLowerCase();
   console.log(`Before: ${wordList}`)
  

    let didAdd = false;

    let j = 0;
    while(j < wordList.length && wordList[j].toLowerCase() != word){
        j++;
    }

    if(j < wordList.length){
        console.log("This word already exists!");
    } else {
        wordList.push(word);
        didAdd = true;
    }

    console.log(`After: ${wordList}`)


    response.status(200).json({
        message: "Success",
        didAdd: didAdd,
        newArray: wordList
    });

});
router.post('/removeWord', (request, response) => {
    let { word } = request.body;
    word = word.toString().toLowerCase();


    let didDelete = false;

    let j = 0;
    while(j < wordList.length && wordList[j].toLowerCase() != word){
        j++;
    }

    if(j < wordList.length){
        wordList.splice(j, 1);
        didDelete = true;
    } 

    response.status(200).json({
        message: "Success",
        didDelete: didDelete,
        newArray: wordList
    });
});

router.get('/randomWord', (request, response) => {
    let rnd = Math.floor(Math.random() * wordList.length);
    response.status(200).json({
        message: "Success",
        randomWord: wordList[rnd]
    });
});

router.get('/listWords', (request, response) => {
    response.status(200).json({
        message: "Success",
        wordList: wordList
    }); 
})

module.exports = router;
