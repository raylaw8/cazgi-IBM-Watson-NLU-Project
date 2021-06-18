const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    
    const { IamAuthenticator } = require('ibm-watson/auth');
    
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    nlu = getNLUInstance();
    var parameters= { url: req.query.url ,features : {emotion: {}}}
    ret = nlu.analyze( parameters ) //, function( error, response){
        .then (analysisResults=> {
            console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(JSON.stringify(analysisResults.result.emotion.document.emotion, null, 2))
        })
        .catch(err=> {
            console.log( "error",err);
        });
    console.log( ret );
});

app.get("/url/sentiment", (req,res) => {
     nlu = getNLUInstance();
    var parameters= { url: req.query.url ,features : {sentiment: {}}}
    ret = nlu.analyze( parameters ) //, function( error, response){
        .then (analysisResults=> {
            console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(JSON.stringify(analysisResults.result.sentiment.document.label,null,2))
        })
        .catch(err=> {
            console.log( "error",err);
        });
    console.log( ret );
});

app.get("/text/emotion", (req,res) => {
    nlu = getNLUInstance();
    var parameters= { text: req.query.text ,features : {emotion: {}}}
    ret = nlu.analyze( parameters ) //, function( error, response){
        .then (analysisResults=> {
            console.log(JSON.stringify(analysisResults.result.emotion.document.emotion, null, 2));
            return res.send(JSON.stringify(analysisResults.result.emotion.document.emotion, null, 2))
        })
        .catch(err=> {
            console.log( "error",err);
        });
});

app.get("/text/sentiment", (req,res) => {
    nlu = getNLUInstance();
    var parameters= { text: req.query.text ,features : {sentiment: {}}}
    ret = nlu.analyze( parameters ) //, function( error, response){
        .then (analysisResults=> {
            console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(JSON.stringify(analysisResults.result.sentiment.document.label,null,2))
        })
        .catch(err=> {
            console.log( "error",err);
        });
    console.log( ret );
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

