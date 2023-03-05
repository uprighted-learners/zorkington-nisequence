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

//* Item Class:
class Item {
  constructor(findable, readable) {
    this.called = findable;
    this.reads = readable;
  }

  read() {
    if (this.reads == undefined) {
      // if there is no readable property
      console.log("Sorry, this item can't be read.");
    } else {
      // if there IS a readable property, read it
      console.log(`${this.reads}`);
    }
  }
}

//* Location Class:
class Location {
  constructor(name, desc, neighbors) {
    this.name = name;
    this.description = desc;
    this.nextTo = neighbors;
  }
  
  // look method returns location description
  look() {
    console.log(this.description + "\n");
  }
}

//* Room Class:
class Room extends Location {
  // parts of a room
  constructor(name, desc, neighbors, searchableItem, within) {
    super(name, desc, neighbors);
    this.thing = searchableItem;
    this.treasure = within;
  }

  // search method
  search(param) {
    let newParam = param.toLowerCase();
    if (newParam == this.thing) {
      console.log(`You search the ${this.thing} and find a(n) ${this.treasure}!`);
    } else {
      console.log("Nice try, but there's nothing to see here.");
    }
  }

  addToInventory(thingy) {
    let newThingy = thingy.toLowerCase();
    if (newThingy == this.treasure) {
      console.log(`You eagerly tuck the ${thingy} away in your backpack. Who knows? It could be useful in the future!`);
      inventory.push(this.treasure);
      this.treasure = "dust bunnies";
    } else {
      console.log(`You can't add ${newThingy} to your inventory.`);
    }
  }
} // end of Room Class

//*Inventory Array & Related Function:
inventory = [];
function listInventory() {
  console.log(`You open your backpack and see ${inventory}.`);
}

//* List of Possible Inventory Items:
let allItems = [];

let invite = new Item("invitation", "The invitation is too smudged to read fully, but you're able to make out the fact that there was a party at this house recently. You can also conclude that there are some vague directions about how to get from the Main Hall to the Dining Room.");
allItems.push(invite);

let guestList = new Item("guest list", "The list reads, 'My dearest Elizabeth, the Reverend Green, the Honorable Colonel Mustard, the lovely Miss Scarlett, and Professor Plum.' A note at the bottom has been crossed out, but you can tell that it seems to be a reminder to its author to have a 'Mrs. White' obtain the finest rib eye.");


//* List of Rooms:
let roomList = [];
let traveledPlaces = [];

let frontYard = new Room("Front Yard", "The Front Yard is finely manicured and adorned with hedges, flower beds, and a stone walkway. One might assume that the gardener had just visited within the last day or two. One also couldn't help but notice the towering mansion that the yard belongs to, boasting stained-glass windows and a grand arch over its tall, dark chestnut door. Centered on the door was a perfectly-round golden door knocker, merely a tease to anyone who thought they might be tall enough to reach it.", ["Main Hall"], "hedges", "invitation");
roomList.push(frontYard);

let mainHall = new Room("Main Hall", "The Main Hall is a grand entrance to the mansion featuring dazzling chandelier hanging from its vaulted ceiling. The ceiling is edged by beautiful crown molding. Within the room lies a single table with one drawer. Your eye is drawn to the immaculate doors pointing to the west and south. The western door is smaller than its counterpart -- perhaps it leads to a library or something of that nature?", ["Library", "Ballroom"], "table", "guest list");
roomList.push(mainHall);

let library = new Room("Library", "The library is a room with three doors, otherwise filled with floor-to-ceiling bookshelves, reading nooks, and a coffee table. How odd! There are no desks where one might study a book. Just a door back to the Main Hall and doors to the north and south. The southern door is marked with billiard sticks.", ["Main Hall", "Study", "Billiard Room"], "bookshelves", "book with a yellow handkerchief for a placeholder");
roomList.push(library);

let study = new Room("Study", "The Study is a quiet, small reading room with an old-fashioned desk halfway surrounded by large windows allowing a generous view of the north and the west sides of the expansive property. A single door leads you back to the Library.", ["Library"], "desk", "old-fashioned, iron skeleton key");
roomList.push(study);

let billiardRoom = new Room("Billiard Room", "The Billiard Room is half-filled with a pool table in pristine condition, but there's still room for a small workbench in the corner, and of course, a set of brand-new Canadian maple pool sticks. The room is bordered by three doors, each on its own wall while the western wall permits rays of sunshine to come through. You've come from the Library to the north, and your eye is drawn to the intricately carved door leading to the west. Its mere presence seemed to indicate to you that years of laughter and joy had once dwelt on its opposite side. The people who enjoyed that wonderful time must have had a ball.", ["Library", "Ballroom", "Western Hall"], "workbench", "a pair of emerald cufflinks engraved with the letter 'G'.");
roomList.push(billiardRoom);

let ballroom = new Room("Ballroom", "The Ballroom is similar to the Main Hall with its vaulted ceilings, double doors, and gorgeous chandelier, but the walls are decorated with a dazzling gold wallpaper and elegant wainscoting. In one corner you find a shining ebony grand piano with clean white ivory keys, while in others there are small sitting areas for those who may need a break from their waltzing and strutting. Next to another beautifully-carved door labeled 'Eastern Hall', a stunningly large painting of local landscape announced its presence to the room.", ["Billiard Room", "Main Hall", "Eastern Hall"], "piano", "hand-written love note");
roomList.push(ballroom);

let lounge = new Room("Lounge", "The Lounge is a cozy corner on the east side of the mansion boasting bay windows, a chaise lounge, a couch, and a window seat. Its only door leads you back to the Eastern Hall.", ["Eastern Hall"], "window seat", "bright-red lipstick");
roomList.push(lounge);

let diningRoom = new Room("Dining Room", "The Dining Room is a large room that appears to be paying homage to the Victorian era. The large satin birch table, positioned in the middle of the room, is set for six, but seats ten. An empty buffet lines the northern wall while a china cabinet tucks itself in to the southwestern corner of the room. A small table in the corner hosts an ornate teapot. The lone door in the room will return you to the Eastern Hall.", ["Eastern Hall"], "buffet", "fan resembling the feathers of a peacock");
roomList.push(diningRoom);

let kitchen = new Room("Kitchen", "The Kitchen is a disaster zone compared to the other rooms you've seen. Pots have boiled over, the sink was left running, and pans are blackened with the ashes of former food. The oven and stove are off now, but you can't help but wonder who was in the middle of cooking dinner? Where did they go? Perhaps they ran out the door through the backyard? What caused them to leave in such an obvious hurry? Finally, you observe that the floor is very wet and dirty. It probably could use a good mopping.", ["Eastern Hall", "Backyard"], "floor", "apron");
roomList.push(kitchen);

let conservatory = new Room("Conservatory", "The Conservatory is very warm this time of year with sun pouring in from just about every angle. Even the ceiling is made of windows! With all those windows, there was barely enough room for the single door that you'd come through. The room is otherwise filled with a variety of beautiful houseplants: flowers, ferns, succulents, and even a large venus fly trap.", ["Western Hall"], "venus fly trap", "small dagger");
roomList.push(conservatory);

// end of Rooms

//* List of Locations
locations = [];

let easternHall = new Location("Eastern Hall", "The Eastern Hall is an L-shaped corridor with four cedar doors: three are adorned with crystal knobs and boast intricate edging. The southernmost door, tucked around the corner, is plain and unassuming. One might assume that the employees of the mansion were the only ones to frequent it.The northernmost door is decorated with a hanging sign reading 'Lounge'.", ["Lounge", "Ballroom", "Dining Room", "Kitchen"]);
locations.push(easternHall);

let backyard = new Location("Backyard", "The backyard seems to spread several acres from your vantage point. It appears to have been the host of a recent croquet match. Additionally, a single set of polished croquet balls sits alone on the finely-decorated patio just outside of another exterior door which appears to lead to a hall on the west side of the building. Perhaps someone didn't make it in time for the game?", ["Kitchen", "Western Hall"]);
locations.push(backyard);

let westernHall = new Location("Western Hall", "The Western Hall appears to be a short corridor with access to the backyard. Two doors line its brief stretch: one to the north, and the other to the south. You note that the one towards the south has a conservative greenish hue to it, and a picture of a fern is hung there upon it. The northern door appears to be familiar.", ["Backyard", "Billiard Room", "Conservatory"]);
locations.push(westernHall);

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

/* 
! Not needed??
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
*/

//* Read Room Answer Function (& Change Room if Allowed)
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
    console.log(`You exit the ${currentLocation.name} and enter the ${seekOption.name}.`);
    currentLocation = seekOption;
    if (traveledPlaces.includes(currentLocation)) {
      // do nothing
    } else {
      traveledPlaces.push(currentLocation);
    }
  } else {
    // if seekOption is not contained as an adjacent to currentLocation
    console.log(`Sorry, you can't get to the ${inputRoom} from the ${currentLocation.name}.`);
  }
}

//* Room Changing Function

let currentLocation = frontYard;

//! Test Section ***************************
//? Game starts in frontYard
//console.log(roomList);
//console.log(locations);
// console.log(currentLocation.nextTo);
//console.log(currentLocation);
/* 
!testing convertRoomResponse
convertRoomResponse("Main Hall");
convertRoomResponse("Library");
convertRoomResponse("Study");
convertRoomResponse("Library");
convertRoomResponse("Billiard Room");
convertRoomResponse("Ballroom");
convertRoomResponse("Eastern Hall");
convertRoomResponse("Lounge");
convertRoomResponse("Eastern Hall");
convertRoomResponse("Dining Room");
convertRoomResponse("Eastern Hall");
*/
currentLocation = easternHall;
convertRoomResponse("Kitchen");
convertRoomResponse("Backyard");
convertRoomResponse("west hall");
convertRoomResponse("bill");
convertRoomResponse("cons")
convertRoomResponse("west");
convertRoomResponse("cons");
convertRoomResponse("west");
console.log(traveledPlaces);

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
