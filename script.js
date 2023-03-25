/*
INITIALIZING THE PICKERS
thanks to @simonwep
for these customized pickers.
 */

const accentPickr = Pickr.create({
  el: ".pickr-container",
  theme: "classic",
  default: "#4AB5FF",
  swatches: [
    "rgba(244, 67, 51)",
    "rgb(233, 30, 99)",
    "rgb(156, 39, 176)",
    "rgb(103, 58, 183)",
    "rgb(63, 81, 181)",
    "rgb(33, 150, 243)",
    "rgb(3, 169, 244)",
    "rgb(0, 188, 212)",
    "rgb(0, 150, 136)",
    "rgb(76, 175, 80)",
    "rgb(139, 195, 74)",
    "rgb(205, 220, 57)",
    "rgb(255, 235, 59)",
    "rgb(255, 193, 7)",
  ],

  components: {
    // Main components
    preview: true,
    opacity: true,
    hue: true,

    // Input / output Options
    interaction: {
      hex: true,
      rgba: true,
      hsla: true,
      hsva: true,
      cmyk: true,
      input: true,
      clear: false,
      save: true,
    },
  },
});

const backgroundPickr = Pickr.create({
  el: ".pickr-container__2",
  theme: "classic",
  default: "#202527",
  swatches: [
    "rgba(244, 67, 51)",
    "rgb(233, 30, 99)",
    "rgb(156, 39, 176)",
    "rgb(103, 58, 183)",
    "rgb(63, 81, 181)",
    "rgb(33, 150, 243)",
    "rgb(3, 169, 244)",
    "rgb(0, 188, 212)",
    "rgb(0, 150, 136)",
    "rgb(76, 175, 80)",
    "rgb(139, 195, 74)",
    "rgb(205, 220, 57)",
    "rgb(255, 235, 59)",
    "rgb(255, 193, 7)",
  ],

  components: {
    // Main components
    preview: true,
    opacity: true,
    hue: true,

    // Input / output Options
    interaction: {
      hex: true,
      rgba: true,
      hsla: true,
      hsva: true,
      cmyk: true,
      input: true,
      clear: false,
      save: true,
    },
  },
});

accentPickr.on("save", (e) => {
  setAccentColor(e);
  accentPickr.hide();
});

backgroundPickr.on("save", (e) => {
  setBackgroundColor(e);
  backgroundPickr.hide();
});

/* ELEMENTS */

const mainBox = document.querySelector(".box__content");
const darkBox = document.querySelector(".box__content.content__dark");
const customBox = document.querySelector(".box__content.content__custom");

const boxButton = document.querySelector(".box__content button");
const boxInput = document.querySelector(".box__content input");
const headingBox = document.querySelector(".box__content.content__headings");
const iconBox = document.querySelector(".box__content.content__icons");

const ratioSpan = document.querySelector(".ratio");
const aanSpan = document.querySelector(".res__aan");
const aalSpan = document.querySelector(".res__aal");
const aaanSpan = document.querySelector(".res__aaan");
const aaalSpan = document.querySelector(".res__aal");

/* FUNCTIONS */

function setAccentColor(color) {
  const [h, e, x, a] = color.toHEXA();
  const colorFromFunction = `#${h}${e}${x}${a ? a : ""}`;

  document.body.style.setProperty("--accent", colorFromFunction);

  const bgColor = backgroundPickr.getColor().toHEXA();

  setSummary({
    accent: `${h}${e}${x}${a ? a : ""}`,
    background: `${bgColor[0]}${bgColor[1]}${bgColor[2]}${bgColor[3] ? bgColor[3] : ""
      }`,
  });
}

function setBackgroundColor(color) {
  const [h, e, x, a] = color.toHEXA();
  const colorFromFunction = `#${h}${e}${x}${a ? a : ""}`;

  document.body.style.setProperty("--bg", colorFromFunction);

  const accentColor = accentPickr.getColor().toHEXA();

  setSummary({
    background: `${h}${e}${x}${a ? a : ""}`,
    accent: `${accentColor[0]}${accentColor[1]}${accentColor[2]}${accentColor[3] ? accentColor[3] : ""
      }`,
  });
}

console.log(document.getRootNode().getRootNode().getRootNode())
function setSummary({ accent, background }) {
  fetch(`https://webaim.org/resources/contrastchecker/?fcolor=${accent}&bcolor=${background}&api`)
    .then((res) => res.json())
    .then((data) => {

      if (data.ratio >= 4.5) {
        ratioSpan.parentElement.classList.add("passed");
        ratioSpan.textContent = data.ratio;
      } else {
        ratioSpan.parentElement.classList.remove("passed");
        ratioSpan.textContent = data.ratio;
      }

      const aan = data.AA;
      const aal = data.AALarge;
      const aaan = data.AAA;
      const aaal = data.AAALarge;

      aanSpan.textContent = aan;
      aalSpan.textContent = aal;
      aaanSpan.textContent = aaan;
      aaalSpan.textContent = aaal;

      aan === 'pass' ? aanSpan.classList.add("passed") : aanSpan.classList.remove("passed");
      aal === 'pass' ? aalSpan.classList.add("passed") : aalSpan.classList.remove("passed");
      aaan === 'pass' ? aaanSpan.classList.add("passed") : aaanSpan.classList.remove("passed");
      aaal === 'pass' ? aaalSpan.classList.add("passed") : aaalSpan.classList.remove("passed");
      

    });
}
