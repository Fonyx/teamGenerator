let Employee = require('./Employee');
let exceptions = require('./Exceptions');

class Engineer extends Employee{
    constructor({name, id, email, github}={}){
        // since we are allowing keyword args, arguments becomes an array with one object element for unpacking
        if(name === undefined || id === undefined || email === undefined || github === undefined){
            throw new exceptions.MissingArgumentError(`Expected 4 arguments, got ${arguments[0].length}`);
        }
        super({'name': name, 'id': id, 'email': email});
        if(typeof(github) !== 'string'){
            throw new exceptions.BadArgumentError(`Github argument was not type string`);
        } else {
            this.github = github;
            this.getUsername();
        }
    }
    
    getGithub(){
        return this.github;
    }

    getRole(){
        return 'Engineer';
    }

    getUsername(){
        let pieces = this.github.split('/');
        this.username = pieces[pieces.length-1];
    }


    renderToHtml(){
        let htmlLiteral = `
<div class="col s12 l6">
        <div class="card purple lighten-1">
          <div class="card-content white-text">
            <div class="row">
                <div class="col card-title"><i class="medium material-icons">camera</i></div>
                <div class="col">${this.name.toUpperCase()} THE ${this.getRole().toUpperCase()}</div>
            </div>
            <div class="row">
                <div class="col white-text"><i class="material-icons">fingerprint</i></div>
                <div class="col white-text ">Staff ID</div>
                <div class="col white-text right">${this.id}</div>
            </div>
            <div class="row">
                <a href="${this.getGithub()}" target="blank">
                    <div class="col white-text">
                        <img src="dist/images/GitHub-Mark-64px.png"></i>
                    </div>
                    <div class="col white-text ">Github</div>
                    <div class="col white-text right">${this.username}</div>
                </a>
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

module.exports = Engineer;