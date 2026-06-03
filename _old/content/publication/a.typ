// So that you can create a post
#import "/typ/templates/blog.typ": *

#let pub = (
    title: "Example Title",
    author_list: (
            (given: "given1", family: "family1"),
            (given: "given2", family: "family2")),
    venue: "Venue",
    date: "2025-09-26",
    type: "article",
    publicationTitle: "pubTitle",
    year: "2025",
    abstractNote: "abstract here",
)

#let title = plain-text(pub.title)

#let authors = ()
#for a in pub.author_list {
  authors.push(plain-text([#a.given.at(0). #a.family]))
}
#let authors = authors.join(", ", last: ", and ")
#let authors = plain-text(authors)
#let author = "authors"

#let venue = " "
#let tags = ()

#if pub.type == "conferencePaper" {
  venue = plain-text(pub.conferenceName)
  tags.push("Conference")
} else if pub.type == "article" {
  if "journal" in pub {
    venue = plain-text(pub.journal)
  } else {
    venue = plain-text(pub.publicationTitle)
  }
  tags.push("Journal")
} else if pub.type == "misc" {
  venue = plain-text(pub.eventtitle)
  tags.push("Presentation")
} else if pub.type == "thesis" {
  venue = plain-text(pub.university)
  tags.push("Academic")
} else if pub.type == "techreport" {
  venue = plain-text(pub.publicationTitle)
  tags.push("WhitePaper")
}

#let note = none
#if "note" in pub { note = [ (#pub.note)] }
#let venue = [#venue#note]
#let date = plain-text(pub.date)
#let file = if "url" in pub { pub.url } else { none } 
#let doi = if "doi" in pub { pub.doi } else { none }


#show: main.with(
  title: title,
  // desc: [This is a test post.],
  date: date,
  tags: tags,
  show-outline: false,
  author: author,
  venue: venue,
  file: file,
  doi: doi,
)

//
// Constructing what's shown on the page when you click on the article.
//
#author

#if pub.type != "thesis" [Published in] else [Institution:] #emph[#venue], #pub.year

#pub.abstractNote

#if "url" in pub [
#link(pub.url)[Download publication]
]

#if "doi" in pub [
DOI: #link("https://doi.org/" + plain-text(pub.doi))[#pub.doi]
]

// #let div-frame(content, attrs: (:), tag: "div") = html.elem(tag, html.frame(content), attrs: attrs)
// #let span-frame = div-frame.with(tag: "span")
// #let p-frame = div-frame.with(tag: "p")

// #import "@preview/shiroa:0.2.3": is-web-target, is-pdf-target, plain-text, is-html-target, templates

// #html.elem(image, html.frame(content), attrs: (src: "favicon.jpg"))

// #image("favicon.jpg", width: 80%)

Maybe i need some text #lorem(80)



