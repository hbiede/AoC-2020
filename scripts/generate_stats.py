# Inspiration taken from https://github.com/wimglenn/advent-of-code-data/
from typing import Any, Dict, List, Tuple, Union

from bs4 import BeautifulSoup
from datetime import datetime
from datetime import timedelta
import matplotlib.pylab as plot
import requests
from collections import OrderedDict
import sys
import os
import errno
import io

NEW_LINE_REPLACER = "~~"
OUTPUT_DIR = "statsImages/"
VERSION = 1.0
USER_AGENT = {"User-Agent": "advent-of-code-stats-gen v{}".format(VERSION)}


def get_stats(cookie: dict, years=None) -> Dict[Tuple[Union[int, Any], int], OrderedDict]:
    # modified version of equivalent function from https://github.com/wimglenn
    aoc_now = datetime.now()
    if years is None:
        years = range(2015, aoc_now.year + int(aoc_now.month == 12))
    days = {str(i) for i in range(1, 26)}
    results = {}
    for year in years:
        url = "https://adventofcode.com/{}/leaderboard/self".format(year)
        try:
            response = requests.get(url, cookies=cookie, headers=USER_AGENT)
        except ConnectionError:
            print("Unable to connect")
            sys.exit(1)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        try:
            stats_txt = soup.article.pre.text
        except AttributeError:
            if year == aoc_now.year and aoc_now.month < 12:
                print("Must wait until AoC starts")
            else:
                print("Give a valid session cookie")

            sys.exit(1)
        lines = stats_txt.splitlines()
        lines = [x for x in lines if x.split()[0] in days]
        for line in reversed(lines):
            vals = line.split()
            day = int(vals[0])
            results[year, day] = OrderedDict()
            results[year, day]["a"] = {
                "time": _parse_duration(vals[1]),
                "rank": int(vals[2]),
                "score": int(vals[3]),
            }
            if vals[4] != "-":
                results[year, day]["b"] = {
                    "time": _parse_duration(vals[4]),
                    "rank": int(vals[5]),
                    "score": int(vals[6]),
                }
    return results


def _get_second_count(data: Tuple[Dict[int, timedelta], Dict[int, timedelta]]) -> \
        (Dict[int, int], Dict[int, int]):
    time_a = {k: v.days * 1440 + v.seconds / 60 for k, v in data[0].items()}
    time_b = {k: v.days * 1440 + v.seconds / 60 for k, v in data[1].items()}
    return time_a, time_b


def generate_graphs(results: Dict[Tuple[Union[int, Any], int], OrderedDict]) -> None:
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    time_a, time_b = _get_second_count(_get_stat_column(results, 'time'))
    _generate_graph(time_a, y_axis="Time (minutes)", title="Part 1 Time", output_file=OUTPUT_DIR + "part1time.png")
    _generate_graph(time_b, y_axis="Time (minutes)", title="Part 2 Time", output_file=OUTPUT_DIR + "part2time.png")

    rank_a, rank_b = _get_stat_column(results, 'rank')
    _generate_graph(rank_a, y_axis="Rank", title="Part 1 Rank", output_file=OUTPUT_DIR + "part1rank.png")
    _generate_graph(rank_b, y_axis="Rank", title="Part 2 Rank", output_file=OUTPUT_DIR + "part2rank.png")

    score_a, score_b = _get_stat_column(results, 'score')
    _generate_graph(score_a, y_axis="Score", title="Part 1 Score", output_file=OUTPUT_DIR + "part1score.png")
    _generate_graph(score_b, y_axis="Score", title="Part 2 Score", output_file=OUTPUT_DIR + "part2score.png")


def print_table(results: Dict[Tuple[Union[int, Any], int], OrderedDict]) -> None:
    # Note: the ~~ is necessary to side-step the issue of eval not saving new lines in makefiles
    output_string = "| %3s | %26s | %26s |" % ("Day", "Part 1 Time (Rank) (Score)", "Part 2 Time (Rank) (Score)") \
                    + NEW_LINE_REPLACER
    output_string += "|%s:|%s|%s|" % ("-" * 4, "-" * 28, "-" * 28) + NEW_LINE_REPLACER
    total_time = [0, 0]
    total_rank = [0, 0]
    total_score = [0, 0]
    for entry in results:
        day_string = str(entry[1])
        if entry[1] == 24:
            day_string += "🎅"
        elif entry[1] == 25:
            day_string += "🎄"
        time: List[timedelta] = [None, None]
        rank = [0, 0]
        score = [0, 0]
        if 'a' in results[entry].keys():
            time[0] = results[entry]['a']['time']
            total_time[0] += 86400 * results[entry]['a']['time'].days + results[entry]['a']['time'].seconds
            rank[0] = results[entry]['a']['rank']
            total_rank[0] += results[entry]['a']['rank']
            score[0] = results[entry]['a']['score']
            total_score[0] += results[entry]['a']['score']
        if 'b' in results[entry].keys():
            time[1] = results[entry]['b']['time']
            total_time[1] += 86400 * results[entry]['a']['time'].days + results[entry]['b']['time'].seconds
            rank[1] = results[entry]['b']['rank']
            total_rank[1] += results[entry]['b']['rank']
            score[1] = results[entry]['b']['score']
            total_score[1] += results[entry]['b']['score']
            output_string += "|  %02s | %02d:%02d:%02d (%5d) (%3d)     | %02d:%02d:%02d (%5d) (%3d)     |" % \
                             (day_string, int((time[0].seconds + 86440 * time[0].days) / 3600),
                              (int(time[0].seconds) / 60) % 60,
                              time[0].seconds % 60,
                              rank[0], score[0], int((time[1].seconds + 86440 * time[1].days) / 3600),
                              (int(time[1].seconds) / 60) % 60,
                              time[1].seconds % 60, rank[1], score[1]) + NEW_LINE_REPLACER
        else:
            output_string += ("|  %02s | %02d:%02d:%02d (%5d) (%3d)     | %-26s |" % (day_string,
                                                                                      int((time[0].seconds + 86440 *
                                                                                           time[
                                                                                               0].days) / 3600),
                                                                                      (int(time[0].seconds) / 60) % 60,
                                                                                      time[0].seconds % 60,
                                                                                      rank[0], score[0],
                                                                                      "Unfinished")) + NEW_LINE_REPLACER

    # average the results
    total_time[0], total_time[1] = total_time[0] / len(results), total_time[1] / len(results)
    total_rank[0], total_rank[1] = total_rank[0] / len(results), total_rank[1] / len(results)
    total_score[0], total_score[1] = total_score[0] / len(results), total_score[1] / len(results)

    output_string += "| %3s | %02d:%02d:%02d (%5d) (%3d)     | %02d:%02d:%02d (%5d) (%3d)     |" % \
                     ("Avg", int(total_time[0] / 3600), (int(total_time[0]) / 60) % 60, total_time[0] % 60,
                      total_rank[0], total_score[0], int(total_time[1] / 3600), (int(total_time[1]) / 60) % 60,
                      total_time[1] % 60, total_rank[1], total_score[1])
    output_string += NEW_LINE_REPLACER
    print(output_string)


def _generate_graph(data: Dict, output_file="output.png", y_axis="", x_axis="Day", title=""):
    days, output_data = zip(*sorted(data.items()))
    plot.plot(days, output_data)
    plot.plot(days, _generate_moving_average([v for v in data.values()]))
    plot.plot(days, _generate_standard_average([v for v in data.values()]))
    plot.legend([title, 'Moving Average', 'Average'])
    plot.title(title)
    plot.xlabel(x_axis)
    plot.ylabel(y_axis)

    open(output_file, "w").close()  # create the file if it doesn't exist
    plot.savefig(output_file)
    plot.close()


def _generate_standard_average(data: list) -> list:
    average_list = []
    day = 0
    for _ in data:
        day += 1
        average_list.append(_average(data[0:day]))
    return average_list


def _generate_moving_average(data: list) -> list:
    moving_average_list = []
    day = 0
    for _ in data:
        day += 1
        moving_average_list.append(_average(data[day - 5 if day >= 5 else 0:day]))
    return moving_average_list


def _average(data: list) -> float:
    sum_of_values = 0
    count = 0
    for value in data:
        if value != -1:
            sum_of_values += value
            count += 1
    return 0 if count == 0 else sum_of_values / count


def _get_stat_column(results: Dict[Tuple[Union[int, Any], int], Dict], column: str) \
        -> (Dict[int, Any], Dict[int, Any]):
    col_a = OrderedDict()
    col_b = OrderedDict()
    max_day_finished = 0
    for entry in results:
        if entry[1] > max_day_finished:
            max_day_finished = entry[1]
        if 'a' in results[entry].keys():
            col_a[entry[1]] = results[entry]['a'][column]
        if 'b' in results[entry].keys():
            col_b[entry[1]] = results[entry]['b'][column]
    max_day_finished += 1

    for i in range(1, max_day_finished):
        if not (i in col_a):
            if column == "time":
                col_a[i] = timedelta(seconds=-1)
            else:
                col_a[i] = -1
        if not (i in col_b):
            if column == "time":
                col_b[i] = timedelta(seconds=-1)
            else:
                col_b[i] = -1
    return col_a, col_b


def _parse_duration(s: str) -> timedelta:
    """Parse a string like 01:11:16 (hours, minutes, seconds) into a timedelta"""
    if s == ">24h":
        return timedelta(hours=24)
    h, m, s = [int(x) for x in s.split(":")]
    return timedelta(hours=h, minutes=m, seconds=s)


def _get_token() -> str:
    if len(sys.argv) == 1:
        print("Enter a session cookie")
        sys.exit(1)
    else:
        token = ""
        try:
            with io.open(sys.argv[1], encoding="utf-8") as f:
                token = f.read().strip()
        except (IOError, OSError) as err:
            if err.errno != errno.ENOENT:
                raise
        return token


resultsDict = get_stats(cookie={"session": _get_token()}, years={int(sys.argv[2])})
generate_graphs(resultsDict)
print_table(resultsDict)
