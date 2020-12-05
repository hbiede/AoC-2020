# AoC-2019
[Advent of Code](https://adventofcode.com) Solutions for 2020 in TypeScript.
This year, I have self-imposed a rule that I will unit test every day's submission, and, unless I am completely unable
to do so, have every solution able to solve both parts in under a second on my 2017 MacBook Pro (15") 

![HBiede](https://circleci.com/gh/hbiede/AoC-2020.svg?style=svg)

## Highlights:

#### Favorite problems:

* 

#### Interesting approaches:

* 

#### Leaderboard appearances:

* Didn't get on the leaderboard proper, but I did manage to get 303rd on day 3-1,
  so I was pretty excited about that!

## Stats
| Day | Part 1 Time (Rank) (Score) | Part 2 Time (Rank) (Score) |
|----:|----------------------------|----------------------------|
|   1 | 00:14:05 ( 2536) (  0)     | 00:17:41 ( 2486) (  0)     |
|   2 | 00:18:49 ( 4170) (  0)     | 00:30:15 ( 4542) (  0)     |
|   3 | 00:03:39 (  303) (  0)     | 00:15:04 ( 2060) (  0)     |
|   4 | 00:09:02 ( 1154) (  0)     | 00:49:01 ( 3205) (  0)     |
|   5 | 00:14:47 ( 2420) (  0)     | 00:29:02 ( 3673) (  0)     |
| Avg | 00:12:04 ( 2116) (  0)     | 00:28:12 ( 3193) (  0)     |


<img alt="Part 1 Time Stats" src="statsImages/part1time.png" width=400> <img alt="Part 1 Rank" src="statsImages/part1rank.png" width=400>
<img alt="Part 2 Time Stats" src="statsImages/part2time.png" width=400> <img alt="Part 2 Rank" src="statsImages/part2rank.png" width=400>

Note: Times are from time of challenge release, not start time to completion time

## Scripting initially based on a script from [Ullaakut](https://github.com/Ullaakut/aoc19). Expanded upon by [HBiede](https://github.com/hbiede)
#### Makefile Automation
* Automatically downloads the challenge and input for the day (e.g.: `make download DAY=03`)
  * In order to use this target, you need to specify your session cookie from [adventofcode.com](https://adventofcode.com) in cookies.txt through the usage of `make cookie SESSION={Insert your session cookie here}`.
  * Parses the challenge into a markdown file (adds Markdown style headers and code blocks).
* Setup the new day's source file from a template file while downloading the input and challenge per above (e.g.: `make DAY=03`)
* Create the stats table above by calling `make stats`
  * May require calling `pip3 install -r requirements.txt` to ensure you have all the necessary python dependencies
