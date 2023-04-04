const { table } = require('console');
const { read } = require('fs');
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
// run the program in the terminal: node index.js

/* 
  * Index At-A-Glance
    - Classes & Methods
    - Objects
    - Dictionaries
    - Functions
      - Item-Based Functions
      - Room-Based Functions
      - Late Game Functions
      - Play & PlayAgain Function
    - Default Settings
    - Start Function
*/

//* Classes
// ---------------------
//* Item Class:
class Item {
  constructor(findable, value, readable) {
    this.called = findable;
    // what the item is called within the room
    this.energy = value;
    // how reading the item will affect the player
    this.reads = readable;
    // what gets read when using the "read" method
    this.used = false;
    // all items begin as not used
  }

  read() {
    if (this.reads == undefined) {
      // if there is no readable property
      console.log("Sorry, this item can't be read.");
    } else if (this.used === false) {
      // if there IS a readable property and player has not read the item, read it
      console.log(`${this.reads}`);
      playerEnergy = playerEnergy + this.energy;
      this.used = true;
    } else {
      // if there IS a readable property and player has already read the item
      console.log(`${this.reads}`);
      playerEnergy = playerEnergy - 1;
    }
  }

  use() {
    if (this === ironKey && currentLocation === westernHall && conservatory.locked === true) {
      // if this item is the key and it makes sense for the key to work right now
      console.log("The green door opens!");
      conservatory.locked = false;
    } else {
      // otherwise, items are not useable
      console.log("This item does not appear to have a use in this room.");
    }
  }
}

//* Location Class:
class Location {
  // parts of a location
  constructor(name, desc, neighbors) {
    this.name = name;
    // name of a location
    this.description = desc;
    // description of a location
    this.nextTo = neighbors;
    // neighboring rooms of a location
    this.locked = false;
    // default for all locations is UNLOCKED
  }
  
  // look method returns location description
  look() {
    console.log("\n" + this.description + "\n");
    play();
  }
}

//* Room Class:
class Room extends Location {
  // parts of a room
  constructor(name, desc, neighbors, searchableItem, within) {
    super(name, desc, neighbors);
    // send the above to Location class
    this.thing = searchableItem;
    // object within the room that is meant to be searched
    this.treasure = within;
    // item within the searchable object that correlates with Item class objects
  }

  search(param) {
    let newParam = param.toLowerCase();
    // ensure param can be interpreted by converting it to lowercase
    playerEnergy = playerEnergy - 10;
    // every search costs 10 energy
    if (newParam == this.thing) {
      // if user selects the item that is intended to be searched
      console.log(`You search the ${this.thing} and find a(n) ${this.treasure}!`);
    } else {
      // if user selects a different item
      console.log("Nice try, but there's nothing to see here.");
    }
  }
  
  addToInventory(thingy) {
    // abbreviate input
    let abbrThingy = thingy.substring(0, 10);
    // abbreviate treasure
    let abbrTreasure = this.treasure.substring(0, 10);
    // analyze input that user desires to add to inv
    if (abbrThingy == abbrTreasure && this.treasure != "dust bunnies") {
      // if user selects the takeable item correctly
      console.log(`You eagerly tuck the ${thingy} away in your backpack. Who knows? It could be useful in the future!`);
      if (iteration === 1) {
        // if first found item, set up inventory to accept items
        inventory = [];
        // send the name of the "treasure" to the pushToInventory function to convert it to the Item form & add to inventory
        pushToInventory(this.treasure);
        // energy boost for finding 1st item
        playerEnergy = playerEnergy + 15;
        // reset findable item to something user does not want to prevent multiples
        this.treasure = "dust bunnies";
        // increment iteration to avoid possible erasure of items
        iteration++;
      } else {
        // after first found item, do everything except reset inventory
        pushToInventory(this.treasure);
        playerEnergy = playerEnergy + 10;
        this.treasure = "dust bunnies";
      }
    } else if (abbrThingy == abbrTreasure && this.treasure == "dust bunnies") {
      // if user has already taken the thing from the searchable item
      console.log(`You've already been here, the dust bunnies aren't going to help you.`)
      playerEnergy = playerEnergy - 5;
    } else {
      // if the user tries to take something else (non-takeable)
      console.log(`You can't add ${thingy} to your inventory.`);
    }
  }
} // end of Room Class

//* List of Possible Inventory Items:
// ---------------------
let invite = new Item("invitation", 2, "The invitation is too smudged and torn to read fully, but you're able to make out the fact that there was a party at this house recently. You can also conclude that there are some vague directions about how to get from the Main Hall to the Dining Room.");

let guestList = new Item("guest list", 2, "The list reads, 'My dearest Elizabeth, the Reverend Green, the Honorable Colonel Mustard, the lovely Miss Scarlett, and Professor Plum.' You note that each of these names have been crossed off, as if attendance had been taken. A note at the bottom seems to be a reminder to its author to have a 'Mrs. White' obtain the finest rib eye.");

let book = new Item("book with yellow handkerchief for a placeholder", -15, "You pick up the book and observe its title is 'War and Peace'. You turn to the spot where the handkerchief sits and begin to read. You find yourself becoming very, very, tired...");

let loveNote = new Item("hand-written love note", 1, "Blech! It's full of mushy love stuff and smells overpoweringly like men's cologne. But you observe that it is signed by the name of 'John Boddy.'");

let ironKey = new Item("old-fashioned, iron skeleton key", 2, "You pick up the key. It reads 'Conservatory.'");

let cufflinks = new Item("pair of emerald cufflinks engraved with the letter 'G'", 0);

let lipstick = new Item("half-used stick of bright-red lipstick", -5, "It reads, 'Maybelline Sensational Vivids'");

let handFan = new Item("hand fan resembling the feathers of a peacock", 0);

let apron = new Item("stained apron", -5);

let dagger = new Item("small dagger", 0);
// end of Items

//* List of Rooms:
// ---------------------
let frontYard = new Room("Front Yard", "The Front Yard is finely manicured and adorned with hedges, flower beds, and a stone walkway. One might assume that the gardener had just visited within the last day or two. One also couldn't help but notice the towering mansion that the yard belongs to, boasting stained-glass windows and a grand arch over its tall, dark chestnut door. Centered on the door was a perfectly-round golden door knocker, merely a tease to anyone who thought they might be tall enough to reach it.", ["Main Hall"], "hedges", "invitation");

let mainHall = new Room("Main Hall", "The Main Hall is a grand entrance to the mansion featuring dazzling chandelier hanging from its vaulted ceiling. The ceiling is edged by beautiful crown molding. Within the room lies a single table with one drawer and a telephone. Your eye is drawn to the immaculate doors pointing to the west and south. The western door is smaller than its counterpart -- perhaps it leads to a library or something of that nature?", ["Library", "Ballroom", "Front Yard"], "table", "guest list");

let library = new Room("Library", "The library is a room with three doors, otherwise filled with floor-to-ceiling bookshelves, reading nooks, and a coffee table. How odd! There are no desks where one might study a book. Just a door back to the Main Hall and doors to the north and south. The southern door is marked with billiard sticks.", ["Main Hall", "Study", "Billiard Room"], "bookshelves", "book with a yellow handkerchief for a placeholder");

let study = new Room("Study", "The Study is a quiet, small reading room with an old-fashioned desk halfway surrounded by large windows allowing a generous view of the north and the west sides of the expansive property. A single door leads you back to the Library.", ["Library"], "desk", "old-fashioned, iron skeleton key");

let billiardRoom = new Room("Billiard Room", "The Billiard Room is almost half-filled with a pool table in pristine condition -- it appears that its most recent game of 8-ball had not yet been completed. The room also holds a small workbench in the corner, and of course, a set of brand-new Canadian maple pool sticks. The room is bordered by three doors, each on its own wall while the western wall permits rays of sunshine to come through. You've come from the Library to the north, and your eye is drawn to the intricately carved door leading to the west. Its mere presence seemed to indicate to you that years of laughter and joy had once dwelt on its opposite side. The people who enjoyed that wonderful time must have had a ball.", ["Library", "Ballroom", "Western Hall"], "workbench", "pair of emerald cufflinks engraved with the letter 'G'");

let ballroom = new Room("Ballroom", "The Ballroom is similar to the Main Hall with its vaulted ceilings, double doors, and gorgeous chandelier, but the walls are decorated with a dazzling gold wallpaper and elegant wainscoting. In one corner you find a shining ebony grand piano with clean white ivory keys, while in others there are small sitting areas for those who may need a break from their waltzing and strutting. Next to another beautifully-carved door pointing to the east, a stunningly large painting of local landscape announced its presence to the room.", ["Billiard Room", "Main Hall", "Eastern Hall"], "piano", "hand-written love note");

let lounge = new Room("Lounge", "The Lounge is a cozy corner on the east side of the mansion boasting bay windows, a chaise lounge, a couch, and a window seat. Its only door leads you back to the Eastern Hall.", ["Eastern Hall"], "window seat", "half-used stick of bright-red lipstick");

let diningRoom = new Room("Dining Room", "The Dining Room is a large room that appears to be paying homage to the Victorian era. The large satin birch table, positioned in the middle of the room, is set for six, but seats ten. An empty buffet lines the northern wall while a china cabinet tucks itself in to the southwestern corner of the room. A small table in the corner hosts an ornate teapot. The lone door in the room will return you to the Eastern Hall.", ["Eastern Hall"], "buffet", "hand fan resembling the feathers of a peacock");

let kitchen = new Room("Kitchen", "The Kitchen is a disaster zone compared to the other rooms you've seen. Pots have boiled over, the sink was left running, and pans are blackened with the ashes of former food. The oven and stove are off now, but you can't help but wonder who was in the middle of cooking dinner? Where did they go? Perhaps they ran out the door through the backyard? What caused them to leave in such an obvious hurry? Finally, you observe that the floor is very wet and dirty. It probably could use a good mopping.", ["Eastern Hall", "Backyard"], "floor", "stained apron");

let conservatory = new Room("Conservatory", "The Conservatory is very warm this time of year with sun pouring in from just about every angle. Even the ceiling is made of windows! With all those windows, there was barely enough room for the single door that you'd come through. The room is otherwise filled with a variety of beautiful houseplants: flowers, ferns, succulents, and even a large venus fly trap.", ["Western Hall"], "venus fly trap", "small dagger");
conservatory.locked = true;
// ensures conservatory is locked unlike the other rooms where learning the name of the room is more of the puzzle
// end of Rooms

//* List of Locations
// ---------------------
let easternHall = new Location("Eastern Hall", "The Eastern Hall is an L-shaped corridor with four cedar doors: three are adorned with crystal knobs and boast intricate edging. The southernmost door, tucked around the corner, is plain and unassuming. One might assume that the employees of the mansion were the only ones to frequent it. The northernmost door is decorated with a hanging sign reading 'Lounge'.", ["Lounge", "Ballroom", "Dining Room", "Kitchen"]);

let backyard = new Location("Backyard", "The backyard seems to spread several acres from your vantage point. It appears to have been the host of a recent croquet match. Additionally, a single set of polished croquet balls sits alone on the finely-decorated patio just outside of another exterior door on the west side of the building. Perhaps someone didn't make it in time for the game? With all the crime scene tape on the exterior door to the east, it certainly doesn't appear that a rematch will be happening anytime soon.", ["Kitchen", "Western Hall"]);

let westernHall = new Location("Western Hall", "The Western Hall appears to be a short corridor with access to the backyard. Two doors line its brief stretch: one to the north, and the other to the south. You note that the one towards the south has a greenish hue to it, and a picture of a fern is hung there upon it. The northern door looks familiar to you for some reason.", ["Backyard", "Billiard Room", "Conservatory"]);
// end of Locations

//* Dictionaries
// ---------------------
const reverseCall = {
  //returns Object Room variable names for modified user input
  "fron": frontYard,
  "main": mainHall,
  "libr": library,
  "stud": study,
  "bill": billiardRoom,
  "west": westernHall,
  "cons": conservatory,
  "back": backyard,
  "kitc": kitchen,
  "east": easternHall,
  "ball": ballroom,
  "dini": diningRoom,
  "loun": lounge,
};

const itemCall = {
  // returns Object Item variable names for modified user input and also for "treasure" names from Room objects
  "invit": invite,
  "guest": guestList,
  "book": book,
  "book ": book,
  "hand-": loveNote,
  "loven": loveNote,
  "loveN": loveNote,
  "love ": loveNote,
  "note": loveNote,
  "ironK": ironKey,
  "ironk": ironKey,
  "iron ": ironKey,
  "key": ironKey,
  "old-f": ironKey,
  "pair ": cufflinks,
  "cuffl": cufflinks,
  "half-": lipstick,
  "brigh": lipstick,
  "lipst": lipstick,
  "handf": handFan,
  "hand ": handFan,
  "handF": handFan,
  "fan": handFan,
  "apron": apron,
  "stain": apron,
  "dagge": dagger,
  "small": dagger,
  "dust": "dust bunnies",
  "dust ": "dust bunnies"
}
// end of Dictionaries

//* Item-Based Functions
// ---------------------
async function collect() {
  // after we have determined the user wants to collect or pick up an item (and add it to their inventory), ask which item
  let collectResponse = await ask("What do you want to pick up?\n(Be sure to enter it exactly as you found it.)\n");
  // run addToInventory method from Room class which analyzes user response
  currentLocation.addToInventory(collectResponse);
  play();
}

//* Inventory Management System
// adds collected treasures to inventory in their Item object format
async function pushToInventory(object) {
  // cut user response down to four letters
  let convertInventoryItem = object.substring(0, 5);
  // use lookup table to find the corresponding Object's variable
  let identifyItem = itemCall[convertInventoryItem];
  if (identifyItem == undefined) {
    // error message that theoretically should never print (failsafe)
    console.log("Well, this is awkward. We experienced an error while adding your item -- please try again.");
    let obj2 = await ask("What was it that you wanted to add again?\n");
    pushToInventory(obj2);
  } else {
    // add what the lookup table returns
    inventory.push(identifyItem);
  }
}

//*Inventory Checker Function:
// allows user to check inventory if there is anything inside it
async function listInventory() {
  if (inventory == "nothing") {
    console.log("Your backpack is empty. Try and collect an item or two first.");
  } else {
    console.log(`You open your backpack and see...`);
    checkableInv = [...inventory];
    checkableInv.forEach(invItem => console.log("..." + invItem["called"]));
  }
}

async function findReadable() {
  // after we have determined the user wants to read an item, ask which item
  let readResponse = await ask("Which item do you want?\n");
  // run convertItemResponse function which edits and analyzes user response
  convertItemResponse(readResponse);
}

//* Item Answer Function
// for user to interact with items in the inventory
async function convertItemResponse(inputItem) {
  // cut user response down to four letters
  let convertItemResponse = inputItem.substring(0, 5);
  // lowercase user response
  let lowercaseConverted = convertItemResponse.toLowerCase();
  // use lookup table to find the corresponding Object's variable
  let seekItem = itemCall[lowercaseConverted];
  // analyze what the lookup table returns
  if (seekItem.called == undefined) {
    // if there is no "called property", nothing can be found
    console.log(`Sorry, I don't know what ${inputItem} is.`);
    play();
  } else if (inventory.includes(seekItem)) {
    // if item exists and the user has the item, give option to read or use
    let option = await ask(`You dig through your backpack and find the ${seekItem.called}! Would you like to read it or use it?\n`);
    // take only first letter of response
    let chopAns = option[0];
    // uppercase the letter
    let capChop = chopAns.toUpperCase();
    // analyze response
    if (capChop === "R") {
      // if user opts to read item, use "read" method
      seekItem.read();
      play();
    } else if (capChop === "U") {
      // if user opts to use item, use "use" method
      seekItem.use();
      play();
    } else {
      // if user selects neither of the two options
      console.log(`You return the ${seekItem.called} to your backpack.`);
      play();
    }
  } else {
    // if item exists but does not live in user's inventory
    console.log(`Sorry, but it doesn't look like you have ${inputItem} in your inventory.`);
    play();
  }
} // end of convertItemResponse function
// end of all Item-Based Functions

//* Room-Based Functions
// ---------------------
//* Room Answer Function (& Change Room if Allowed)
// analyzes rooms as moveable or not moveable
async function convertRoomResponse(inputRoom) {
  // cut user response down to four letters
  let convertResponse = inputRoom.substring(0, 4);
  // lowercase user response
  let lowercaseConversion = convertResponse.toLowerCase();
  // use lookup table to find the corresponding Object's variable
  let seekOption = reverseCall[lowercaseConversion];
  // analyze what the lookup table returns
  if (seekOption == undefined) {
    // if nothing can be found
    console.log(`Sorry, I don't know what ${inputRoom} is.`);
  } else if (currentLocation.nextTo.includes(seekOption.name)) {
    // if seekOption is an object & its name is contained as an adjacent to currentLocation
    if (seekOption.locked === true) {
      // if door is locked (only applies to Conservatory until key is used)
      console.log(`You attempt to open the door to the ${seekOption.name}, but it's locked.`);
      playerEnergy = playerEnergy - 10;
      // penalty for not using Conservatory key
    } else {
      // if door is not locked, move
      console.log(`You exit the ${currentLocation.name} and enter the ${seekOption.name}.`);
      currentLocation = seekOption;
      playerEnergy = playerEnergy - 5;
    }
  } else {
    // if seekOption is not contained as an adjacent to currentLocation
    console.log(`Sorry, ${inputRoom} is not a valid move from the ${currentLocation.name}.`);
  }
} // end of convertRoomResponse function

async function moveRoom() {
  // after we have determined the user wants to move, ask where
  let moveResponse = await ask("Where do you want to go?\n");
  // run room changing function which analyzes user response
  convertRoomResponse(moveResponse);
  play();
}

async function search() {
  // after we have determined the user wants to search the room, ask what part of the room (or thing) they want to search
  let searchResponse = await ask("What do you want to search?\n");
  // run search method from Room class which analyzes user response
  if (currentLocation === backyard || currentLocation === westernHall || currentLocation === easternHall) {
    // these locations do not have the search method like rooms do
    console.log("This area is pretty empty. Try searching elsewhere.");
    playerEnergy = playerEnergy - 2;
    // smaller penalty for searching this area
    play();
  } else {
    // if user is in any other location, use the search method
    currentLocation.search(searchResponse);
    play();
  }
} // end of Room-based functions

//* Late Game Functions
// ---------------------
//* Use Phone Function
// allows user to make an accusation if all items are in inventory & if not, game over
async function usePhone() {
  // we have already ensured that the currentLocation is mainHall
  // check that all items are the inventory
  if (allItemsCollected === true && currentLocation === mainHall) {
      // phone works
      playerEnergy = playerEnergy + 20;
      callPolice();
  } else {
      // police come
      console.log("\nAs soon as you pick up the phone, you hear sirens surrounding the mansion. You immediately hear a megaphone blasting, 'Come out with your hands up!'");
      console.log("You are arrested for trespassing on private property.");
      playerEnergy = playerEnergy - 100;
      playAgain();
  }
} // end of usePhone function

async function callPolice() {
  // phone dialogue only
  console.log("\nSweat drips down your forehead as you pick up the phone nervously. It's obvious that there's been a murder here. You cautiously and precisely dial the number for the local police station.");
  console.log('Emergency Operator: "This is the police department, What is your emergency?"');
  console.log('You stutter in disbelief that this moment is real life. "I, uh... would like to provide some potentially helpful information on an open investigation."');
  console.log('Emergency Operator: "Which investigation might that be?"');
  console.log('You: "The one at Boddy mansion."');
  console.log('There is a pause. You question whether the call dropped for just a moment.');
  console.log('Emergency Operator: "...The murder?"');
  console.log('You: "I believe so."');
  console.log('Emergency Operator: "All right, what information would that be? Bear in mind, you are on a recorded line."');
  accusationChoice();
} // end of callPolice function

async function accusationChoice() {
  // ask user to make an accusation
  let infoType = await ask('\n(Who do you think committed the crime?)\n');
  // switch info to an array which is searchable
  let arrayInfo = infoType.split(" ");
  // *Option 1: Prof. Plum
  if (arrayInfo.includes("Plum") || arrayInfo.includes("Professor")) {
      // win
      console.log('You: "Madam, I believe it was Professor Plum. I have reason to believe that he hid the weapon in the Conservatory and locked the room with a key which he hid in the room in which he was most comfortable -- the study."');
      console.log("\n***** CONGRATULATIONS! YOU WIN!!! *****");
      // energy boost to raise score
      playerEnergy = playerEnergy + 100;
      playAgain();
  // *Option 2: Mrs. Elizabeth Peacock
  } else if (arrayInfo.includes("Peacock") || arrayInfo.includes("Elizabeth")) {
      // lose
      console.log('You: "The crime was committed by none other than the widowed Elizabeth Peacock. She has shown no indication of appreciation for all the attention John has been providing and she simply became fed up with it."');
      console.log('Emergency Operator: "I assure you, we are investigating her quite closely. As far as we know, she was the last to see John alive. But thank you for the input."');
      // neutral guess, no score change
      playAgain();
  // *Option 3: Miss Scarlett
  } else if (arrayInfo.includes("Scarlett")) {
      // lose
      console.log('You: "I daresay the murderer was Miss Scarlett. She was jealous of the attention that Elizabeth Peacock was receiving.');
      console.log('Emergency Operator: "Ridiculous. Miss Scarlett has plenty of her own suitors."');
      playerEnergy = playerEnergy - 50; // wrong answer penalty
      playAgain();
  // *Option 4: Colonel Mustard
  } else if (arrayInfo.includes("Mustard") || arrayInfo.includes("Colonel")) {
      // lose
      console.log('You: "Colonel Mustard has been acting suspicious lately... and studying books on war. And he always has that rifle with him."');
      console.log('Emergency Operator: "You are not the only one to mention that, but his innocence has already been proven. Thank you anyway." *click*');
      playerEnergy = playerEnergy - 30; // wrong answer penalty
      playAgain();
  // *Option 5: The Reverend Green
  } else if (arrayInfo.includes("Green") || arrayInfo.includes("Reverend")) {
      // lose
      console.log('You: "The murderer was clearly Reverend Green. His cufflinks were found only two rooms away from the murder weapon!');
      console.log('Emergency Operator: "Preposterous! He was playing pool on the opposite side of the mansion from where the body was found and from where John was last seen alive."');
      playerEnergy = playerEnergy - 40; // wrong answer penalty
      playAgain();
  // *Option 6: Mrs. White
  } else if (arrayInfo.includes("White")) {
      // lose
      console.log('You: "Madam, I believe it was Mrs. White. The murder was in the kitchen, after all."');
      console.log('Emergency Operator: "You are being ridiculous. She was out at the store when everything went down. Police were already on the scene when she attempted to return to the kitchen."');
      playerEnergy = playerEnergy - 50; // wrong answer penalty
      playAgain();
  // *Option 7: John Boddy
  } else if (arrayInfo.includes("Boddy") || arrayInfo.includes("John")) {
      // lose
      console.log('You: "Madam, I believe it was John Boddy."');
      console.log('Emergency Operator: "Nonsense! He was the one that was murdered. Stop wasting our time." *click*');
      playerEnergy = playerEnergy - 75; // wrong answer penalty
      playAgain();
  } else {
      infoType = null;
      console.log("Hmmm... interesting guess. I'm not sure who this is.");
  }
  accusationChoice();
} // end of accusationChoice function
// end of late game functions

//* Play & Play Again Functions
// ---------------------
async function play() {
  //* this function will read what action the user wants to take
  // only state player energy if low
  if (playerEnergy <= 20) {
    console.log(`Your energy is getting low.`);
  } else {
    // do nothing
  }
  // check if user has won the game or ran out of energy!
  if (inventory.includes(invite) && inventory.includes(guestList) && inventory.includes(lipstick) && inventory.includes(cufflinks) && inventory.includes(loveNote) && inventory.includes(ironKey) && inventory.includes(apron) && inventory.includes(dagger) && inventory.includes(book) && inventory.includes(handFan) && playerEnergy > 0 && iteration == 2) {
    // if win condition is met
    console.log("\nIt looks like you've collected all the items. Maybe you should tell someone?");
    allItemsCollected = true;
    iteration++;
    play();
  } else if (playerEnergy <= 0) {
    // if energy runs out
    console.log("Sorry, you've run out of energy! Try again next time.");
    playAgain();
  } else {
    // if win condition is not met
    // and if player still has energy
    let choice = await ask("\nWhat do you want to do?\n");
    let playChoice = choice.toLowerCase();
    let arrayChoice = playChoice.split(" ");
    // look for keywords within arrayChoice
    if (arrayChoice.includes("move") || arrayChoice.includes("go") || arrayChoice.includes("enter")) {
      // if user wants to switch rooms
      moveRoom();
    } else if (arrayChoice.includes("look") && arrayChoice.includes("around")) {
      // if user wants to look around room
      currentLocation.look();
    } else if (arrayChoice.includes("search")) {
      // if user wants to search room
      search();
    } else if (arrayChoice.includes("collect") || arrayChoice.includes("add")) {
      // if user wants to collect or add something to their inventory
      collect();
    } else if (arrayChoice.includes("pick") && arrayChoice.includes("up")) {
      // same as above
      collect();
    } else if (arrayChoice.includes("grab") && arrayChoice.includes("inventory")) {
      // if user wants to check actions for what is in their inventory
      findReadable();
    } else if (arrayChoice.includes("read") || arrayChoice.includes("use")) {
      // if user wants to read an item, let them know they need to grab it from their inventory first
      console.log("To read something in the room, use 'look around'. To read and/or use something from your inventory, you'll need to first grab it from your inventory.");
      play();
    } else if (arrayChoice.includes("leave") || arrayChoice.includes("exit") || arrayChoice.includes("quit") || arrayChoice.includes("run")) {
      // if user tries to leave the mansion
      if (allItemsCollected === true) {
        console.log("There's one last thing you need to do...")
      } else {
        console.log("You can't leave yet! Your curiosity is just beginning to peak, I know it!");
        play();
      }
    } else if (arrayChoice.includes("check") && arrayChoice.includes("inventory")) {
      // if user wants to check what is in their inventory
      listInventory();
      play();
    } else if (arrayChoice.includes("call") && currentLocation === mainHall) {
      // if user wants to use the phone in the main hall
      usePhone();
    } else if (arrayChoice.includes("call") && currentLocation !== mainHall) {
      // if user wants to use the phone & is not in the main hall
      console.log("Bummer, you left your cell phone at home today...");
      play();
    } else {
      // if the user does not select a valid keyword/key phrase
      console.log("I don't know what that is. Try using a keyword or key phrase like 'search', 'look around', 'check inventory', 'pick up', or 'grab from inventory'.");
      play();
    }
  }
} // end of play function

async function resetVal() {
  // reset global variables
  currentLocation = frontYard;
  playerEnergy = 100;
  inventory = "nothing";
  iteration = 1;
  checkableInv = [];
  allItemsCollected = false;
  // reset treasures
  frontYard.treasure = "invitation";
  mainHall.treasure = "guest list";
  library.treasure = "book with a yellow handkerchief for a placeholder";
  study.treasure = "old-fashioned, iron skeleton key";
  billiardRoom.treasure = "pair of emerald cufflinks engraved with the letter 'G'";
  ballroom.treasure = "hand-written love note";
  lounge.treasure = "half-used stick of bright-red lipstick";
  diningRoom.treasure = "hand fan resembling the feathers of a peacock";
  kitchen.treasure = "stained apron";
  conservatory.treasure = "small dagger";
  // re-lock conservatory
  conservatory.locked = true;
  // reset Item usage
  invite.used = false;
  guestList.used = false;
  book.used = false;
  loveNote.used = false;
  ironKey.used = false;
  lipstick.used = false;
  apron.used = false;
} // end of resetVal function

async function playAgain() {
  // state Score
  let score = playerEnergy*12;
  console.log(`\nYour score is ${score}!`);
  // ask user if they want to play again
  let yesNo = await ask("\nWould you like to play again?\n");
  let arrayYN = yesNo.split("");
  let chopYN = arrayYN[0];
  let uppercaseYN = chopYN.toUpperCase();
  console.log(uppercaseYN);
  if (uppercaseYN === "Y") {
      // reset all settings
      resetVal();
      // call start function
      start();
  } else if (uppercaseYN === "N") {
      console.log("Thanks for playing!");        
      process.exit();
  } else {
      playAgain();
  }
} // end of playAgain function

//* Default Settings
// ---------------------
// set starting position
let currentLocation = frontYard;
// set beginning player energy
let playerEnergy = 100;
// set beginning player inventory
let inventory = "nothing";
// settings to allow inventory & 'check inventory' to function properly
let iteration = 1;
let checkableInv = [];
let allItemsCollected = false;

//* Start Function
start();
async function start() {
  // the function that starts it all!
  const welcomeMessage = `You are standing in the front yard of a grand mansion. While neither completely abandoned nor haunted, it holds an eerie aura about it, as if it has a story to tell you.\nNo one appears to be home right now. The front door towers in front of you tauntingly, daring you to enter. Do you dare go in?`;
  console.log(welcomeMessage);
  const directions = "\n(start by choosing an action word)";
  console.log(directions);
  console.log('\n-------------------------------');
  play();
} // end of start function