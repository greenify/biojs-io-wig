/*
 * biojs-io-wig
 * https://github.com/anilthanki/biojs-io-wig
 *
 * Copyright (c) 2014 Anil Thanki
 * Licensed under the Apache 2 license.
 */

var chai = require('chai');
chai.expect();
chai.should();

var biojsiowig = require('../lib/biojsiowig.js');

describe('biojs-io-wig module', function(){
  describe('#hello()', function(){
    it('should return a hello', function(){
      biojsiowig.hello('biojs').should.equal("hello biojs");
    });
  });

});

describe('biojs-io-wig module', function(){
  
  describe('#getRef()', function(){
    it('should return a biojs', function(){
      biojsiowig.getRef("variableStep chrom=ch00\n\
2	36\n\
10001	78\n\
20001	39\n\
30001	36\n\
40001	7\n\
50001	2\n\
60001	3\n\
70001	0\n\
variableStep chrom=ch08\n\
40960001	6\n\
40970001	0\n\
40980001	23\n\
40990001	23\n\
41000001	21\n\
41010001	34\n\
41020001	19\n\
41030001	10\n\
41040001	26\n\
41050001	12\n\
41060001	21").should.eql(["ch00", "ch08"]);
    });
  });

});

describe('biojs-io-wig module', function(){
  
  describe('#parse', function(){
    it('should return a biojs', function(){
      biojsiowig.parse("variableStep chrom=ch00\n\
2	36\n\
10001	78\n\
20001	39\n\
30001	36\n\
40001	7\n\
50001	2\n\
60001	3\n\
70001	0\n\
variableStep chrom=ch08\n\
40960001	6\n\
40970001	0\n\
40980001	23\n\
40990001	23\n\
41000001	21\n\
41010001	34\n\
41020001	19\n\
41030001	10\n\
41040001	26\n\
41050001	12\n\
41060001	21", "ch00").should.eql([["2", "36", null],["10001","78", null], ["20001","39", null],["30001","36", null],["40001","7", null],["50001","2", null],["60001","3", null],["70001","0", null]]);
    });
  });

});