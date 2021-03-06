# AoC-2019
[Advent of Code](https://adventofcode.com) Solutions for 2020 in TypeScript.
This year, I self-imposed a rule that I would unit test every day's submission, and, unless I was completely
unable to do so, have every solution able to solve both parts in under the 15-second mark they suggest, on my 2017
MacBook Pro (15") (Failed on day 23-2 for this requirement).

I took a day off on day 20, but I went back and did it by hand the next day for a logic puzzle.

![HBiede](https://circleci.com/gh/hbiede/AoC-2020.svg?style=svg)

## Highlights:

#### Favorite problems:

* Love regex, so I was glad how much it featured this year, especially in Day 19.

#### Leaderboard appearances:

* Didn't get on the leaderboard proper, but I did manage to get 303rd on day 3-1,
  so I was pretty excited about that!
* I got two triple digit showings on the 8th day!
* Overall much better showing that in [2019](https://github.com/hbiede/AoC-2019).

## Stats
STATS_TABLE

<!--suppress CheckImageSize -->
<img alt="Part 1 Rank" src="statsImages/part1rank.png" width=400> <img alt="Part 2 Rank" src="statsImages/part2rank.png" width=400>
<img alt="Part 1 Time Stats" src="statsImages/part1time.png" width=400> <img alt="Part 2 Time Stats" src="statsImages/part2time.png" width=400>

Note: Times are from time of challenge release, not start time to completion time

## Scripting initially based on a script from [Ullaakut](https://github.com/Ullaakut/aoc19). Expanded upon by [HBiede](https://github.com/hbiede)
#### Makefile Automation
* Automatically downloads the challenge and input for the day (e.g.: `make download DAY=03`)
  * In order to use this target, you need to specify your session cookie from [adventofcode.com](https://adventofcode.com) in cookies.txt through the usage of `make cookie SESSION={Insert your session cookie here}`.
  * Parses the challenge into a markdown file (adds Markdown style headers and code blocks).
* Setup the new day's source file from a template file while downloading the input and challenge per above (e.g.: `make DAY=03`)
* Create the stats table above by calling `make stats`
  * May require calling `pip3 install -r requirements.txt` to ensure you have all the necessary python dependencies
