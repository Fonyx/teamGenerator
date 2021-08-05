const htmlRenderer = require('../src/renderer')
const cheerio = require('cheerio');
describe('Html renderer Initializing', () => {

        // UNhappy path - check title was injected 
        it('should return bool false if passed title not in html', () => {
            let testTitle = 'About';
            const renderer = new htmlRenderer.Renderer({title: testTitle});
            const templateHtml = cheerio.load(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${'BAD'}</title></head><body><div id='cards'>cards section</div></body></html>`, null, false); 
            expect(renderer.html()).not.toBe(templateHtml.html());
        });
        // happy path - init with title string
        it('should return bool false if passed integer', () => {
            let testTitle = 'About';
            const renderer = new htmlRenderer.Renderer({title: testTitle});
            const templateHtml = cheerio.load(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${testTitle}</title></head><body><div id='cards'>cards section</div></body></html>`, null, false);
            expect(renderer.html()).toBe(templateHtml.html());
        });
    });
describe('Adding content to selector', () => {
    // HAPPY path
    it('Renderer cheerio should contain content when valid selector, content passed to constructed instance', ()=> {
        const renderer = new htmlRenderer.Renderer({title: 'ValidTest'});
        var validSelector = '#cards';
        var validContent = '<h1>Did this get added</h1>';
        renderer.add(validSelector, validContent);
        expect(renderer.text()).toEqual(expect.stringMatching('<h1>Did this get added</h1>'));
    });
})
