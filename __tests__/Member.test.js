const inquirer = require('inquirer')
const MemberPrompt = require('../lib/Member');

jest.mock('inquirer');

// https://stackoverflow.com/questions/49862039/how-to-write-unit-tests-for-inquirer-js
describe('Module test', () => {
    test('user input', async () => {
      inquirer.prompt = jest.fn().mockResolvedValue({ email: 'some@example.com' });
  
      await expect(new MemberPrompt()).resolves.toEqual({ email: 'some@example.com' });
    });
  });