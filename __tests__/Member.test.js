const member = require('../lib/Member');


// https://stackoverflow.com/questions/57321266/how-to-test-inquirer-validation
describe('String validator testing', ()=>{
    // unhappy path
    it('Should return bool false when passed integer as bad name', async () => {
        const result = await member.confirmStringValidator(0);
        expect(result).toBe(false);
    });
    // unhappy path
    it('Should return bool false when passed empty string as name', async () => {
        const result = await member.confirmStringValidator('');
        expect(result).toBe(false);
    });
    // unhappy path - should reject parsable numbers
    it('Should return bool false when passed string that can be cast to int', async () => {
        const result = await member.confirmStringValidator('12345');
        expect(result).toBe(false);
    });
    // happy path
    it('Should return true boolean when passed valid string', async () => {
        const result = await member.confirmStringValidator('Valid string');
        expect(result).toBe(true);
    });
});

describe('Id validator testing', ()=>{
    // unhappy path
    it('Should return bool false when passed string as bad id', async () => {
        const result = await member.confirmIntValidator('Not an Integer');
        expect(result).toBe(false);
    });
    // unhappy path
    it('Should return bool false when passed string with mixed alpha numerics', async () => {
        const result = await member.confirmIntValidator('3f4');
        expect(result).toBe(false);
    });
    // happy path
    it('Should return true boolean when passed valid int', async () => {
        const result = await member.confirmIntValidator(1);
        expect(result).toBe(true);
    });
});

describe('url validator testing', ()=>{
    // using https://httpstat.us/ for url testing

    // unhappy path - bad argument type - invalid url
    it('Should return boolean false when passed bad url string', async () => {
        const result = await member.confirmValidGithubUrl('Not a valid url');
        expect(result).toBe(false);
    });
    // unhappy path - bad argument type - object
    it('Should return bool false when passed bad object', async () => {
        const result = await member.confirmValidGithubUrl({notAString: 'meh'});
        expect(result).toBe(false);
    });
    // unhappy path - invalid url - not ok status url
    it('Should return bool false when passed url string with non 200 return code', async () => {
        const result = await member.confirmValidGithubUrl('https://httpstat.us/300');
        expect(result).toBe(false);
    });
    // unhappy path - invalid url - not github url
    it('Should return bool false when passed url string with non 200 return code', async () => {
        const result = await member.confirmValidGithubUrl('https://httpstat.us/200');
        expect(result).toBe(false);
    });
    // happy path - valid url
    it('Should return true boolean when passed valid int', async () => {
        const result = await member.confirmValidGithubUrl('https://github.com/');
        expect(result).toBe(true);
    });
});

describe('email validator testing', ()=>{
    // unhappy path - bad argument type - object instead of string
    it('Should return boolean false when passed an object instead of a string', async () => {
        const result = await member.confirmEmailValidator({bad: 'badType'});
        expect(result).toBe(false);
    });
    // unhappy path - bad argument type - integer instead of string
    it('Should return bool false when passed bad integer instead of string', async () => {
        const result = await member.confirmEmailValidator(0);
        expect(result).toBe(false);
    });
    // unhappy path - invalid string - missing @
    it('Should return bool false when passed invalid string', async () => {
        const result = await member.confirmEmailValidator('nick.gmail.com');
        expect(result).toBe(false);
    });
    // unhappy path - invalid string - missing .
    it('Should return bool false when passed invalid string', async () => {
        const result = await member.confirmEmailValidator('nick@gmail@com');
        expect(result).toBe(false);
    });
    // happy path - valid string
    it('Should return true boolean when passed valid email string', async () => {
        const result = await member.confirmEmailValidator('nick@fake.me');
        expect(result).toBe(true);
    });
});