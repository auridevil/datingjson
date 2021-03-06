datingjson
=================

Convert in-object string representation of dates into date objects

Installation
============

The easiest installation is through [NPM](http://npmjs.org):

    npm install datingjson
    
Or clone the repo https://github.com/auridevil/datingjson and include the `./DatingJson` script.

API
===

Initialize:
    
    var DatingJson = require('datingjson');
    var converter = new DatingJson();
    
Initialize with nesting level (default is 10):
    
    var converter = new DatingJson(5);
    
Convert
    
    var converted = converter.convert(stringedObject);
    
Nesting level is necessary to avoid infinite stacktrace with circular objects. All objects over the nesting level, are returned asis and not converted.    
 

Contributions
=============

If you find bugs or want to change functionality, feel free to fork and pull request.

Notes
=====

The library use the es6 language, please make sure your node version supports it (we currently used 5.7)


<i>Cheers from digitalx.</i>