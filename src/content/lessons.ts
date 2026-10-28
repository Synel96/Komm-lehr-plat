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
// URL: /lektionen/<area>/<slug>.

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
      de: "Vom Pickauftrag bis zu Fehlmenge und Anbruch.",
      hu: "A kiszedési megbízástól a hiányig és a bontott kartonig.",
      en: "From the pick order to shortages and broken cases.",
    },
  },
];

export const LESSONS: Lesson[] = [
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
          de: "ENT bestätigt und geht weiter. ESC geht einen Schritt zurück. CLR löscht deine Eingabe. Die F-Tasten haben Sonderfunktionen – welche, steht meist unten im Display.",
          hu: "Az ENT megerősít és továbblép. Az ESC egy lépést visszalép. A CLR törli a bevitelt. Az F-gomboknak különleges funkcióik vannak – hogy melyiknek mi, az általában a kijelző alján látszik.",
          en: "ENT confirms and continues. ESC goes back one step. CLR clears your input. The F keys have special functions – usually shown at the bottom of the display.",
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
          de: "Auf vielen Kartons sind mehrere Barcodes. Der Scanner sagt dir, was er erwartet (z. B. „Lagerplatz scannen“ oder „Artikel scannen“). Lies die Anzeige, bevor du scannst.",
          hu: "Sok kartonon több vonalkód is van. A szkenner kiírja, mit vár (pl. „Lagerplatz scannen” vagy „Artikel scannen”). Olvasd el a kijelzőt, mielőtt beolvasol.",
          en: "Many cartons carry several barcodes. The scanner tells you what it expects (e.g. “Lagerplatz scannen” or “Artikel scannen”). Read the display before you scan.",
        },
        terms: ["ean", "lp"],
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
          { de: "CLR", hu: "CLR", en: "CLR" },
        ],
        answer: 1,
        explanation: {
          de: "ENT (Enter) bestätigt. ESC geht zurück, CLR löscht.",
          hu: "Az ENT (Enter) erősít meg. Az ESC visszalép, a CLR töröl.",
          en: "ENT (Enter) confirms. ESC goes back, CLR clears.",
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
          de: "Am Anfang und am Ende jeder Pause buchst du in der Zeiterfassung „Pause“. Die Pausenzeit ist keine Arbeitszeit und zählt nicht in deine Leistung.",
          hu: "Minden szünet elején és végén a Zeiterfassung menüben csekkolod a „Pause”-t. A szünet nem munkaidő, és nem számít bele a Leistungodba.",
          en: "At the start and end of every break you book “Pause” in Zeiterfassung. Break time is not working time and doesn't count towards your Leistung.",
        },
        terms: ["pause"],
      },
      {
        title: {
          de: "Nebenzeit: wenn du nicht kommissionierst",
          hu: "Nebenzeit: amikor épp nincs komissiózás",
          en: "Nebenzeit: when you're not picking",
        },
        text: {
          de: "Arbeitest du gerade an etwas anderem als Kommissionieren – z. B. Reinigung, Besprechung oder Schulung –, buchst du im eingeloggten Zustand „Nebenzeit“. Ist die Tätigkeit vorbei, geht es mit dem Kommissionieren weiter.",
          hu: "Ha épp nem komissiózol, hanem mást dolgozol – pl. Reinigung (takarítás), Besprechung (megbeszélés) vagy oktatás –, bejelentkezett állapotban becsekkolod a „Nebenzeit”-et. Ha vége, folytatod a komissiózást.",
          en: "If you're doing something other than picking – e.g. Reinigung (cleaning), Besprechung (meeting) or training – book “Nebenzeit” while logged in. When it's done, you continue picking.",
        },
        terms: ["nebenzeit", "reinigung", "besprechung"],
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
          de: "Ein Arbeitstag: Bring die Buchungen in die richtige Reihenfolge.",
          hu: "Egy munkanap: állítsd a rögzítéseket helyes sorrendbe.",
          en: "A working day: put the bookings in the right order.",
        },
        items: [
          {
            de: "Am Scanner einloggen",
            hu: "Bejelentkezés a szkennerre",
            en: "Log in on the scanner",
          },
          {
            de: "Menü „Zeiterfassung“ öffnen",
            hu: "A „Zeiterfassung” menü megnyitása",
            en: "Open the “Zeiterfassung” menu",
          },
          { de: "Kommen", hu: "Kommen (munkakezdés)", en: "Kommen (clock in)" },
          { de: "Pause", hu: "Pause (szünet)", en: "Pause (break)" },
          { de: "Gehen", hu: "Gehen (munka vége)", en: "Gehen (clock out)" },
          {
            de: "Am Scanner abmelden",
            hu: "Kijelentkezés a szkennerről",
            en: "Log out of the scanner",
          },
        ],
        explanation: {
          de: "Zuerst am Scanner einloggen, dann Zeiterfassung → Kommen. Am Ende Zeiterfassung → Gehen und erst danach abmelden – ohne Login kann der Scanner nichts buchen.",
          hu: "Először bejelentkezés a szkennerre, aztán Zeiterfassung → Kommen. A végén Zeiterfassung → Gehen, és csak utána kijelentkezés – bejelentkezés nélkül a szkenner nem tud rögzíteni.",
          en: "First log in on the scanner, then Zeiterfassung → Kommen. At the end Zeiterfassung → Gehen and only then log out – without a login the scanner can't book anything.",
        },
      },
      {
        type: "classify",
        question: {
          de: "Was buchst du?",
          hu: "Mit rögzítesz?",
          en: "What do you book?",
        },
        categories: [
          { de: "Pause", hu: "Pause", en: "Pause" },
          { de: "Nebenzeit", hu: "Nebenzeit", en: "Nebenzeit" },
        ],
        items: [
          {
            text: {
              de: "Du machst 30 Minuten Mittagspause.",
              hu: "30 perc ebédszünetet tartasz.",
              en: "You take a 30-minute lunch break.",
            },
            category: 0,
          },
          {
            text: {
              de: "Keine Kommissionierung – du machst Reinigung im Gang.",
              hu: "Nincs komissiózás – takarítasz (Reinigung) a sorban.",
              en: "No picking right now – you do Reinigung (cleaning) in the aisle.",
            },
            category: 1,
          },
          {
            text: {
              de: "Du bist 20 Minuten in einer Besprechung.",
              hu: "20 percig megbeszélésen (Besprechung) vagy.",
              en: "You're in a Besprechung (meeting) for 20 minutes.",
            },
            category: 1,
          },
          {
            text: {
              de: "Du machst eine kurze Raucher- oder Kaffeepause.",
              hu: "Rövid cigi- vagy kávészünetet tartasz.",
              en: "You take a short smoke or coffee break.",
            },
            category: 0,
          },
        ],
        explanation: {
          de: "Pause = du arbeitest nicht. Nebenzeit = du arbeitest, aber kommissionierst gerade nicht (Reinigung, Besprechung …) – im eingeloggten Zustand extra buchen.",
          hu: "Pause = nem dolgozol. Nebenzeit = dolgozol, csak épp nincs komissiózás (Reinigung, Besprechung stb.) – bejelentkezve külön kell csekkolni.",
          en: "Pause = you're not working. Nebenzeit = you are working but not picking (Reinigung, Besprechung …) – book it separately while logged in.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Du wartest 10 Minuten auf Nachschub und kannst nicht picken. Was machst du?",
          hu: "10 percet vársz utántöltésre, és nem tudsz kiszedni. Mit teszel?",
          en: "You wait 10 minutes for replenishment and can't pick. What do you do?",
        },
        options: [
          {
            de: "Nichts – ich warte einfach.",
            hu: "Semmit – egyszerűen várok.",
            en: "Nothing – I just wait.",
          },
          {
            de: "Nebenzeit buchen, damit keine Gap-Zeit entsteht.",
            hu: "Becsekkolom a Nebenzeit-et, hogy ne keletkezzen Gap-Zeit.",
            en: "Book Nebenzeit so no Gap-Zeit is created.",
          },
          {
            de: "Mich am Scanner abmelden.",
            hu: "Kijelentkezem a szkennerről.",
            en: "Log out of the scanner.",
          },
        ],
        answer: 1,
        explanation: {
          de: "Zeit ohne Buchung wird zur Gap-Zeit und senkt deine Leistung. Mit Nebenzeit ist die Wartezeit im System erfasst.",
          hu: "A rögzítés nélküli idő Gap-Zeit lesz, és rontja a Leistungodat. Nebenzeit-tel a várakozás rögzül a rendszerben.",
          en: "Time without a booking becomes Gap-Zeit and lowers your Leistung. With Nebenzeit the waiting time is recorded in the system.",
        },
      },
    ],
  },
  {
    slug: "etiketten-lesen",
    area: "scanner",
    minutes: 6,
    title: {
      de: "Etiketten und Nummern lesen",
      hu: "Címkék és számok olvasása",
      en: "Reading labels and numbers",
    },
    summary: {
      de: "Lagerplatz-Nummer, EAN, NVE, MHD und Charge erkennen.",
      hu: "Tárhelyszám, EAN, NVE, MHD és sarzs felismerése.",
      en: "Recognising location numbers, EAN, NVE, best-before date and batch.",
    },
    steps: [
      {
        title: { de: "Die Lagerplatz-Nummer", hu: "A tárhelyszám", en: "The location number" },
        text: {
          de: "12-04-02-B bedeutet meist: Gang 12, Regal 04, Ebene 02 (von unten gezählt), Fach B. So findest du jeden Platz, ohne zu suchen.",
          hu: "A 12-04-02-B általában ezt jelenti: 12-es sor, 04-es állvány, 02-es szint (alulról számolva), B rekesz. Így bármelyik helyet keresgélés nélkül megtalálod.",
          en: "12-04-02-B usually means: aisle 12, rack 04, level 02 (counted from the bottom), bin B. This way you find every location without searching.",
        },
        terms: ["lp"],
      },
      {
        title: { de: "EAN auf dem Produkt", hu: "EAN a terméken", en: "EAN on the product" },
        text: {
          de: "Der Strichcode auf dem Artikel selbst ist meist die EAN (13 Ziffern). Damit erkennt der Scanner, welcher Artikel es ist.",
          hu: "Magán a terméken lévő vonalkód általában az EAN (13 számjegy). Ebből ismeri fel a szkenner, melyik cikkről van szó.",
          en: "The barcode on the item itself is usually the EAN (13 digits). It tells the scanner which item it is.",
        },
        terms: ["ean", "art-nr"],
      },
      {
        title: { de: "NVE auf der Palette", hu: "NVE a raklapon", en: "NVE on the pallet" },
        text: {
          de: "Das große Versandetikett auf Paletten trägt die NVE (18 Ziffern). Sie gilt für die ganze Palette, nicht für einen einzelnen Artikel.",
          hu: "A raklapokon lévő nagy szállítási címkén van az NVE (18 számjegy). Az egész raklapra vonatkozik, nem egy-egy cikkre.",
          en: "The large shipping label on pallets carries the NVE (18 digits). It identifies the whole pallet, not a single item.",
        },
        terms: ["nve", "sscc"],
      },
      {
        title: { de: "MHD und Charge", hu: "MHD és sarzs", en: "Best-before date and batch" },
        text: {
          de: "Das MHD steht oft als „MHD“, „mind. haltbar bis“ oder als Datum neben einem Sanduhr-Symbol. Die Charge erkennst du an „Ch.-B.“, „LOT“ oder „Ch.-Nr.“.",
          hu: "Az MHD gyakran „MHD”, „mind. haltbar bis” felirattal vagy homokóra-jel melletti dátumként szerepel. A sarzsot a „Ch.-B.”, „LOT” vagy „Ch.-Nr.” jelölésről ismered fel.",
          en: "The best-before date often appears as “MHD”, “mind. haltbar bis” or a date next to an hourglass symbol. The batch is marked “Ch.-B.”, “LOT” or “Ch.-Nr.”.",
        },
        terms: ["mhd", "charge"],
      },
    ],
    exercises: [
      {
        type: "choice",
        question: {
          de: "Lagerplatz 07-15-03-A: In welchem Gang ist er?",
          hu: "07-15-03-A tárhely: melyik sorban van?",
          en: "Location 07-15-03-A: which aisle is it in?",
        },
        options: [
          { de: "Gang 07", hu: "07-es sor", en: "Aisle 07" },
          { de: "Gang 15", hu: "15-ös sor", en: "Aisle 15" },
          { de: "Gang 03", hu: "03-as sor", en: "Aisle 03" },
        ],
        answer: 0,
        explanation: {
          de: "Die erste Zahl ist der Gang: 07. Dann Regal 15, Ebene 03, Fach A.",
          hu: "Az első szám a sor: 07. Utána 15-ös állvány, 03-as szint, A rekesz.",
          en: "The first number is the aisle: 07. Then rack 15, level 03, bin A.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Welche Nummer kennzeichnet eine ganze Versand-Palette?",
          hu: "Melyik szám azonosít egy teljes szállítási raklapot?",
          en: "Which number identifies a whole shipping pallet?",
        },
        options: [
          { de: "EAN", hu: "EAN", en: "EAN" },
          { de: "NVE / SSCC", hu: "NVE / SSCC", en: "NVE / SSCC" },
          { de: "Charge", hu: "Sarzs (Charge)", en: "Batch" },
        ],
        answer: 1,
        explanation: {
          de: "Die NVE (international SSCC) gilt für die Versandeinheit. Die EAN gehört zum Artikel, die Charge zur Produktion.",
          hu: "Az NVE (nemzetközileg SSCC) a szállítási egységre vonatkozik. Az EAN a cikkhez, a sarzs a gyártáshoz tartozik.",
          en: "The NVE (SSCC) identifies the shipping unit. The EAN belongs to the item, the batch to production.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Auf einem Karton steht „LOT 24A117“. Was ist das?",
          hu: "Egy kartonon ez áll: „LOT 24A117”. Mi ez?",
          en: "A carton says “LOT 24A117”. What is it?",
        },
        options: [
          { de: "Die Charge", hu: "A sarzs (Charge)", en: "The batch" },
          { de: "Das MHD", hu: "Az MHD", en: "The best-before date" },
          { de: "Der Lagerplatz", hu: "A tárhely", en: "The location" },
        ],
        answer: 0,
        explanation: {
          de: "LOT ist die internationale Bezeichnung für Charge.",
          hu: "A LOT a sarzs (Charge) nemzetközi jelölése.",
          en: "LOT is the international term for batch.",
        },
      },
    ],
  },
  {
    slug: "pickauftrag",
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
          de: "Der Scanner zeigt den Lagerplatz, z. B. 12-04-02-B. Geh hin und scanne das Platzetikett. So prüft das System, dass du am richtigen Platz bist.",
          hu: "A szkenner mutatja a tárhelyet, pl. 12-04-02-B. Menj oda, és olvasd be a hely címkéjét. Így ellenőrzi a rendszer, hogy jó helyen vagy.",
          en: "The scanner shows the location, e.g. 12-04-02-B. Go there and scan the location label. This lets the system check you are at the right place.",
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
    slug: "fifo-fefo",
    area: "kommissionierung",
    minutes: 4,
    title: {
      de: "Welche Ware zuerst? FIFO & FEFO",
      hu: "Melyik áru menjen először? FIFO és FEFO",
      en: "Which goods first? FIFO & FEFO",
    },
    summary: {
      de: "Warum die Reihenfolge wichtig ist und wie das MHD dabei hilft.",
      hu: "Miért fontos a sorrend, és hogyan segít ebben az MHD.",
      en: "Why order matters and how the best-before date helps.",
    },
    steps: [
      {
        title: { de: "FIFO", hu: "FIFO", en: "FIFO" },
        text: {
          de: "First In – First Out: Was zuerst ins Lager kam, geht zuerst raus. So bleibt keine alte Ware hinten liegen.",
          hu: "First In – First Out: ami előbb jött be a raktárba, az megy ki előbb. Így nem marad hátul régi áru.",
          en: "First In – First Out: what came into the warehouse first goes out first. No old stock is left behind.",
        },
        terms: ["fifo"],
      },
      {
        title: { de: "FEFO", hu: "FEFO", en: "FEFO" },
        text: {
          de: "First Expired – First Out: Bei Ware mit Haltbarkeit zählt das MHD. Die Ware, die zuerst abläuft, geht zuerst raus – auch wenn sie später geliefert wurde.",
          hu: "First Expired – First Out: lejárati idős árunál az MHD számít. Ami előbb jár le, az megy ki előbb – akkor is, ha később érkezett.",
          en: "First Expired – First Out: for goods with a shelf life the best-before date counts. What expires first goes out first – even if it arrived later.",
        },
        terms: ["fefo", "mhd"],
      },
      {
        title: { de: "In der Praxis", hu: "A gyakorlatban", en: "In practice" },
        text: {
          de: "Meistens gibt dir der Scanner schon den richtigen Platz und das MHD vor. Stimmt das MHD auf der Ware nicht mit der Anzeige überein, nicht einfach eine andere Palette nehmen – erst nachfragen.",
          hu: "A szkenner általában már megadja a helyes tárhelyet és az MHD-t. Ha az árun lévő MHD nem egyezik a kijelzettel, ne vegyél csak úgy egy másik raklapról – előbb kérdezz.",
          en: "Usually the scanner already gives you the right location and best-before date. If the date on the goods doesn't match the display, don't just take another pallet – ask first.",
        },
      },
    ],
    exercises: [
      {
        type: "choice",
        question: {
          de: "Joghurt A: geliefert am 1.3., MHD 20.3. – Joghurt B: geliefert am 5.3., MHD 15.3. Welcher geht nach FEFO zuerst raus?",
          hu: "A joghurt: érkezett 3.1., MHD 3.20. – B joghurt: érkezett 3.5., MHD 3.15. FEFO szerint melyik megy ki előbb?",
          en: "Yoghurt A: delivered 1 Mar, best before 20 Mar – Yoghurt B: delivered 5 Mar, best before 15 Mar. Which goes out first under FEFO?",
        },
        options: [
          { de: "Joghurt A", hu: "A joghurt", en: "Yoghurt A" },
          { de: "Joghurt B", hu: "B joghurt", en: "Yoghurt B" },
        ],
        answer: 1,
        explanation: {
          de: "Bei FEFO zählt nur das MHD: B läuft am 15.3. ab, also zuerst B.",
          hu: "FEFO-nál csak az MHD számít: B 3.15-én lejár, tehát B megy előbb.",
          en: "FEFO only looks at the best-before date: B expires on 15 Mar, so B goes first.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Wofür steht FIFO?",
          hu: "Mit jelent a FIFO?",
          en: "What does FIFO stand for?",
        },
        options: [
          {
            de: "Was zuerst kommt, geht zuerst raus.",
            hu: "Ami előbb jön, az megy ki előbb.",
            en: "First in, first out.",
          },
          {
            de: "Was zuletzt kommt, geht zuerst raus.",
            hu: "Ami utoljára jön, az megy ki előbb.",
            en: "Last in, first out.",
          },
        ],
        answer: 0,
        explanation: {
          de: "First In – First Out.",
          hu: "First In – First Out: ami először be, az először ki.",
          en: "First In – First Out.",
        },
      },
    ],
  },
  {
    slug: "anbruch",
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
        title: { de: "GVE und EVE", hu: "GVE és EVE", en: "GVE and EVE" },
        text: {
          de: "Wir arbeiten mit GVE. Eine GVE (Großverpackungseinheit) ist der Karton bzw. die Verpackung, wie sie im Regal steht. In einer GVE können mehrere EVE (Einzelverpackungseinheiten) sein – also einzelne Produkte. Ein geöffneter Karton, aus dem einzelne Stücke genommen werden, heißt Anbruch.",
          hu: "Mi GVE-vel dolgozunk. A GVE (Großverpackungseinheit) a karton, illetve csomagolás, ahogy a polcon áll. Egy GVE-ben több EVE (Einzelverpackungseinheit), vagyis több darab termék is lehet. A megbontott kartont, amiből egyenként veszünk ki, Anbruch-nak (bontott kartonnak) hívjuk.",
          en: "We work with GVE. A GVE (Großverpackungseinheit, large packaging unit) is the carton or package as it stands on the shelf. A GVE can contain several EVE (Einzelverpackungseinheiten, single units) – i.e. single products. An opened carton you take single pieces from is called Anbruch.",
        },
        terms: ["gve", "eve", "anbruch"],
      },
      {
        title: {
          de: "„1 GVE“ – meist ein einzelnes Stück",
          hu: "„1 GVE” – általában egy darab",
          en: "“1 GVE” – usually a single piece",
        },
        text: {
          de: "Zeigt der Scanner beim Kommissionieren z. B. „1 GVE“ ohne Klammer, ist das Produkt meist ein einzelnes Stück – z. B. ein Staubsauger, ein Küchengerät oder ein Spielzeug. Du nimmst die ganze Verpackung, nichts wird geöffnet.",
          hu: "Ha a szkenner komissiózáskor pl. „1 GVE”-t ír zárójel nélkül, az általában azt jelenti, hogy a termék egy darab – pl. porszívó, konyhai eszköz vagy játék. Az egész csomagot viszed, nem bontasz semmit.",
          en: "If the scanner shows e.g. “1 GVE” without brackets while picking, the product is usually a single piece – e.g. a vacuum cleaner, a kitchen appliance or a toy. You take the whole package; nothing is opened.",
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
          de: "Steht nach GVE eine Zahl in Klammern, heißt das Faktor. Er zeigt, wie viele EVE in einer GVE sind. „1 GVE(6)“ bedeutet: In einem Karton sind 6 Produkte. Brauchst du weniger Stück, als im Karton sind, musst du den Karton öffnen (Anbruch).",
          hu: "Ha a GVE után zárójelben egy szám áll, azt faktornak hívjuk. Azt mutatja, hány EVE van egy GVE-ben. Az „1 GVE(6)” azt jelenti: egy kartonban 6 termék van. Ha kevesebb darab kell, mint amennyi a kartonban van, meg kell bontanod a kartont (Anbruch).",
          en: "A number in brackets after GVE is called the factor. It shows how many EVE are in one GVE. “1 GVE(6)” means: one carton holds 6 products. If you need fewer pieces than the carton holds, you have to open it (Anbruch).",
        },
        terms: ["faktor", "eve"],
      },
      {
        title: {
          de: "Hinweis „ACHTUNG AUSPACK!“",
          hu: "„ACHTUNG AUSPACK!” felirat",
          en: "Label “ACHTUNG AUSPACK!”",
        },
        text: {
          de: "Manchmal steht auf dem Karton „ACHTUNG AUSPACK!“ oder es klebt ein solches Etikett drauf. Das heißt: Dieser Karton muss geöffnet werden – die Produkte werden einzeln (als EVE) kommissioniert. Aber Achtung: Nicht jeder Karton, den man öffnen muss, hat diesen Hinweis. Verlass dich deshalb nicht nur darauf, sondern prüfe auch Faktor und Stückzahl.",
          hu: "Néha a dobozra rá van írva vagy ragasztva: „ACHTUNG AUSPACK!”. Ez azt jelenti: ezt a kartont meg kell bontani – a termékeket egyenként (EVE-ként) kell kiszedni. De figyelj: nem minden bontós kartonon van ilyen jelzés. Ezért ne csak erre hagyatkozz, a faktort és a darabszámot is ellenőrizd.",
          en: "Sometimes a carton has “ACHTUNG AUSPACK!” written or stuck on it. It means: this carton must be opened – the products are picked individually (as EVE). But note: not every carton that has to be opened carries this label. So don't rely on it alone – also check the factor and the quantity.",
        },
        terms: ["auspack", "anbruch", "faktor"],
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
          de: "Vergewissere dich, dass du am richtigen Komm-Platz bist. Manchmal wurde der Barcode eines Artikels geändert oder es sind mehrere Barcodes drauf – dann prüfe immer alle Barcodes. Geht keiner, vergleiche die Stückzahl auf dem Karton mit dem, was du brauchst, und prüfe auch den Artikelnamen.",
          hu: "Győződj meg róla, hogy a megfelelő Komm-Platzon (kiszedőhelyen) vagy. Néha egy áru vonalkódját átdolgozták, vagy több barcode is van rajta – ilyenkor mindig ellenőrizd az összes barcode-ot. Ha egyik sem megy, ellenőrizd, hogy a kartonon lévő darabszám egyezik-e azzal, amire szükséged van, és a termék nevét is ellenőrizd.",
          en: "Make sure you're at the right Komm-Platz (pick location). Sometimes an item's barcode was changed or there are several barcodes on it – then always try all of them. If none works, compare the quantity on the carton with what you need and check the article name too.",
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
            de: "Den Karton öffnen und die Produkte einzeln kommissionieren.",
            hu: "A kartont meg kell bontani, és a termékeket egyenként kell kiszedni.",
            en: "Open the carton and pick the products individually.",
          },
          {
            de: "Der Karton ist beschädigt.",
            hu: "A karton sérült.",
            en: "The carton is damaged.",
          },
        ],
        answer: 1,
        explanation: {
          de: "„Auspacken“ = auspacken, öffnen. Aber: Nicht jeder Karton, der geöffnet werden muss, hat diesen Hinweis.",
          hu: "„Auspacken” = kicsomagolni, megbontani. De: nem minden bontós kartonon van ilyen jelzés.",
          en: "“Auspacken” = unpack, open. But: not every carton that must be opened has this label.",
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
        type: "order",
        question: {
          de: "Der Barcode lässt sich nicht scannen. In welcher Reihenfolge prüfst du, bevor du öffnest?",
          hu: "A vonalkód nem olvasható be. Milyen sorrendben ellenőrzöl, mielőtt bontasz?",
          en: "The barcode won't scan. In which order do you check before opening?",
        },
        items: [
          {
            de: "Richtiger Komm-Platz?",
            hu: "Jó Komm-Platzon vagyok?",
            en: "Right Komm-Platz?",
          },
          {
            de: "Alle Barcodes auf dem Karton probieren",
            hu: "Az összes barcode kipróbálása a kartonon",
            en: "Try all barcodes on the carton",
          },
          {
            de: "Stückzahl auf dem Karton vergleichen",
            hu: "A kartonon lévő darabszám összevetése",
            en: "Compare the quantity on the carton",
          },
          {
            de: "Artikelnamen prüfen",
            hu: "A termék nevének ellenőrzése",
            en: "Check the article name",
          },
        ],
        explanation: {
          de: "Erst den Platz sicherstellen, dann alle Barcodes probieren. Geht keiner, helfen Stückzahl und Artikelname weiter.",
          hu: "Előbb a hely legyen biztos, aztán próbáld ki az összes barcode-ot. Ha egyik sem megy, a darabszám és a termék neve segít.",
          en: "First make sure of the location, then try all barcodes. If none works, the quantity and article name help.",
        },
      },
    ],
  },
  {
    slug: "fehlmenge-schaden",
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
