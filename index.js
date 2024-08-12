#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
console.log("\n\t\t\tCountDown Timer\n");
const res = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: "please set timer",
    validate: (input) => {
        if (isNaN(input)) {
            return "please enter valid number!";
        }
        else if (input > 60) {
            return "seconds must be in 60";
        }
        else {
            return true;
        }
    },
});
let input = res.userInput;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDif = differenceInSeconds(intervalTime, currentTime);
        if (timeDif <= 0) {
            console.log("Timer has Expired");
            process.exit();
        }
        const min = Math.floor((timeDif % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDif % 60);
        console.log(`${min.toString().padStart(2, "0")}: ${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
startTime(input);
