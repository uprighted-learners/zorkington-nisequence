const { table } = require('console');
const { read } = require('fs');
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//* ---------------------------------------
//! TESTING FILE
callPolice();
//* ---------------------------------------

// * NEW FUNCTION
function callPolice() {
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

//* ---------------------------------------

// * NEW FUNCTION
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
    // *Option 2: Mrs. Elizabeth Peacock
    } else if (arrayInfo.includes("Peacock") || arrayInfo.includes("Elizabeth")) {
        // lose
        console.log('You: "The crime was committed by none other than the widowed Elizabeth Peacock. She has shown no indication of appreciation for all the attention John has been providing and she simply became fed up with it."');
        console.log('Emergency Operator: "I assure you, we are investigating her quite closely. As far as we know, she was the last to see John alive. But thank you for the input."');
    // *Option 3: Miss Scarlett
    } else if (arrayInfo.includes("Scarlett")) {
        // lose
        console.log('You: "I daresay the murderer was Miss Scarlett. She was jealous of the attention that Elizabeth Peacock was receiving.');
        console.log('Emergency Operator: "Ridiculous. Miss Scarlett has plenty of her own suitors."');
    // *Option 4: Colonel Mustard
    } else if (arrayInfo.includes("Mustard") || arrayInfo.includes("Colonel")) {
        // lose
        console.log('You: "Colonel Mustard has been acting suspicious lately... and studying books on war. And he always has that rifle with him."');
        console.log('Emergency Operator: "You are not the only one to mention that, but his innocence has already been proven. Thank you anyway." *click*');
    // *Option 5: The Reverend Green
    } else if (arrayInfo.includes("Green") || arrayInfo.includes("Reverend")) {
        // lose
        console.log('You: "The murderer was clearly Reverend Green. His cufflinks were found only two rooms away from the murder weapon!');
        console.log('Emergency Operator: "Preposterous! He was playing pool on the opposite side of the mansion from where the body was found and from where John was last seen alive."');
    // *Option 6: Mrs. White
    } else if (arrayInfo.includes("White")) {
        // lose
        console.log('You: "Madam, I believe it was Mrs. White. The murder was in the kitchen, after all."');
        console.log('Emergency Operator: "You are being ridiculous. She was out at the store when everything went down. Police were already on the scene when she attempted to return to the kitchen."');
    // *Option 7: John Boddy
    } else if (arrayInfo.includes("Boddy") || arrayInfo.includes("John")) {
        // lose
        console.log('You: "Madam, I believe it was John Boddy."');
        console.log('Emergency Operator: "Nonsense! He was the one that was murdered. Stop wasting our time." *click*');
    } else {
        accusationChoice();
    }
    playAgain();
} // end of accusationChoice function