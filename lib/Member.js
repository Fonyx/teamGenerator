const inquirer = require("inquirer");
 

class MemberPrompt{
    constructor(){
        return new Promise((resolve, reject) => {
            return resolve({email: 'some@example.com'});
        });
    }
}

module.exports = MemberPrompt;