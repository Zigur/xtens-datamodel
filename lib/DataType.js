/* Dependencies */
var Interface = require('./Interface.js');
var Constants = require('./Constants.js').Constants;
var FieldTypes = require('./Constants.js').FieldTypes;

/* Interface declarations */
var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);

/**
 * MetadataField CLASS - this is the leaf of our composite model
 * implements COMPOSITE interface
 */
function MetadataField(object) {
    this.id = object.id || 0;  // an id === 0 means falsy
    this.label = Constants.METADATA_FIELD;
    this.name = object.name;
    this.type = object.type || FieldTypes.STRING; // STRING is the default field type
    this.required = object.required === true ? true : false;
    this.customValue = object.customValue || undefined;
    this.isList = object.isList === true ? true : false;
    if (this.isList) {
        this.possibleValues = [];
    }
    this.hasUnit = object.hasUnit === true ? true : false;
    if (this.hasUnit) {
        this.possibleUnits = [];
    }
    if (this.type === FieldTypes.FLOAT || this.type === FieldTypes.INT) {
        if (object.range) {
            this.range = {};
            this.range.upper = object.range.upper || undefined;
            this.range.lower = object.range.lower || undefined;
            this.range.step = object.range.step || (this.range.upper && this.range.lower) ? 1 : undefined;
        }
    }
}

MetadataField.prototype.add = function() {};
MetadataField.prototype.remove = function() {};
MetadataField.prototype.getChild = function() {};

/**
 * CompositeDataType CLASS
 *
 */

function CompositeDataType(id, name, metadataSchema) {
    this.label = Constants.DATA_TYPE;
    this.id = id;
    this.name = name;
    this.header = {};
    this.body = [];
    if (metadataSchema == null) {
        return;
    }
    if (metadataSchema.header) {
        this.header.description = metadataSchema.header.description || 'missing description';
        this.header.version = metadataSchema.header.version || '0.0.0';
        this.fileUpload = metadataSchema.header.fileUpload || false;
    }  
    if (metadataSchema.body !== null && metadataSchema.body.length > 0) {
        for (var i=0, len=metadataSchema.body.length; i<len; i++) {
            this.add(metadataSchema.body[i]);
        }
    }
}

CompositeDataType.prototype.add = function(component) {
    Interface.ensureImplements(component, Composite);
    this.body.push(component);
};

CompositeDataType.prototype.remove = function(component) {
    for (var i=0, len=this.body.length; i<len; i++) {
        if(this.body[i] === component) {
            this.body.splice(i, 1); //remove one element from the body array at position i
            break;
        }
    }
};

CompositeDataType.prototype.getChild = function(i) {
    return this.body[i];
};

module.exports.CompositeDataType = CompositeDataType;
module.exports.MetadataField = MetadataField;
