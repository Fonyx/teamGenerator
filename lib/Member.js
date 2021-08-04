const inquirer = require("inquirer");
const fetch = require('node-fetch');
// https://stackoverflow.com/questions/57321266/how-to-test-inquirer-validation
const confirmStringValidator = async (userText)=> {
    try{
        if(parseInt(userText, 10)){
            return false;
        }
    } catch {
        // do nothing
    }
    if(typeof(userText) !== 'string'){
        return false;
    } else {
        if(userText === ''){
            return false
        }
        return true;
    }
}

const confirmIntValidator = async (userText)=> {
    // quick check of if userText fails to be turned into an int
        if(isNaN(parseInt(userText, 10))){
            return false;
        } else {
            // check for hex issues i.e number is 12b5, confirm every element is an int
            for(let i=0; i<userText.length;i++){
                if(isNaN(parseInt(userText.charAt(i)))){
                    return false;
                }
            }
        }
        return true
}

const confirmValidGithubUrl = async (userText)=> {
    if(typeof(userText) !== 'string'){
        return false;
    }
    if(!userText.includes('github')){
        return false;
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
            return false;
        }
    // fetch failed entirely
    } catch (err) {
        return false
    }
}

const confirmEmailValidator = async (userText)=> {
    let validString = confirmStringValidator(userText);
    if(validString){
        if(userText.toString().includes('@') && userText.toString().includes('.')){
            return true
        }
    } 
    return false
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
            message: 'Team member email',
            name: 'memberEmail',
            validate: confirmEmailValidator,
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
                    break
                case 'Engineer':
                    // query for github link then append answer to baseAnswers
                    await inquirer.prompt({
                        type: 'input',
                        message: 'github profile link?',
                        name: 'memberGithubLink',
                        validate: confirmValidGithubUrl,
                    })
                    .then((answer) => {
                        baseAnswers['memberGithubLink'] = answer.memberGithubLink;
                        console.log(baseAnswers);
                        return baseAnswers;
                    })
                    .catch((err) =>{
                        console.error(err);
                    })
                    break
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
                    break
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
    confirmValidGithubUrl,
    confirmEmailValidator,
}