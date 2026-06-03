
#import "/typ/templates/mod.typ": sys-is-html-target

// If the site is not bundled my artwork, don't show it
#let show-artwork = false
#let is-external = state("about:is-external", false)

#let en = text.with(lang: "en")
#let zh = text.with(lang: "zh")

#let blog-desc = [
I am a Senior Electronics Engineer in the Autonomous Controls branch in the Power and Control division of the Aerospace Systems Directorate in the Air Force Research Laboratory. I received my PhD in Electrical Engineering from the Air Force Institute of Technology in 2021, my MS in Electrical Engineering from the University of Texas at Arlington in 2011, and my BS in Mechanical Engineering from Rose-Hulman Institute of Technology in 2009. I am currently an associate fellow of the American Institute of Aeronautics and Astronautics (AIAA) and a senior member of the Institute of Electrical and Electronics Engineers (IEEE). I am a member of the Intelligent Systems Technical Committee (ISTC) in the AIAA and I am an active member of both the Robotics and Automation Society (RAS) and the Controls Systems Society (CSS) in the IEEE. My research interests lie in automation and control of aerospace systems for defense applications.

  == Research Opportunity
  I have a topic entitled #link("https://afsffp.sysplus.com/SFFP/contact/subLab.aspx?sublabid=13&programid=10139")[Direct Mtehods for Differential Games] for the #link("https://afsffp.sysplus.com/")[AFOSR Summer Faculty Fellowship Program].
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
