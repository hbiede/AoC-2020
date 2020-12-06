#! /bin/bash

# Install html2md if needed
if ! hash html2md 2>/dev/null; then
  npm install -g to-markdown-cli
fi

cat src/day${1}/challenge.html | tr '\n' '\f' | perl -pe 's/.*?(<article.*<\/article>).*/\1/g' | tr '\f' '\n'> src/day${1}/challenge1.html

# Extract challenge from HTML page.
html2md -i src/day${1}/challenge1.html -o /tmp/challenge00.md

# Format
cat /tmp/challenge00.md | sed 's/ \././g' | sed 's/` ,/`,/g' | sed 's/` \./`./g' | sed 's/^Your puzzle answer.*$//g' > src/day${1}/README.md

# Delete HTML
rm src/day${1}/challeng*.html
