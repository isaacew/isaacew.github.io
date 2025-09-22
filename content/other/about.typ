
#import "/typ/templates/mod.typ": sys-is-html-target

// If the site is not bundled my artwork, don't show it
#let show-artwork = false
#let is-external = state("about:is-external", false)

#let en = text.with(lang: "en")
#let zh = text.with(lang: "zh")

#let blog-desc = [
  I am a researcher with the Control Science Center, Aerospace Systems Directorate, Air Force Research Laboratory.
  I hold a B.S. from Ohio State (2012) and an M.S. from Georgia Institute of Technology (2016) both in Aerospace Engineering.
  In 2011 I received the Department of Defense SMART Scholarship.
  Then in 2014 I received SMART again to pursue my M.S.
  Lastly, I earned a Ph.D. in Electrical Engineering at University of Cincinnati under #link("https://scholar.google.com/citations?user=cr_ZGFkAAAAJ&hl=en&oi=ao")[Zach Fuchs]; my dissertation can be found #link("https://avonmoll.github.io/files/dissertation.pdf")[here].
  In 2019 I received the #link("http://www.acgsc.org/ward_award.php")[Dave Ward Memorial Lecture Award] from the Aerospace Control and Guidance Systems Committee for outstanding contribution to the autonomy of unmanned aerial systems in the area of game-theoretic control in adversarial environments.
  In 2025 I received the Jack Blackhurst Innovation Award from Air Force Research Laboratory.


  My research interests include multi-agent systems, cooperative control, and differential games.

  == Research Opportunity
  I have a topic entitled #link("https://afsffp.sysplus.com/SFFP/contact/subLab.aspx?sublabid=13&programid=10165")[Cooperative Tactics and Staging for Heterogeneous Teams] for the #link("https://afsffp.sysplus.com/")[AFOSR Summer Faculty Fellowship Program].
]

#let self-desc = [
  #context if not is-external.get() { blog-desc }
]

#if sys-is-html-target and show-artwork {
  {
    show raw: it => html.elem("style", it.text)
    ```css
    .self-desc .thumbnail-container {
      flex: 0 0 22em;
      border-radius: 0.5em;
      overflow: hidden;
      margin-left: 2em;
      margin-block-start: -1em;
      margin-block-end: 2em;
    }

    .self-desc .thumbnail-container,
    .self-desc .thumbnail {
      float: right;
      width: 22em;
      height: 22em;
    }

    .thumbnail {
      --thumbnail-fg: var(--main-color);
      --thumbnail-bg: transparent;
    }

    .dark .thumbnail {
      --thumbnail-bg: var(--main-color);
      --thumbnail-fg: transparent;
    }

    @media (max-width: 800px) {
      .self-desc {
        display: flex;
        gap: 1em;
        flex-direction: column-reverse;
        align-items: center;
      }
      .self-desc .thumbnail-container {
        margin-block-start: 0em;
        margin-block-end: 0em;
      }
      .self-desc .thumbnail-container,
      .self-desc .thumbnail {
        width: 100%;
        height: 100%;
      }
    }
    ```
  }

  let div = html.elem.with("div")
  let svg = html.elem.with("svg")
} else {
  self-desc
}
