// https://www.npmjs.com/package/cheerio
const cheerio = require('cheerio');
const exceptions = require('../lib/Exceptions');
class Renderer{
    constructor({title}={}){
        this.$ = cheerio.load(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title></head><body><div id='cards'>cards section</div></body></html>`, null, false); // don't auto add html, head and body tags
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

    renderToHtml(){
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