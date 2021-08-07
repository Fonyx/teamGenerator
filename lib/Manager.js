let Employee = require('./Employee');
let exceptions = require('./Exceptions');
class Manager extends Employee{
    constructor({name, id, email, officeNumber}={}){
        // since we are allowing keyword args, arguments becomes an array with one object element for unpacking
        if(name === undefined || id === undefined || email === undefined || officeNumber === undefined){
            throw new exceptions.MissingArgumentError(`Expected 4 arguments, got ${arguments[0].length}`);
        }
        super({'name': name, 'id': id, 'email': email});

        var integerOfficeNumber = parseInt(officeNumber, 10);
        if(isNaN(integerOfficeNumber)){
            throw new exceptions.BadArgumentError(`${officeNumber} was not type integer`);
        } else {
            this.officeNumber = integerOfficeNumber;
        }
    }

    getOfficeNumber(){
        return this.officeNumber;
    }

    getRole(){
        return 'Manager';
    }

    renderToHtml(){
        let htmlLiteral = `
<div class="col s12 l6">
    <div class="card blue lighten-1">
        <div class="card-content white-text">
        <div class="row">
            <div class="col card-title"><i class="medium material-icons">people</i></div>
            <div class="col">${this.name.toUpperCase()} THE MANAGER</div>
        </div>
        <div class="row">
            <div class="col orange-text"><i class="material-icons">fingerprint</i></div>
            <div class="col orange-text ">Staff ID</div>
            <div class="col orange-text right">${this.id}</div>
        </div>
        <div class="row">
            <div class="col orange-text"><i class="material-icons">work</i></div>
            <div class="col orange-text ">Suite</div>
            <div class="col orange-text right">${this.officeNumber}</div>
        </div>
        <div class="row">
            <a href="mailto: ${this.email}">
                <div class="col orange-text"><i class="material-icons">contact_mail</i></div>
                <div class="col orange-text ">Email</div>
                <div class="col orange-text right">${this.email}</div>
            </a>
        </div>
        </div>
    </div>
    </div>
`;
        return htmlLiteral;
         
    }
}

module.exports = Manager;