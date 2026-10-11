"use strict";

// بيانات تجريبية فقط. غيّر المفتاح والرقم عند الحاجة.
const ACCESS_KEY = "1#7@12/12::W:32/_A5.Zz::22Ex114mQ";
const TRANSACTION_NUMBER = "396654428266653";

const MAIN_MESSAGE =
  "اهلا بكم في مشفر 😂\n" +
  "يرجي دفع مديونية الضحك التي وصلت قيمتها حتي الان الي 2869.84 ضحكة 😂 وادخال رقم العمليه عشان نديك شهادة إنك ضحكتنا. (هزار طبعًا، مفيش فلوس مطلوبة ولا بيانات حقيقية).";

const FINAL_MESSAGE = "⚠️ لقد تم مسح البينات نظرا لتأخر ميعاد التسجيل ";

const $ = (id) => document.getElementById(id);
const pageIds = ["key", "message", "transaction", "final"];

function show(pageId) {
  pageIds.forEach((id, index) => {
    const panel = $(id);
    if (panel) panel.classList.toggle("active", id === pageId);

    const bar = document.querySelectorAll(".progress i")[index];
    if (bar) bar.classList.toggle("on", index <= pageIds.indexOf(pageId));
  });
}

function renderMainMessage() {
  const element = $("mainmessage");
  if (!element) return;
  element.replaceChildren();

  const amountText = "2869.84 ضحكة";
  const parts = MAIN_MESSAGE.split(amountText);

  parts.forEach((part, index) => {
    if (part) element.append(document.createTextNode(part));
    if (index < parts.length - 1) {
      const amount = document.createElement("span");
      amount.className = "highlight-amount";
      amount.textContent = amountText;
      element.append(amount);
    }
  });
}

const finalElement = $("finalmessage");
if (finalElement) finalElement.textContent = FINAL_MESSAGE;

$("keyform")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = $("keyinput");
  const error = $("keyerror");
  if (!input || !error) return;

  if (input.value === ACCESS_KEY) {
    error.textContent = "";
    input.value = "";
    show("message");
  } else {
    error.textContent = "المفتاح التجريبي غير صحيح. حاول مرة أخرى.";
  }
});

$("review")?.addEventListener("click", () => show("transaction"));
$("backkey")?.addEventListener("click", () => show("key"));
$("backmessage")?.addEventListener("click", () => show("message"));

$("transform")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = $("transinput");
  const error = $("transerror");
  if (!input || !error) return;

  if (input.value === TRANSACTION_NUMBER) {
    error.textContent = "";
    input.value = "";
    show("final");
  } else {
    error.textContent = "الرقم التجريبي غير صحيح. حاول مرة أخرى.";
  }
});

$("restart")?.addEventListener("click", () => {
  ["keyinput", "transinput"].forEach((id) => {
    if ($(id)) $(id).value = "";
  });
  ["keyerror", "transerror"].forEach((id) => {
    if ($(id)) $(id).textContent = "";
  });
  show("key");
});

renderMainMessage();
show("key");
