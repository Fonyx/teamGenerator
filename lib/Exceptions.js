class MissingArgumentError{
    constructor(message){
        if(message){
            this.message = message;
        } else {
            this.message = 'Anonymous Raise'
        }
        this.prototype = new Error();
    }
}


class BadArgumentError{
    constructor(message){
        if(message){
            this.message = message;
        } else {
            this.message = 'Anonymous Raise'
        }
        this.prototype = new Error();
    }
}

module.exports = {
    MissingArgumentError,
    BadArgumentError
}