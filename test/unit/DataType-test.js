/**
 * Unit test package for the DataType class
 *
 */
var should = require('should');
var Constants = require('../../lib/Constants.js').Constants;
var CompositeDataType = require('../../lib/DataType.js').CompositeDataType;
var MetadataField = require('../../lib/DataType.js').MetadataField;

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
            var mdataField = new MetadataField(object);
            console.log(mdataField.getLabel());
            mdataField.getLabel().should.equal(Constants.METADATA_FIELD);
            mdataField.name.should.equal(object.name);
            mdataField.required.should.be.true;
            mdataField.isList.should.be.true;
            var len = object.possibleValues.length;
            mdataField.possibleValues.should.have.length(len);
            for (var i=0; i<len; i++) {
                 mdataField.possibleValues[i].should.equal(object.possibleValues[i]);
            }
            mdataField.hasUnit.should.be.true;
            len = object.possibleUnits.length;
            mdataField.possibleUnits.should.have.length(len);
            for (i=0; i<len; i++) {
                mdataField.possibleUnits[i].should.equal(object.possibleUnits[i]);
            }
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


