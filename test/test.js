/**
 * Created by Aureliano on 09/03/2016.
 */
/** mocha test */
var assert = require('assert');
var underscore = require('underscore');

/** RANDOM DATA */
var emptyObj = {};
var level1DateObj = {
    mydate : '2016-03-08 11:30:01.782Z'
};
var level2DateObj = {
    something:"beautiful",
    inner:{
        mydate : '2016-03-08 11:30:01.782Z'
    }
};
var level3DateObj = {
    something:"beautiful",
    inner:{
        level2:{
            mydate : '2016-03-08 11:30:01.782Z'
        },
        mydate : '2016-03-08 11:30:01.782Z'
    }
}
var level4ArrayedObj = {
    something:"beautiful",
    array: ['2016-03-08 11:30:01.782Z','2016-03-08 11:30:01.782Z','2016-03-08 11:30:01.782Z'],
    special: {
        inner : {
            innerOfInner:'2016-03-08 11:30:01.782Z',
            goingDonw:{
                furtherDown : true,
                downest : {
                    value : '2016-03-08 11:30:01.782Z'
                }
            }
        },
        outher : 'no'
    }
};

var directObj = '2016-03-08 11:30:01.782Z';

var trapObj = {};
trapObj.date = '2016-03-08 11:30:01.782Z';
trapObj.special = trapObj;


describe('Class Instance', function () {
    "use strict";

    var DatingJson = require('../DatingJson');
    var obj = new DatingJson();

    it('should be a datingjson instance', function(){
        var desc = obj instanceof DatingJson;
        assert.equal(desc,true);
    });

    it('should have 10 nesting level default',function(){
        assert.equal(obj.nesting,10)
    });

    var obj2 = new DatingJson(5);
    it('should have 5 nesting level setted',function(){
        assert.equal(obj2.nesting,5)
    });
});

describe('Class Use', function (){
    "use strict";

    var DatingJson = require('../DatingJson');
    var converter = new DatingJson();

    let cc0 = converter.convert(emptyObj);
    var isEmpty = underscore.isEmpty(cc0);
    it('empty obj conversion leads to empty obj', function(){
        assert.equal(isEmpty,true);
    });

    it('level 1 conversion', function(){
        var cc1 = converter.convert(level1DateObj);
        assert.equal(underscore.isDate(cc1.mydate),true);
    });

    it('level 2 conversion', function(){
        var cc2 = converter.convert(level2DateObj);
        assert.equal(cc2.something,'beautiful');
        assert.equal(underscore.isDate(cc2.inner.mydate),true);
    });

    it('level 3 conversion', function(){
        var cc3 = converter.convert(level3DateObj);
        assert.equal(cc3.something,'beautiful');
        assert.equal(underscore.isDate(cc3.inner.mydate),true);
        assert.equal(underscore.isDate(cc3.inner.level2.mydate),true);
    });

    it('level 4 conversion and array', function(){
        var cc4 = converter.convert(level4ArrayedObj);
        assert.equal(cc4.something,'beautiful');
        assert.equal(underscore.isDate(cc4.special.inner.innerOfInner),true);
        assert.equal(underscore.isDate(cc4.special.inner.goingDonw.downest.value),true);
        assert.equal(underscore.isArray(cc4.array),true);
        assert.equal(underscore.isDate(cc4.array[0]),true);
        assert.equal(underscore.isDate(cc4.array[1]),true);
        assert.equal(underscore.isDate(cc4.array[2]),true);
        assert.equal(cc4.special.outher,'no');
        assert.equal(cc4.special.inner.goingDonw.furtherDown,true);
    });

    it('direct conversion', function(){
        var cc5 = converter.convert(directObj);
        assert.equal(underscore.isDate(cc5),true);
    });

    it('circular conversion', function(){
        var cc6 = converter.convert(trapObj);
        assert.equal(underscore.isDate(cc6.date),true);
        assert.equal(underscore.isDate(cc6.special.date),true);
        assert.equal(underscore.isDate(cc6.special.special.date),true);
        assert.equal(underscore.isDate(cc6.special.special.special.date),true);
        assert.equal(underscore.isDate(cc6.special.special.special.special.date),true);
        assert.equal(underscore.isDate(cc6.special.special.special.special.special.date),true);
        assert.equal(underscore.isDate(cc6.special.special.special.special.special.special.date),true);
        assert.equal(underscore.isDate(cc6.special.special.special.special.special.special.special.date),true);
        assert.equal(underscore.isDate(cc6.special.special.special.special.special.special.special.special.date),true);
        assert.equal(underscore.isDate(cc6.special.special.special.special.special.special.special.special.special.date),false); // 11 level, return false

    });



});

//
//var level4ArrayedObj = {
//    something:"beautiful",
//    array: ['2016-03-08 11:30:01.782Z','2016-03-08 11:30:01.782Z','2016-03-08 11:30:01.782Z'],
//    special: {
//        inner : {
//            innerOfInner:'2016-03-08 11:30:01.782Z',
//            goingDonw:{
//                furtherDown : true,
//                downest : {
//                    value : '2016-03-08 11:30:01.782Z'
//                }
//            }
//        },
//        outher : 'no'
//    }
//};
