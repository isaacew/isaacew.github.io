#!/usr/bin/env python

# coding: utf-8

# # Publications markdown generator for academicpages
# 
# Takes a TSV of publications with metadata and converts them for use with [academicpages.github.io](academicpages.github.io). This is an interactive Jupyter notebook, with the core python code in publications.py. Run either from the `markdown_generator` folder after replacing `publications.tsv` with one that fits your format.
# 
# TODO: Make this work with BibTex and other databases of citations, rather than Stuart's non-standard TSV format and citation style.
# 

import bibtexparser

html_escape_table = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "\\": ""
    }

def html_escape(text):
    """Produce entities within text."""
    return "".join(html_escape_table.get(c,c) for c in text)

def parse_author(a):
    """Parses author name in the format of `Last, First Middle` where
    the middle name is sometimes there and sometimes not (and could just be an initial)
    
    Returns: author name as `F. M. Last`
    """
    
    a = a.split(', ')
    last = a[0].strip()
    fm = a[1].split(' ')
    first = fm[0][0] + '.'
    
    if len(fm) > 1:
        middle = fm[1][0] + '.'
    else:
        middle = ''
    
    if not middle == '':
        return first + ' ' + middle + ' ' + last
    else:
        return first + ' ' + last

# ## Creating the markdown files
# 
import os
dir_path = os.path.dirname(os.path.realpath(__file__))
os.chdir(dir_path)

parser = bibtexparser.bparser.BibTexParser(common_strings=True, ignore_nonstandard_types=False)
with open("../mypubs.bib") as bibtex_file:
    publications = bibtexparser.load(bibtex_file, parser=parser)

for item in publications.entries:
    item = bibtexparser.customization.add_plaintext_fields(item)
    for k in item.keys():
        item[k] = item[k].strip()
    year = item['plain_year'] if 'plain_year' in item else item['plain_date'].split('-')[0]
    key = item['ID']
    # key = item['plain_author'].split(',')[0].replace(' ', '').lower() + str(year) + item['plain_title'].split(' ')[0].lower()

    md_filename = key + ".md"
    html_filename = key
    
    ## YAML variables
    
    md = "---\ntitle: \""   + item['plain_title'] + '"\n'
    
    md += """collection: publications"""
    
    md += """\npermalink: /publication/""" + html_filename
    
    if not 'plain_date' in item:
        raise Exception(item)
    
    if not 'plain_date' in item:
        raise Exception(item)
    date = item['plain_date']
    if len(date) == 4:
        date += "-06-15 01:00:00 +0500"
    elif len(date) == 7:
        date += "-15 01:00:00 +0500"
    elif len(date) == 10:
        date += " 01:00:00 +0500"
    else:
        print("Date could not be parsed")
        print(key, "'%s'"% date, len(date))
        break
    
    md += "\ndate: " + date

    if 'plain_eventtitle' in item:
        venue = item['plain_eventtitle']
    elif 'plain_booktitle' in item:
        venue = item['plain_booktitle']
    elif 'plain_journal' in item:
        venue = item['plain_journal']
    elif 'plain_journaltitle' in item:
        venue = item['plain_journaltitle']
    elif 'plain_institution' in item:
        venue = item['plain_institution']
    elif 'plain_school' in item:
        venue = item['plain_school']
    else:
        venue = ''
    
    if 'plain_note' in item:
        note = item['plain_note']
        if 'submitted' in note.lower() or 'review' in note.lower() or 'accepted' in note.lower() and venue:
            venue += " (<b><i>" + note + "</i></b>)"
        
    if venue:
        md += "\nvenue: '" + html_escape(venue) + "'"
    
    if 'plain_url' in item:
        md += "\npaperurl: '" + item['plain_url'] + "'"
    
    if 'plain_doi' in item:
        md += "\ndoi: '" + item['plain_doi'] + "'"
        
    pubtypes = {"inproceedings": "conference",
                "article": "journal",
                "thesis": "academic",
                "misc": "presentation"}
    md += "\npubtype: '" + pubtypes[item['ENTRYTYPE']] + "'"
    
#     md += "\ncitation: '" + html_escape(item.citation) + "'"
    authors = ', '.join([parse_author(a) for a in item['plain_author'].split(' and ')])
    md += "\nauthors: '" + authors + "'"
    
    md += "\nexcerpt_separator: \"\""
    
    md += "\n---"
    
    ## Markdown description for individual page
        
    if 'plain_abstract' in item:
        md += "\n" + html_escape(item['plain_abstract']) + "\n"
    
    if 'plain_url' in item:
        md += "\n[Download paper here](" + item['plain_url'] + ")"
    
    if 'plain_doi' in item:
        md += "\n\nDOI: [" + item['plain_doi'] + "](https://doi.org/" + item['plain_doi'] + ")"
        
#     md += "\nRecommended citation: " + item.citation
    
    md_filename = os.path.basename(md_filename)
       
    with open("../_publications/" + md_filename, 'w') as f:
        f.write(md)
