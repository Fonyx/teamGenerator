// https://www.npmjs.com/package/cheerio
const cheerio = require('cheerio');

class Renderer{
    constructor({title}={}){
        this.$ = cheerio.load(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title></head><body><div id='cards'>cards section</div></body></html>`, null, false); // don't auto add html, head and body tags
    }

    add(selector, content){
        this.$(selector).text(content);
    }

    html(){
        console.log(`Current dom html is: ${this.$.html()}`);
        return this.$.html();
    }

    text(){
        console.log(`Current dom text is: ${this.$.text()}`)
        return this.$.text();
    }
}

module.exports = {
    Renderer,
}