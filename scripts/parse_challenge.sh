#! /bin/bash

# Install pup if needed
if ! hash pup 2>/dev/null; then
  brew install pup;
fi

if ! hash recode 2>/dev/null; then
  brew install recode;
fi

# Extract challenge from HTML page.
cat src/day${1}/challenge.html | pup 'article' > /tmp/challenge00.md

# Replace code HTML elements with markdown-style inline code blocks before getting text.
cat /tmp/challenge00.md | awk '{ gsub("<code>","`"); gsub("</code>","`"); print }' | pup 'text{}' > /tmp/challenge01.md

# Remove all newlines and squash all duplicate spaces.
cat /tmp/challenge01.md | tr -d "\n" | tr -s " " > /tmp/challenge02.md

# Interpret HTML encoded characters, and skip the leading space of the file.
cat /tmp/challenge02.md | recode html..ascii > /tmp/challenge03.md

# Remove whitespaces before dots and headers.
cat /tmp/challenge03.md | sed 's/ \././g' > /tmp/challenge04.md

# Add newlines between sentences and headers, and skip the first line.
cat /tmp/challenge04.md | sed 's/--- Day/~~## Day/g' | sed 's/--- Part/~~## Part/g' | sed 's/ ---/~~/g' | sed -E 's/(\.) ([A-Z])/\1~~\2/g' | tr '~' '\n' | tail -n +3 > src/day${1}/README.md

# Delete HTML
rm src/day${1}/challenge.html

# Print challenge.
#cat challenges/day${1}.md
