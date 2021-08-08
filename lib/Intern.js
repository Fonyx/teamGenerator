const { attr } = require('cheerio/lib/api/attributes');
let Employee = require('./Employee');
const exceptions = require('./Exceptions');

class Intern extends Employee{
    constructor({name, id, email, school}={}){
        // since we are allowing keyword args, arguments becomes an array with one object element for unpacking
        if(name === undefined || id === undefined || email === undefined || school === undefined){
            throw new exceptions.MissingArgumentError(`Expected 4 arguments, got ${arguments[0].length}`);
        }
        super({'name': name, 'id': id, 'email': email});
        if(typeof(school) !== 'string'){
            throw new exceptions.BadArgumentError(`School argument ${school} wasn't a string`)
        } else {
            this.school = school;
        }
    }
    
    getRole(){
        return 'Intern';
    }

    getSchool(){
        return this.school;
    }

    renderToHtml(){
        let htmlLiteral = `
<div class="col s12 l6">
        <div class="card red lighten-1">
          <div class="card-content white-text">
            <div class="row">
                <div class="col card-title"><i class="medium material-icons">child_care</i></div>
                <div class="col">${this.name.toUpperCase()} THE ${this.getRole().toUpperCase()}</div>
            </div>
            <div class="row">
                <div class="col white-text"><i class="material-icons">fingerprint</i></div>
                <div class="col white-text ">Staff ID</div>
                <div class="col white-text right">${this.id}</div>
            </div>
            <div class="row">
                <div class="col white-text"><i class="material-icons">school</i></div>
                <div class="col white-text ">School</div>
                <div class="col white-text right">${this.getSchool()}</div>
            </div>
            <div class="row">
                <a href="mailto:${this.email}">
                    <div class="col white-text"><i class="material-icons">contact_mail</i></div>
                    <div class="col white-text ">Email</div>
                    <div class="col white-text right">${this.email}</div>
                </a>
            </div>
          </div>
        </div>
      </div>
`;
        return htmlLiteral;
    }

}

module.exports = Intern;