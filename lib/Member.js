const inquirer = require("inquirer");
const fetch = require('node-fetch');
// https://stackoverflow.com/questions/57321266/how-to-test-inquirer-validation
const confirmStringValidator = async (userText)=> {
    if(typeof(userText) !== 'string'){
        return 'Incorrect type';
    } else {
        return true;
    }
}

const confirmIntValidator = async (userText)=> {
    if(isNaN(parseInt(userText, 10))){
        return 'Incorrect type';
    } else {
        return true;
    }
}

const confirmValidUrl = async (userText)=> {
    if(typeof(userText) !== 'string'){
        return 'Not a string'
    }
    try {
        let valid = await fetch(userText)
        .then((response) => {
            if(response.ok){
                return true;
            } else {
                return false
            }
        });
        if(valid){
            return true;
        } else {
            // fetch returned a non-ok status
            return 'exists-not ok';
        }
    // fetch failed entirely
    } catch (err) {
        return false
    }
}

class MemberPrompt{
    constructor(){
        inquirer.prompt([{
            type: 'input',
            message: 'Team member name',
            name: 'memberName',
            validate: confirmStringValidator,
        },{
            type: 'input',
            message: 'Team member id',
            name: 'memberId',
            validate: confirmIntValidator,
        },{
            type: 'input',
            message: 'Team ember email',
            name: 'memberEmail',
            validate: confirmStringValidator,
        },{
            type: 'list',
            message: 'Team member type',
            name: 'memberType',
            choices: ['Manager', 'Engineer', 'Intern'],
        }])
        .then(async (baseAnswers) => {
            switch (baseAnswers.memberType){
                case 'Manager':
                    // query for office number then append answer to baseAnswers
                    await inquirer.prompt({
                        type: 'input',
                        message: 'Office number',
                        name: 'memberOfficeNumber',
                        validate: confirmIntValidator,
                    })
                    .then((answer) => {
                        baseAnswers['memberOfficeNumber'] = answer.memberOfficeNumber;
                        console.log(baseAnswers);
                        return baseAnswers;
                    })
                    .catch((err) =>{
                        console.error(err);
                    })
                case 'Engineer':
                    // query for github link then append answer to baseAnswers
                    await inquirer.prompt({
                        type: 'input',
                        message: 'github profile link?',
                        name: 'memberGithubLink',
                        validate: confirmValidUrl,
                    })
                    .then((answer) => {
                        baseAnswers['memberGithubLink'] = answer.memberGithubLink;
                        console.log(baseAnswers);
                        return baseAnswers;
                    })
                    .catch((err) =>{
                        console.error(err);
                    })
                case 'Intern':
                    // query for school name then append answer to baseAnswers
                    await inquirer.prompt({
                        type: 'input',
                        message: 'Interns School Name?',
                        name: 'memberSchoolName',
                        validate: confirmStringValidator,
                    })
                    .then((answer) => {
                        baseAnswers['memberSchoolName'] = answer.memberSchoolName;
                        console.log(baseAnswers);
                        return baseAnswers;
                    })
                    .catch((err) =>{
                        console.error(err);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }
}

module.exports = {
    MemberPrompt,
    confirmStringValidator,
    confirmIntValidator,
    confirmValidUrl,
}