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
    - Arrays
    - Dictionaries
    - Functions
    - Async Functions
    - Default Settings
    - Start Function
*/

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
let allItems = [];
// track allItems to ensure win condition is met

let invite = new Item("invitation", 2, "The invitation is too smudged and torn to read fully, but you're able to make out the fact that there was a party at this house recently. You can also conclude that there are some vague directions about how to get from the Main Hall to the Dining Room.");
allItems.push(invite.called);

let guestList = new Item("guest list", 2, "The list reads, 'My dearest Elizabeth, the Reverend Green, the Honorable Colonel Mustard, the lovely Miss Scarlett, and Professor Plum.' You note that each of these names have been crossed off, as if attendance had been taken. A note at the bottom seems to be a reminder to its author to have a 'Mrs. White' obtain the finest rib eye.");
allItems.push(guestList.called);

let book = new Item("book with yellow handkerchief for a placeholder", -15, "You pick up the book and observe its title is 'War and Peace'. You turn to the spot where the handkerchief sits and begin to read. You find yourself becoming very, very, tired...");
allItems.push(book.called);

let loveNote = new Item("hand-written love note", 1, "Blech! It's full of mushy love stuff and smells overpoweringly like men's cologne. But you observe that it is signed by the name of 'John Boddy.'");
allItems.push(loveNote.called);

let ironKey = new Item("old-fashioned, iron skeleton key", 2, "You pick up the key. It reads 'Conservatory.'");
allItems.push(ironKey.called); // end of readable items

let cufflinks = new Item("pair of emerald cufflinks engraved with the letter 'G'", 0);
allItems.push(cufflinks.called);

let lipstick = new Item("half-used stick of bright-red lipstick", -5, "It reads, 'Maybelline Sensational Vivids'");
allItems.push(lipstick.called);

let handFan = new Item("hand fan resembling the feathers of a peacock", 0);
allItems.push(handFan.called);

let apron = new Item("apron", -5);
allItems.push(apron.called);

let dagger = new Item("small dagger", 0);
allItems.push(dagger.called);
// end of Items

//* List of Rooms:

let frontYard = new Room("Front Yard", "The Front Yard is finely manicured and adorned with hedges, flower beds, and a stone walkway. One might assume that the gardener had just visited within the last day or two. One also couldn't help but notice the towering mansion that the yard belongs to, boasting stained-glass windows and a grand arch over its tall, dark chestnut door. Centered on the door was a perfectly-round golden door knocker, merely a tease to anyone who thought they might be tall enough to reach it.", ["Main Hall"], "hedges", "invitation");

let mainHall = new Room("Main Hall", "The Main Hall is a grand entrance to the mansion featuring dazzling chandelier hanging from its vaulted ceiling. The ceiling is edged by beautiful crown molding. Within the room lies a single table with one drawer and a telephone. Your eye is drawn to the immaculate doors pointing to the west and south. The western door is smaller than its counterpart -- perhaps it leads to a library or something of that nature?", ["Library", "Ballroom", "Front Yard"], "table", "guest list");

let library = new Room("Library", "The library is a room with three doors, otherwise filled with floor-to-ceiling bookshelves, reading nooks, and a coffee table. How odd! There are no desks where one might study a book. Just a door back to the Main Hall and doors to the north and south. The southern door is marked with billiard sticks.", ["Main Hall", "Study", "Billiard Room"], "bookshelves", "book with a yellow handkerchief for a placeholder");

let study = new Room("Study", "The Study is a quiet, small reading room with an old-fashioned desk halfway surrounded by large windows allowing a generous view of the north and the west sides of the expansive property. A single door leads you back to the Library.", ["Library"], "desk", "old-fashioned, iron skeleton key");

let billiardRoom = new Room("Billiard Room", "The Billiard Room is almost half-filled with a pool table in pristine condition -- it appears that its most recent game of 8-ball had not yet been completed. The room also holds a small workbench in the corner, and of course, a set of brand-new Canadian maple pool sticks. The room is bordered by three doors, each on its own wall while the western wall permits rays of sunshine to come through. You've come from the Library to the north, and your eye is drawn to the intricately carved door leading to the west. Its mere presence seemed to indicate to you that years of laughter and joy had once dwelt on its opposite side. The people who enjoyed that wonderful time must have had a ball.", ["Library", "Ballroom", "Western Hall"], "workbench", "pair of emerald cufflinks engraved with the letter 'G'");

let ballroom = new Room("Ballroom", "The Ballroom is similar to the Main Hall with its vaulted ceilings, double doors, and gorgeous chandelier, but the walls are decorated with a dazzling gold wallpaper and elegant wainscoting. In one corner you find a shining ebony grand piano with clean white ivory keys, while in others there are small sitting areas for those who may need a break from their waltzing and strutting. Next to another beautifully-carved door pointing to the east, a stunningly large painting of local landscape announced its presence to the room.", ["Billiard Room", "Main Hall", "Eastern Hall"], "piano", "hand-written love note");

let lounge = new Room("Lounge", "The Lounge is a cozy corner on the east side of the mansion boasting bay windows, a chaise lounge, a couch, and a window seat. Its only door leads you back to the Eastern Hall.", ["Eastern Hall"], "window seat", "half-used stick of bright-red lipstick");

let diningRoom = new Room("Dining Room", "The Dining Room is a large room that appears to be paying homage to the Victorian era. The large satin birch table, positioned in the middle of the room, is set for six, but seats ten. An empty buffet lines the northern wall while a china cabinet tucks itself in to the southwestern corner of the room. A small table in the corner hosts an ornate teapot. The lone door in the room will return you to the Eastern Hall.", ["Eastern Hall"], "buffet", "hand fan resembling the feathers of a peacock");

let kitchen = new Room("Kitchen", "The Kitchen is a disaster zone compared to the other rooms you've seen. Pots have boiled over, the sink was left running, and pans are blackened with the ashes of former food. The oven and stove are off now, but you can't help but wonder who was in the middle of cooking dinner? Where did they go? Perhaps they ran out the door through the backyard? What caused them to leave in such an obvious hurry? Finally, you observe that the floor is very wet and dirty. It probably could use a good mopping.", ["Eastern Hall", "Backyard"], "floor", "apron");

let conservatory = new Room("Conservatory", "The Conservatory is very warm this time of year with sun pouring in from just about every angle. Even the ceiling is made of windows! With all those windows, there was barely enough room for the single door that you'd come through. The room is otherwise filled with a variety of beautiful houseplants: flowers, ferns, succulents, and even a large venus fly trap.", ["Western Hall"], "venus fly trap", "small dagger");
conservatory.locked = true;
// ensures conservatory is locked unlike the other rooms where learning the name of the room is more of the puzzle
// end of Rooms

//* List of Locations

let easternHall = new Location("Eastern Hall", "The Eastern Hall is an L-shaped corridor with four cedar doors: three are adorned with crystal knobs and boast intricate edging. The southernmost door, tucked around the corner, is plain and unassuming. One might assume that the employees of the mansion were the only ones to frequent it.The northernmost door is decorated with a hanging sign reading 'Lounge'.", ["Lounge", "Ballroom", "Dining Room", "Kitchen"]);

let backyard = new Location("Backyard", "The backyard seems to spread several acres from your vantage point. It appears to have been the host of a recent croquet match. Additionally, a single set of polished croquet balls sits alone on the finely-decorated patio just outside of another exterior door on the west side of the building. Perhaps someone didn't make it in time for the game?With all the crime scene tape on the exterior door to the east, it doesn't appear that a rematch will be happening anytime soon.", ["Kitchen", "Western Hall"]);

let westernHall = new Location("Western Hall", "The Western Hall appears to be a short corridor with access to the backyard. Two doors line its brief stretch: one to the north, and the other to the south. You note that the one towards the south has a greenish hue to it, and a picture of a fern is hung there upon it. The northern door looks familiar to you for some reason.", ["Backyard", "Billiard Room", "Conservatory"]);
// end of Locations

//* Dictionaries
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
  "dagge": dagger,
  "small": dagger,
  "dust": "dust bunnies"
}
// end of State Machines

//*Inventory Checker Function:
// allows user to check inventory if there is anything inside it
function listInventory() {
  if (inventory == "nothing") {
    console.log("Your backpack is empty. Try and collect an item or two first.");
  } else {
    console.log(`You open your backpack and see...`);
    checkableInv = [...inventory];
    checkableInv.forEach(invItem => console.log("..." + invItem["called"]));
  }
}

//* Inventory Management System
// adds collected treasures to inventory in their Item object format
function pushToInventory(object) {
  // cut user response down to four letters
  let convertInventoryItem = object.substring(0, 5);
  // use lookup table to find the corresponding Object's variable
  let identifyItem = itemCall[convertInventoryItem];
  // add what the lookup table returns
  inventory.push(identifyItem);
}

//* Room Answer Function (& Change Room if Allowed)
// analyzes rooms as moveable or not moveable
function convertRoomResponse(inputRoom) {
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
      playerEnergy = playerEnergy - 5;
    } else {
      // if door is not locked
      console.log(`You exit the ${currentLocation.name} and enter the ${seekOption.name}.`);
      currentLocation = seekOption;
      playerEnergy = playerEnergy - 5;
    }
  } else {
    // if seekOption is not contained as an adjacent to currentLocation
    console.log(`Sorry, ${inputRoom} is not a valid move from the ${currentLocation.name}.`);
  }
} // end of convertRoomResponse function

//* Use Phone Function
//! needs to be tested
// allows user to make an accusation if all items are in inventory & if not, game over
function usePhone() {
  // check that all items are the inventory
  if (inventory.includes(invite) && inventory.includes(guestList) && inventory.includes(lipstick) && inventory.includes(cufflinks) && inventory.includes(loveNote) && inventory.includes(ironKey) && inventory.includes(apron) && inventory.includes(dagger) && inventory.includes(book) && inventory.includes(handFan)) {
      // phone works
      callPolice();
  } else {
      // police come
      console.log("\nAs soon as you pick up the phone, you hear sirens surrounding the mansion. You immediately hear a megaphone blasting, 'Come out with your hands up!'");
      console.log("You are arrested for trespassing on private property.");
      playAgain();
  }
} // end of usePhone function

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
    // the search function breaks with these locations because they do not have the search method like rooms do
    console.log("This area is pretty empty. Try searching elsewhere.");
    playerEnergy = playerEnergy - 2;
    // smaller penalty for searching this area
    play();
  } else {
    // if user is in any other location, use the search method
    currentLocation.search(searchResponse);
    play();
  }
}

async function collect() {
  // after we have determined the user wants to collect or pick up an item (and add it to their inventory), ask which item
  let collectResponse = await ask("What do you want to pick up?\n(Be sure to enter it exactly as you found it.)\n");
  // run addToInventory method from Room class which analyzes user response
  currentLocation.addToInventory(collectResponse);
  play();
}

async function findReadable() {
  // after we have determined the user wants to read an item, ask which item
  let readResponse = await ask("Which item do you want?\n");
  // run convertItemResponse function which edits and analyzes user response
  convertItemResponse(readResponse);
}

async function play() {
  //* this function will read what action the user wants to take
  // only state player energy if low
  if (playerEnergy <= 20) {
    console.log(`Your energy is getting low.`);
  }
  // check if user has won the game or ran out of energy!
  if (inventory.includes(invite) && inventory.includes(guestList) && inventory.includes(lipstick) && inventory.includes(cufflinks) && inventory.includes(loveNote) && inventory.includes(ironKey) && inventory.includes(apron) && inventory.includes(dagger) && inventory.includes(book) && inventory.includes(handFan) && playerEnergy > 0) {
    // if win condition is met
    console.log("You win!");
    playAgain();
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
      console.log("You can't leave yet! Your curiosity is just beginning to peak, I know it!");
      play();
    } else if (arrayChoice.includes("check") && arrayChoice.includes("inventory")) {
      // if user wants to check what is in their inventory
      listInventory();
      play();
    } else if (arrayChoice.includes("call") && currentLocation === mainHall) {
      // if user wants to use the phone in the main hall
      usePhone();
      //! needs to be tested
    } else {
      // if the user does not select a valid keyword/key phrase
      console.log("I don't know what that is. Try using a keyword or key phrase like 'search', 'look around', 'check inventory', 'pick up', or 'grab from inventory'.");
      play();
    }
  }
}

async function playAgain() {
  // state Score
  let score = playerEnergy*12;
  console.log(`\nYour score is ${score}!`);
  // ask user if they want to play again
  let yesNo = await ask("\nWould you like to play again?\n");
  let chopYN = yesNo[0];
  let uppercaseYN = chopYN.toUppercase();
  if (uppercaseYN === "Y") {
      // reset all settings
      currentLocation = frontYard;
      playerEnergy = 100;
      inventory = "nothing";
      iteration = 1;
      checkableInv = [];
      // call start function
      start();
  } else if (uppercaseYN === "N") {
      console.log("Thanks for playing!");        
      process.exit();
  } else {
      playAgain();
  }
} // end of playAgain function

// set starting position
let currentLocation = frontYard;
// set beginning player energy
let playerEnergy = 0;
// set beginning player inventory
let inventory = "nothing";
// settings to allow inventory & 'check inventory' to function properly
let iteration = 1;
let checkableInv = [];

start();

function start() {
  // the function that starts it all!
  const welcomeMessage = `You are standing in the front yard of a grand mansion. While neither completely abandoned nor haunted, it holds an eerie aura about it, as if it has a story to tell you.\nNo one appears to be home right now. The front door towers in front of you tauntingly, daring you to enter. Do you dare go in?`;
  console.log(welcomeMessage);
  const directions = "\n(start by choosing an action word)";
  console.log(directions);
  console.log('\n-------------------------------');
  play();
}