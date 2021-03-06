/**
 * @fileOverview Unit test package for the DataType class
 * @author Massimiliano Izzo
 * @version: 0.1
 *
 */
var should = require('should');
var Constants = require('../../lib/Constants.js').Constants;
var FieldTypes = require('../../lib/Constants.js').FieldTypes;
var DataType = require('../../lib/DataType.js').DataType;
var MetadataGroup = require('../../lib/DataType.js').MetadataGroup;
var MetadataLoop = require('../../lib/DataType.js').MetadataLoop;
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
            mdataField.label.should.equal(Constants.METADATA_FIELD);
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

describe("DataType", function() {

    /* DataType constructor test */
    describe("#constructor()", function(){
        it("should create an empty DataType", function() {
            var obj = {
                id: 1,
                name: "Test Data Type"    
            }; 
            var dataType = new DataType(obj);
            dataType.id.should.be.exactly(obj.id);
            dataType.name.should.equal(obj.name);
            dataType.header.should.be.empty;
            dataType.content.should.be.empty;
        });
    });

    /* add() function test */
    describe(".#add()", function() {
        it("should add a MetadataGroup object to a DataType", function() {
            var dataType = new DataType(1, "Test Data Type");
            var mdataGroups = [], MAX = 5;
            for (var i=0; i<MAX; i++) {
                mdataGroups[i] = new MetadataGroup({id: i, name: "testGroup_"+i});
            }
            for (i=MAX-1; i>=0; i--) {
                dataType.add(mdataGroups[i]);
            }
            dataType.content.should.have.lengthOf(5);
            for (i=0; i<MAX; i++) {
                dataType.content[i].should.have.ownProperty('id').equal(MAX-1-i);
                dataType.content[i].should.have.ownProperty('name').equal("testGroup_"+(MAX-1-i));
            }
        });
    });
});

/**
 * @method
 * unit test methods for the MetadataLoop class
 *
 */
describe("MetadataLoop", function() {
    describe("#constructor()", function() {
        it("should create an empty MetadataLoop", function() {
            var obj = {};
            obj.id = 1;
            var loop = new MetadataLoop(obj);
            loop.id.should.be.exactly(obj.id);
            loop.label.should.equal(Constants.METADATA_LOOP);
            loop.content.should.be.instanceOf(Array);
            loop.content.should.be.empty;
        });  
    });

    describe("#add()", function() {
        it("should throw an error", function(done) {
            var loop_1 = new MetadataLoop({id: 1});
            var loop_2 = new MetadataLoop({id: 1});
            try {
                loop_1.add(loop_2);
                assert.fail();
            }
            catch(e) {
                done();
            } 
        });
    });

    describe("#getChild()", function() {
        it("should create a loop with two fields and access them as children", function(){
            var content = [];
            content.push({label:Constants.METADATA_FIELD, id:0, name:"field_0", type:FieldTypes.STRING, required:false, hasUnit:false});
            content.push({label:Constants.METADATA_FIELD, id:1, name:"field_1", type:FieldTypes.INT, required:true, hasUnit:false});
            var loop = new MetadataLoop({id:1, molteplicity:4, content:content});
            var field_0 = loop.getChild(0);
            field_0.should.be.an.instanceof(MetadataField);
            var field_1 = loop.getChild(1);
            field_1.should.be.an.instanceof(MetadataField);
            var fake = loop.getChild(2);
            (fake === null).should.be.true;
        });
    });
});
