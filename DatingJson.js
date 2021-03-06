/**
 * Created by Aureliano on 08/03/2016.
 * This is the DatingJSON class
 */

'use strict';
var MODULE_NAME = 'DatingJson';
var DEFAULT_NESTING_LEVEL = 10;
var underscore = require('underscore');

/**
 * Paypal Service
 */
class DatingJson {

    /**
     * class constructor
     * @param nestingLevel
     */
    constructor(nestingLevel){
        this.nesting = nestingLevel || DEFAULT_NESTING_LEVEL;
    }

    /**
     * function convert
     * @param object
     * @returns {*}
     */
    convert(object){
        return this.innerConvert(object,this.nesting);
    }

    /**
     * inner function convert
     * @param object
     * @param nesting
     * @returns {*}
     */
    innerConvert(object, nesting){
        if(nesting>0) {
            var newNesting = nesting - 1;
            if (underscore.isArray(object)) {
                var newObject = [];
                for (var i = 0; i < object.length; i++) {
                    newObject[i] = this.innerConvert(object[i],newNesting);
                }
                return newObject;
            } else if (underscore.isObject(object)) {
                var allKeys = underscore.allKeys(object) || [];
                var newObject = {};
                for (var i = 0; i < allKeys.length; i++) {   // TODO TEST FOR EMPTY OBJECTS
                    var fieldName = allKeys[i];
                    newObject[fieldName] = this.innerConvert(object[fieldName],newNesting);
                }
                return newObject;
            } else {
                try {
                    if(underscore.isBoolean(object)){
                        return object;
                    }else {
                        var datedObject = new Date(object);
                        if (datedObject && !isNaN(datedObject.getTime())) {
                            return datedObject;
                        } else {
                            return object;
                        }
                    }
                } catch (err) {
                    return object;
                }
            }
        }else{
            return object;
        }
    }
}


/** Exports */
module.exports = DatingJson;

