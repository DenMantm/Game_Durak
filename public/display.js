//################################################################################################
//################################################################################################
//##########################################``Elements on screen::::``############################
function gameElements(){
/*
    <div id="main">
      <div class="menu" id="mainMenu">
        <div id="menu">
        <h3 onclick="newgame()" class="border btn" id="info">NewGame</h3>
        </div>
        <br/>
      </div>
      <h5 class="textcent" id="status1">Status Goes Here</h5>
      <h5 class="textcent" id="status">Status Goes Here</h5>
      <div id="div1" class="cent board"></div>
      <div id="div2" class="cent">
        <div id="div4"></div>
        <div id="div5">WILD IS:</div>
      </div>
      <div id="div3" class="cent board"></div>
    </div>
*/
var $div= $("<div>", {id:"main"});
$("#body").append($div);

var $divMenu= $("<div>", {id:"mainMenu", class:"menu"});
$("#body").append($divMenu);
}

//################################################################################################
//################################################################################################
//##########################################``NEW``###############################################

//CARD FORMAT:::::::IMAGE FORMAT
var format = "border-radius:9px;margin-left:8px;background-color:red;float:left;height:135px;width:85px;";
var imageFormat = "height:135px;width:85px;";

var player1 = [];
var player2 = [];
var desk = [];
var playerTurn = true;
var checkArray = [];

//creating temp arrag to store just placed cards and check them


//array for placed cards by player of PC
var placed = [];
var fromPlacer;

function slide(){
frontSlide();
mainSlide();
}
function newgame(){
  //get start values
generateDeck();
startParameters();
//Visual effects here for putting away menu screen and showing playground::
//initCards
addComp(6);
addPlayer(6);
getWild();
swapPlayers();
checkStart();


//Checking if have to resize divs
checkSize();
  //calculating and showing how many cards in deck left::
  document.getElementById("cardsLeft").innerHTML = deck.length;
}
//WHO STARTS THE GAME???
var isStarted = false;
var gameNotPlayed = true;
function checkStart(){
if(gameNotPlayed){
  var p1 =[];
  var p2 =[];
  console.log(wild.type);
  for(var h=0;h<player1.length;h++){
    if(player1[h].type == wild.type ){
      p1.push(player1[h]);
    }
  }
    for(var h=0;h<player2.length;h++){
    if(player2[h].type == wild.type ){
      p2.push(player2[h]);
    }
  }
  //CHECK IF THERE ARE WILD CARDS
  
  //COMPARE IN CASE IF BOTH PLAYERS HAVE WILD CARDS
  if(p1.length>0&&p2.length>0){
      //GETTING HIGHEST VALUE FOR P1
      var p1h = p1[0].value;
      for(var t = 0; t<p1.length;t++){
        if(p1h<p1[t].value){
          p1h = p1[t].value;
        }
      }
      console.log(p1h);
      
      //GETTING HIGHEST VALUE FOR P1
      var p2h = p2[0].value;
      for(var t = 0; t<p2.length;t++){
        if(p2h<p2[t].value){
          p2h = p2[t].value;
        }
      }
      console.log(p2h);
      if(p1h<p2h){
      message("Computer has WILD card with bigger value: "+p2h+", Computer Starts first","1");
        finish();
      }
      else{
        
         message("Player has Wild card with bigger number, Begin","1");
      }
  }
  //IF ONLY PLAYER HAS WILD PLAYERS TURN
    if(p1.length>0&&p2.length===0){
                  
message("Computer has no WILD cards, you start first","1");
  }
  //IF ONLY COMPUTER HAS WILD COMPUTERS TURN
     else if(p1.length===0&&p2.length>0){                       
message("Player has no WILD cards, computer starts first","1");
    finish();
  }
}
else{
  if(playerWonGame){
    message("You won so you Start first","1");
  }
  else{
    message("You lost, Computer starts first","1");
    finish();
  }
}
  isStarted = true;
}




//################################################################################################
//################################################################################################
//##########################################``DISPLAY``###########################################









//Player1 How Many Cards to fill from deck is passed in as parametre
var wild;
function addComp(num){
  for (var ind =  0; ind < num; ind++){
    //if deck length reaches zero, breaking out of the loop
    if(deck.length==0){
      cardsInDeck = false;
      //add wild card to player if last card
var div = document.createElement("div");
div.setAttribute("style",
format+"border:2px solid black;");

div.setAttribute("id", wild.link);
var element = document.getElementById("div1");
element.appendChild(div);
var element1 = document.getElementById(wild.link);
var par = document.createElement("img");
par.setAttribute("src","icon/back.png");
par.setAttribute("style",imageFormat);
element1.appendChild(par);
player2.push(wild);
$("#wild").remove();
      break;
}
var div = document.createElement("div");
div.setAttribute("style",
format+"border:2px solid black;");

div.setAttribute("id", deck[0].link);
var element = document.getElementById("div1");
element.appendChild(div);
var element1 = document.getElementById(deck[0].link);
var par = document.createElement("img");
par.setAttribute("src","icon/back.png");
par.setAttribute("style",imageFormat);

element1.appendChild(par);
player2.push(deck[0]);
deck.splice(0, 1);
}

}
//Player2 How Many Cards to fill from deck is passed in as parametre
function addPlayer(num){
  for (var ind =  0; ind < num; ind++){
    //if deck length reaches zero, breaking out of the loop
    if(deck.length==0){
      cardsInDeck = false;
       //add wild card to player if last card
       var div = document.createElement("div");
div.setAttribute("style",
format+"border:2px solid black;");

div.setAttribute("id", wild.link);
div.setAttribute("class", "card");
var element = document.getElementById("div3");
element.appendChild(div);
var element1 = document.getElementById(wild.link);
var par = document.createElement("img");
par.setAttribute("class","cardx");
par.setAttribute("id","img"+deck[0].link);
par.setAttribute("src","icon/"+deck[0].link+".png");
par.setAttribute("style",imageFormat);
element1.appendChild(par);
player1.push(wild);
$("#wild").remove();

      break;
}


var div = document.createElement("div");
div.setAttribute("style",
format+"border:2px solid black;");

div.setAttribute("id", deck[0].link);
div.setAttribute("class", "card");
var element = document.getElementById("div3");
element.appendChild(div);
var element1 = document.getElementById(deck[0].link);
var par = document.createElement("img");
par.setAttribute("class","cardx");
par.setAttribute("id","img"+deck[0].link);
par.setAttribute("src","icon/"+deck[0].link+".png");
par.setAttribute("style",imageFormat);
element1.appendChild(par);
player1.push(deck[0]);
deck.splice(0, 1);
}
}
//Display on table
function getWild(){
var div = document.createElement("div");
div.setAttribute("style",
format+"border:2px solid black;");
div.setAttribute("id", "wild");
var element = document.getElementById("div5");
element.appendChild(div);
var element1 = document.getElementById("wild");
var par = document.createElement("img");
par.setAttribute("class","cardx");
par.setAttribute("id","img"+deck[0].link);
par.setAttribute("src","icon/"+deck[0].link+".png");
par.setAttribute("style",imageFormat);
element1.appendChild(par);
wild = deck[0];
deck.splice(0, 1);

}
//setting wild card

var cardsInDeck = true;
function fillPlayer(){
  
  //if there are no cards in deck do nothing ---
  if(cardsInDeck){

  //Filling with needed value
  //Who fills first??
  if(playerTurn){
  
  if(player1.length<6){   
      addPlayer(6-player1.length);
  }
  if(player2.length<6){
      addComp(6-player2.length);   
  }


  }
  else{
  if(player2.length<6){
      addComp(6-player2.length);   
  }
   if(player1.length<6){   
      addPlayer(6-player1.length);
  }
  }



  //calculating and showing how many cards in deck left::
  document.getElementById("cardsLeft").innerHTML = deck.length;
}
}


//################################################################################################
//################################################################################################
//##########################################EVENTS################################################

//waits for tic event handler
function whichElement(e) {
    var targ;
    if (!e) {
         e = window.event;
    }
    if (e.target) {
        targ=e.target;
    } else if (e.srcElement) {
        targ=e.srcElement;
    }
    var tname = targ.id;

    var element = document.getElementById(tname);

    if(element === undefined||element === null)return;
    var tempA = element.getAttribute("class");
    
    if(tempA == "card"){
    select(tname);
    }

        //JUST IN CASE IF PRESSED ON IMAGE
        else if(tempA == "cardx"){
    select(tname.slice(3));
    }
    
}
  //PLAYER 1 GENERATING EVENTS
 //   for(var g =0;g<player1.length;g++){
  //   temp = "1par"+g;
  //   if(tname == temp){

       
     //  break;
    // }
//}
    //PLAYER 2 GENERATING EVENTS
function checkSize(){
      //BOARD RESIZ
  if(desk.length<=3){
      //Size One
      ele = document.getElementById('div2');
  var te = ele.getAttribute("style");
  te =  te +"height:230px;";
  ele.setAttribute("style",te);
        ele1 = document.getElementById('div4');
        var te = ele1.getAttribute("style");
  te =  te +"height:180px;";
  ele1.setAttribute("style",te);
    }
    //resizing areas of PLAYER
    if(player1.length>=15){
      //Size One
      ele = document.getElementById('div3');
  var te = ele.getAttribute("style");
  te =  te +"height:250px;";
  ele.setAttribute("style",te);
  p1=p1+100;
    }
  if(player1.length<=14){
      //Size One
      ele = document.getElementById('div3');
  var te = ele.getAttribute("style");
  te =  te +"height:195px;";
  ele.setAttribute("style",te);
  p1="110";
    }
     //resizing areas of COMPUTER
    if(player2.length>=15){
      //Size One
      ele = document.getElementById('div1');
  var te = ele.getAttribute("style");
  te =  te +"height:250px;";
  ele.setAttribute("style",te);
  p2="220";
    }
        if(player2.length<=14){
      //Size Two
      ele = document.getElementById('div1');
  var te = ele.getAttribute("style");
  te =  te +"height:195px;";
  ele.setAttribute("style",te);
  p2="110";
    }

}

setInterval(
  function(){

  },500);
//###############################################################################################
//###############################################################################################
//#################################MAINTIMER#####################################################

//Using This As Game Loop(I Dont Like Infinite Loops, So im using timer instead)

function select(card){
    //FOR PLAYER FIELD
  for(var dir = 0;dir<player1.length;dir++){
  if(player1[dir].link==card){

  //IF NOT SELECTED
   if(player1[dir].select=="1"){
   var elementCard = document.getElementById(card);
   var tempAttribute = elementCard.getAttribute("style");
  tempAttribute =  tempAttribute +"border:2px solid black;";
  elementCard.setAttribute("style",tempAttribute);
  //CHANGING PROPERTY OF THE OBJECT
  player1[dir].select="0";
  return;
   }
   if(player1[dir].select=="0"){
   var elementCard = document.getElementById(card);
   var tempAttribute = elementCard.getAttribute("style");
  tempAttribute =  tempAttribute +"border:2px solid yellow;";
  elementCard.setAttribute("style",tempAttribute);
  //CHANGING PROPERTY OF THE OBJECT
  player1[dir].select="1";
  return;
   }
  }
  }
     //FOR BOARD FIELD
     for(var dir = 0;dir<desk.length;dir++){
  if(desk[dir].link==card){
  //FOR PLAYER FIELD
  //IF NOT SELECTED
   if(desk[dir].select=="1"){
   var elementCard = document.getElementById(card);
   var tempAttribute = elementCard.getAttribute("style");
  tempAttribute =  tempAttribute +"border:2px solid black;";
  elementCard.setAttribute("style",tempAttribute);
  //CHANGING PROPERTY OF THE OBJECT
  desk[dir].select="0";
  return;
   }
   if(desk[dir].select=="0"){
   var elementCard = document.getElementById(card);
   var tempAttribute = elementCard.getAttribute("style");
  tempAttribute =  tempAttribute +"border:2px solid yellow;";
  elementCard.setAttribute("style",tempAttribute);
  //CHANGING PROPERTY OF THE OBJECT
  desk[dir].select="1";
  return;
   }
  }
  }

  //Working With Object Itself
  //for(var h=0;h<player1.length;h++){

    //if(card==)
  //}
}
function place(){
  if(noWinner)checkWinner();
  for(var n = player1.length-1 ;n>=0; n= n-1){
  var k = player1[n].select;
  if(k == "1"){
    // var elem = document.getElementById(player1[n].link);
    // elem.remove();
    $("#"+player1[n].link).remove(); 
    //player1[n].select = "0";
    checkPlace(player1[n],n);
    
    checkSize();
  }
  }
}
//checking if you can place the card or not
function checkPlace(car,ind){
  player1.splice(ind, 1);
  arrange();
  fromPlacer = false;
  //Checking on the desk itself
  for(var s = 0; s<desk.length;s++){
    if(car.value == desk[s].value){
      fromPlacer = true;
    }
  }
  //checking in placed cards
    for(var s = 0; s<placed.length;s++){
        if(car.value == placed[s].value){
      fromPlacer = true;
    }
  }
  console.log(fromPlacer);
  
  //Passing card further
  goWithCard(car);
}
//pass into this function any card, and it will place it on the table
function goWithCard(car){

console.log(car.link+" : Card on The table");
var div = document.createElement("div");
div.setAttribute("style",
format+"border:2px solid black;");
div.setAttribute("id", car.link);
div.setAttribute("class", "card");
var element = document.getElementById("div4");
//This is where to place card
var placer = document.createElement("div");
placer.setAttribute("id", car.link+"box");
placer.appendChild(div);
element.appendChild(placer);
var element1 = document.getElementById(car.link);
var par = document.createElement("img");
par.setAttribute("class","cardx");
par.setAttribute("id","img"+car.link);
par.setAttribute("src","icon/"+car.link+".png");
par.setAttribute("style",imageFormat);
element1.appendChild(par);
//adding card to deck array
car.select="0";
desk.push(car);
 //wild = car.type;
}

function placeBack(){
  //we have array desk where cards are placed on table
    for(var n = desk.length-1 ;n>=0; n= n-1){
  var k = desk[n].select;
  if(k == "1"){
     
     //Remove element
     //var elem = document.getElementById(desk[n].link);
    // elem.remove();
    $("#"+desk[n].link).remove(); 
    
    goBackCard(desk[n]);
    desk.splice(n, 1);
    checkSize();
  }
  }
}

function goBackCard(car){
var div = document.createElement("div");
div.setAttribute("style",
format+"border:2px solid black;");
div.setAttribute("id", car.link);
div.setAttribute("class", "card");

//if(player1.length > 6){
 // div.setAttribute("class", "card row2");
//}

var element = document.getElementById("div3");
//This is where to place card

element.appendChild(div);
var element1 = document.getElementById(car.link);
var par = document.createElement("img");
par.setAttribute("class","cardx");
par.setAttribute("id","img"+car.link);
par.setAttribute("src","icon/"+car.link+".png");
par.setAttribute("style",imageFormat);
element1.appendChild(par);
car.select = "0";
player1.push(car);
// wild = car.type;
checkSize();
}

//BEAT THE CARD

function beat(car,lk){
  //we have array desk where cards are placed on table

     //var elem = document.getElementById(car.link);
     //elem.remove();
     $("#"+car.link).remove(); 
    beatCard(car,lk);
    checkSize();
}
function beatCard(car, lk){
  console.log(lk);
var div = document.createElement("div");
div.setAttribute("style",
format+"border:2px solid black;");
div.setAttribute("id", car.link);
div.setAttribute("class", "card beat");
var element = document.getElementById(lk+"box");

//Painting box
   var tempAttribute = element.getAttribute("style");
  tempAttribute =  "border:2px solid red; height:145px;width:135px;float:left";
  element.setAttribute("style",tempAttribute);

//This is where to place card
element.appendChild(div);
var element1 = document.getElementById(car.link);
var par = document.createElement("img");
par.setAttribute("class","cardx");
par.setAttribute("id","img"+car.link);
par.setAttribute("src","icon/"+car.link+".png");
par.setAttribute("style",imageFormat);
element1.appendChild(par);
car.select = "0";
placed.push(car);
// wild = car.type;
checkSize();
}
//
//
//
//
//Beating Computer Card
//
//
//
//
function beatComputer(){
  arrange();
  var card1;
  var card2;
  var selectCounter1 = 0;
  var selectCounter2 = 0;
  var temp1;

//Checking how many cards selected in player1
for(var k = 0;k<player1.length;k++){
  if(player1[k].select == 1){
    card1 = player1[k];
    temp1 = k;
    selectCounter1 = selectCounter1 + 1;
  }
}
for(var k = 0; k<desk.length; k++){
  if(desk[k].select == 1){
    card2 = desk[k];
    
    selectCounter2 = selectCounter2 + 1;
  }
}
//Checking conditions to place the card
  if(selectCounter1===1 && selectCounter1===1){
             console.log("Card1: "+card1.link);
             console.log("Card2: "+card2.link);
             if(card1.value>card2.value && card1.type ==card2.type){
            
            console.log(card1.link+" BEATS "+card2.link);
            beat(card1, card2.link);
            player1.splice(temp1, 1);
            //rearranging cards
            arrange();
            //CHECKING IF HAVE SOMETHING TO ADD
            addTotable();
             }
             else if(card1.type===wild.type&&card2.type!=wild.type){
            console.log(card1.link+"(WILD)"+" BEATS "+card2.link);
            beat(card1, card2.link);
            player1.splice(temp1, 1);
            //CHECKING IF HAVE SOMETHING TO ADD
            addTotable();
             }
             else{
               element = document.getElementById('status1');
message("You Cant Beat The Computers Card With This Card!");
             }

           //desk[k].done = true;
  }
  else{
                   element = document.getElementById('status1');
message("Cards Selected unproperly");
  }
 checkSize();
 unselect();
 //if cards beaten = cards on table then finish
 arrange();
 checkIfFinish();
}
//if computer has no more cards to throw in on player:::
function checkIfFinish(){
  if(desk.length == placed.length){
    finishByPlayer();
  }
}
function check(){
  console.log("Player1: "+player1.length);
    for(var k = 0;k<player1.length;k++){
    console.log("Card"+(k+1)+": "+player1[k].link);
  }
  console.log("Player2: "+player2.length);
      for(var k = 0;k<player2.length;k++){
    console.log("Card"+(k+1)+": "+player2[k].link);
  }
  console.log("###################");
  console.log("Desk: "+desk.length);
  console.log("Placed: "+placed.length);
}
////
//
//
//
//
//Just in case if computer has some cards to throw to the player
//
//
//
//
//
function addTotable(){

//JUST COMPINING ALL CARDS ON THE TABLE INT ONE ARRAY
//##########Its good idea afterwards to implement more devastating logic
var tempCompare = [];
var cardPlaced=false;
for(var p=0;p<placed.length;p++){
  
  tempCompare.push(placed[p]);
}
for(var p=0;p<desk.length;p++){
  
  tempCompare.push(desk[p]);
}


//COMAPING CARDS

for(var r = 0; r<tempCompare.length;r++){
  console.log(tempCompare[r]);
  for(var n = player2.length-1 ;n>=0; n= n-1){
    console.log("####addTotable####");
    if(tempCompare[r].value == player2[n].value&&player1.length !=0){
      console.log("####Value####");
      //IF THERE ARE ONLY FEW CARDS LEFT IN THE DECK
      
    //var elem = document.getElementById(player2[n].link);
    //elem.remove();
    $("#"+player2[n].link).remove(); 
    goWithCard(player2[n]);
    console.log("Computer is placing Card: "+player2[n].link)
    player2.splice(n, 1);
      
      /* else{
        //Just if value of the card is not to big
       if(player2[n]<13&&player2[n].type!==wild.type){
    var elem = document.getElementById(player2[n].link);
    elem.remove();
    goWithCard(player2[n]);
    console.log("Computer is placing Card: "+player2[n].link)
    player2.splice(n, 1);
        }*/
      }
    }
}
checkSize();
}

//
//
//
//
//
//In Case if player wants to pick up all cards from the table
//
//
//
//
function pickUp(){
     
for(var p=0;p<placed.length;p++){
      //var elem = document.getElementById(placed[p].link);
    // elem.remove();
    $("#"+placed[p].link).remove(); 
  goBackCard(placed[p]);
  console.log(placed[p]);
}
for(var p=0;p<desk.length;p++){
    //var elem = document.getElementById(desk[p].link);
    // elem.remove();
    $("#"+desk[p].link).remove(); 
     console.log(desk[p]);
     goBackCard(desk[p]);
}
     
    finishByPlayer();
    finish();
    checkSize();
    arrange();
}

//###############################################################################################
//###############################################################################################
//#################################SCRIPT########################################################
// Code goes here

var deck = [];

function generateDeck(){
var object = {};
var symb;
for(var i = 1; i <=4;i++){
  for(var g = 2; g <=14;g++){
  if(i ==1) {symb = "c";}
  if(i ==2) {symb = "d";}
  if(i ==3) {symb = "h";}
  if(i ==4) {symb = "s";}
  var card = g+symb;
   object = {"value":g,
              "sele":true,
              "check":false,
                "type":symb,
                "link":card,
                "done":false,
                "height":"225px",
                "select":"0",
               "width":"315"
  };
    //adding Object to an array
    deck.push(object);
  }
  }
  //shuffle algorithm
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
deck = shuffleArray(deck);
}
  
//"'"+symb+"'"
//Initiating main Logic
//#############################################################################################
//#############################################################################################
//##########################################LOGIC##############################################
function makeMove(){
  var moveAllowed = false;
  var counter = 0;
   if(desk.length===0){
    moveAllowed = false;
  }
  if(desk.length===1){
    moveAllowed = true;
  }
  //if longer than 1 comparing same card rool
  if (desk.length > 1){
   //For Desk 
  for(var q = 1; q < desk.length;q++){
    //counting same value cards
    if(desk[0].value == desk[q].value){
      counter = counter +1;
    }
  }
  }
  if(placed.length!==0){
var tempdesk = [];
for(var a = 0;a<placed.length;a++){
  tempdesk.push(placed[a]);
}
for(var a = 0;a<desk.length;a++){
  tempdesk.push(desk[a]);
}

}
  if(counter == desk.length-1){
    moveAllowed = true;
  }
  
  //CHECKING IF MOVE IS ALLOWED
    if(moveAllowed !== true && fromPlacer !== true){
        element = document.getElementById('status');
element.innerHTML = 'Invalid Move';
  }
  
    if(moveAllowed === true || fromPlacer === true){
    element = document.getElementById('status');
element.innerHTML = 'Making Move!';
      //
      //
      //
      //
      //
      //Imitating logic of the human being
      //STARTING WITH ORDINARY CARDS
      //BEATING CARDS
      //
      //
      //
      //
      for(var l = 0;l<desk.length;l++){
       for(var f = 0; f <player2.length;f++){
         if(desk[l].value < player2[f].value && desk[l].type == player2[f].type){
           
           if(desk[l].done!==true){
           console.log(player2[f].link);
            //SENDING IT TO BEAT METHOD
           beat(player2[f], desk[l].link);
            
            player2.splice(f, 1);
           
           desk[l].done = true;
         }
         }
       }
      }
      //IMITATING WILD CARD LOGIC HERE

            for(var l = 0;l<desk.length;l++){
       for(var f = 0; f <player2.length;f++){
         if(player2[f].type===wild.type && desk[l].type !== wild.type){
           if(desk[l].done!==true){
           console.log(player2[f].link);
           //SENDING IT TO BEAT METHOD
           beat(player2[f], desk[l].link);
           
            player2.splice(f, 1);
            
           desk[l].done = true;
         }
         }
       }
      }
      //
      //
      //
      //
      //THAST IF NOTHING TO BEAT WITH....
      //
      //
      //
      //
      //
      if(desk.length!==placed.length){
        //SETTING SO THAT IT WOULDNT CHANGE MENU:
        playerTurn = true;
        
        console.log("THERE IS NO CARD TO BEAT IT WITH....");
         //take cards from desk
         
for(var f = desk.length-1;f>=0;f--){
  console.log();
  placed.push(desk[f]);
}
         
         
for(var f = placed.length-1;f>=0;f--){
           console.log("one");
var div = document.createElement("div");
div.setAttribute("style",
format+"border:2px solid black;");
div.setAttribute("id", placed[f].link);
var element = document.getElementById("div1");
element.appendChild(div);
var element1 = document.getElementById(placed[f].link);
var par = document.createElement("img");
par.setAttribute("src","icon/back.png");
par.setAttribute("style",imageFormat);
element1.appendChild(par);
player2.push(placed[f]); 
         }
         /*
         //Take cards which was given
        for(var f = placed.length-1; f>=0 ;f--){
   div.setAttribute("id", placed[f].link);
   
   //CHECKER:::::
    console.log("two");
   console.log(placed[f].link);
          var element = document.getElementById("div1");
          element.appendChild(div);
var element1 = document.getElementById(placed[f].link);
var par = document.createElement("p");
par.innerHTML = placed[f].link;
element1.appendChild(par);
           player2.push(placed[f]);
         }
         */
        //FINALIZING MOVE
         finishByPlayer();
      }
      
    }
checkSize();
arrange();
if(noWinner)checkWinner();
}
//
//
//
//
//FINALIZING MOVE
//
//
//
//Clearing Table

function finish(){

for (var q = 0;q<desk.length;q++){
    // var elem = document.getElementById(desk[q].link+"box");
    // elem.remove();
    $("#"+desk[q].link+"box").remove();
}
desk = [];
placed = [];
  if(noWinner)checkWinner();

//Filling card decks::
fillPlayer();

botPlaceCard();
swapPlayers();

}
function finishByPlayer(){

for (var q = 0;q<desk.length;q++){
     //var elem = document.getElementById(desk[q].link+"box");
    //elem.remove();
    $("#"+desk[q].link+"box").remove(); 
}
desk = [];
placed = [];
if(noWinner)checkWinner();
//Filling card decks::
fillPlayer();
swapPlayers();
}
//
//
//
//
//COMPUTER PLACING CARD
//
//
//
//

function botPlaceCard(){
  if(noWinner)checkWinner();
  for(var h =0;h<player2.length;h++){
    for(var g =0;g<player2.length;g++){
      //EXCLUDING TO COMPARE SAME CARD
       if(g!==h){
       if(player2[h].value ===player2[g].value){
        if(deck.length<20){
          //If less than 20
          console.log("condition one");
          console.log(player2[h].link);
          console.log(player2[g].link);
          console.log(g);
          console.log(h);
    //var elem = document.getElementById(player2[h].link);
    //elem.remove();
    $("#"+player2[h].link).remove();

    //var elem1 = document.getElementById(player2[g].link);
   // elem1.remove(); 
           $("#"+player2[g].link).remove();
          goWithCard(player2[h]);
          goWithCard(player2[g]);
          if(g < h){
            console.log("case1");
           console.log(player2[h].link);
           console.log(player2[g].link);
            player2.splice(h, 1);
            player2.splice(g, 1);
            arrange();

          }
          if(g > h){
            console.log("case2");
           console.log(player2[h].link);
           console.log(player2[g].link);
            player2.splice(g, 1);
            player2.splice(h, 1);
            arrange();
          }
          
         return;
        }
        
        else if(deck.length>=20){
          console.log("condition two");
          console.log(player2[h].link);
          console.log(player2[g].link);
          //if more than 20
       // if(player[2].value<11){
    //var elem = document.getElementById(player2[h].link);
    //elem.remove();
    $("#"+player2[h].link).remove();

    //var elem1 = document.getElementById(player2[g].link);
   // elem1.remove(); 
           $("#"+player2[g].link).remove();
          goWithCard(player2[h]);
          goWithCard(player2[g]);
           console.log(g);
          console.log(h);
    
           if(g<h){
             console.log("case1");
           console.log(player2[h].link);
           console.log(player2[g].link);
            player2.splice(h, 1);
            player2.splice(g, 1);
            arrange();
          }
          else if(g>h){
            console.log("case2");
           console.log(player2[h].link);
           console.log(player2[g].link);
            player2.splice(g, 1);
            player2.splice(h, 1);
            arrange();
          }
          return;
       // }
        }


       }
 
    }
    }
  }
            //SENDING CARSD WHICH FIT TO THE DESK ::
  //Check if have to be placed first
        //IF NO DUPLICATE CARDS
        if(desk[0]===undefined&&player2.length!==0){
          console.log("######Link undefined#####");
          var rand = Math.floor(Math.random() * (player2.length-1));
          console.log(rand);
     //var elem1 = document.getElementById(player2[rand].link);
     //elem1.remove();
     $("#"+player2[rand].link).remove(); 
          goWithCard(player2[rand]);
           player2.splice(rand, 1);
           arrange();
          
        }

}

//#############################################################################################
//#############################################################################################
//####################################MENUE###################################################

//Checking Condition for the menue:

function swapPlayers(){
if(playerTurn){
  playerTurn = false;
  //Deleting Existing menue:
 //var elem = document.getElementById("menu");
     //elem.remove();

     $("#menu").remove();
  //Thats Container
  var menu = document.createElement("div");
  menu.setAttribute("id", "menu");
  
  var element = document.getElementById("mainMenu");
    element.appendChild(menu);
  //Menu Elements:
  
  //Creating Arrays for menu
  var action = ["validMove()", "finish()"];
  var title = ["-Make Move-", "-Finish Move-"];
  var e = document.getElementById("menu");
  for(var r = 0; r<2;r++){
  var el = document.createElement("h3");
  el.setAttribute("class","border btn");
  el.setAttribute("onclick",action[r]);
  el.setAttribute("id","info"+r);
  el.innerHTML = title[r];
  e.appendChild(el);
  }
  //Changing Status Log
element = document.getElementById('status');
message('Players Turn, Make Move');
  //Finishing Function
  arrange();
  if(noWinner)checkWinner();

  return;
}
else{
  message('Computers Turn, He is making Move');
  playerTurn = true;
  //var elem = document.getElementById("menu");
     //elem.remove();
     $("#menu").remove(); 
  //Thats Container
  var menu = document.createElement("div");
  menu.setAttribute("id", "menu");
  
  var element = document.getElementById("mainMenu");
    element.appendChild(menu);
  //Menu Elements:
  
  //Creating Arrays for menu
  var action = [ "beatComputer()", "pickUp()"];
  
  var title = ["-Beat Card-", "-Pick Up-"];
  var e = document.getElementById("menu");
  for(var r = 0; r<2;r++){
  var el = document.createElement("h3");
  el.setAttribute("class","border btn");
  el.setAttribute("onclick",action[r]);
  el.setAttribute("id","info"+r);
  el.innerHTML = title[r];
  e.appendChild(el);
  }
  arrange();
  if(noWinner)checkWinner();
}
}

//################################################################################################
//################################################################################################
//##########################################``Unselect Cards``################################
//FTER move unslect card
function unselect(){
for(var i =0;i<desk.length;i++){
  console.log(desk[i].select);
if(desk[i].select == 1){
  //unselecting element
select(desk[i].link);

}
}
}
//place cards on table, validate and make move
function validMove(){
  var isAllowed = false;
  //Getting all selected cards in player1
  
  for(var n = player1.length-1 ;n>=0; n= n-1){
  var k = player1[n].select;
  if(k == "1"){
    player1[n].check = false;
    console.log("Card in Check array: "+ player1[n].link);
    checkArray.push(player1[n]);
    }
  }

//situation when Just started move:::
if(desk.length == 0&&checkArray.length == 1){
  checkArray[0].check = true;
   console.log("card true");
}

else if(desk.length == 0&&checkArray.length>1){
  for(var n=0; n<checkArray.length; n++){
    console.log(checkArray[0].value);
    checkArray[0].check = true;
    if(checkArray[0].value == checkArray[n].value){
      checkArray[n].check = true;
    } 
}
}
//In case if this is not first move
else{
  //Assembling one arras so it would be easier to compare
  var tempdesk = [];
for(var a = 0;a<placed.length;a++){
  tempdesk.push(placed[a]);
}
for(var a = 0;a<desk.length;a++){
  tempdesk.push(desk[a]);
}

  for(var n=0; n<checkArray.length; n++){
for(var m=0; m<tempdesk.length; m++){
    if(checkArray[n].value == tempdesk[m].value) checkArray[n].check = true;
  }
}
}
//comparing with cards we have on the table

  //Check if move is allowed or not
isAllowed = true;
for(var n = 0; n<checkArray.length; n++){
//checking if all cards are allowed to play
console.log("card is: "+ checkArray[n].check);
if(checkArray[n].check == false){
    isAllowed = false;
}
}
//if allowed making move
console.log("isallowed: " +isAllowed);
if(isAllowed == true){
place();
makeMove();
}
else{
  message("Move not allowed");
}
checkArray = [];
}

function arrange(){
  //Checking size of the Player's CARD's ARRAY
  
  for(var h=0;h<player1.length;h++){
  if(h>=7){
  var elementCard = document.getElementById(player1[h].link);
  elementCard.setAttribute("class","card row2");
    }
  else if(h<=6){
  var elementCard = document.getElementById(player1[h].link);
  elementCard.setAttribute("class","card");
    }  
  }
    for(var h=0;h<player2.length;h++){
  if(h>=7){
  var elementCard = document.getElementById(player2[h].link);
  elementCard.setAttribute("class","card row2");
    }
  else if(h<=6){
  var elementCard = document.getElementById(player2[h].link);
  elementCard.setAttribute("class","card");
    }  
  }
}

//Getting start input parameters
var player = {"name":"",
            "score":0};
var computer = {"score":0};
var isNotify;

function startParameters(){
  //document.getElementById("player").value;
  player.name = document.getElementById("player").value;
  document.getElementById("playerN").innerHTML = player.name;
  document.getElementById("playerNn").innerHTML = player.name;
  
  isNotify = document.getElementById("notify").checked;

}


//Notify user if something has happened
var isOn = false;
function message(msg,ind){
if(isNotify){
  if (isStarted||ind =="1"){
  document.getElementById("message_stats").innerHTML = msg;
  if(isOn===false){
  $("#message_stats").slideToggle();
    isOn= true;
  setTimeout(
  function(){
    $("#message_stats").slideToggle();
    isOn=false;
  
  },5000);
}
  }
}
}
var noWinner = true;
var playerWonGame;
function checkWinner(){
if(cardsInDeck === false){
  if(desk.length==0&&player2.length == 0){
    noWinner = false;
    computer.score+=1;
    mainSlide();
    endSlide();
    document.getElementById("end_info").innerHTML = "You Lost!";
    playerWonGame = false;
    gameNotPlayed = false;
  }
  else if(desk.length==0&&player1.length ==0){
      noWinner = false;
      player.score+=1;
    mainSlide();
    endSlide();
    document.getElementById("end_info").innerHTML = "Congratulations, You Won!";
    playerWonGame = true;
    gameNotPlayed = false;
  }
  else if(desk.length==0&&player1.length ==0&&player2.length == 0){
    noWinner = false;
    mainSlide();
    endSlide();
    document.getElementById("end_info").innerHTML = "Draw, no winner!";
    gameNotPlayed = true;
  }
  document.getElementById("playerWon").innerHTML = player.score;
  document.getElementById("end_playerWon").innerHTML = player.score;
  document.getElementById("end_computerWon").innerHTML = computer.score;
  document.getElementById("computerWon").innerHTML = computer.score;
}
console.log("CHECKWIN WORKING");
}

function fin(){
//this triggers

document.getElementById("div1").innerHTML = "";
document.getElementById("div3").innerHTML = "";
document.getElementById("div4").innerHTML = "";


//Have to undo these values::::
player1 = [];
player2 = [];
desk = [];
playerTurn = true;
checkArray = [];
deck = [];
//creating temp arrag to store just placed cards and check them


//array for placed cards by player of PC
placed = [];
fromPlacer = "";
noWinner = true;
cardsInDeck = true;
isStarted = false;
wild = {};
  document.getElementById("playerWon").innerHTML = player.score;
  document.getElementById("end_playerWon").innerHTML = player.score;
  document.getElementById("end_computerWon").innerHTML = computer.score;
  document.getElementById("computerWon").innerHTML = computer.score;
}

function exitToMenu(){
gameNotPlayed = true;
endSlide();
frontSlide();
player.score = 0;
computer.score = 0;
fin();
}
function restart(){
//this triggers function that decides who starts first
endSlide();
mainSlide();
fin();
newgame();
}
///VISUAL EFFECTS HERE
function mainSlide(){
$("#main").slideToggle("slow");
}
function frontSlide(){
  $("#frontMenu").slideToggle("slow");
}
function endSlide(){
    $("#endMenu").slideToggle("slow");
}