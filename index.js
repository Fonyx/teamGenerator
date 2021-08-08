const pb = require('./src/pageBuilder');
const inquirer = require('inquirer');

inquirer.prompt({
    'type': 'input',
    'message':'Company Name?',
    'name':'title',
    validate:pb.confirmStringValidator,
})
.then((answer) => {
    var builder = new pb.PageBuilder({title: answer.title});
    builder.run();
})
.catch((err) => (console.error(err)));



