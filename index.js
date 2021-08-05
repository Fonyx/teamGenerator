const Member = require('./lib/Member');
const render = require('./src/renderer');

async function runProgram(){
    var renderer = new render.Renderer();
    let member = new Member.MemberPrompt();
    let details = await member.prompt().then((res) => console.log(res));
}

await runProgram();

