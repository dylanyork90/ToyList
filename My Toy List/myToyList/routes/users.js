
var express = require('express');
var router = express.Router();

let serverToyArray = []; // our "permanent storage" on the web server

// define a constructor to create Toy objects
var ToyObject = function (pTitle, pYear, pGenre, pCreator, pHeight) {
  this.Title = pTitle;
  this.Year = pYear;
  this.Genre = pGenre;  
  this.Creator = pCreator;
  this.Height = pHeight;
}

// for testing purposes, its nice to preload some data
serverToyArray.push(new ToyObject("Optimus_Prime", 1985, "Transformer", "Hasbro", "1.5 inches"));
serverToyArray.push(new ToyObject("He-Man", 1988, "Action Figure", "Mattel", "1 inches"));
serverToyArray.push(new ToyObject("Barbie", 1978, "Doll", "Mattel", "3 inches"));



/* POST to addToy */
router.post('/addToy', function(req, res) {
  console.log(req.body);
  serverToyArray.push(req.body);
  console.log(serverToyArray);
  //res.sendStatus(200);
  res.status(200).send(JSON.stringify('success'));
});



/* GET ToyList. */
router.get('/toyList', function(req, res) {
  res.json(serverToyArray);
 });

 /* DELETE to deleteToy. */
 router.delete('/deleteToy/:Title', function(req, res) {
  let Title = req.params.Title;
  Title = Title.toLowerCase();  // allow user to be careless about capitalization
  console.log('deleting ID: ' + Title);
   for(let i=0; i < serverToyArray.length; i++) {
     if(Title == (serverToyArray[i].Title).toLowerCase()) {
     serverToyArray.splice(i,1);
     }
   }
   res.status(200).send(JSON.stringify('deleted successfully'));
});


//  router.???('/userlist', function(req, res) {
//  users.update({name: 'foo'}, {name: 'bar'})



module.exports = router;

