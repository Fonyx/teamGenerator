const member = require('../lib/Member');


// https://stackoverflow.com/questions/57321266/how-to-test-inquirer-validation
describe('String validator testing', ()=>{
    // unhappy path
    it('Should return Incorrect type when passed integer as bad name', async () => {
        const result = await member.confirmStringValidator(0);
        expect(result).toBe('Incorrect type');
    });
    // happy path
    it('Should return true boolean when passed valid string', async () => {
        const result = await member.confirmStringValidator('Valid string');
        expect(result).toBe(true);
    });
});

describe('Id validator testing', ()=>{
    // unhappy path
    it('Should return Incorrect type when passed string as bad id', async () => {
        const result = await member.confirmIntValidator('Not an Integer');
        expect(result).toBe('Incorrect type');
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
        const result = await member.confirmValidUrl('Not a valid url');
        expect(result).toBe(false);
    });
    // unhappy path - bad argument type - not ok status url
    it('Should return exists-not ok when passed url string with non 200 return code', async () => {
        const result = await member.confirmValidUrl('https://httpstat.us/300');
        expect(result).toBe('exists-not ok');
    });
    // unhappy path - bad argument type - object
    it('Should return Not a string when passed bad object', async () => {
        const result = await member.confirmValidUrl({notAString: 'meh'});
        expect(result).toBe('Not a string');
    });
    // happy path - valid url
    it('Should return true boolean when passed valid int', async () => {
        const result = await member.confirmValidUrl('https://github.com/');
        expect(result).toBe(true);
    });
});