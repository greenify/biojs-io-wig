/*
 * biojs-io-wig
 * https://github.com/anilthanki/biojs-io-wig
 *
 * Copyright (c) 2014 Anil Thanki
 * Licensed under the Apache 2 license.
 */

/**
@class biojsiowig
 */

/**
 * Private Methods
 */

/*
 * Public Methods
 */

/**
 * Method responsible to say Hello
 *
 * @example
 *
 *     biojsiowig.getRef(wig_data);
 *
 * @method getRef
 * @param {String} data file
 * @return {String[]} Returns chromosome list
 */

var wig = { }


 /**
 * @method getRef
 * @param {String} data file
 * @return {String[]} Returns chromosome list
 */


module.exports.hello = function(name){
   return "hello " + name;
};

module.exports.getRef = function(data){
	var max = 0
    var data_split = data.split("\n")
    var data_len = data_split.length;
    var chrom = [];
    if (data.indexOf("variableStep") >= 0 || data.indexOf("fixedStep") >= 0) {
        for (var i = 0; i < data_len; i++) {
            if (data_split[i].indexOf("chrom") >= 0) {
                var chr = data_split[i].split(/\s+/)[1].split("=")[1];
                if (chrom.indexOf(chr) < 0) {
                    chrom.push(chr);
                }
            }
        }
    } else {
        alert("Unknown format detected")
    }
	return chrom;
};

module.exports.parse = function(data, ref_chr) {
   	  	var self = this;
		var flag = false;

        var wig_file = [];
        var max = 0
        var data_split = data.split("\n")
        var data_len = data_split.length;
        var span = null;
        var ref = false;
        if (data.indexOf("variableStep") >= 0) {

            var data_split = data.split("\n")
            var data_len = data_split.length;


            for (var i = 0; i < data_len; i++) {
                if (data_split[i].indexOf("chrom") >= 0) {
                    var chr = data_split[i].split(/\s+/)[1].split("=")[1];
                    flag = false;
                    if (chr == ref_chr) {
                        if (data_split[i].indexOf("span") >= 0) {
                            span = data_split[i].split(/\s+/)[2].split("=")[1]
                        }
                        flag = true;
                        ref = true;
                    }
                }
                else if (data_split[i].indexOf("#") >= 0) {
                    continue;
                } else if (flag) {
                    var temp_data = data_split[i].split(/\s+/);
                    wig_file.push([temp_data[0], temp_data[1], span]);
                    if (parseInt(temp_data[1]) > parseInt(max)) {
                        max = temp_data[1];
                    }
                }
            }
            

            if (ref == false) {
                alert("Selected reference not found")
            } else if (wig_file.length > 0) {
                var start = parseInt(wig_file[0][0]);//config.requestedStart;
                var stop = parseInt(wig_file[wig_file.length - 1][0]);
            }
            else {
                alert("No data for selected reference")
            }


        }
        else if (data.indexOf("fixedStep") >= 0) {
            var data_split = data.split("\n")
            var data_len = data_split.length;
            var start = null;
            var step = null;
            var ref = false;

            for (var i = 0; i < data_len; i++) {
                if (data_split[i].indexOf("chrom") >= 0) {
                    var line = data_split[i].split(/\s+/);

                    var chr = data_split[i].split(/\s+/)[1].split("=")[1];
                    flag = false;

                    if (chr == ref_chr) {
                        start = line[2].split("=")[1];
                        step = line[3].split("=")[1];
                        if (data_split[i].indexOf("span") >= 0) {
                            span = line[4].split("=")[1]
                        }

                        flag = true;
                        ref = true;
                    }
                }
                else if (data_split[i].indexOf("#") >= 0) {
                    continue;
                } else if (flag) {
                    var temp_data = data_split[i];
                    start = parseInt(start) + parseInt(step)
                    wig_file.push([start, temp_data, span]);
                    if (parseInt(temp_data) > parseInt(max)) {
                        max = temp_data;
                    }
                }
            }


            if (ref == false) {
                alert("Selected reference not found")
            } else if (wig_file.length > 0) {
                var start = parseInt(wig_file[0][0]);//config.requestedStart;
                var stop = parseInt(wig_file[wig_file.length - 1][0]);
            } else if (start == null || step == null) {
                alert("Unknown format detected")
            }
            else {
                alert("No data for selected reference")
            }
        }
        else {
            alert("Unknown format detected")
        }
    

    return wig_file;
}


 



