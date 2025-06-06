const lightButtons = document.querySelectorAll(".light");
const body = document.body;

function setMode(mode) {
  if (mode === "light") {
    body.classList.add("light-mode");
  } else {
    body.classList.remove("light-mode");
  }
  // Active Klasse auf Button setzen
  lightButtons.forEach((btn, i) => {
    btn.classList.toggle(
      "active",
      (mode === "light" && i === 1) || (mode !== "light" && i === 0)
    );
  });

  localStorage.setItem("theme", mode);
}

lightButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    setMode(index === 1 ? "light" : "dark");
  });
});

// Beim Laden gespeichertes Theme setzen
const savedTheme = localStorage.getItem("theme") || "dark";
setMode(savedTheme);

document.querySelector(".cvDownload").addEventListener("click", () => {
  // Erstellen eines Blob mit einem einfachen Text als Beispiel für eine PDF
  const pdfContent = "Das ist ein Beispieltext für eine PDF-Datei.";
  const blob = new Blob([pdfContent], { type: "application/pdf" });

  // Erstellen eines temporären Links zum Download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Marcel-Singh-CV.pdf"; // Dateiname beim Download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
});

// Nav aktiv
// Scroll Spy: Active Link beim Scrollen aktualisieren
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }

    // Spezielle Behandlung für letzten Abschnitt (Contact)
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 50
    ) {
      current = "contact";
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

//  contact me infos in local storage
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Verhindert echtes Absenden

  const name = this.querySelector('input[type="text"]').value.trim();
  const email = this.querySelector('input[type="email"]').value.trim();
  const message = this.querySelector("textarea").value.trim();

  if (!name || !email || !message) {
    alert("Bitte fülle alle Felder aus.");
    return;
  }

  const contactData = {
    name,
    email,
    message,
    date: new Date().toISOString(),
  };

  // Bestehende Daten laden (falls vorhanden)
  const existing = JSON.parse(localStorage.getItem("contacts")) || [];

  // Neues Datum hinzufügen
  existing.push(contactData);

  // Zurück in Local Storage speichern
  localStorage.setItem("contacts", JSON.stringify(existing));

  // Optional: Formular leeren und Erfolg anzeigen
  this.reset();
  alert("Nachricht gespeichert! (im Local Storage)");
});

const burger = document.getElementById("burgerMenu");
const nav = document.getElementById("mobileNav");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
});
