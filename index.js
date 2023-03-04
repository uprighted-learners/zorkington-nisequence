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
      console.log(`You search the ${this.thing} and find ${this.treasure}!`);
      // ! dust bunnies and cold tea?
      console.log(`You eagerly tuck the ${this.treasure} away in your backpack. It could be useful in the future!`);
      inventory.push(this.treasure);
    } else {
      console.log("Nice try, but there's nothing to see here.");
    }
  }
} // end of Room Class

//*Inventory Array:
inventory = ["bubbles", "items", "stuff"];
function listInventory() {
  console.log(`You open your backpack and see ${inventory}.`);
}

//* List of Rooms:
roomList = [];

let library = new Room("Library", "The library is a room with three doors, otherwise filled with floor-to-ceiling bookshelves, reading nooks, and a coffee table.", "bookshelves", "a golden book");
roomList.push(library);

let study = new Room("Study", "The Study is a quiet, small reading room with an old-fashioned desk halfway surrounded by large windows allowing a generous view of the north and the west.", "desk", "an old-fashioned, iron skeleton key");
roomList.push(study);

let mainHall = new Room("Main Hall", "The Main Hall is a grand entrance to the mansion featuring dazzling chandelier hanging from its vaulted ceiling. The ceiling is edged by beautiful crown molding. Your eye is drawn to the immaculate doors pointing to the west and south. In the room lies a single table with one drawer.", "table", "guest list");
roomList.push(mainHall);

let lounge = new Room("Lounge", "The Lounge is a cozy corner on the east side of the mansion boasting bay windows, a chaise lounge, a couch, and a window seat", "window seat", "dust bunnies");
roomList.push(lounge);

let diningRoom = new Room("Dining Room", "The Dining Room is a large room that appears to be paying homage to the Victorian era. The large satin birch table, positioned in the middle of the room, is set for eight, but seats ten. A buffet lines the northern wall while a china cabinet tucks itself in to the southwestern corner of the room. A small table in the corner hosts an ornate teapot.", "teapot", "cold tea");
roomList.push(diningRoom);

let kitchen = new Room("Kitchen", "The Kitchen is blah blah blah", "thing", "treasure");
roomList.push(kitchen);

let ballRoom = new Room("Ballroom", "The Ballroom is blah blah blah", "thing", "treasure");
roomList.push(ballRoom);

let conservatory = new Room("Ballroom", "The Conservatory is blah blah blah", "thing", "treasure");
roomList.push(conservatory);

let billiardRoom = new Room("Billiard Room", "The Billiard Room is blah blah blah", "thing", "treasure");
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

let backyard = new Location("Back Yard", "The Back Yard appears to have been the host of a recent croquet match. A set of polished croquet balls sits alone on the finely-decorated patio.")
locations.push(backyard);

let currentLocation = frontYard;
let roomCall = [];
// end of Locations

//* State Machines
const reverseCall = {
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
  "ball": ballRoom,
  "dini": diningRoom,
  "loun": lounge,
};

/* delete?
const roomCalling = {
  frontYard: ["Front Yard", "front yard", "front Yard", "Front yard"],
  mainHall: ["Main Hall", "main hall", "Main hall", "main Hall"],
  library: ["Library", "library"],
  study: ["study", "Study"],
  billiardRoom: ["Billiard Room", "billiard Room", "Billiard room", "billiard room"],
  westernHall: ["Western Hall", "western hall", "Western hall", "western Hall"],
  conservatory: ["conservatory", "Conservatory"],
  backyard: ["backyard", "Backyard", "Back Yard", "back yard", "Back yard", "back Yard"],
  kitchen: ["kitchen", "Kitchen"],
  easternHall: ["eastern Hall", "Eastern hall", "eastern hall", "Eastern Hall"],
  ballRoom: ["Ballroom", "ballroom", "Ball Room", "ball room", "Ball room", "ball Room"],
  diningRoom: ["Dining Room", "dining room", "Dining room", "dining Room"],
  lounge: ["Lounge", "lounge"]
};

*/

let accessible2 = {
  frontYard: ["Main Hall"],
  mainHall: ["Front Yard", "Library", "Ballroom"],
  library: ["Main Hall", "Study", "Billiard Room"],
  study: ["Library"],
  billiardRoom: ["Ballroom", "Western Hall"],
  westernHall: ["Billiard Room", "Back Yard"], // "Conservatory" (locked)
  conservatory: ["Western Hall"],
  backyard: ["Western Hall", "Kitchen"],
  kitchen: ["Back Yard", "Eastern Hall"],
  easternHall: ["Kitchen", "Dining Room", "Ball Room", "Lounge"],
  ballRoom: ["Main Hall", "Billiard Room", "Eastern Hall"],
  diningRoom: ["Eastern Hall"],
  lounge: ["Eastern Hall"],
}

//* Read Room Answer Function
function convertRoomResponse(inputRoom) {
  let convertResponse = inputRoom.substring(0, 4);
  console.log(convertResponse);
  let lowercaseConversion = convertResponse.toLowerCase();
  let seekOption = reverseCall[lowercaseConversion];
  if (seekOption == undefined) {
    console.log(`Sorry, I don't know what ${inputRoom} is.`);
  } else {
    console.log(`Attempting to switch rooms to ${seekOption.name}.`);
    changeRoom(seekOption.name);
  }
}

//* Room Changing Function
function changeRoom(newRoom) {
  // check valid rooms based on current location
  let validMovement = accessible2[currentLocation];
  console.log(validMovement);
  // announce current location
  console.log(`You are currently in the ${currentLocation.name}.`);

  // if else to determine what to do if newRoom is accessible and what to do if not
  if (validMovement.includes(newRoom)) {
    //allow movement
    let currentLocation = newRoom;
    console.log(`You move into the ${currentLocation.name}.`);
  } else {
    console.log(`Invalid movement: ${currentLocation.name} to ${newRoom}. Try something else.`);
  }

}


//! Test Section ***************************
//? Game starts in frontYard
//console.log(roomList);
//console.log(locations);
//console.log(easternHall.description);
//console.log(currentLocation.description);
console.log(currentLocation.look());
convertRoomResponse("Main Hall");
//!changeRoom(mainHall);
console.log(currentLocation.look());

//!let convertResponse = playerResponse.split(" ");
//!console.log(convertResponse);
//!let adjustResponse = convertResponse[1].toLowerCase;
//!console.log(adjustResponse);
//!let newResponse = convertResponse[0].toUpperCase;
//!console.log(newResponse);

//!start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing in the front yard of a grand mansion. While neither completely abandoned nor haunted, it holds an eerie aura about it, as if it has a story to tell you. No one appears to be home right now. The front door towers in front of you tauntingly, daring you to enter. Do you dare go in?`;
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
