/**
 * Unit test package for the DataType class
 *
 */
var should = require('should');
var CompositeDataType = require('../../lib/DataType.js').CompositeDataType;
var MetaDataField = require('../../lib/DataType.js').MetaDataField;

/**
 *METADATA_FIELD UNIT TESTS
 *
 */
describe("MetaDataField", function() {

    /* MetadataField constructor unit tests */
    describe("#constructor()", function() {
        it("should create a full-fledged STRING MetaDataField", function() {
            var object = {};
            object.name = 'Noldorian Kings';
            object.required = true;
            object.isList = true;
            object.possibleValues = ['Fingolfin', 'Finarfin', 'Feanor', 'Finwe', 'Turgon', 'Gil-galad'];
            object.hasUnit = true;  // I'm faking languages as units
            object.possibleUnits = ['Quenya', 'Sindarin'];
            var mdataField = new MetaDataField(params);
            /* TODO add assertion on mdataField */
        });
    });

});


/**
 *COMPOSITE_DATA_TYPE UNIT TESTS
 *
 */

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


