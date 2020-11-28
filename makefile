# Formatting
H=$(shell tput -Txterm setaf 3; tput bold)
B=$(shell tput bold; tput smul)
X=$(shell tput sgr0)

# Removes leading zero from given day
SHORT_DAY := $(shell echo ${DAY} | awk 'sub(/^0*/, "", $$1)')
COOKIE_FILE := cookies.txt
SESSION ?= ${shell cat ${COOKIE_FILE}}
YEAR ?= 2019

default: setupDay

setupDay: download src/day${DAY}/solution.go

## Downloads the instructions and inputs for a day (e.g. make DAY=02)
download: src/day${DAY}/README.md src/day${DAY}/input.txt

## Adjust here when you have created a template file
src/day${DAY}/solution.go:
	@echo "${H}=== Copying template for day ${SHORT_DAY} ===${X}"
	@sed -e "s/!DAY!/${DAY}/g" -e "s/MAIN/main/" src/template/template.go > src/day${DAY}/solution.go

src/day${DAY}/input.txt:
	@echo "${H}=== Downloading input for day ${SHORT_DAY} ===${X}"
	@curl -s -b "session=${SESSION}" https://adventofcode.com/${YEAR}/day/${SHORT_DAY}/input > src/day${DAY}/input.txt

src/day${DAY}/README.md: src/day${DAY}/challenge.html
	@echo "${H}=== Parsing input ===${X}"
	@./scripts/parse_challenge.sh ${DAY}

## The AOC_COOKIE environment variable should contain a complete session cookie in order to be able to use the make download target
src/day${DAY}/challenge.html:
	@echo "${H}=== Downloading challenge for day ${SHORT_DAY} ===${X}"
	@mkdir -p src/day${DAY}
	@curl -s -b "session=${SESSION}" https://adventofcode.com/${YEAR}/day/${SHORT_DAY} > src/day${DAY}/challenge.html


## The AOC_COOKIE environment variable should contain a complete session cookie in order to be able to use the make download target
stats:
	@echo "${H}=== Creating Stats Table ===${X}"
	@$(eval TABLE = $(shell python3 scripts/generate_stats.py ${COOKIE_FILE} ${YEAR}))
	@sed 's/STATS_TABLE/${TABLE}/g' README_template.md | awk '{gsub(/~~/,"\n")}1' > README.md

setup:
	@echo "${H}=== Creating Necessary Directories ===${X}"
	@mkdir -p src/template
	@echo "${H}=== Create a template file and adjust the indicated recipe ===${X}"

## call `make cookie SESSION=${}`
cookie:
	@echo ${SESSION} > ${COOKIE_FILE}
	
