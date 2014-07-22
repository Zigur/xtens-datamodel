/**
 * @module xtens-datamodel
 */

/* Dependencies */
var Interface = require('./oop.js').Interface;
var extend = require('./oop.js').extend;
var Constants = require('./Constants.js').Constants;
var FieldTypes = require('./Constants.js').FieldTypes;

/* Interface declarations */
var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var MetaElement = new Interface('MetaElement', ['createTypedElement']);

/**
 * creates a new MetadataField
 * @class MetadataField 
 * @param{Object} object - an input object containing the following properties:
 *  - id
 *  - name
 *  - type (optional)
 *  - required (true/false)
 *  - customValue (optional)
 *  - isList (true/false)
 *  - possibleValues(an array of possibleValues)
 *  - hasUnit (true/false)
 *  - possibleUnits(an array of possibleUnits)
 *  - range: an object with three properties -> upper [max value], lower [min value], step [optional]
 *
 */
function MetadataField(object) {
    var label = Constants.METADATA_FIELD;
    this.getLabel = function() {return label;};
    this.id = object.id || 0;  // an id === 0 means falsy
    this.name = object.name;
    this.type = object.type || FieldTypes.STRING; // STRING is the default field type
    this.required = object.required === true ? true : false;
    this.customValue = object.customValue || undefined;
    this.isList = object.isList === true ? true : false;
    if (this.isList) {
        this.possibleValues = [];
        this.addPossibleValues.apply(this, object.possibleValues);
    }
    this.hasUnit = object.hasUnit === true ? true : false;
    if (this.hasUnit) {
        this.possibleUnits = [];
        this.addPossibleUnits.apply(this, object.possibleUnits);
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

MetadataField.prototype.addPossibleValues = function() {
    for (var i=0, len=arguments.length; i<len; i++) {
        this.possibleValues.push(arguments[i]);
    }
};

MetadataField.prototype.addPossibleUnits = function() {
    for (var i=0, len= arguments.length; i<len; i++) {
        this.possibleUnits.push(arguments[i]);
    }
};

/**
 * CompositeMetadataType - this is an abstraction for various composite metadata implementations
 * @class CompositeMetadataType
 */
function CompositeMetadataType() {
    this.allowedComponents = [];
    this.content = [];
}

CompositeMetadataType.prototype.add = function(component) {
    Interface.ensureImplements(component, Composite);
    if (this.allowedComponents.indexOf(component.getLabel()) === -1) {
        throw new Error('Not an allowed component object.');
    }
    this.content.push(component);
};

CompositeMetadataType.prototype.remove = function(component) {
    for (var i=0, len=this.content.length; i<len; i++) {
        if (this.content[i] === component) {
            this.content.splice(i, 1);
            break;
        }
    }
};

CompositeMetadataType.prototype.getChild = function(i) {
    if (i<this.content.length) {
        return this.content[i];
    }
};

/**
 * create a new MetadataLoop 
 * @class MetadataLoop
 * @param{int} id
 *
 */

function MetadataLoop(id, molteplicity) {
    var label = Constants.METADATA_LOOP;
    this.getLabel = function() {return label;};
    this.id = id;
    this.allowedComponents = [Constants.METADATA_FIELD];
    molteplicity = parseInt(molteplicity);
    if (molteplicity >= 2) {
        this.molteplicity = molteplicity;
    }
    else {
        this.molteplicity = Number.POSITIVE_INFINITY;
    }
    this.content = [];  //initialize an empty content array
}
extend(MetadataLoop, CompositeMetadataType);

/*
MetadataLoop.prototype.add = function(component) {
    Interface.ensureImplements(component, Composite);
    if (!this.isAllowedComponent(component.getLabel())) {
        throw new Error('You can only add a MetadataField object!!');
    }
    this.content.push(component);
};

MetadataLoop.prototype.remove = function(component) {
    Interface.ensureImplements(component, Composite);
    for (var i=0, len=this.content.length; i<len; i++) {
        if (this.content[i] === component) {
            this.content.splice(i, 1);
            break;
        }
    }
};

MetadataLoop.prototype.getChild = function(i) {
    if (i<this.content.length) {
        return this.content[i];
    }
}; */


/**
 * create a new MetadataGroup
 * @class MetadataGroup
 * @param{int} id
 * @param{string} name - the group name
 * @param{string} ontologyUri - (optional) the ontology Uri for the group name 
 *
 */

function MetadataGroup(id, name, ontologyUri) {
    var label = Constants.METADATA_GROUP;
    this.getLabel = function() {return label; };
    this.id = id;
    this.allowedComponents = [Constants.METADATA_FIELD, Constants.METADATA_LOOP];
    this.name = name;
    this.ontologyUri = ontologyUri;
    this.content = [];
}
extend(MetadataGroup, CompositeMetadataType);

/*
MetadataGroup.prototype.add = function(component) {
    Interface.ensureImplements(component, Composite);
    var label = component.getLabel();
    if (label !== Constants.METADATA_FIELD || label !== Constants.METADATA_LOOP) {
        throw new Error("You can only add either a MetadataField or MetadataLoop object");
    }
    this.content.push(component);
}; */

/**
 * creates a new CompositeDataType
 * @class CompositeDataType
 * @param{int} id 
 * @param{string} name
 * @param{json} header
 */
function DataType(id, name, header) {
    var label = Constants.DATA_TYPE;
    this.getLabel = function() { return label; };
    this.id = id;
    this.allowedComponents = [Constants.METADATA_GROUP];
    this.name = name;
    this.header = {};
    this.content = [];
    if (header) {
        this.header.ontologyUri = header.ontologyUri;
        this.header.description = header.description || 'missing description';
        this.header.version = header.version || '0.0.0';
        this.header.fileUpload = header.fileUpload || false;
    }
}
extend(DataType, CompositeMetadataType);

/*
 * creates a new CompositeDataType
 * @class CompositeDataType
 * @param{int} id 
 * @param{string} name
 * @param{json} metadataSchema
 *

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

CompositeDataType.prototype.add = function(component, molteplicity) {
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
    if (i<this.body.length) {
        return this.body[i];
    }
}; */

module.exports.DataType = DataType;
module.exports.MetadataGroup = MetadataGroup;
module.exports.MetadataLoop = MetadataLoop;
module.exports.MetadataField = MetadataField;
