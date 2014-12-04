var should = require("should");
var _ = require("lodash");

describe("", function(){
	var eventStoreCalledWithId = undefined;
	var eventStoreStub = {
		setHistory: function(id){
			eventStoreCalledWithId = id;
		}
	};

	
});