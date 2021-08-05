const htmlRenderer = require('../src/renderer')
const cheerio = require('cheerio');
const exceptions = require('../lib/Exceptions');
describe('Html renderer Initializing', () => {

        // UNhappy path - check title was injected 
        it('should return bool false if passed title not in html', () => {
            let testTitle = 'About';
            const renderer = new htmlRenderer.Renderer({title: testTitle});
            const templateHtml = cheerio.load(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${'BAD'}</title></head><body><div id='cards'>cards section</div></body></html>`, null, false); 
            expect(renderer.renderToHtml()).not.toBe(templateHtml.html());
        });
        // happy path - init with title string
        it('should return bool false if passed integer', () => {
            let testTitle = 'About';
            const renderer = new htmlRenderer.Renderer({title: testTitle});
            const templateHtml = cheerio.load(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${testTitle}</title></head><body><div id='cards'>cards section</div></body></html>`, null, false);
            expect(renderer.renderToHtml()).toBe(templateHtml.html());
        });
    });
describe('Adding content to selector', () => {
    // ------------------- Unhappy path
    it('UHP passing in object instead of string to selector should raise badArgumentError', ()=> {
        const renderer = new htmlRenderer.Renderer({title: 'ValidValue'});
        var invalidSelector = {bad: 'Wrong type'};
        var validContent = '<h1>Did this get added</h1>';
        expect(() => {
            renderer.addContentBySelector({selector: invalidSelector, content: validContent});
        }).toThrowError(exceptions.BadArgumentError);
    });
    it('UHP passing in object instead of string to content should raise badArgumentError', ()=> {
        const renderer = new htmlRenderer.Renderer({title: 'ValidValue'});
        var validSelector = '#cards';
        var inValidContent = {bad: 'Wrong type'};
        expect(() => {
            renderer.addContentBySelector({selector: validSelector, content: inValidContent});
        }).toThrowError(exceptions.BadArgumentError);
    });
    it('UHP no content argument should raise missingArgumentError', ()=> {
        const renderer = new htmlRenderer.Renderer({title: 'ValidValue'});
        var validContent = 'Valid';
        expect(() => {
            renderer.addContentBySelector({content: validContent});
        }).toThrowError(exceptions.MissingArgumentError);
    });
    it('UHP no selector argument should raise missingArgumentError', ()=> {
        const renderer = new htmlRenderer.Renderer({title: 'ValidValue'});
        var validSelector = 'Valid';
        expect(() => {
            renderer.addContentBySelector({selector: validSelector});
        }).toThrowError(exceptions.MissingArgumentError);
    });
    // ----------------- HAPPY path
    it('HP Renderer cheerio should contain content when valid selector, content passed to constructed instance', ()=> {
        const renderer = new htmlRenderer.Renderer({title: 'ValidValue'});
        var validSelector = '#cards';
        var validContent = '<h1>Did this get added</h1>';
        renderer.addContentBySelector({selector: validSelector, content: validContent});
        expect(renderer.text()).toEqual(expect.stringMatching('<h1>Did this get added</h1>'));
    });
})
