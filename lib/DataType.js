var Interface = require('./Interface.js');
var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);

function CompositeDataType(id, name, metadataSchema) {
    this.label = 'DATA';
    this.id = id;
    this.name = name;
    this.header = {};
    if (metadataSchema.header) {
        this.header.description = metadataSchema.header.description || 'missing description';
        this.header.version = metadataSchema.header.version || '0.0.0';
        this.fileUpload = metadataSchema.header.fileUpload || false;
    }
    this.body = [];
    if (metadataSchema.body !== null && metadataSchema.body.length > 0) {
        for (var i=0, len=metadataSchema.body.length; i<len; i++) {
            this.add(metadataGroup);
        }
    }
}

CompositeDataType.prototype.add = function(metadataGroup) {
    Interface.ensureImplements(metadataGroup, Composite);
    this.body.push(metadataGroup);
};

CompositeDataType.prototype.remove = function(metadataGroup) {
    for (var i=0, len=this.body.length; i<len; i++) {
        if(this.body[i] === metadataGroup) {
            this.body.splice(i, 1); //remove one element from the body array at position i
            break;
        }
    }
};

CompositeDataType.prototype.getChild = function(i) {
    return this.body[i];
};

module.exports = {};
