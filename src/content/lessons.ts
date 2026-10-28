// Lektionen: interaktive Lerneinheiten. Jede Lektion ist ein Kapitel in
// einem großen Themenbereich (AREAS); die Reihenfolge in LESSONS ist die
// Kapitel-Reihenfolge innerhalb des Bereichs.
//
// Eine Lektion besteht aus Schritten (werden einzeln durchgeblättert) und
// Übungen am Ende:
// - "choice": eine richtige Antwort aus mehreren (answer = Index, ab 0)
// - "order":  Schritte in die richtige Reihenfolge bringen (items in der
//             RICHTIGEN Reihenfolge eintragen — gemischt wird automatisch)
// - "classify": Fälle einer von mehreren Kategorien zuordnen (category =
//             Index in `categories`, ab 0)
//
// `terms` verweist auf Einträge im Wörterbuch (ids aus glossary.ts).
// Neue Lektion: an LESSONS anhängen (Bereich in `area`), `slug` wird Teil der
// URL: /lektionen/<area>/<slug>. Mit `draft: true` ist eine Lektion
// ausgeblendet (noch nicht veröffentlicht).

import type { Localized } from "./types";

/** Großer Themenbereich; die Lektionen darin sind seine Kapitel. */
export type AreaId = "scanner" | "kommissionierung";

export type Area = {
  id: AreaId;
  title: Localized;
  description: Localized;
};

export type LessonStep = {
  title: Localized;
  text: Localized;
  terms?: string[];
};

export type ChoiceExercise = {
  type: "choice";
  question: Localized;
  options: Localized[];
  answer: number;
  explanation: Localized;
};

export type OrderExercise = {
  type: "order";
  question: Localized;
  items: Localized[];
  explanation: Localized;
};

export type ClassifyExercise = {
  type: "classify";
  question: Localized;
  categories: Localized[];
  items: { text: Localized; category: number }[];
  explanation: Localized;
};

export type Exercise = ChoiceExercise | OrderExercise | ClassifyExercise;

export type Lesson = {
  slug: string;
  /** Not published yet: hidden from the site, still checked by the tests. */
  draft?: boolean;
  area: AreaId;
  title: Localized;
  summary: Localized;
  minutes: number;
  steps: LessonStep[];
  exercises: Exercise[];
};

export const AREAS: Area[] = [
  {
    id: "scanner",
    title: { de: "Scanner", hu: "Szkenner", en: "Scanner" },
    description: {
      de: "Anmelden, Zeit buchen, scannen und Etiketten lesen.",
      hu: "Bejelentkezés, időcsekkolás, beolvasás és címkék olvasása.",
      en: "Logging in, booking time, scanning and reading labels.",
    },
  },
  {
    id: "kommissionierung",
    title: { de: "Kommissionierung", hu: "Komissiózás", en: "Order picking" },
    description: {
      de: "Den Lagerplatz lesen und GVE, EVE, Faktor – wann ein Karton geöffnet wird.",
      hu: "A tárhelyszám olvasása, valamint GVE, EVE, faktor – mikor kell megbontani a kartont.",
      en: "Reading the location, plus GVE, EVE, factor – when a carton has to be opened.",
    },
  },
];

export const ALL_LESSONS: Lesson[] = [
  {
    slug: "scanner-grundlagen",
    area: "scanner",
    minutes: 5,
    title: {
      de: "Scanner-Grundlagen",
      hu: "Szkenner alapok",
      en: "Scanner basics",
    },
    summary: {
      de: "Anmelden, die wichtigsten Tasten und wie man sicher scannt.",
      hu: "Bejelentkezés, a legfontosabb gombok és a biztos beolvasás.",
      en: "Logging in, the most important keys and scanning reliably.",
    },
    steps: [
      {
        title: { de: "Anmelden", hu: "Bejelentkezés", en: "Logging in" },
        text: {
          de: "Zu Schichtbeginn meldest du dich mit deiner Mitarbeiternummer (MA-Nr.) und deinem Passwort am Scanner an. Melde dich immer mit deinen eigenen Daten an – alle Buchungen laufen auf deinen Namen.",
          hu: "Műszak elején a dolgozói számoddal (MA-Nr.) és a jelszavaddal jelentkezel be a szkenneren. Mindig a saját adataiddal lépj be – minden könyvelés a te nevedre fut.",
          en: "At the start of your shift you log in with your employee number (MA-Nr.) and password. Always use your own login – every booking is recorded under your name.",
        },
        terms: ["einloggen", "ma", "mde"],
      },
      {
        title: {
          de: "Die wichtigsten Tasten",
          hu: "A legfontosabb gombok",
          en: "The most important keys",
        },
        text: {
          de: "ENT bestätigt und geht weiter. ESC geht einen Schritt zurück. Die Löschtaste ⌫ (Pfeil nach links mit X) löscht deine Eingabe. ALP wechselt zwischen Buchstaben und Zahlen. Die F-Tasten haben Sonderfunktionen – welche, steht meist unten im Display.",
          hu: "Az ENT megerősít és továbblép. Az ESC egy lépést visszalép. A törlés gomb ⌫ (balra mutató nyíl, benne X) törli a bevitelt. Az ALP a betű- és a számbevitel között vált. Az F-gomboknak különleges funkcióik vannak – hogy melyiknek mi, az általában a kijelző alján látszik.",
          en: "ENT confirms and continues. ESC goes back one step. The delete key ⌫ (arrow pointing left with an X) clears your input. ALP switches between letters and numbers. The F keys have special functions – usually shown at the bottom of the display.",
        },
        terms: ["quittieren"],
      },
      {
        title: { de: "Richtig scannen", hu: "Helyes beolvasás", en: "Scanning correctly" },
        text: {
          de: "Halte den Scanner 10–30 cm vom Barcode entfernt und ziele mit dem Lichtstrahl quer über den ganzen Code. Ein Piepton bedeutet: gelesen. Klappt es nicht, Winkel leicht ändern – glänzende Folie spiegelt oft.",
          hu: "Tartsd a szkennert 10–30 cm-re a vonalkódtól, és a fénysugárral az egész kódon keresztül célozz. A sípolás azt jelenti: beolvasva. Ha nem megy, változtass kicsit a szögön – a fényes fólia gyakran tükröz.",
          en: "Hold the scanner 10–30 cm from the barcode and aim the beam across the whole code. A beep means: read. If it fails, change the angle slightly – shiny foil often reflects.",
        },
      },
      {
        title: {
          de: "Den richtigen Code scannen",
          hu: "A megfelelő kódot olvasd be",
          en: "Scan the right code",
        },
        text: {
          de: "Wir scannen immer die EAN auf dem Artikel. Ausnahme: Steht die Position am Scanner in roter Schrift, scannst du vorübergehend den Barcode des Komm-Platzes – weil der Barcode des Artikels fehlerhaft ist oder fehlt.",
          hu: "Mindig az artikelen (terméken) lévő EAN-t szkenneljük. Kivétel: ha a pozíció a szkenneren piros színnel van kiírva, ideiglenesen a Komm-Platz vonalkódját kell beszkennelni – mert a termék barcode-ja hibás vagy hiányzik.",
          en: "We always scan the EAN on the article. Exception: if the position is shown in red on the scanner, you temporarily scan the barcode of the Komm-Platz instead – because the article's barcode is faulty or missing.",
        },
        terms: ["ean", "komm-platz"],
      },
    ],
    exercises: [
      {
        type: "choice",
        question: {
          de: "Mit welcher Taste bestätigst du einen Schritt?",
          hu: "Melyik gombbal erősítesz meg egy lépést?",
          en: "Which key confirms a step?",
        },
        options: [
          { de: "ESC", hu: "ESC", en: "ESC" },
          { de: "ENT", hu: "ENT", en: "ENT" },
          { de: "Löschtaste ⌫", hu: "Törlés gomb ⌫", en: "Delete key ⌫" },
        ],
        answer: 1,
        explanation: {
          de: "ENT (Enter) bestätigt. ESC geht zurück, die Löschtaste ⌫ löscht.",
          hu: "Az ENT (Enter) erősít meg. Az ESC visszalép, a törlés gomb ⌫ töröl.",
          en: "ENT (Enter) confirms. ESC goes back, the delete key ⌫ clears.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Die Position steht am Scanner in roter Schrift. Was scannst du?",
          hu: "A pozíció a szkenneren piros színnel van kiírva. Mit szkennelsz be?",
          en: "The position is shown in red on the scanner. What do you scan?",
        },
        options: [
          {
            de: "Die EAN auf dem Artikel",
            hu: "Az artikelen lévő EAN-t",
            en: "The EAN on the article",
          },
          {
            de: "Den Barcode des Komm-Platzes",
            hu: "A Komm-Platz vonalkódját",
            en: "The barcode of the Komm-Platz",
          },
        ],
        answer: 1,
        explanation: {
          de: "Rot heißt: Der Artikel-Barcode ist fehlerhaft oder fehlt. Dann vorübergehend den Komm-Platz scannen – sonst immer die EAN.",
          hu: "A piros azt jelenti: a termék barcode-ja hibás vagy hiányzik. Ilyenkor ideiglenesen a Komm-Platzot szkenneled – egyébként mindig az EAN-t.",
          en: "Red means: the article barcode is faulty or missing. Then scan the Komm-Platz temporarily – otherwise always the EAN.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Ein Kollege bittet dich, dich mit seinen Daten anzumelden. Was machst du?",
          hu: "Egy kolléga megkér, hogy az ő adataival jelentkezz be. Mit teszel?",
          en: "A colleague asks you to log in with his details. What do you do?",
        },
        options: [
          {
            de: "Kein Problem, das spart Zeit.",
            hu: "Semmi gond, az időt spórol.",
            en: "No problem, it saves time.",
          },
          {
            de: "Ich melde mich nur mit meinen eigenen Daten an.",
            hu: "Csak a saját adataimmal jelentkezem be.",
            en: "I only log in with my own details.",
          },
        ],
        answer: 1,
        explanation: {
          de: "Alle Buchungen laufen auf den angemeldeten Namen. Fehler würden dem Falschen zugeordnet.",
          hu: "Minden könyvelés a bejelentkezett névre fut. A hibák rossz emberhez kerülnének.",
          en: "All bookings are recorded under the logged-in name. Mistakes would be assigned to the wrong person.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Der Scanner liest den Barcode nicht. Was hilft oft?",
          hu: "A szkenner nem olvassa be a vonalkódot. Mi segít gyakran?",
          en: "The scanner doesn't read the barcode. What often helps?",
        },
        options: [
          {
            de: "Den Winkel leicht ändern und etwas Abstand halten.",
            hu: "Kicsit változtatni a szögön, és távolabb tartani.",
            en: "Slightly change the angle and keep some distance.",
          },
          {
            de: "Den Scanner direkt auf den Code drücken.",
            hu: "A szkennert közvetlenül a kódra nyomni.",
            en: "Press the scanner right onto the code.",
          },
          {
            de: "Den Scanner neu starten.",
            hu: "Újraindítani a szkennert.",
            en: "Restart the scanner.",
          },
        ],
        answer: 0,
        explanation: {
          de: "10–30 cm Abstand und ein anderer Winkel lösen die meisten Leseprobleme (z. B. spiegelnde Folie).",
          hu: "10–30 cm távolság és más szög a legtöbb olvasási problémát megoldja (pl. tükröző fólia).",
          en: "10–30 cm distance and a different angle fix most reading problems (e.g. reflecting foil).",
        },
      },
    ],
  },
  {
    slug: "zeiterfassung",
    area: "scanner",
    minutes: 7,
    title: {
      de: "Zeit buchen am Scanner",
      hu: "Időcsekkolás a szkenneren",
      en: "Booking time on the scanner",
    },
    summary: {
      de: "Einloggen, Kommen, Pause, Nebenzeit, Gehen – in der richtigen Reihenfolge, ohne Gap-Zeit.",
      hu: "Bejelentkezés, Kommen, Pause, Nebenzeit, Gehen – helyes sorrendben, Gap-Zeit nélkül.",
      en: "Logging in, Kommen, Pause, Nebenzeit, Gehen – in the right order, without Gap-Zeit.",
    },
    steps: [
      {
        title: {
          de: "Schichtbeginn: Einloggen, dann Kommen",
          hu: "Műszakkezdés: bejelentkezés, aztán Kommen",
          en: "Start of shift: log in, then Kommen",
        },
        text: {
          de: "Die Arbeitszeit buchst du am Scanner. Zuerst meldest du dich mit deinen eigenen Daten an. Dann öffnest du das Menü „Zeiterfassung“ und buchst „Kommen“ – erst ab jetzt zählt deine Arbeitszeit.",
          hu: "A munkaidődet a szkenneren rögzíted. Először a saját adataiddal bejelentkezel. Aztán megnyitod a „Zeiterfassung” menüt, és becsekkolod a „Kommen”-t – csak innentől számít a munkaidőd.",
          en: "You book your working time on the scanner. First log in with your own details. Then open the “Zeiterfassung” menu and book “Kommen” – your working time only counts from now on.",
        },
        terms: ["einloggen", "zeiterfassung", "kommen"],
      },
      {
        title: { de: "Pause buchen", hu: "Szünet csekkolása", en: "Booking a break" },
        text: {
          de: "Kleine Pause oder Mittagspause: Du buchst in der Zeiterfassung „Pause“. Danach meldet dich der Scanner automatisch ab. Kommst du zurück, loggst du dich wieder mit deinen Daten ein, öffnest die Zeiterfassung und buchst „Komm Pause“. Dann geht die Arbeit weiter.",
          hu: "Kis szünet vagy ebédszünet: a Zeiterfassung menüben becsekkolod a „Pause”-t. Ezután a szkenner automatikusan kiléptet. Amikor visszajössz, újra bejelentkezel (einloggen) az adataiddal, megnyitod a Zeiterfassung-ot, és becsekkolod a „Komm Pause”-t. Utána folytatod a munkát.",
          en: "Short break or lunch break: book “Pause” in Zeiterfassung. The scanner then logs you out automatically. When you come back, log in again with your details, open Zeiterfassung and book “Komm Pause”. Then you carry on working.",
        },
        terms: ["pause", "einloggen", "komm-pause"],
      },
      {
        title: {
          de: "Nebenzeit: wenn du nicht kommissionierst",
          hu: "Nebenzeit: amikor épp nincs komissiózás",
          en: "Nebenzeit: when you're not picking",
        },
        text: {
          de: "Arbeitest du gerade an etwas anderem als Kommissionieren, öffnest du im eingeloggten Zustand im Menü die „Nebenzeiterfassung“ und wählst dort die Art der Nebenzeit aus: Wickelmaschine, Reinigung oder Besprechung. Ist die Tätigkeit vorbei, geht es mit dem Kommissionieren weiter.",
          hu: "Ha épp nem komissiózol, hanem mást dolgozol, bejelentkezett állapotban a menüben megnyitod a „Nebenzeiterfassung”-ot, és azon belül kiválasztod a Nebenzeit típusát: Wickelmaschine (fóliázógép), Reinigung (takarítás) vagy Besprechung (megbeszélés). Ha vége, folytatod a komissiózást.",
          en: "If you're doing something other than picking, open “Nebenzeiterfassung” in the menu while logged in and choose the type of Nebenzeit there: Wickelmaschine (wrapping machine), Reinigung (cleaning) or Besprechung (meeting). When it's done, you continue picking.",
        },
        terms: ["nebenzeiterfassung", "nebenzeit", "wickelmaschine", "reinigung", "besprechung"],
      },
      {
        title: {
          de: "Warum Nebenzeit so wichtig ist: Leistung & Gap-Zeit",
          hu: "Miért fontos a Nebenzeit: Leistung és Gap-Zeit",
          en: "Why Nebenzeit matters: Leistung & Gap-Zeit",
        },
        text: {
          de: "Das System misst deine Leistung über die Zeit zwischen deinen Buchungen am Scanner. Wenn du nichts buchst – weil du z. B. wartest, Pause machst oder etwas anderes arbeitest –, entsteht eine Gap-Zeit (Lücke). Die zählt gegen deine Leistung. Darum: Bei einer Pause oder einer anderen Tätigkeit immer Pause bzw. Nebenzeit buchen, damit es im System erfasst ist.",
          hu: "A rendszer a teljesítményedet (Leistung) a szkenneres rögzítéseid közötti időből méri. Ha nem rögzítesz semmit – mert pl. vársz, szünetet tartasz vagy más munkát végzel –, Gap-Zeit (üres idő, rés) keletkezik. Ez rontja a Leistungodat. Ezért: ha szünet vagy más munkafolyamat van, mindig csekkold be a Pause-t, illetve a Nebenzeit-et, hogy rögzüljön a rendszerben.",
          en: "The system measures your Leistung (performance) by the time between your bookings on the scanner. If you book nothing – e.g. because you're waiting, on a break or doing other work – a Gap-Zeit (gap) is created. It counts against your Leistung. So: for a break or any other task, always book Pause or Nebenzeit so it is recorded in the system.",
        },
        terms: ["nebenzeit", "gap-zeit", "leistung"],
      },
      {
        title: {
          de: "Feierabend: Gehen, dann abmelden",
          hu: "Műszak vége: Gehen, aztán kijelentkezés",
          en: "End of shift: Gehen, then log out",
        },
        text: {
          de: "Zum Schichtende buchst du in der Zeiterfassung „Gehen“. Erst danach meldest du dich am Scanner ab – ohne Login kann der Scanner nichts mehr buchen.",
          hu: "Műszak végén a Zeiterfassung menüben becsekkolod a „Gehen”-t. Csak ezután jelentkezz ki a szkennerről – bejelentkezés nélkül a szkenner már nem tud rögzíteni.",
          en: "At the end of the shift you book “Gehen” in Zeiterfassung. Only then log out of the scanner – without a login the scanner can't book anything.",
        },
        terms: ["gehen", "abmelden"],
      },
    ],
    exercises: [
      {
        type: "order",
        question: {
          de: "Ein Arbeitstag: Bring die Schritte in die richtige Reihenfolge.",
          hu: "Egy munkanap: állítsd a lépéseket helyes sorrendbe.",
          en: "A working day: put the steps in the right order.",
        },
        items: [
          {
            de: "Mit deinen Daten am Scanner einloggen",
            hu: "Bejelentkezés a szkennerre az adataiddal",
            en: "Log in on the scanner with your details",
          },
          {
            de: "Zeiterfassung → Kommen",
            hu: "Zeiterfassung → Kommen",
            en: "Zeiterfassung → Kommen",
          },
          { de: "Kommissionieren", hu: "Komissiózás", en: "Picking" },
          {
            de: "Zeiterfassung → Pause (der Scanner meldet dich ab)",
            hu: "Zeiterfassung → Pause (a szkenner kiléptet)",
            en: "Zeiterfassung → Pause (the scanner logs you out)",
          },
          {
            de: "Nach der Pause wieder einloggen",
            hu: "Szünet után újra bejelentkezés (einloggen)",
            en: "Log in again after the break",
          },
          {
            de: "Zeiterfassung → Komm Pause",
            hu: "Zeiterfassung → Komm Pause",
            en: "Zeiterfassung → Komm Pause",
          },
          { de: "Zeiterfassung → Gehen", hu: "Zeiterfassung → Gehen", en: "Zeiterfassung → Gehen" },
          { de: "Abmelden", hu: "Kijelentkezés (abmelden)", en: "Log out (abmelden)" },
        ],
        explanation: {
          de: "Einloggen → Zeiterfassung → Kommen → kommissionieren. Pause: Zeiterfassung → Pause, der Scanner meldet dich ab. Zurück: wieder einloggen → Zeiterfassung → Komm Pause. Bei der Mittagspause genauso. Am Ende Zeiterfassung → Gehen, dann abmelden.",
          hu: "Bejelentkezés → Zeiterfassung → Kommen → komissiózás. Szünet: Zeiterfassung → Pause, a szkenner kiléptet. Vissza: újra einloggen → Zeiterfassung → Komm Pause. Ebédszünetnél ugyanígy. A végén Zeiterfassung → Gehen, aztán abmelden.",
          en: "Log in → Zeiterfassung → Kommen → picking. Break: Zeiterfassung → Pause, the scanner logs you out. Back: log in again → Zeiterfassung → Komm Pause. Same for lunch. At the end Zeiterfassung → Gehen, then log out.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Du kommst aus der Pause zurück. Der Scanner hat dich abgemeldet. Was machst du?",
          hu: "Visszajössz a szünetről. A szkenner kiléptetett. Mit csinálsz?",
          en: "You're back from your break. The scanner has logged you out. What do you do?",
        },
        options: [
          {
            de: "Wieder einloggen und gleich weiter kommissionieren.",
            hu: "Újra bejelentkezem, és rögtön folytatom a komissiózást.",
            en: "Log in again and carry on picking straight away.",
          },
          {
            de: "Wieder einloggen, dann Zeiterfassung → Komm Pause.",
            hu: "Újra bejelentkezem, aztán Zeiterfassung → Komm Pause.",
            en: "Log in again, then Zeiterfassung → Komm Pause.",
          },
          {
            de: "Wieder einloggen, dann Zeiterfassung → Kommen.",
            hu: "Újra bejelentkezem, aztán Zeiterfassung → Kommen.",
            en: "Log in again, then Zeiterfassung → Kommen.",
          },
        ],
        answer: 1,
        explanation: {
          de: "Nach der Pause loggst du dich wieder ein und buchst „Komm Pause“ – erst dann geht es weiter. Ohne „Komm Pause“ läuft deine Pause im System weiter. „Kommen“ buchst du nur einmal, am Schichtbeginn.",
          hu: "Szünet után újra bejelentkezel, és a „Komm Pause”-t csekkolod – csak utána folytatod a munkát. „Komm Pause” nélkül a rendszerben tovább megy a szüneted. A „Kommen”-t csak egyszer, a műszak elején csekkolod.",
          en: "After the break you log in again and book “Komm Pause” – only then do you carry on. Without “Komm Pause” your break keeps running in the system. You book “Kommen” only once, at the start of the shift.",
        },
      },
      {
        type: "classify",
        question: {
          de: "Pause oder Nebenzeit?",
          hu: "Pause vagy Nebenzeit?",
          en: "Pause or Nebenzeit?",
        },
        categories: [
          { de: "Zeiterfassung → Pause", hu: "Zeiterfassung → Pause", en: "Zeiterfassung → Pause" },
          { de: "Nebenzeiterfassung", hu: "Nebenzeiterfassung", en: "Nebenzeiterfassung" },
        ],
        items: [
          {
            text: { de: "Mittagspause", hu: "Ebédszünet", en: "Lunch break" },
            category: 0,
          },
          {
            text: { de: "Kleine Pause", hu: "Kis szünet", en: "Short break" },
            category: 0,
          },
          {
            text: {
              de: "Du machst Reinigung im Gang.",
              hu: "Takarítasz (Reinigung) a sorban.",
              en: "You do Reinigung (cleaning) in the aisle.",
            },
            category: 1,
          },
          {
            text: {
              de: "Du arbeitest an der Wickelmaschine.",
              hu: "A Wickelmaschine-nál dolgozol.",
              en: "You work at the Wickelmaschine.",
            },
            category: 1,
          },
          {
            text: {
              de: "Du bist in einer Besprechung.",
              hu: "Megbeszélésen (Besprechung) vagy.",
              en: "You're in a Besprechung (meeting).",
            },
            category: 1,
          },
        ],
        explanation: {
          de: "Pausen buchst du in der Zeiterfassung („Pause“, zurück mit „Komm Pause“). Arbeit ohne Kommissionieren buchst du im Menü „Nebenzeiterfassung“ mit der passenden Art: Wickelmaschine, Reinigung oder Besprechung.",
          hu: "A szüneteket a Zeiterfassung menüben csekkolod („Pause”, visszatéréskor „Komm Pause”). A komissiózáson kívüli munkát a „Nebenzeiterfassung” menüben, a megfelelő típussal: Wickelmaschine, Reinigung vagy Besprechung.",
          en: "Breaks are booked in Zeiterfassung (“Pause”, back with “Komm Pause”). Work other than picking is booked in the “Nebenzeiterfassung” menu with the right type: Wickelmaschine, Reinigung or Besprechung.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Du sollst 20 Minuten an der Wickelmaschine arbeiten. Wie buchst du das?",
          hu: "20 percig a Wickelmaschine-nál kell dolgoznod. Hogyan csekkolod?",
          en: "You're asked to work at the Wickelmaschine for 20 minutes. How do you book it?",
        },
        options: [
          {
            de: "Zeiterfassung → Pause",
            hu: "Zeiterfassung → Pause",
            en: "Zeiterfassung → Pause",
          },
          {
            de: "Gar nicht – ich gehe einfach hin.",
            hu: "Sehogy – egyszerűen odamegyek.",
            en: "Not at all – I just go there.",
          },
          {
            de: "Menü „Nebenzeiterfassung“ → Art „Wickelmaschine“",
            hu: "„Nebenzeiterfassung” menü → „Wickelmaschine” típus",
            en: "“Nebenzeiterfassung” menu → type “Wickelmaschine”",
          },
        ],
        answer: 2,
        explanation: {
          de: "Arbeit ohne Kommissionieren ist Nebenzeit: im Menü „Nebenzeiterfassung“ die Art wählen. Ohne Buchung entsteht Gap-Zeit, und die senkt deine Leistung.",
          hu: "A komissiózáson kívüli munka Nebenzeit: a „Nebenzeiterfassung” menüben kiválasztod a típust. Csekkolás nélkül Gap-Zeit keletkezik, ami rontja a Leistungodat.",
          en: "Work other than picking is Nebenzeit: choose the type in the “Nebenzeiterfassung” menu. Without a booking, Gap-Zeit is created, which lowers your Leistung.",
        },
      },
    ],
  },
  {
    slug: "pickauftrag",
    draft: true,
    area: "kommissionierung",
    minutes: 7,
    title: {
      de: "Ein Pickauftrag Schritt für Schritt",
      hu: "Egy kiszedési megbízás lépésről lépésre",
      en: "A pick order step by step",
    },
    summary: {
      de: "Der komplette Ablauf: vom Starten des Auftrags bis zum Abschluss.",
      hu: "A teljes folyamat: a megbízás indításától a lezárásig.",
      en: "The whole process: from starting the order to finishing it.",
    },
    steps: [
      {
        title: { de: "Auftrag starten", hu: "Megbízás indítása", en: "Start the order" },
        text: {
          de: "Wähle am Scanner „Kommissionierung“. Du bekommst einen Auftrag zugewiesen. Oben siehst du die Auftragsnummer und „Pos. 1/12“ – also die erste von zwölf Positionen.",
          hu: "Válaszd a szkenneren a „Kommissionierung” menüt. Kapsz egy megbízást. Felül látod a megbízás számát és a „Pos. 1/12” jelzést – vagyis a tizenkét tételből az elsőt.",
          en: "Choose “Kommissionierung” on the scanner. You get an order assigned. At the top you see the order number and “Pos. 1/12” – the first of twelve lines.",
        },
        terms: ["auftrag", "pos"],
      },
      {
        title: {
          de: "Ziel-Ladeeinheit scannen",
          hu: "Cél rakodási egység beolvasása",
          en: "Scan the target load unit",
        },
        text: {
          de: "Nimm eine leere Palette oder einen Behälter und scanne das Etikett. Darauf sammelst du die Ware für diesen Auftrag.",
          hu: "Vegyél egy üres raklapot vagy ládát, és olvasd be a címkéjét. Erre gyűjtöd az áruját ennek a megbízásnak.",
          en: "Take an empty pallet or container and scan its label. You collect the goods for this order on it.",
        },
        terms: ["le"],
      },
      {
        title: { de: "Zum Lagerplatz gehen", hu: "Menj a tárhelyhez", en: "Go to the location" },
        text: {
          de: "Der Scanner zeigt den Lagerplatz, z. B. 502 62 30. Geh hin und scanne das Platzetikett. So prüft das System, dass du am richtigen Platz bist.",
          hu: "A szkenner mutatja a tárhelyet, pl. 502 62 30. Menj oda, és olvasd be a hely címkéjét. Így ellenőrzi a rendszer, hogy jó helyen vagy.",
          en: "The scanner shows the location, e.g. 502 62 30. Go there and scan the location label. This lets the system check you are at the right place.",
        },
        terms: ["lp"],
      },
      {
        title: {
          de: "Artikel scannen und zählen",
          hu: "Cikk beolvasása és számolása",
          en: "Scan and count the item",
        },
        text: {
          de: "Scanne den Artikel, nimm die Soll-Menge und gib die Ist-Menge ein. Achte auf das MHD, falls es abgefragt wird. Mit ENT bestätigen.",
          hu: "Olvasd be a cikket, vedd ki az előírt (Soll) mennyiséget, és írd be a tényleges (Ist) mennyiséget. Figyelj az MHD-ra, ha rákérdez. ENT-tel erősítsd meg.",
          en: "Scan the item, take the target quantity and enter the actual quantity. Check the best-before date if asked. Confirm with ENT.",
        },
        terms: ["soll-ist", "mhd"],
      },
      {
        title: {
          de: "Nächste Position & Abschluss",
          hu: "Következő tétel és lezárás",
          en: "Next line & finishing",
        },
        text: {
          de: "Der Scanner springt zur nächsten Position. Nach der letzten Position bringst du die Palette zum angezeigten Ziel (z. B. WA-Zone) und schließt den Auftrag ab.",
          hu: "A szkenner a következő tételre ugrik. Az utolsó tétel után vidd a raklapot a kijelzett helyre (pl. WA-zóna), és zárd le a megbízást.",
          en: "The scanner moves to the next line. After the last line, bring the pallet to the shown destination (e.g. WA zone) and finish the order.",
        },
        terms: ["wa"],
      },
    ],
    exercises: [
      {
        type: "order",
        question: {
          de: "Bring die Schritte in die richtige Reihenfolge.",
          hu: "Állítsd a lépéseket helyes sorrendbe.",
          en: "Put the steps in the right order.",
        },
        items: [
          { de: "Auftrag starten", hu: "Megbízás indítása", en: "Start the order" },
          { de: "Ziel-LE scannen", hu: "Cél-LE beolvasása", en: "Scan target load unit" },
          { de: "Lagerplatz scannen", hu: "Tárhely beolvasása", en: "Scan the location" },
          { de: "Artikel scannen", hu: "Cikk beolvasása", en: "Scan the item" },
          {
            de: "Ist-Menge eingeben",
            hu: "Tényleges mennyiség beírása",
            en: "Enter actual quantity",
          },
        ],
        explanation: {
          de: "Erst Auftrag und Ziel, dann Platz → Artikel → Menge. Der Platz-Scan beweist, dass du am richtigen Ort bist.",
          hu: "Előbb a megbízás és a cél, aztán hely → cikk → mennyiség. A hely beolvasása igazolja, hogy jó helyen vagy.",
          en: "First the order and target, then location → item → quantity. Scanning the location proves you're in the right place.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Auf dem Display steht „Pos. 4/9“. Was heißt das?",
          hu: "A kijelzőn ez áll: „Pos. 4/9”. Mit jelent?",
          en: "The display shows “Pos. 4/9”. What does it mean?",
        },
        options: [
          {
            de: "4 Stück von 9 sind gepickt.",
            hu: "9 darabból 4 van kiszedve.",
            en: "4 of 9 pieces are picked.",
          },
          {
            de: "Du bist bei der 4. von 9 Positionen.",
            hu: "A 9 tételből a 4.-nél tartasz.",
            en: "You are at line 4 of 9.",
          },
          {
            de: "Gang 4, Regal 9.",
            hu: "4-es sor, 9-es állvány.",
            en: "Aisle 4, rack 9.",
          },
        ],
        answer: 1,
        explanation: {
          de: "Pos. = Position, also eine Zeile im Auftrag. Die Stückzahl steht bei Soll/Ist.",
          hu: "Pos. = tétel, vagyis egy sor a megbízásban. A darabszám a Soll/Ist-nél látszik.",
          en: "Pos. = line of the order. The piece count is shown at Soll/Ist.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Soll: 6 Stk. – du hast 6 genommen. Was gibst du bei „Ist“ ein?",
          hu: "Soll: 6 db – 6-ot vettél ki. Mit írsz be az „Ist”-hez?",
          en: "Soll: 6 pcs – you took 6. What do you enter at “Ist”?",
        },
        options: [
          { de: "0", hu: "0", en: "0" },
          { de: "6", hu: "6", en: "6" },
          { de: "Nichts, nur ENT", hu: "Semmit, csak ENT", en: "Nothing, just ENT" },
        ],
        answer: 1,
        explanation: {
          de: "Ist = tatsächlich genommene Menge. Bei 6 genommenen Stück also 6.",
          hu: "Ist = a ténylegesen kivett mennyiség. 6 kivett darabnál tehát 6.",
          en: "Ist = the quantity actually taken. So with 6 pieces taken: 6.",
        },
      },
    ],
  },
  {
    slug: "lagerplatz",
    area: "kommissionierung",
    minutes: 5,
    title: {
      de: "Den Lagerplatz lesen: Gang, Fachnummer, Fach",
      hu: "Hogyan olvasd a tárhelyszámot?",
      en: "Reading the location: aisle, number, compartment",
    },
    summary: {
      de: "Was 502 62 30 bedeutet, auf welcher Seite der Platz ist und wie Kleinfächer gezählt werden.",
      hu: "Mit jelent az 502 62 30, a sor melyik oldalán van a hely, és hogyan számozzák a kisfakkokat.",
      en: "What 502 62 30 means, which side the location is on and how small compartments are numbered.",
    },
    steps: [
      {
        title: { de: "Die Lagerplatz-Nummer", hu: "A tárhelyszám", en: "The location number" },
        text: {
          de: "Ein Lagerplatz sieht bei uns so aus: 502 62 30. Die erste Zahl ist der Gang (502), die zweite die Fachnummer (62), die dritte das Fach (30). Jede Fachnummer hat drei Fächer: 10, 20 und 30.",
          hu: "Nálunk egy tárhely így néz ki: 502 62 30. Az első szám a sor (Gang, 502), a második a fakkszám (62), a harmadik a fakk (30). Egy fakkszámon belül három fakk van: 10, 20 és 30.",
          en: "A location looks like this here: 502 62 30. The first number is the aisle (502), the second the compartment number (62), the third the compartment (30). Each compartment number has three compartments: 10, 20 and 30.",
        },
        terms: ["lp", "komm-platz"],
      },
      {
        title: {
          de: "Linke oder rechte Seite?",
          hu: "Bal vagy jobb oldal?",
          en: "Left or right side?",
        },
        text: {
          de: "An der Fachnummer siehst du sofort die Seite im Gang: Ungerade Fachnummern (01, 17, 63 …) sind auf der linken Seite, gerade (02, 18, 62 …) auf der rechten Seite. 502 62 30 ist also rechts.",
          hu: "A fakkszámból rögtön látod, a sor melyik oldalán van: a páratlan fakkszámok (01, 17, 63 …) bal kéz felől, a párosak (02, 18, 62 …) jobb kéz felől vannak. Az 502 62 30 tehát jobb oldalt van.",
          en: "The compartment number tells you the side of the aisle: odd numbers (01, 17, 63 …) are on the left, even ones (02, 18, 62 …) on the right. So 502 62 30 is on the right.",
        },
        terms: ["lp"],
      },
      {
        title: {
          de: "Kleinfächer mit Ebenen",
          hu: "Emeletes kisfakkok",
          en: "Small compartments with levels",
        },
        text: {
          de: "In manchen Gängen gibt es Kleinfächer auf mehreren Ebenen. Dort zeigt die letzte Zahl die Ebene: 502 62 10 ist die unterste Ebene (Boden), 11 die Ebene darüber, 12 die nächste und 13 meistens die oberste.",
          hu: "Vannak sorok, ahol emeletes kisfakkok vannak. Ott az utolsó szám a szintet mutatja: az 502 62 10 az alsó szint (földszint), a 11 a földszint feletti, a 12 afölötti, a 13 pedig általában a legfelső.",
          en: "Some aisles have small compartments on several levels. There the last number shows the level: 502 62 10 is the bottom level (floor), 11 the level above, 12 the next and 13 usually the top.",
        },
        terms: ["lp"],
      },
    ],
    exercises: [
      {
        type: "choice",
        question: {
          de: "Lagerplatz 503 17 20: In welchem Gang ist er?",
          hu: "503 17 20 tárhely: melyik sorban van?",
          en: "Location 503 17 20: which aisle is it in?",
        },
        options: [
          { de: "Gang 503", hu: "503-as sor", en: "Aisle 503" },
          { de: "Gang 17", hu: "17-es sor", en: "Aisle 17" },
          { de: "Gang 20", hu: "20-as sor", en: "Aisle 20" },
        ],
        answer: 0,
        explanation: {
          de: "Die erste Zahl ist der Gang: 503. Dann Fachnummer 17 und Fach 20.",
          hu: "Az első szám a sor: 503. Utána a 17-es fakkszám és a 20-as fakk.",
          en: "The first number is the aisle: 503. Then compartment number 17 and compartment 20.",
        },
      },
      {
        type: "classify",
        question: {
          de: "Auf welcher Seite im Gang ist der Lagerplatz?",
          hu: "A sor melyik oldalán van a tárhely?",
          en: "Which side of the aisle is the location on?",
        },
        categories: [
          { de: "Links", hu: "Bal kéz felől", en: "Left" },
          { de: "Rechts", hu: "Jobb kéz felől", en: "Right" },
        ],
        items: [
          { text: { de: "502 62 30", hu: "502 62 30", en: "502 62 30" }, category: 1 },
          { text: { de: "502 01 10", hu: "502 01 10", en: "502 01 10" }, category: 0 },
          { text: { de: "503 17 20", hu: "503 17 20", en: "503 17 20" }, category: 0 },
          { text: { de: "504 44 30", hu: "504 44 30", en: "504 44 30" }, category: 1 },
        ],
        explanation: {
          de: "Es zählt die mittlere Zahl, die Fachnummer: ungerade = links, gerade = rechts.",
          hu: "A középső szám, a fakkszám számít: páratlan = bal kéz, páros = jobb kéz felől.",
          en: "What counts is the middle number, the compartment number: odd = left, even = right.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Gang mit Kleinfächern: Wo findest du 502 62 12?",
          hu: "Kisfakkos sor: hol találod az 502 62 12-t?",
          en: "Aisle with small compartments: where is 502 62 12?",
        },
        options: [
          {
            de: "Unten auf dem Boden",
            hu: "Lent, a földszinten",
            en: "At the bottom, on the floor",
          },
          {
            de: "Zwei Ebenen über dem Boden",
            hu: "Két szinttel a földszint felett",
            en: "Two levels above the floor",
          },
          {
            de: "Ganz oben",
            hu: "Legfelül",
            en: "At the very top",
          },
        ],
        answer: 1,
        explanation: {
          de: "10 = Boden, 11 = eine Ebene darüber, 12 = zwei Ebenen darüber, 13 = meist ganz oben.",
          hu: "10 = földszint, 11 = egy szinttel feljebb, 12 = két szinttel feljebb, 13 = általában a legfelső.",
          en: "10 = floor, 11 = one level up, 12 = two levels up, 13 = usually the top.",
        },
      },
    ],
  },
  {
    slug: "karton-oeffnen",
    area: "kommissionierung",
    minutes: 9,
    title: {
      de: "Karton öffnen oder nicht? GVE, EVE & Faktor",
      hu: "Bontós vagy nem bontós? GVE, EVE és faktor",
      en: "Open the carton or not? GVE, EVE & factor",
    },
    summary: {
      de: "Was 1 GVE und 1 GVE(6) bedeuten, wo die Stückzahl steht und was du vor dem Öffnen prüfst.",
      hu: "Mit jelent az 1 GVE és az 1 GVE(6), hol látod a darabszámot, és mit ellenőrizz bontás előtt.",
      en: "What 1 GVE and 1 GVE(6) mean, where the quantity is printed and what to check before opening.",
    },
    steps: [
      {
        title: {
          de: "Überkarton, GVE und EVE",
          hu: "Überkarton, GVE és EVE",
          en: "Outer carton, GVE and EVE",
        },
        text: {
          de: "Wir arbeiten mit GVE (Großverpackungseinheiten). Der äußere Karton heißt Exportkarton oder Überkarton – darin stecken die GVE. In einer GVE können wiederum mehrere EVE (Einzelverpackungseinheiten), also einzelne Produkte, sein. Wenn wir einen Karton öffnen („bontani“), ist das der Überkarton: Wir nehmen die GVE heraus.",
          hu: "Mi GVE-vel (Großverpackungseinheit) dolgozunk. A külső doboz neve Exportkarton vagy Überkarton – ebben vannak a GVE-k. Egy GVE-ben pedig több EVE (Einzelverpackungseinheit), vagyis több darab termék is lehet. Amikor bontunk, az az Überkarton: kinyitjuk, és kivesszük belőle a GVE-ket.",
          en: "We work with GVE (Großverpackungseinheiten). The outer carton is called Exportkarton or Überkarton – the GVE are inside it. A GVE in turn can contain several EVE (Einzelverpackungseinheiten), i.e. single products. When we open a carton, it's the Überkarton: we take the GVE out.",
        },
        terms: ["ueberkarton", "gve", "eve"],
      },
      {
        title: {
          de: "„1 GVE“ – meist ein einzelnes Stück",
          hu: "„1 GVE” – általában egy darab",
          en: "“1 GVE” – usually a single piece",
        },
        text: {
          de: "Zeigt der Scanner beim Kommissionieren z. B. „1 GVE“ ohne Klammer, ist das Produkt meist ein einzelnes Stück – z. B. ein Staubsauger, ein Küchengerät oder ein Spielzeug. Die GVE selbst wird nicht geöffnet.",
          hu: "Ha a szkenner komissiózáskor pl. „1 GVE”-t ír zárójel nélkül, az általában azt jelenti, hogy a termék egy darab – pl. porszívó, konyhai eszköz vagy játék. Magát a GVE-t nem bontod meg.",
          en: "If the scanner shows e.g. “1 GVE” without brackets while picking, the product is usually a single piece – e.g. a vacuum cleaner, a kitchen appliance or a toy. The GVE itself is not opened.",
        },
        terms: ["gve"],
      },
      {
        title: {
          de: "„1 GVE(6)“ – der Faktor",
          hu: "„1 GVE(6)” – a faktor",
          en: "“1 GVE(6)” – the factor",
        },
        text: {
          de: "Steht nach GVE eine Zahl in Klammern, heißt das Faktor. Er zeigt, wie viele EVE in einer GVE sind. „1 GVE(6)“ bedeutet: In einem Karton sind 6 Produkte. Manchmal steckt so eine GVE zusätzlich noch in einem Überkarton oder Exportkarton.",
          hu: "Ha a GVE után zárójelben egy szám áll, azt faktornak hívjuk. Azt mutatja, hány EVE van egy GVE-ben. Az „1 GVE(6)” azt jelenti: egy kartonban 6 termék van. Néha egy ilyen GVE még egy Überkartonban vagy Exportkartonban is benne van.",
          en: "A number in brackets after GVE is called the factor. It shows how many EVE are in one GVE. “1 GVE(6)” means: one carton holds 6 products. Sometimes such a GVE is additionally packed in an Überkarton or Exportkarton.",
        },
        terms: ["faktor", "eve", "ueberkarton"],
      },
      {
        title: {
          de: "Hinweis „ACHTUNG AUSPACK!“",
          hu: "„ACHTUNG AUSPACK!” felirat",
          en: "Label “ACHTUNG AUSPACK!”",
        },
        text: {
          de: "Manchmal steht auf dem Karton „ACHTUNG AUSPACK!“ oder es klebt ein solches Etikett drauf. Das heißt: Das ist ein Überkarton, der geöffnet werden muss – du nimmst die GVE darin einzeln heraus. Aber Achtung: Nicht jeder Überkarton, den man öffnen muss, hat diesen Hinweis. Verlass dich deshalb nicht nur darauf, sondern prüfe auch Faktor und Stückzahl.",
          hu: "Néha a dobozra rá van írva vagy ragasztva: „ACHTUNG AUSPACK!”. Ez azt jelenti: ez egy Überkarton, amit meg kell bontani – a benne lévő GVE-ket egyenként veszed ki. De figyelj: nem minden bontós Überkartonon van ilyen jelzés. Ezért ne csak erre hagyatkozz, a faktort és a darabszámot is ellenőrizd.",
          en: "Sometimes a carton has “ACHTUNG AUSPACK!” written or stuck on it. It means: this is an Überkarton that must be opened – you take the GVE inside out one by one. But note: not every Überkarton that has to be opened carries this label. So don't rely on it alone – also check the factor and the quantity.",
        },
        terms: ["auspack", "ueberkarton", "faktor"],
      },
      {
        title: {
          de: "Stückzahl auf dem Karton prüfen",
          hu: "Ellenőrizd a darabszámot a kartonon",
          en: "Check the quantity on the carton",
        },
        text: {
          de: "Auf den Kartons steht meistens, wie viele Stück drin sind – so kannst du dich leicht selbst kontrollieren. Achte auf: Qty / Quantity, Stck / Stück, Pcs / Pieces oder Menge.",
          hu: "A dobozokon általában rá van írva, hány darab van benne – így könnyen ellenőrizheted magad. Ezeket a jelöléseket keresd: Qty / Quantity, Stck / Stück, Pcs / Pieces vagy Menge.",
          en: "Cartons usually show how many pieces are inside – an easy way to check yourself. Look for: Qty / Quantity, Stck / Stück, Pcs / Pieces or Menge.",
        },
        terms: ["qty", "stk", "pcs", "menge"],
      },
      {
        title: {
          de: "Ausnahmen: kein Faktor, trotzdem mehrere Stück",
          hu: "Kivételek: nincs faktor, mégis több darab",
          en: "Exceptions: no factor, but several pieces",
        },
        text: {
          de: "Manchmal steht nach der Menge kein Faktor, und trotzdem sind mehrere Produkte in der Verpackung. Dann prüfst du den Artikelnamen und suchst nach: Set, tlg. (-teilig), 2er / 3er / 6er Pack oder Display.",
          hu: "Előfordul, hogy a mennyiség után nincs faktor, mégis több termék van a csomagolásban. Ilyenkor ellenőrizd az artikel (cikk) nevét, és ezeket keresd benne: Set, tlg. (-teilig, „részes”), 2er / 3er / 6er Pack vagy Display.",
          en: "Sometimes there's no factor after the quantity, yet there are several products in the package. Then check the article name and look for: Set, tlg. (-teilig, “-piece”), 2er / 3er / 6er Pack or Display.",
        },
        terms: ["set", "tlg", "er-pack", "display"],
      },
      {
        title: {
          de: "Bevor du einen Karton öffnest",
          hu: "Mielőtt megbontasz egy dobozt",
          en: "Before you open a carton",
        },
        text: {
          de: "Vergewissere dich, dass du am richtigen Komm-Platz bist. Manchmal wurde der Barcode eines Artikels geändert oder es sind mehrere Barcodes drauf – dann prüfe immer alle Barcodes. Geht keiner, vergleiche die Stückzahl auf dem Karton mit dem, was du brauchst, und prüfe auch den Artikelnamen. In welcher Reihenfolge du das kontrollierst, ist egal – wichtig ist nur: Erst prüfen, dann öffnen.",
          hu: "Győződj meg róla, hogy a megfelelő Komm-Platzon (kiszedőhelyen) vagy. Néha egy áru vonalkódját átdolgozták, vagy több barcode is van rajta – ilyenkor mindig ellenőrizd az összes barcode-ot. Ha egyik sem megy, ellenőrizd, hogy a kartonon lévő darabszám egyezik-e azzal, amire szükséged van, és a termék nevét is ellenőrizd. Hogy milyen sorrendben ellenőrzöl, az mindegy – a lényeg: előbb ellenőrizz, csak utána bonts.",
          en: "Make sure you're at the right Komm-Platz (pick location). Sometimes an item's barcode was changed or there are several barcodes on it – then always try all of them. If none works, compare the quantity on the carton with what you need and check the article name too. The order of these checks doesn't matter – what matters: check first, then open.",
        },
        terms: ["komm-platz", "ean"],
      },
    ],
    exercises: [
      {
        type: "choice",
        question: {
          de: "Der Scanner zeigt „1 GVE(6)“. Wie viele Produkte sind in einem Karton?",
          hu: "A szkenner ezt írja: „1 GVE(6)”. Hány termék van egy kartonban?",
          en: "The scanner shows “1 GVE(6)”. How many products are in one carton?",
        },
        options: [
          { de: "1", hu: "1", en: "1" },
          { de: "6", hu: "6", en: "6" },
          { de: "7", hu: "7", en: "7" },
        ],
        answer: 1,
        explanation: {
          de: "Die Zahl in Klammern ist der Faktor: 6 EVE pro GVE.",
          hu: "A zárójeles szám a faktor: GVE-nként 6 EVE.",
          en: "The number in brackets is the factor: 6 EVE per GVE.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Auf dem Karton klebt „ACHTUNG AUSPACK!“. Was bedeutet das?",
          hu: "A kartonon „ACHTUNG AUSPACK!” címke van. Mit jelent?",
          en: "The carton has an “ACHTUNG AUSPACK!” label. What does it mean?",
        },
        options: [
          {
            de: "Den Karton nicht öffnen.",
            hu: "A kartont nem szabad megbontani.",
            en: "Don't open the carton.",
          },
          {
            de: "Den Überkarton öffnen und die GVE einzeln herausnehmen.",
            hu: "Az Überkartont meg kell bontani, és a GVE-ket egyenként kell kivenni.",
            en: "Open the Überkarton and take the GVE out one by one.",
          },
          {
            de: "Der Karton ist beschädigt.",
            hu: "A karton sérült.",
            en: "The carton is damaged.",
          },
        ],
        answer: 1,
        explanation: {
          de: "„Auspacken“ = auspacken, öffnen. Aber: Nicht jeder Überkarton, der geöffnet werden muss, hat diesen Hinweis.",
          hu: "„Auspacken” = kicsomagolni, megbontani. De: nem minden bontós Überkartonon van ilyen jelzés.",
          en: "“Auspacken” = unpack, open. But: not every Überkarton that must be opened has this label.",
        },
      },
      {
        type: "classify",
        question: {
          de: "Einzelnes Stück oder mehrere in der Verpackung?",
          hu: "Egy darab vagy több darab van a csomagolásban?",
          en: "A single piece or several in the package?",
        },
        categories: [
          { de: "Ein Stück", hu: "Egy darab", en: "One piece" },
          { de: "Mehrere Stück", hu: "Több darab", en: "Several pieces" },
        ],
        items: [
          {
            text: {
              de: "1 GVE – Staubsauger",
              hu: "1 GVE – porszívó",
              en: "1 GVE – vacuum cleaner",
            },
            category: 0,
          },
          { text: { de: "1 GVE(4)", hu: "1 GVE(4)", en: "1 GVE(4)" }, category: 1 },
          {
            text: {
              de: "1 GVE – „Topfset 5-tlg.“",
              hu: "1 GVE – „Topfset 5-tlg.” (5 részes edénykészlet)",
              en: "1 GVE – “Topfset 5-tlg.” (5-piece pot set)",
            },
            category: 1,
          },
          {
            text: {
              de: "1 GVE – Wasserkocher",
              hu: "1 GVE – vízforraló",
              en: "1 GVE – kettle",
            },
            category: 0,
          },
          {
            text: {
              de: "1 GVE – „Gläser 6er Pack“",
              hu: "1 GVE – „Gläser 6er Pack” (6 darabos pohárcsomag)",
              en: "1 GVE – “Gläser 6er Pack” (pack of 6 glasses)",
            },
            category: 1,
          },
        ],
        explanation: {
          de: "Ohne Faktor ist es meist ein Stück – außer der Artikelname sagt etwas anderes (Set, tlg., 6er Pack, Display).",
          hu: "Faktor nélkül általában egy darab – kivéve, ha a cikk neve mást mond (Set, tlg., 6er Pack, Display).",
          en: "Without a factor it's usually one piece – unless the article name says otherwise (Set, tlg., 6er Pack, Display).",
        },
      },
      {
        type: "choice",
        question: {
          de: "Auf dem Karton steht „Qty: 12“. Was heißt das?",
          hu: "A kartonon ez áll: „Qty: 12”. Mit jelent?",
          en: "The carton says “Qty: 12”. What does it mean?",
        },
        options: [
          {
            de: "Im Karton sind 12 Stück.",
            hu: "A kartonban 12 darab van.",
            en: "There are 12 pieces in the carton.",
          },
          {
            de: "Der Karton wiegt 12 kg.",
            hu: "A karton 12 kg.",
            en: "The carton weighs 12 kg.",
          },
          {
            de: "Es ist Lagerplatz 12.",
            hu: "Ez a 12-es tárhely.",
            en: "It's location 12.",
          },
        ],
        answer: 0,
        explanation: {
          de: "Qty (Quantity), Stck (Stück), Pcs (Pieces) und Menge zeigen die Stückzahl.",
          hu: "A Qty (Quantity), Stck (Stück), Pcs (Pieces) és Menge a darabszámot jelöli.",
          en: "Qty (Quantity), Stck (Stück), Pcs (Pieces) and Menge show the number of pieces.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Du hast den Barcode gescannt, aber es funktioniert nicht. Was machst du?",
          hu: "Beszkennelted a barcode-ot, de nem működik. Mit csinálsz?",
          en: "You scanned the barcode, but it doesn't work. What do you do?",
        },
        options: [
          {
            de: "Ich öffne den Karton.",
            hu: "Kibontom a dobozt.",
            en: "I open the carton.",
          },
          {
            de: "Ich prüfe, ob ich am richtigen Komm-Platz bin, probiere die anderen Barcodes und vergleiche Stückzahl und Artikelnamen.",
            hu: "Megnézem, jó Komm-Platzon vagyok-e, kipróbálom a többi barcode-ot, és összevetem a darabszámot meg a termék nevét.",
            en: "I check that I'm at the right Komm-Platz, try the other barcodes and compare the quantity and article name.",
          },
        ],
        answer: 1,
        explanation: {
          de: "Nicht gleich öffnen! Erst prüfen: Komm-Platz, alle Barcodes, Stückzahl und Name – in welcher Reihenfolge, ist egal.",
          hu: "Ne bontsd ki rögtön! Előbb ellenőrizz: Komm-Platz, az összes barcode, darabszám és név – hogy milyen sorrendben, az mindegy.",
          en: "Don't open it straight away! Check first: Komm-Platz, all barcodes, quantity and name – the order doesn't matter.",
        },
      },
    ],
  },
  {
    slug: "fehlmenge-schaden",
    draft: true,
    area: "kommissionierung",
    minutes: 6,
    title: {
      de: "Fehlmenge, Schaden, gesperrter Platz",
      hu: "Hiány, sérülés, zárolt hely",
      en: "Shortage, damage, blocked location",
    },
    summary: {
      de: "Richtig reagieren, wenn am Platz etwas nicht stimmt.",
      hu: "Helyes reagálás, ha a tárhelyen valami nem stimmel.",
      en: "Reacting correctly when something is wrong at the location.",
    },
    steps: [
      {
        title: {
          de: "Zu wenig Ware: Fehlmenge",
          hu: "Kevés áru: hiány",
          en: "Not enough stock: shortage",
        },
        text: {
          de: "Liegt weniger am Platz als die Soll-Menge, nimm was da ist und gib die echte Ist-Menge ein. Der Scanner fragt „Fehlmenge melden?“ – das bestätigst du nur, wenn wirklich nichts mehr da ist (auch hinten im Fach schauen!).",
          hu: "Ha kevesebb van a helyen, mint az előírt mennyiség, vedd ki, ami van, és írd be a valós mennyiséget. A szkenner megkérdezi: „Fehlmenge melden?” – ezt csak akkor erősítsd meg, ha tényleg nincs több (a rekesz hátulját is nézd meg!).",
          en: "If there's less at the location than required, take what is there and enter the real quantity. The scanner asks “Fehlmenge melden?” – only confirm if there's really nothing left (check the back of the bin too!).",
        },
        terms: ["fehlmenge", "nachschub"],
      },
      {
        title: { de: "Beschädigte Ware", hu: "Sérült áru", en: "Damaged goods" },
        text: {
          de: "Kaputte, nasse oder aufgerissene Ware nicht verschicken. Leg sie zur Seite, melde sie (meist über eine F-Taste oder beim Vorgesetzten) und nimm, wenn möglich, einwandfreie Ware.",
          hu: "A törött, nedves vagy szakadt árut ne küldd ki. Tedd félre, jelentsd (általában egy F-gombbal vagy a vezetőnél), és ha lehet, vegyél hibátlan árut.",
          en: "Don't ship broken, wet or torn goods. Put them aside, report them (usually via an F key or to your supervisor) and take undamaged goods if possible.",
        },
        terms: ["bruch"],
      },
      {
        title: { de: "Gesperrter Platz", hu: "Zárolt hely", en: "Blocked location" },
        text: {
          de: "Meldet der Scanner „Platz gesperrt“, nimm dort nichts weg – auch wenn Ware da ist. Gesperrt heißt z. B. Inventur oder Qualitätsprüfung. Frag deinen Vorgesetzten.",
          hu: "Ha a szkenner azt írja: „Platz gesperrt”, ne vegyél el onnan semmit – akkor sem, ha van ott áru. A zárolás oka lehet pl. leltár vagy minőségellenőrzés. Kérdezd a vezetőt.",
          en: "If the scanner says “Platz gesperrt”, take nothing from there – even if goods are present. Blocked means e.g. stocktaking or quality check. Ask your supervisor.",
        },
        terms: ["gesperrt", "qs", "inventur"],
      },
    ],
    exercises: [
      {
        type: "choice",
        question: {
          de: "Soll: 10 Stk. Am Platz liegen nur 7. Was gibst du bei „Ist“ ein?",
          hu: "Soll: 10 db. A helyen csak 7 van. Mit írsz be az „Ist”-hez?",
          en: "Soll: 10 pcs. Only 7 are at the location. What do you enter at “Ist”?",
        },
        options: [
          { de: "10", hu: "10", en: "10" },
          { de: "7", hu: "7", en: "7" },
          { de: "0", hu: "0", en: "0" },
        ],
        answer: 1,
        explanation: {
          de: "Immer die echte Menge eingeben: 7. Danach die Fehlmenge melden, damit Nachschub kommt.",
          hu: "Mindig a valós mennyiséget írd be: 7. Utána jelentsd a hiányt, hogy jöjjön utántöltés.",
          en: "Always enter the real quantity: 7. Then report the shortage so replenishment is triggered.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Ein Karton ist nass und eingedrückt. Was machst du?",
          hu: "Egy karton nedves és be van nyomódva. Mit teszel?",
          en: "A carton is wet and crushed. What do you do?",
        },
        options: [
          {
            de: "Trotzdem einpacken, der Kunde merkt es nicht.",
            hu: "Mégis berakom, a vevő úgysem veszi észre.",
            en: "Pack it anyway, the customer won't notice.",
          },
          {
            de: "Zur Seite legen, melden und einwandfreie Ware nehmen.",
            hu: "Félreteszem, jelentem, és hibátlan árut veszek.",
            en: "Put it aside, report it and take undamaged goods.",
          },
        ],
        answer: 1,
        explanation: {
          de: "Beschädigte Ware wird nie verschickt, sondern gemeldet.",
          hu: "Sérült árut soha nem küldünk ki, hanem jelentjük.",
          en: "Damaged goods are never shipped – they are reported.",
        },
      },
      {
        type: "order",
        question: {
          de: "Fehlmenge: Bring die Schritte in die richtige Reihenfolge.",
          hu: "Hiány: állítsd a lépéseket helyes sorrendbe.",
          en: "Shortage: put the steps in the right order.",
        },
        items: [
          {
            de: "Platz gründlich kontrollieren",
            hu: "A helyet alaposan átnézni",
            en: "Check the location thoroughly",
          },
          {
            de: "Vorhandene Ware nehmen",
            hu: "A meglévő árut kivenni",
            en: "Take the available goods",
          },
          {
            de: "Echte Ist-Menge eingeben",
            hu: "A valós mennyiséget beírni",
            en: "Enter the real quantity",
          },
          {
            de: "Fehlmenge bestätigen",
            hu: "A hiányt megerősíteni",
            en: "Confirm the shortage",
          },
        ],
        explanation: {
          de: "Erst schauen, ob wirklich nichts mehr da ist – dann nehmen, zählen, eingeben und erst zum Schluss die Fehlmenge bestätigen.",
          hu: "Előbb nézd meg, tényleg nincs-e több – aztán vedd ki, számold meg, írd be, és csak a végén erősítsd meg a hiányt.",
          en: "First check whether there's really nothing left – then take, count, enter, and only at the end confirm the shortage.",
        },
      },
    ],
  },
];

/** The published lessons – drafts are left out. */
export const LESSONS = ALL_LESSONS.filter((lesson) => !lesson.draft);

export function getArea(id: string) {
  return AREAS.find((area) => area.id === id);
}

/** The chapters of an area, in order. */
export function lessonsInArea(area: AreaId) {
  return LESSONS.filter((lesson) => lesson.area === area);
}

/** A lesson by its URL params, only if it really belongs to that area. */
export function getLesson(area: string, slug: string) {
  return LESSONS.find((lesson) => lesson.area === area && lesson.slug === slug);
}

export function lessonPath(lesson: Lesson) {
  return `/lektionen/${lesson.area}/${lesson.slug}`;
}
