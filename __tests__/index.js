const controller = require("../controller/index");
describe('Test Handlers', function () {

    test('responds to /', () => {
        const req = {  };

        const res = { text: '',
            send: function(input) { this.text = input } 
        };
        controller.index(req, res);
        
        expect(res.text).toEqual('hello world!');
    });

});