# Setup
# Removes leading zero from given day
FILE_EXTENSION := ts
SHORT_DAY := $(shell echo ${DAY} | awk 'sub(/^0*/, "", $$1)')
COOKIE_FILE := cookies.txt
SESSION ?= ${shell cat ${COOKIE_FILE}}
YEAR ?= 2020

# Formatting
H=$(shell tput -Txterm setaf 3; tput bold)
B=$(shell tput bold; tput smul)
X=$(shell tput sgr0)

## Alias for setupDay
default: setupDay

## Downloads necessary files and clones the template file (e.g. make DAY=02)
setupDay: src/day${DAY}/solution.${FILE_EXTENSION} download

## Call to run your code
run: src/day${DAY}/solution.ts
	ts-node src/day${DAY}/solution.ts

## Downloads the instructions and inputs for a day
download: src/day${DAY}/README.md src/day${DAY}/input.txt

# Adjust here when you have created a template file
src/day${DAY}/solution.${FILE_EXTENSION}:
	@echo "${H}=== Copying template for day ${SHORT_DAY} ===${X}"
	@mkdir -p src/day${DAY}
	@sed -e "s/!DAY!/${DAY}/g" -e "s/MAIN/main/" src/template/template.${FILE_EXTENSION} > src/day${DAY}/solution.${FILE_EXTENSION}

src/day${DAY}/input.txt:
	@echo "${H}=== Downloading input for day ${SHORT_DAY} ===${X}"
	@curl -s -b "session=${SESSION}" https://adventofcode.com/${YEAR}/day/${SHORT_DAY}/input > src/day${DAY}/input.txt

src/day${DAY}/README.md: src/day${DAY}/challenge.html
	@echo "${H}=== Parsing input ===${X}"
	@./scripts/parse_challenge.sh ${DAY}

src/day${DAY}/challenge.html:
	@echo "${H}=== Downloading challenge for day ${SHORT_DAY} ===${X}"
	@curl -s -b "session=${SESSION}" https://adventofcode.com/${YEAR}/day/${SHORT_DAY} > src/day${DAY}/challenge.html


## Update the readme with the latest AoC stats
stats:
	@echo "${H}=== Creating Stats Table ===${X}"
	@$(eval TABLE = $(shell python3 scripts/generate_stats.py ${COOKIE_FILE} ${YEAR}))
	@sed 's/STATS_TABLE/${TABLE}/g' README_template.md | awk '{gsub(/~~/,"\n")}1' > README.md

## Create necessary files for the new repo
setup:
	@echo "${H}=== Creating Necessary Directories ===${X}"
	@mkdir -p src/template
	@echo "${H}=== Create a template file and adjust the indicated recipe ===${X}"

## call `make cookie SESSION=${}`
cookie:
	@echo ${SESSION} > ${COOKIE_FILE}
	
