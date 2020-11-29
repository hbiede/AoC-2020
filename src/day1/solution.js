"use strict";
exports.__esModule = true;
var fs = require("fs");
var part1 = function (input) {
    return -1;
};
var part2 = function (input) {
    return -1;
};
fs.readFile('src/day1/input.txt', 'utf8', function (error, input) {
    if (error) {
        console.error(error);
    }
    else {
        console.log("Part 1:  " + part1(input) + "\nPart 2:  " + part2(input));
    }
});
