var through = require('through2')
var xml2js = require('xml2js')
var jsonpath = require('JSONPath')
var gutil = require('gulp-util')
var PluginError = gutil.PluginError
var xmlParser = new xml2js.Parser()
var PluginName = 'xliff2json'

function xliff2json(file, encoding, cb) {
  
  xmlParser.parseString(file.contents, function(err, json) {
    if(err) {
      return cb(new PluginError(PluginName, err.message))
    } 

    var results = {}

    var identifiers = jsonpath.eval(json, "$..trans-unit..$.id")
    var sources = jsonpath.eval(json, "$..trans-unit..source[0]")
    var targets = jsonpath.eval(json, "$..trans-unit..target[0]")
    // var language = jsonpath.eval(json, "$..target-language")

    identifiers.forEach(function(e, i) {
      results[sources[i]] = targets[i] 
    })

    file.path = gutil.replaceExtension(file.path, '.json')
    file.contents = new Buffer(JSON.stringify(results, null, 2));

    return cb(null, file)
  })
}

module.exports = function() {
  return through.obj(xliff2json)
}
