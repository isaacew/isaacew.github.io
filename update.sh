#! /bin/bash

papis export --all --out bibliography.bib project:MyPubs
RC1=$?
if [[ $RC1 -eq 0 ]]; then
	markdown_generator/publications.py
	RC2=$?
	if [[ $RC2 -eq 0 ]]; then
		echo "Success"
	else
		echo "Markdown generator failed"
	fi
else
	echo "papis export failed"
fi
	
