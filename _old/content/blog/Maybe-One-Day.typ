#import "/typ/templates/blog.typ": *
#show: main.with(
  title: "A Blog Entry Example",
  desc: [Example],
  date: "2025-09-26",
  tags: (
    blog-tags.typst,
  ),
  show-outline: false
)

Here's some text.
Here's a link. #link("https://typst.app")[typst].
I took Alex's version for now of the Hamilton-Jacobi-Isaacs equation @isaacs1965differential:

#let vv(x) = math.bold(math.upright(x))
$
  min_(vv(u) in cal(U)) max_(vv(v) in cal(V)) { l(vv(x), vv(u), vv(v), t) + (partial V)/(partial t) + nabla_vv(x) V dot.c vv(f)(vv(x)) } = 0
$

*References*\
#cite(<isaacs1965differential>, form: "full")
#bibliography("refs.bib", title: none)

