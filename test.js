const { table } = require('console');
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
// run the program in the terminal: node index.js

//*Location Class:
class Location {
  constructor(name, desc) {
    this.name = name;
    this.description = desc;
  }
  
  // look method returns location description
  look() {
    console.log(this.description + "\n");
  }
}

//*Room Class:
class Room extends Location {
  // parts of a room
  constructor(name, desc, searchableItem, within) {
    super(name, desc);
    this.thing = searchableItem;
    this.treasure = within;
  }

  // search method
  search(param) {
    let newParam = param.toLowerCase();
    if (newParam == this.thing) {
      console.log(`You search the ${this.thing} and find a(n) ${this.treasure}!`);
      // ! take function?
      console.log(`You eagerly tuck the ${this.treasure} away in your backpack. Who knows? It could be useful in the future!`);
      inventory.push(this.treasure);
      this.treasure = "set of dust bunnies";
    } else {
      console.log("Nice try, but there's nothing to see here.");
    }
  }
} // end of Room Class

//*Inventory Array:
inventory = [];
function listInventory() {
  console.log(`You open your backpack and see ${inventory}.`);
}

//* List of Rooms:
roomList = [];

let library = new Room("Library", "The library is a room with three doors, otherwise filled with floor-to-ceiling bookshelves, reading nooks, and a coffee table. How odd! There are no desks where one might study a book.", "bookshelves", "book with a yellow handkerchief for a bookmark");
roomList.push(library);

let study = new Room("Study", "The Study is a quiet, small reading room with an old-fashioned desk halfway surrounded by large windows allowing a generous view of the north and the west. A single door leads back to the Library.", "desk", "old-fashioned, iron skeleton key");
roomList.push(study);

let mainHall = new Room("Main Hall", "The Main Hall is a grand entrance to the mansion featuring dazzling chandelier hanging from its vaulted ceiling. The ceiling is edged by beautiful crown molding. Your eye is drawn to the immaculate doors pointing to the west and south. In the room lies a single table with one drawer.", "table", "guest list");
roomList.push(mainHall);

let lounge = new Room("Lounge", "The Lounge is a cozy corner on the east side of the mansion boasting bay windows, a chaise lounge, a couch, and a window seat", "window seat", "bright-red lipstick");
roomList.push(lounge);

let diningRoom = new Room("Dining Room", "The Dining Room is a large room that appears to be paying homage to the Victorian era. The large satin birch table, positioned in the middle of the room, is set for six, but seats ten. An empty buffet lines the northern wall while a china cabinet tucks itself in to the southwestern corner of the room. A small table in the corner hosts an ornate teapot.", "buffet", "fan resembling the feathers of a peacock");
roomList.push(diningRoom);

let kitchen = new Room("Kitchen", "The Kitchen is a disaster zone compared to the other rooms you've seen. Pots have boiled over, the sink was left running, and pans are blackened with the ashes of former food. The oven and stove are off now, but you can't help but wonder who was in the middle of cooking dinner? Where did they go? What caused them to leave in such an obvious hurry? Finally, you observe that the floor is very wet and dirty. It probably could use a good mopping.", "floor", "apron");
roomList.push(kitchen);

let ballroom = new Room("Ballroom", "The Ballroom is similar to the Main Hall with its vaulted ceilings and gorgeous chandelier, but the walls are decorated with a dazzling gold wallpaper and elegant wainscoting. In one corner you find a shining ebony grand piano with clean white ivory keys, while in others there are small sitting areas for those who may need a break from their waltzing and strutting.", "piano", "hand-written love note");
roomList.push(ballroom);

let conservatory = new Room("Conservatory", "The Conservatory is very warm this time of year with sun pouring in from just about every angle. Even the ceiling is made of windows! The room is filled with a variety of beautiful houseplants: flowers, ferns, succulents, and even a large venus fly trap.", "venus fly trap", "small dagger");
roomList.push(conservatory);

let billiardRoom = new Room("Billiard Room", "The Billiard Room is half-filled with a pool table in pristine condition, but there's still room for a small workbench in the corner, and of course, a set of brand-new Canadian maple pool sticks.", "workbench", "a pair of emerald cufflinks engraved with the letter 'G'.");
roomList.push(billiardRoom);

// end of Rooms

//* List of Locations
locations = [];

let frontYard = new Location("Front Yard", "The Front Yard is finely manicured and adorned with hedges, flower beds, and a stone walkway. One might assume that the gardener had just visited within the last day or two. One also couldn't help but notice the towering mansion that the yard belongs to, boasting stained-glass windows and a grand arch over its tall, dark chestnut door. Centered on the door was a perfectly-round golden door knocker, merely a tease to anyone who thought they might be tall enough to reach it.");
locations.push(frontYard);

let westernHall = new Location("Western Hall", "The Western Hall is a short corridor outside the Billiard Room. It appears that there are two other doors on its southern side: one to the west, and one to the east.");
locations.push(westernHall);

let easternHall = new Location("Eastern Hall", "The Eastern Hall is an L-shaped corridor with four cedar doors: three are adorned with crystal knobs and boast intricate edging. The southernmost door, tucked around the corner, is plain and unassuming.");
locations.push(easternHall);

let backyard = new Location("Backyard", "The backyard appears to have been the host of a recent croquet match. Additionally, a single set of polished croquet balls sits alone on the finely-decorated patio. Perhaps someone didn't make it in time for the game?")
locations.push(backyard);

// end of Locations

//* State Machines
const reverseCall = {
  //returns Object variable names for modified user input
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

const returnCall = {
  frontYard: ["Front Yard"],
  mainHall: ["Main Hall"],
  library: ["Library"],
  study: ["Study"],
  billiardRoom: ["Billiard Room"],
  westernHall: ["Western Hall"],
  conservatory: ["Conservatory"],
  backyard: ["Backyard"],
  kitchen: ["Kitchen"],
  easternHall: ["Eastern Hall"],
  ballroom: ["Ballroom"],
  diningRoom: ["Dining Room"],
  lounge: ["Lounge"]
};

let accessible2 = {
  "Front Yard": ["Main Hall"],
  "Main Hall": ["Front Yard", "Library", "Ballroom"],
  "Library": ["Main Hall", "Study", "Billiard Room"],
  "Study": ["Library"],
  "Billiard Room": ["Ballroom", "Western Hall"],
  "Western Hall": ["Billiard Room", "Back Yard"], // "Conservatory" (locked)
  "Conservatory": ["Western Hall"],
  "Backyard": ["Western Hall", "Kitchen"],
  "Kitchen": ["Back Yard", "Eastern Hall"],
  "Eastern Hall": ["Kitchen", "Dining Room", "Ball Room", "Lounge"],
  "Ballroom": ["Main Hall", "Billiard Room", "Eastern Hall"],
  "Dining Room": ["Eastern Hall"],
  "Lounge": ["Eastern Hall"],
}

//* Read Room Answer Function
function convertRoomResponse(inputRoom) {
  // cut user response down to four letters
  let convertResponse = inputRoom.substring(0, 4);
  // lowercase user response
  let lowercaseConversion = convertResponse.toLowerCase();
  // use lookup table to find the corresponding Object's variable
  let seekOption = reverseCall[lowercaseConversion];
  console.log(seekOption);
  // analyze what the lookup table returns
  if (seekOption == undefined) {
    console.log(`Sorry, I don't know what ${inputRoom} is.`);
  } else {
    // if the lookup table is successful in finding an Object (room)
    console.log(`Attempting to switch rooms to ${seekOption.name}.`);
    let returnRoom = returnCall["seekOption"];
    console.log(returnRoom);
    changeRoom(returnRoom);
  }
}
function changeRoom(newRoom) {
  // check valid rooms based on current location
  let validMovement = accessible2[currentLocation.name];
  let validString = validMovement.toString();
  console.log(validString);
  // announce current location
  console.log(`You are currently in the ${currentLocation.name}.`);
  
  // if else to determine what to do if newRoom is accessible and what to do if not
  if (validMovement.includes(newRoom)) {
    // allow movement & announce new room name
    letNameOfNew = newRoom.name;
    currentLocation = letNameOfNew;
    console.log(`You move into the ${currentLocation.name}.`);
  } else {
    // reject movement
    console.log(`Invalid movement: ${currentLocation.name} to ${newRoom}. Try something else.`);
  }
  
}

//* Room Changing Function

let currentLocation = frontYard;

//! Test Section ***************************
//? Game starts in frontYard
//console.log(roomList);
//console.log(locations);
//console.log(easternHall.description);
//console.log(currentLocation.description);
/* 
currentLocation.look();
currentLocation = mainHall;
currentLocation.look();
mainHall.search("table");
*/
convertRoomResponse("Main Hall");
//changeRoom("Main Hall");
//!convertRoomResponse("Main Hall");
//!changeRoom(mainHall);

//!start();

async function start() {
  const welcomeMessage = `You are standing in the front yard of a grand mansion. While neither completely abandoned nor haunted, it holds an eerie aura about it, as if it has a story to tell you.\nNo one appears to be home right now. The front door towers in front of you tauntingly, daring you to enter. Do you dare go in?`;
  let answer = await ask(welcomeMessage);
  // cut down answer to first letter
  let chopAnswer = answer[0];
  // capitalize chopAnswer
  let capitalizeChop = chopAnswer.toUpperCase();
  if (capitalizeChop === "Y") {
    console.log('\n You are shocked to find that the door is unlocked! Armed with only a backpack, you enter.');
  } else {
    console.log("Well, I guess some mysteries are better left alone. See you next time!");
    process.exit();
  }
}

//! for now, so that code doesn't run forever:
process.exit();
