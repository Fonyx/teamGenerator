const fs = require('fs');
const pageBuilder = require('../src/pageBuilder');
const exceptions = require('../lib/Exceptions');
const Engineer = require('../lib/Engineer');
const Manager = require('../lib/Manager');
const Intern = require('../lib/Intern');

// TESTING INIT AND PAGE BUILDER INTERNAL METHODS
describe('PageBuilder Initializing', () => {

        // Happy Path path - check title in head, header, main and footer
        it('HP title passed in and should be in html sections', () => {
            let testTitle = 'About';
            const renderer = new pageBuilder.PageBuilder({title: testTitle});
            expect(renderer.$('head').html()).toEqual(expect.stringContaining(testTitle));
            expect(renderer.$('header').html()).toEqual(expect.stringContaining(testTitle));
            expect(renderer.$('footer').html()).toEqual(expect.stringContaining(testTitle));
        })
});

// Testing parser add method
describe('Adding content to selector', () => {
    // ------------------- Unhappy path
    it('UHP passing in object instead of string to selector should raise badArgumentError', ()=> {
        const renderer = new pageBuilder.PageBuilder({title: 'ValidValue'});
        var invalidSelector = {bad: 'Wrong type'};
        var validContent = '<h1>Did this get added</h1>';
        expect(() => {
            renderer.appendContentBySelector({selector: invalidSelector, content: validContent});
        }).toThrowError(exceptions.BadArgumentError);
    });
    it('UHP passing in object instead of string to content should raise badArgumentError', ()=> {
        const renderer = new pageBuilder.PageBuilder({title: 'ValidValue'});
        var validSelector = '#cards';
        var inValidContent = {bad: 'Wrong type'};
        expect(() => {
            renderer.appendContentBySelector({selector: validSelector, content: inValidContent});
        }).toThrowError(exceptions.BadArgumentError);
    });
    it('UHP no content argument should raise missingArgumentError', ()=> {
        const renderer = new pageBuilder.PageBuilder({title: 'ValidValue'});
        var validContent = 'Valid';
        expect(() => {
            renderer.appendContentBySelector({content: validContent});
        }).toThrowError(exceptions.MissingArgumentError);
    });
    it('UHP no selector argument should raise missingArgumentError', ()=> {
        const renderer = new pageBuilder.PageBuilder({title: 'ValidValue'});
        var validSelector = 'Valid';
        expect(() => {
            renderer.appendContentBySelector({selector: validSelector});
        }).toThrowError(exceptions.MissingArgumentError);
    });
    // ----------------- HAPPY path
    it('HP Renderer cheerio should contain content when valid selector, content passed to constructed instance', ()=> {
        const renderer = new pageBuilder.PageBuilder({title: 'ValidValue'});
        var validSelector = '#cards-container';
        var validContent = '<h1>Did this get added</h1>';
        renderer.appendContentBySelector({selector: validSelector, content: validContent});
        expect(renderer.getHtml()).toEqual(expect.stringContaining('<h1>Did this get added</h1>'));
    });
});

// Testing object constructors from user answers
describe('Constructing member from answers', () => {
    // --------------------- UNHAPPY PATHS
    it('Should raise MissingArgumentError when missing type', () => {
        // setup
        let answerMissingType = {memberName: 'James', memberId: 1, memberEmail: 'nick@g.com', memberGithubLink: 'https://github.com/Fonyx'};
        let pb = new pageBuilder.PageBuilder({title:'Test'});
        // run and test
        expect(() => {
            pb.constructEmployeeFromBaseAnswers(answerMissingType);
        }).toThrowError(exceptions.MissingArgumentError);
        
    });
    it('Should raise MissingArgumentError when missing name', () => {
        // setup
        let answerMissingName = {memberType: 'Engineer', memberId: 1, memberEmail: 'nick@g.com', memberGithubLink: 'https://github.com/Fonyx'};
        let pb = new pageBuilder.PageBuilder({title:'Test'});
        // run and test
        expect(() => {
            pb.constructEmployeeFromBaseAnswers(answerMissingName);
        }).toThrowError(exceptions.MissingArgumentError);
    });
    it('Should raise MissingArgumentError when missing id', () => {
        // setup
        let answerMissingId = {memberType: 'Engineer', memberName: 'James', memberEmail: 'nick@g.com', memberGithubLink: 'https://github.com/Fonyx'};
        let pb = new pageBuilder.PageBuilder({title:'Test'});
        // run and test
        expect(() => {
            pb.constructEmployeeFromBaseAnswers(answerMissingId);
        }).toThrowError(exceptions.MissingArgumentError);
    });
    it('Should raise MissingArgumentError when missing email', () => {
        // setup
        let answerMissingEmail = {memberType: 'Engineer', memberName: 'James', memberId: 1, memberGithubLink: 'https://github.com/Fonyx'};
        let pb = new pageBuilder.PageBuilder({title:'Test'});
        // run and test
        expect(() => {
            pb.constructEmployeeFromBaseAnswers(answerMissingEmail);
        }).toThrowError(exceptions.MissingArgumentError);
    });
    // Type specific missing value
    it('Should raise MissingArgument when missing githublink for engineer', () => {
        // setup
        let answerMissingGithub = {memberType: 'Engineer', memberName: 'James', memberId: 1, memberEmail: 'nick@g.com'};
        let pb = new pageBuilder.PageBuilder({title:'Test'});
        // run and test
        expect(() => {
            pb.constructEmployeeFromBaseAnswers(answerMissingGithub);
        }).toThrowError(exceptions.MissingArgumentError);
    });
    it('Should raise MissingArgumentError when missing office number for manager', () => {
        // setup
        let answerMissingGithub = {memberType: 'Manager', memberName: 'James', memberId: 1, memberEmail:'Valid@email.this'};
        let pb = new pageBuilder.PageBuilder({title:'Test'});
        // run and test
        expect(() => {
            pb.constructEmployeeFromBaseAnswers(answerMissingGithub);
        }).toThrowError(exceptions.MissingArgumentError);
    });
    it('Should raise MissingArgumentError when missing school name for intern', () => {
        // setup
        let answerMissingGithub = {memberType: 'Intern', memberName: 'James', memberId: 1, memberEmail:'Valid@email.this'};
        let pb = new pageBuilder.PageBuilder({title:'Test'});
        // run and test
        expect(() => {
            pb.constructEmployeeFromBaseAnswers(answerMissingGithub);
        }).toThrowError(exceptions.MissingArgumentError);
    });
    // type string not in valid strings
    it('Should raise AttributeError when type not exactly in valid type list', () => {
        // setup
        let badTypeAnswer = {memberType: 'inte', memberName: 'James', memberId: 1, memberEmail:'Valid@email.this'};
        let pb = new pageBuilder.PageBuilder({title:'Test'});
        // run and test
        expect(() => {
            pb.constructEmployeeFromBaseAnswers(badTypeAnswer);
        }).toThrowError(exceptions.AttributeError);
    });
    it('Should raise AttributeError when type not exactly in valid type list', () => {
        // setup
        let badTypeAnswer = {memberType: 'engineering', memberName: 'James', memberId: 1, memberEmail:'Valid@email.this'};
        let pb = new pageBuilder.PageBuilder({title:'Test'});
        // run and test
        expect(() => {
            pb.constructEmployeeFromBaseAnswers(badTypeAnswer);
        }).toThrowError(exceptions.AttributeError);
    });
    // --------------------- HAPPY PATHS
    it('should return valid object for valid answer object as engineer type', () => {
        // setup
        let validEngineerAnswers = {memberType: 'Engineer',memberName: 'James', memberId: 1, memberEmail: 'nick@g.com', memberGithubLink: 'https://github.com/Fonyx'};
        let pb = new pageBuilder.PageBuilder({title:'Test'});
        // run
        let engineer = pb.constructEmployeeFromBaseAnswers(validEngineerAnswers)
        // test
        expect(engineer).toBeInstanceOf(Engineer);
        expect(engineer.name).toBe(validEngineerAnswers.memberName);
        expect(engineer.id).toBe(validEngineerAnswers.memberId);
        expect(engineer.email).toBe(validEngineerAnswers.memberEmail);
        expect(engineer.github).toBe(validEngineerAnswers.memberGithubLink);
    });
    it('should return valid object for passing valid answer object as manager type', () => {
        // setup
        let validManagerAnswers = {memberType: 'Manager',memberName: 'James', memberId: 1, memberEmail: 'nick@g.com', memberOfficeNumber: 1};
        let pb = new pageBuilder.PageBuilder({title:'Test'});
        // run
        let manager = pb.constructEmployeeFromBaseAnswers(validManagerAnswers)
        // test
        expect(manager).toBeInstanceOf(Manager);
        expect(manager.name).toBe(validManagerAnswers.memberName);
        expect(manager.id).toBe(validManagerAnswers.memberId);
        expect(manager.email).toBe(validManagerAnswers.memberEmail);
        expect(manager.officeNumber).toBe(validManagerAnswers.memberOfficeNumber);
    });
    it('should return valid object for passing valid answer object as intern type', () => {
        // setup
        let validInternAnswers = {memberType: 'Intern',memberName: 'James', memberId: 1, memberEmail: 'nick@g.com', memberSchoolName: 'Radford'};
        let pb = new pageBuilder.PageBuilder({title:'Test'});
        // run
        let intern = pb.constructEmployeeFromBaseAnswers(validInternAnswers);
        // test
        expect(intern).toBeInstanceOf(Intern);
        expect(intern.name).toBe(validInternAnswers.memberName);
        expect(intern.id).toBe(validInternAnswers.memberId);
        expect(intern.email).toBe(validInternAnswers.memberEmail);
        expect(intern.school).toBe(validInternAnswers.memberSchoolName);
    });
});

// Output testing using parser - happy path only
describe('HTML output presence testing', () => {
    it('HP Should contain a valid engineer card for a valid engineer object construction', () => {
        let pb = new pageBuilder.PageBuilder({title: 'TestHtml'});
        let employeeEngineer = new Engineer({name: 'James', id:2, email:"james@fake.me", github:"https://github.com/Fonyx"});
        pb.addEmployee(employeeEngineer);
        let html = pb.renderHtml();
        expect(html).toEqual(expect.stringContaining(employeeEngineer.id.toString()));
        expect(html).toEqual(expect.stringContaining(employeeEngineer.getRole().toUpperCase()));
        expect(html).toEqual(expect.stringContaining(employeeEngineer.name.toUpperCase()));
        expect(html).toEqual(expect.stringContaining(employeeEngineer.getGithub()));
        
    });
    it('HP Should contain a valid manager card for a valid manager object construction', () => {
        let pb = new pageBuilder.PageBuilder({title: 'TestHtml'});
        let employeeManager = new Manager({name: 'James', id:2, email:"james@fake.me", officeNumber:3});
        pb.addEmployee(employeeManager);
        let html = pb.renderHtml();
        expect(html).toEqual(expect.stringContaining(employeeManager.name.toUpperCase()));
        expect(html).toEqual(expect.stringContaining(employeeManager.id.toString()));
        expect(html).toEqual(expect.stringContaining(employeeManager.getRole().toUpperCase()));
        expect(html).toEqual(expect.stringContaining(employeeManager.officeNumber.toString()));
        
    });
    it('HP Should contain a valid intern card for a valid intern object construction', () => {
        let pb = new pageBuilder.PageBuilder({title: 'TestHtml'});
        let employeeIntern = new Intern({name: 'James', id:2, email:"james@fake.me", school:"Trinity"});
        pb.addEmployee(employeeIntern);
        let html = pb.renderHtml();
        expect(html).toEqual(expect.stringContaining(employeeIntern.name.toUpperCase()));
        expect(html).toEqual(expect.stringContaining(employeeIntern.id.toString()));
        expect(html).toEqual(expect.stringContaining(employeeIntern.getRole().toUpperCase()));
        expect(html).toEqual(expect.stringContaining(employeeIntern.school));

    });
});

// Testing file io
describe('Export html to file testing', () => {
    // Happy path
    var pb = new pageBuilder.PageBuilder({title: 'TestHtml'});
    var validEngineer = new Engineer({name: 'James', id:2, email:"james@fake.me", github:"https://github.com/Fonyx"});
    pb.addEmployee(validEngineer);
    it('HP Successfully write file with html', () => {
        // exports file
        pb.exportHtml();
        // checks file is there
        expect(fs.existsSync(pb.exportPath)).toBe(true);
        // deletes file
        fs.unlinkSync(pb.exportPath);
    });
})

// https://stackoverflow.com/questions/57321266/how-to-test-inquirer-validation
// TESTING VALIDATORS FOR PROMPT METHOD
describe('String validator testing', ()=>{
    // unhappy path
    it('Should return bool false when passed integer as bad name', async () => {
        const result = await pageBuilder.confirmStringValidator(0);
        expect(result).toBe(false);
    });
    // unhappy path
    it('Should return bool false when passed empty string as name', async () => {
        const result = await pageBuilder.confirmStringValidator('');
        expect(result).toBe(false);
    });
    // unhappy path - should reject parsable numbers
    it('Should return bool false when passed string that can be cast to int', async () => {
        const result = await pageBuilder.confirmStringValidator('12345');
        expect(result).toBe(false);
    });
    // happy path
    it('Should return true boolean when passed valid string', async () => {
        const result = await pageBuilder.confirmStringValidator('Valid string');
        expect(result).toBe(true);
    });
});

describe('Id validator testing', ()=>{
    // unhappy path
    it('Should return bool false when passed string as bad id', async () => {
        const result = await pageBuilder.confirmIntValidator('Not an Integer');
        expect(result).toBe(false);
    });
    // unhappy path
    it('Should return bool false when passed string with mixed alpha numerics', async () => {
        const result = await pageBuilder.confirmIntValidator('3f4');
        expect(result).toBe(false);
    });
    // happy path
    it('Should return true boolean when passed valid int', async () => {
        const result = await pageBuilder.confirmIntValidator(1);
        expect(result).toBe(true);
    });
});

describe('url validator testing', ()=>{
    // using https://httpstat.us/ for url testing

    // unhappy path - bad argument type - invalid url
    it('Should return boolean false when passed bad url string', async () => {
        const result = await pageBuilder.confirmValidGithubUrl('Not a valid url');
        expect(result).toBe(false);
    });
    // unhappy path - bad argument type - object
    it('Should return bool false when passed bad object', async () => {
        const result = await pageBuilder.confirmValidGithubUrl({notAString: 'meh'});
        expect(result).toBe(false);
    });
    // unhappy path - invalid url - not ok status url
    it('Should return bool false when passed url string with non 200 return code', async () => {
        const result = await pageBuilder.confirmValidGithubUrl('https://httpstat.us/300');
        expect(result).toBe(false);
    });
    // unhappy path - invalid url - not github url
    it('Should return bool false when passed url string with non 200 return code', async () => {
        const result = await pageBuilder.confirmValidGithubUrl('https://httpstat.us/200');
        expect(result).toBe(false);
    });
    // happy path - valid url
    it('Should return true boolean when passed valid int', async () => {
        const result = await pageBuilder.confirmValidGithubUrl('https://github.com/');
        expect(result).toBe(true);
    });
});

describe('email validator testing', ()=>{
    // unhappy path - bad argument type - object instead of string
    it('Should return boolean false when passed an object instead of a string', async () => {
        const result = await pageBuilder.confirmEmailValidator({bad: 'badType'});
        expect(result).toBe(false);
    });
    // unhappy path - bad argument type - integer instead of string
    it('Should return bool false when passed bad integer instead of string', async () => {
        const result = await pageBuilder.confirmEmailValidator(0);
        expect(result).toBe(false);
    });
    // unhappy path - invalid string - missing @
    it('Should return bool false when passed invalid string', async () => {
        const result = await pageBuilder.confirmEmailValidator('nick.gmail.com');
        expect(result).toBe(false);
    });
    // unhappy path - invalid string - missing .
    it('Should return bool false when passed invalid string', async () => {
        const result = await pageBuilder.confirmEmailValidator('nick@gmail@com');
        expect(result).toBe(false);
    });
    // happy path - valid string
    it('Should return true boolean when passed valid email string', async () => {
        const result = await pageBuilder.confirmEmailValidator('nick@fake.me');
        expect(result).toBe(true);
    });
});