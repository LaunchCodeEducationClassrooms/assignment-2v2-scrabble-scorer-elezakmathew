const solution = require('../scrabble-scorer');

describe("Scrabble Scorer solution", function() {

	// transform tests //
	it("transform returns an object", function() {
		let transformedObj = solution.transform(solution.oldPointStructure);
		expect(transformedObj).toBeInstanceOf(Object);
	});

	it("transform returns an object that is not empty", function() {
		let transformedObj = solution.transform(solution.oldPointStructure);
		expect(Object.keys(transformedObj)).not.toBeNull();
	});

	it("transform returns an object with letter keys", function() {
		let transformedObj = solution.transform(solution.oldPointStructure);
		let letterKeys = Object.keys(transformedObj);
		
		let lettersEx = /[a-z]/g;

		// .every() returns true if each item in the array passes the match
		let expected = letterKeys.every(function(l) {
			return l.match(lettersEx);
		});
		
		expect(expected).toBeTrue();
	});

	it("transform returns an object with integer values", function() {
		let transformedObj = solution.transform(solution.oldPointStructure);
		let numberVals = Object.values(transformedObj);

		let expected = numberVals.every(function(n) {
			return typeof n == 'number';
		});
		expect(expected).toBeTrue();
	});

	// // newPointStructure tests //
	it("newPointStructure contains the correct key-value pairs", function() {
		expect(solution.newPointStructure).toEqual(jasmine.objectContaining({
			a: 1,
			e: 1,
			i: 1,
			o: 1,
			u: 1,
			l: 1,
			n: 1,
			r: 1,
			s: 1,
			t: 1,
			d: 2,
			g: 2,
			b: 3,
			c: 3,
			m: 3,
			p: 3,
			f: 4,
			h: 4,
			v: 4,
			w: 4,
			y: 4,
			k: 5,
			j: 8,
			x: 8,
			q: 10,
			z: 10
		}));
	});

	// simpleScore tests //
	it("contains a simpleScore function", function() {
		expect(typeof solution.simpleScore).toBe('function');
	});

	it("simpleScore returns an integer score", function() {
		expect(typeof solution.simpleScore('foo')).toBe('number');
	});

	it("simpleScore returns a score equal to the length of its input", function() {
		expect(solution.simpleScore('foo')).toBe(3);
		expect(solution.simpleScore('')).toBe(0);
	});

	// vowelBonusScore tests //
	it("contains a vowelBonusScore function", function() {
		expect(typeof solution.vowelBonusScore).toBe('function');
	});

	it("vowelBonusScore returns an integer score", function() {
		expect(typeof solution.vowelBonusScore('foo')).toBe('number');
	});

	it("vowelBonusScore returns three points per vowel", function() {
		expect(solution.vowelBonusScore('a')).toBe(3);
		expect(solution.vowelBonusScore('e')).toBe(3);
		expect(solution.vowelBonusScore('i')).toBe(3);
		expect(solution.vowelBonusScore('o')).toBe(3);
		expect(solution.vowelBonusScore('u')).toBe(3);

		expect(solution.vowelBonusScore('ae')).toBe(6);
		expect(solution.vowelBonusScore('aei')).toBe(9);
	});

	it("vowelBonusScore returns one point per consonant", function() {
		expect(solution.vowelBonusScore('foo')).toBe(7);
		expect(solution.vowelBonusScore('bar')).toBe(5);
		
	});

	// scrabbleScore tests //
	it("contains a scrabbleScore function", function() {
		expect(typeof solution.scrabbleScore).toBe('function');
	});

	it("scrabbleScore returns an integer score", function() {
		let newPointStructure = solution.transform(solution.oldPointStructure);
		expect(typeof solution.scrabbleScore('foo', newPointStructure)).toBe('number');
	});

	it("scrabbleScore uses transform() to score a word", function() {
		let newPointStructure = solution.transform(solution.oldPointStructure);
		expect(solution.scrabbleScore('foo', newPointStructure)).toBe(6);
		expect(solution.scrabbleScore('bar', newPointStructure)).toBe(5);
		expect(solution.scrabbleScore('baz', newPointStructure)).toBe(14);
	});

	// scoringAlgorithms tests //
	it("contains a scoringAlgorithms array of three scoring objects", function() {
		expect(solution.scoringAlgorithms.length).toBe(3);
	});

	it("scoringAlgorithms contain three scoring objects", function() {
		expect(solution.scoringAlgorithms).toContain(jasmine.objectContaining({
			scoringFunction: solution.simpleScore,
			scoringFunction: solution.vowelBonusScore,
			scoringFunction: solution.scrabbleScore,
		}));
	});
	
});