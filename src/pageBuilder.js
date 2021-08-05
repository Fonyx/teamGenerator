// https://www.npmjs.com/package/cheerio
const cheerio = require('cheerio');
const inquirer = require("inquirer");
const fetch = require('node-fetch');
const exceptions = require('../lib/Exceptions');
const Engineer = require('../lib/Engineer');
const Manager = require('../lib/Manager');
const Intern = require('../lib/Intern');


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
        return valid;
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

class PageBuilder{
    constructor({title}={}){
        this.$ = undefined;
        this.members = [];
        this.builtStarterCheerio(title);
    }

    addContentBySelector({selector, content}={}){
        // checking argument presence
        if(selector === undefined || content === undefined){
            throw new exceptions.MissingArgumentError();
        }
        // checking argument types
        if(typeof(selector) !== 'string' || typeof(content) !== 'string'){
            throw new exceptions.BadArgumentError()
        }
        this.$(selector).text(content);
    }

    builtStarterCheerio(title){
        this.$ = cheerio.load(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title></head><body><div id='cards'>cards section</div></body></html>`, null, false); // don't auto add html, head and body tags
    }

    constructEmployeeFromBaseAnswers(memberAnswers){
        switch (memberAnswers.memberType){
            case 'Engineer':
                var newMember = new Engineer({
                    name:memberAnswers.name, 
                    id:memberAnswers.id,
                    email:memberAnswers.email,
                    github:memberAnswers.github,
                })
                break
            case 'Manager':
                var newMember = new Manager({
                    name:memberAnswers.name, 
                    id:memberAnswers.id,
                    email:memberAnswers.email,
                    officeNumber:memberAnswers.officeNumber,
                })
                break
            case 'Intern':
                var newMember = new Intern({
                    name:memberAnswers.name, 
                    id:memberAnswers.id,
                    email:memberAnswers.email,
                    school:memberAnswers.school,
                })
                break
        }

        this.members.push(newMember);
        console.log(this.members);
    }

    async promptMember(){
        return inquirer.prompt([{
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
                    })
                    .catch((err) =>{
                        console.error(err);
                    })
                    break
            }
            this.constructEmployeeFromBaseAnswers(baseAnswers);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    renderToHtml(){
        console.log(`Current dom html is: ${this.$.html()}`);
        return this.$.html();
    }

    run(){
        // get first member
        this.promptMember()
        // ask user for more
        // render
    }

    text(){
        console.log(`Current dom text is: ${this.$.text()}`)
        return this.$.text();
    }

}

module.exports = {
    PageBuilder,
    confirmStringValidator,
    confirmIntValidator,
    confirmValidGithubUrl,
    confirmEmailValidator,
}