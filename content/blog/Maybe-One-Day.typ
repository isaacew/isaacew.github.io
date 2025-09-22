#import "/typ/templates/blog.typ": *
#show: main.with(
  title: "Maybe One Day",
  desc: [A Metablog],
  date: "2025-09-16",
  tags: (
    blog-tags.typst,
  ),
  show-outline: false
)

Maybe one day I will have a blog.
For now, this is a placeholder.
The great thing is that this blog is powered by #link("https://typst.app")[typst].
Therefore many things are possible in terms of typesetting.
I will leave you with the following example, the Hamilton-Jacobi-Isaacs equation @isaacs1965differential:

#let vv(x) = math.bold(math.upright(x))
$
  min_(vv(u) in cal(U)) max_(vv(v) in cal(V)) { l(vv(x), vv(u), vv(v), t) + (partial V)/(partial t) + nabla_vv(x) V dot.c vv(f)(vv(x)) } = 0
$

*References*\
#cite(<isaacs1965differential>, form: "full")
#bibliography("refs.bib", title: none)

