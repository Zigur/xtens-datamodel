/**
 * Unit test package for the DataType class
 *
 */
var should = require('should');
var CompositeDataType = require('../../lib/DataType.js').CompositeDataType;

describe("CompositeDataType", function() {
    
    /* CompositeDataType constructor test */
    describe("#constructor()", function(){
        it("should create an empty DataType", function() {
            var id = 1;
            var name = "Test Data Type";
            var dataType = new CompositeDataType(id, name);
            dataType.id.should.be.exactly(id);
            dataType.name.should.equal(name);
            dataType.header.should.be.empty;
            dataType.body.should.be.empty;
        });
    });

    /* add() function test */
    describe(".#add()", function() {
        it("should add a MetadataGroup object to a CompositeDataType", function() {
            //TODO: test goes here
        });
    });
});
