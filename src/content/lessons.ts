// Lektionen: interaktive Lerneinheiten, nach Themen gruppiert.
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
// Neue Lektion: unten an LESSONS anhängen, `slug` wird Teil der URL.

import type { Localized } from "./types";

export type TopicId = "scanner" | "kommissionierung" | "etiketten" | "sonderfaelle";

export type Topic = {
  id: TopicId;
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
  topic: TopicId;
  title: Localized;
  summary: Localized;
  minutes: number;
  steps: LessonStep[];
  exercises: Exercise[];
};

export const TOPICS: Topic[] = [
  {
    id: "scanner",
    title: { de: "Der Scanner", hu: "A szkenner", en: "The scanner" },
    description: {
      de: "Anmelden, Tasten und richtig scannen.",
      hu: "Bejelentkezés, gombok és helyes beolvasás.",
      en: "Logging in, keys and scanning correctly.",
    },
  },
  {
    id: "kommissionierung",
    title: { de: "Kommissionieren", hu: "Komissiózás", en: "Order picking" },
    description: {
      de: "Vom Auftrag bis zur fertigen Palette.",
      hu: "A megbízástól a kész raklapig.",
      en: "From the order to the finished pallet.",
    },
  },
  {
    id: "etiketten",
    title: { de: "Etiketten & Nummern", hu: "Címkék és számok", en: "Labels & numbers" },
    description: {
      de: "Lagerplätze, Barcodes und Etiketten lesen.",
      hu: "Tárhelyek, vonalkódok és címkék olvasása.",
      en: "Reading locations, barcodes and labels.",
    },
  },
  {
    id: "sonderfaelle",
    title: {
      de: "Fehler & Sonderfälle",
      hu: "Hibák és különleges esetek",
      en: "Errors & special cases",
    },
    description: {
      de: "Was tun, wenn etwas nicht passt?",
      hu: "Mit tegyél, ha valami nem stimmel?",
      en: "What to do when something doesn't fit?",
    },
  },
];

export const LESSONS: Lesson[] = [
  {
    slug: "scanner-grundlagen",
    topic: "scanner",
    minutes: 8,
    title: {
      de: "Scanner-Grundlagen",
      hu: "Szkenner alapok",
      en: "Scanner basics",
    },
    summary: {
      de: "Anmelden, die wichtigsten Tasten, sicher scannen und Zeit buchen.",
      hu: "Bejelentkezés, a legfontosabb gombok, biztos beolvasás és időrögzítés.",
      en: "Logging in, the most important keys, scanning reliably and booking time.",
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
      {
        title: {
          de: "Zeit buchen: Kommen, Pause, Nebenzeit, Gehen",
          hu: "Időrögzítés: Kommen, Pause, Nebenzeit, Gehen",
          en: "Booking time: Kommen, Pause, Nebenzeit, Gehen",
        },
        text: {
          de: "Die Arbeitszeit buchst du am Scanner. Zuerst einloggen, dann im Menü „Zeiterfassung“ auf „Kommen“ – erst dann zählt deine Arbeitszeit. Im Lauf der Schicht buchst du dort auch „Pause“ (Anfang und Ende jeder Pause) und „Nebenzeit“, wenn du gerade nicht kommissionierst (z. B. Reinigung, Besprechung). Zum Feierabend: Zeiterfassung → „Gehen“, danach am Scanner abmelden.",
          hu: "A munkaidődet a szkenneren rögzíted. Először bejelentkezel, aztán a „Zeiterfassung” menüben a „Kommen” – csak ezután számít a munkaidőd. A műszak alatt ugyanitt rögzíted a „Pause”-t (minden szünet elején és végén) és a „Nebenzeit”-et, ha épp nincs komissiózás (pl. Reinigung – takarítás, Besprechung – megbeszélés). Munka végén: Zeiterfassung → „Gehen”, utána kijelentkezés a szkennerről.",
          en: "You book your working time on the scanner. First log in, then choose “Kommen” in the “Zeiterfassung” menu – only then does your working time count. During the shift you also book “Pause” there (start and end of every break) and “Nebenzeit” when you are not picking (e.g. Reinigung – cleaning, Besprechung – meeting). At the end: Zeiterfassung → “Gehen”, then log out of the scanner.",
        },
        terms: [
          "einloggen",
          "zeiterfassung",
          "kommen",
          "pause",
          "nebenzeit",
          "reinigung",
          "besprechung",
          "gehen",
          "abmelden",
        ],
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
    ],
  },
  {
    slug: "pickauftrag",
    topic: "kommissionierung",
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
    topic: "kommissionierung",
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
    topic: "kommissionierung",
    minutes: 6,
    title: {
      de: "Karton öffnen oder nicht? Anbruch & ganze VE",
      hu: "Bontós vagy nem bontós? Bontott és egész karton",
      en: "Open the carton or not? Broken & full cases",
    },
    summary: {
      de: "Wann du einen Karton anbrichst – und wann er zu bleiben muss.",
      hu: "Mikor kell megbontani egy kartont – és mikor kell zárva maradnia.",
      en: "When to break open a carton – and when it must stay closed.",
    },
    steps: [
      {
        title: {
          de: "Ganze VE und Anbruch",
          hu: "Egész karton és bontott karton",
          en: "Full case and broken case",
        },
        text: {
          de: "Viele Artikel liegen in Kartons mit fester Stückzahl – der Verpackungseinheit (VE), z. B. 6 Stück pro Karton. Ein geschlossener Karton ist eine ganze VE. Ein geöffneter Karton, aus dem einzelne Stücke genommen werden, heißt Anbruch.",
          hu: "Sok cikk fix darabszámú kartonban van – ez a csomagolási egység (VE), pl. kartonként 6 darab. A zárt karton egy egész VE (nem bontós). A kinyitott karton, amiből egyenként veszünk ki darabokat, az Anbruch (bontott, „bontós” karton).",
          en: "Many items come in cartons with a fixed quantity – the packaging unit (VE), e.g. 6 pieces per carton. A closed carton is a full case. An opened carton you take single pieces from is called Anbruch (broken case).",
        },
        terms: ["ve", "anbruch"],
      },
      {
        title: {
          de: "Erst rechnen, dann öffnen",
          hu: "Előbb számolj, aztán bonts",
          en: "Calculate first, then open",
        },
        text: {
          de: "Teile die Soll-Menge durch die VE. Ganze Kartons nimmst du geschlossen. Nur der Rest kommt aus einem geöffneten Karton. Beispiel: Soll 14 Stk., VE 6 → 2 ganze Kartons (12) + 2 Stück aus dem Anbruch.",
          hu: "Oszd el az előírt mennyiséget a VE-vel. Az egész kartonokat bontatlanul viszed. Csak a maradék jön megbontott kartonból. Példa: Soll 14 db, VE 6 → 2 egész karton (12) + 2 darab bontott kartonból.",
          en: "Divide the target quantity by the VE. Take full cartons closed. Only the remainder comes from an opened carton. Example: Soll 14 pcs, VE 6 → 2 full cartons (12) + 2 pieces from the broken case.",
        },
        terms: ["soll-ist", "stk"],
      },
      {
        title: { de: "Anbruch zuerst", hu: "Először a bontottból", en: "Broken case first" },
        text: {
          de: "Steht am Platz schon ein geöffneter Karton, nimm die Einzelstücke zuerst daraus. Öffne keinen neuen Karton, solange im Anbruch noch genug ist – sonst stehen bald überall halbvolle Kartons.",
          hu: "Ha a helyen már van megbontott karton, a darabokat először abból vedd ki. Ne bonts meg új kartont, amíg a bontottban van elég – különben hamar mindenhol félig üres kartonok lesznek.",
          en: "If there's already an opened carton at the location, take single pieces from it first. Don't open a new carton while the broken one still has enough – otherwise half-empty cartons pile up everywhere.",
        },
      },
      {
        title: { de: "Nicht anbrechen!", hu: "Nem bontós!", en: "Do not break!" },
        text: {
          de: "Manche Artikel dürfen nur als ganze VE raus, z. B. wenn der Scanner „Nur ganze VE“ zeigt, bei Originalverschluss oder Siegel, oder bei Gefahrgut. Diese Kartons nie öffnen. Passt die Soll-Menge nicht zur VE, frag deinen Vorgesetzten.",
          hu: "Bizonyos cikkek csak egész VE-ként mehetnek ki, pl. ha a szkenner azt írja: „Nur ganze VE”, ha gyári zárás vagy plomba van rajta, vagy veszélyes árunál. Ezeket a kartonokat soha ne bontsd meg. Ha az előírt mennyiség nem jön ki egész kartonokban, kérdezd a vezetőt.",
          en: "Some items may only leave as full cases, e.g. when the scanner shows “Nur ganze VE”, with an original seal, or with dangerous goods. Never open these cartons. If the target quantity doesn't fit the VE, ask your supervisor.",
        },
      },
      {
        title: { de: "Sauber anbrechen", hu: "Rendes bontás", en: "Opening cleanly" },
        text: {
          de: "Öffne den Karton oben vorsichtig, ohne mit dem Messer tief hineinzuschneiden. Lass die restliche Ware ordentlich im Karton und stell ihn mit der offenen Seite nach vorn zurück – so sieht der Nächste sofort, dass es ein Anbruch ist.",
          hu: "A kartont felül óvatosan nyisd ki, ne vágj mélyen bele a késsel. A maradék árut hagyd rendesen a kartonban, és a nyitott oldalával előre tedd vissza – így a következő ember rögtön látja, hogy ez bontott karton.",
          en: "Open the carton carefully at the top without cutting deep with the knife. Leave the remaining goods neatly in the carton and put it back with the open side facing forward – so the next person sees right away it's a broken case.",
        },
        terms: ["bruch"],
      },
    ],
    exercises: [
      {
        type: "classify",
        question: {
          de: "Musst du einen neuen Karton öffnen?",
          hu: "Meg kell bontanod egy új kartont?",
          en: "Do you need to open a new carton?",
        },
        categories: [
          { de: "Ja, öffnen", hu: "Igen, bontós", en: "Yes, open it" },
          { de: "Nein, zu lassen", hu: "Nem, nem bontós", en: "No, keep closed" },
        ],
        items: [
          {
            text: {
              de: "Soll 12 Stk., VE 6, kein Anbruch am Platz",
              hu: "Soll 12 db, VE 6, nincs bontott karton a helyen",
              en: "Soll 12 pcs, VE 6, no broken case at the location",
            },
            category: 1,
          },
          {
            text: {
              de: "Soll 4 Stk., VE 6, kein Anbruch am Platz",
              hu: "Soll 4 db, VE 6, nincs bontott karton a helyen",
              en: "Soll 4 pcs, VE 6, no broken case at the location",
            },
            category: 0,
          },
          {
            text: {
              de: "Soll 3 Stk., im Anbruch liegen noch 5 Stk.",
              hu: "Soll 3 db, a bontott kartonban még 5 db van",
              en: "Soll 3 pcs, the broken case still has 5 pcs",
            },
            category: 1,
          },
          {
            text: {
              de: "Soll 9 Stk., VE 6, kein Anbruch am Platz",
              hu: "Soll 9 db, VE 6, nincs bontott karton a helyen",
              en: "Soll 9 pcs, VE 6, no broken case at the location",
            },
            category: 0,
          },
          {
            text: {
              de: "Soll 2 Krt.",
              hu: "Soll 2 karton (Krt.)",
              en: "Soll 2 cartons (Krt.)",
            },
            category: 1,
          },
          {
            text: {
              de: "Scanner zeigt „Nur ganze VE“, Soll 6 Stk., VE 6",
              hu: "A szkenner kiírja: „Nur ganze VE”, Soll 6 db, VE 6",
              en: "Scanner shows “Nur ganze VE”, Soll 6 pcs, VE 6",
            },
            category: 1,
          },
        ],
        explanation: {
          de: "Öffnen nur, wenn ein Rest übrig bleibt, der nicht aus einem vorhandenen Anbruch kommen kann. Volle Kartons, Mengen in Krt. und „Nur ganze VE“ bleiben zu.",
          hu: "Csak akkor bonts, ha marad egy maradék, ami nem jöhet egy már bontott kartonból. Az egész kartonok, a kartonban (Krt.) megadott mennyiség és a „Nur ganze VE” zárva marad.",
          en: "Only open when there's a remainder that can't come from an existing broken case. Full cartons, quantities in Krt. and “Nur ganze VE” stay closed.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Soll 14 Stk., VE 6, kein Anbruch. Was nimmst du?",
          hu: "Soll 14 db, VE 6, nincs bontott karton. Mit veszel?",
          en: "Soll 14 pcs, VE 6, no broken case. What do you take?",
        },
        options: [
          {
            de: "3 Kartons öffnen und 14 Stück einzeln nehmen",
            hu: "3 kartont megbontok, és 14 darabot egyenként veszek",
            en: "Open 3 cartons and take 14 single pieces",
          },
          {
            de: "2 ganze Kartons + 2 Stück aus einem geöffneten Karton",
            hu: "2 egész kartont + 2 darabot egy megbontott kartonból",
            en: "2 full cartons + 2 pieces from an opened carton",
          },
          {
            de: "3 ganze Kartons",
            hu: "3 egész kartont",
            en: "3 full cartons",
          },
        ],
        answer: 1,
        explanation: {
          de: "14 ÷ 6 = 2 Rest 2. Die 2 ganzen Kartons bleiben zu, nur für die 2 Reststücke wird ein Karton geöffnet. 3 Kartons wären 18 Stück – zu viel.",
          hu: "14 ÷ 6 = 2, maradék 2. A 2 egész karton zárva marad, csak a 2 maradék darabhoz bontasz meg egy kartont. 3 karton 18 darab lenne – túl sok.",
          en: "14 ÷ 6 = 2 remainder 2. The 2 full cartons stay closed; only the 2 remaining pieces need an opened carton. 3 cartons would be 18 pieces – too many.",
        },
      },
      {
        type: "choice",
        question: {
          de: "Der Scanner zeigt „Nur ganze VE“, Soll 4 Stk., VE 6. Was tust du?",
          hu: "A szkenner kiírja: „Nur ganze VE”, Soll 4 db, VE 6. Mit teszel?",
          en: "The scanner shows “Nur ganze VE”, Soll 4 pcs, VE 6. What do you do?",
        },
        options: [
          {
            de: "Karton öffnen und 4 Stück nehmen",
            hu: "Megbontom a kartont, és kiveszek 4 darabot",
            en: "Open the carton and take 4 pieces",
          },
          {
            de: "Einen ganzen Karton (6 Stk.) nehmen",
            hu: "Egy egész kartont viszek (6 db)",
            en: "Take a full carton (6 pcs)",
          },
          {
            de: "Nicht öffnen und den Vorgesetzten fragen",
            hu: "Nem bontom meg, és megkérdezem a vezetőt",
            en: "Don't open it and ask the supervisor",
          },
        ],
        answer: 2,
        explanation: {
          de: "Bei „Nur ganze VE“ wird nie geöffnet. Mehr als bestellt darf aber auch nicht raus – das muss jemand klären.",
          hu: "„Nur ganze VE” esetén soha nem bontunk. De a rendeltnél többet sem szabad kiadni – ezt valakinek tisztáznia kell.",
          en: "With “Nur ganze VE” you never open. But you also can't ship more than ordered – someone has to sort it out.",
        },
      },
    ],
  },
  {
    slug: "etiketten-lesen",
    topic: "etiketten",
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
    slug: "fehlmenge-schaden",
    topic: "sonderfaelle",
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

export function getLesson(slug: string) {
  return LESSONS.find((lesson) => lesson.slug === slug);
}

export function lessonsByTopic(topic: TopicId) {
  return LESSONS.filter((lesson) => lesson.topic === topic);
}
