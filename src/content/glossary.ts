// Wörterbuch: Abkürzungen und Fachbegriffe aus dem Lager- und
// Kommissionieralltag. Neue Einträge einfach unten anhängen — die Liste
// wird auf der Seite automatisch alphabetisch sortiert.
//
// - term:        so, wie es auf dem Scanner / Papier steht
// - full:        ausgeschriebene Form (nur bei Abkürzungen)
// - explanation: kurze Erklärung in jeder Sprache
// - example:     optional, ein typisches Beispiel (bleibt auf Deutsch)
// - category:    Themengruppe, unter der der Eintrag angezeigt wird (siehe
//                GLOSSARY_CATEGORIES), z. B. "zeiterfassung"

import type { Localized } from "./types";

export type GlossaryKind = "abbr" | "word";

export type GlossaryCategory =
  | "scanner"
  | "zeiterfassung"
  | "auftrag"
  | "mengen"
  | "etiketten"
  | "lager"
  | "qualitaet";

/** The glossary's groups, in the order they are shown. */
export const GLOSSARY_CATEGORIES: { id: GlossaryCategory; label: Localized }[] = [
  {
    id: "scanner",
    label: { de: "Scanner & System", hu: "Szkenner és rendszer", en: "Scanner & system" },
  },
  {
    id: "zeiterfassung",
    label: { de: "Zeiterfassung", hu: "Időnyilvántartás", en: "Time tracking" },
  },
  {
    id: "auftrag",
    label: {
      de: "Auftrag & Kommissionierung",
      hu: "Megbízás és komissiózás",
      en: "Orders & picking",
    },
  },
  {
    id: "mengen",
    label: { de: "Menge & Verpackung", hu: "Mennyiség és csomagolás", en: "Quantity & packaging" },
  },
  {
    id: "etiketten",
    label: { de: "Etiketten & Nummern", hu: "Címkék és számok", en: "Labels & numbers" },
  },
  {
    id: "lager",
    label: { de: "Lager & Transport", hu: "Raktár és szállítás", en: "Warehouse & transport" },
  },
  {
    id: "qualitaet",
    label: {
      de: "Qualität & Sonderfälle",
      hu: "Minőség és különleges esetek",
      en: "Quality & special cases",
    },
  },
];

export type GlossaryEntry = {
  id: string;
  term: string;
  full?: string;
  kind: GlossaryKind;
  category: GlossaryCategory;
  explanation: Localized;
  example?: string;
};

export const GLOSSARY: GlossaryEntry[] = [
  {
    id: "gve",
    term: "GVE",
    full: "Großverpackungseinheit",
    kind: "abbr",
    category: "mengen",
    explanation: {
      de: "Die Packung, die kommissioniert wird. Mehrere GVE stecken oft in einem Export- bzw. Überkarton. Eine GVE kann ein einzelnes Produkt oder mehrere EVE enthalten. „1 GVE“ ohne Klammer ist meist ein einzelnes Stück.",
      hu: "A csomag, amit kiszedünk. Több GVE gyakran egy Export-, illetve Überkartonban van. Egy GVE-ben lehet egy termék vagy több EVE. Az „1 GVE” zárójel nélkül általában egy darab.",
      en: "The package that is picked. Several GVE often sit in one Export- or Überkarton. A GVE may hold one product or several EVE. “1 GVE” without brackets is usually a single piece.",
    },
    example: "1 GVE(6)",
  },
  {
    id: "eve",
    term: "EVE",
    full: "Einzelverpackungseinheit",
    kind: "abbr",
    category: "mengen",
    explanation: {
      de: "Ein einzelnes Produkt in der GVE. Wie viele EVE in einer GVE sind, zeigt der Faktor.",
      hu: "Egy darab termék a GVE-n belül. Hogy hány EVE van egy GVE-ben, azt a faktor mutatja.",
      en: "A single product inside the GVE. The factor shows how many EVE are in one GVE.",
    },
  },
  {
    id: "faktor",
    term: "Faktor",
    kind: "word",
    category: "mengen",
    explanation: {
      de: "Die Zahl in Klammern nach GVE am Scanner: so viele EVE sind in einer GVE. „1 GVE(6)“ = 6 Produkte in einem Karton.",
      hu: "A szkenneren a GVE utáni zárójeles szám: ennyi EVE van egy GVE-ben. „1 GVE(6)” = 6 termék egy kartonban.",
      en: "The number in brackets after GVE on the scanner: that many EVE are in one GVE. “1 GVE(6)” = 6 products in one carton.",
    },
    example: "1 GVE(6)",
  },
  {
    id: "qty",
    term: "Qty",
    full: "Quantity",
    kind: "abbr",
    category: "mengen",
    explanation: {
      de: "Englisch für Menge. Auf dem Karton: so viele Stück sind drin.",
      hu: "Angolul mennyiség. A kartonon: ennyi darab van benne.",
      en: "Quantity. On the carton: that many pieces are inside.",
    },
    example: "Qty: 12",
  },
  {
    id: "pcs",
    term: "Pcs",
    full: "Pieces",
    kind: "abbr",
    category: "mengen",
    explanation: {
      de: "Englisch für Stück. Auf dem Karton: Anzahl der Stücke.",
      hu: "Angolul darab(ok). A kartonon: a darabszám.",
      en: "Pieces. On the carton: the number of pieces.",
    },
    example: "6 Pcs",
  },
  {
    id: "menge",
    term: "Menge",
    kind: "word",
    category: "mengen",
    explanation: {
      de: "Anzahl bzw. Stückzahl – am Scanner und auf dem Karton.",
      hu: "Mennyiség, darabszám – a szkenneren és a kartonon is.",
      en: "Quantity / number of pieces – on the scanner and on the carton.",
    },
  },
  {
    id: "set",
    term: "Set",
    kind: "word",
    category: "mengen",
    explanation: {
      de: "Steht „Set“ im Artikelnamen, sind mehrere Teile in der Verpackung – auch wenn am Scanner kein Faktor steht.",
      hu: "Ha a cikk nevében „Set” szerepel, több darab van a csomagolásban – akkor is, ha a szkenneren nincs faktor.",
      en: "If the article name contains “Set”, there are several parts in the package – even without a factor on the scanner.",
    },
    example: "Messerset",
  },
  {
    id: "tlg",
    term: "tlg.",
    full: "-teilig",
    kind: "abbr",
    category: "mengen",
    explanation: {
      de: "Im Artikelnamen: aus so vielen Teilen besteht der Artikel. „5-tlg.“ = fünfteilig.",
      hu: "A cikk nevében: ennyi részből áll a termék. „5-tlg.” = ötrészes.",
      en: "In the article name: the item consists of that many parts. “5-tlg.” = five-piece.",
    },
    example: "Topfset 5-tlg.",
  },
  {
    id: "er-pack",
    term: "2er / 3er / 6er Pack",
    kind: "word",
    category: "mengen",
    explanation: {
      de: "Im Artikelnamen: so viele Stück sind zusammen verpackt. „6er Pack“ = 6 Stück.",
      hu: "A cikk nevében: ennyi darab van együtt csomagolva. „6er Pack” = 6 darab.",
      en: "In the article name: that many pieces are packed together. “6er Pack” = 6 pieces.",
    },
    example: "Gläser 6er Pack",
  },
  {
    id: "display",
    term: "Display",
    kind: "word",
    category: "mengen",
    explanation: {
      de: "Verkaufsverpackung mit mehreren Produkten (z. B. für die Kasse). Steht „Display“ im Artikelnamen, sind mehrere Stück drin.",
      hu: "Bemutató csomagolás több termékkel (pl. a kasszához). Ha a cikk nevében „Display” szerepel, több darab van benne.",
      en: "Sales packaging with several products (e.g. for the checkout). If “Display” is in the article name, there are several pieces inside.",
    },
  },
  {
    id: "auspack",
    term: "ACHTUNG AUSPACK!",
    kind: "word",
    category: "mengen",
    explanation: {
      de: "Hinweis auf dem Karton (aufgedruckt oder Etikett): Dieser Überkarton muss geöffnet werden, die GVE darin werden einzeln herausgenommen. Nicht jeder zu öffnende Überkarton hat diesen Hinweis.",
      hu: "Felirat vagy címke a kartonon: ezt az Überkartont meg kell bontani, a benne lévő GVE-ket egyenként kell kivenni. Nem minden bontós Überkartonon van ilyen jelzés.",
      en: "Note on the carton (printed or label): this Überkarton must be opened and the GVE inside taken out one by one. Not every Überkarton that must be opened has this note.",
    },
  },
  {
    id: "zerbrechlich",
    term: "Zerbrechlich",
    kind: "word",
    category: "qualitaet",
    explanation: {
      de: "Hinweis auf dem Karton: Die Ware ist zerbrechlich. Vorsichtig nehmen, nicht werfen und nichts Schweres darauf stellen.",
      hu: "Törékeny. Figyelmeztetés a kartonon: az áru törékeny. Óvatosan fogd meg, ne dobd, és ne tegyél rá nehezet.",
      en: "Fragile. Note on the carton: the goods are fragile. Handle with care, don't throw them and don't put anything heavy on top.",
    },
    example: "Vorsicht zerbrechlich!",
  },
  {
    id: "glas",
    term: "Glas",
    kind: "word",
    category: "qualitaet",
    explanation: {
      de: "Warnhinweis auf dem Karton: Im Karton ist Glas. Wie zerbrechliche Ware behandeln – vorsichtig nehmen und nicht werfen.",
      hu: "Üveg. Figyelmeztetés a kartonon: a dobozban üveg van. Úgy kezeld, mint a törékeny árut – óvatosan, ne dobd.",
      en: "Glass. Warning on the carton: there is glass inside. Treat it like fragile goods – handle with care and don't throw it.",
    },
    example: "Vorsicht Glas!",
  },
  {
    id: "komm-platz",
    term: "Komm-Platz",
    full: "Kommissionierplatz",
    kind: "abbr",
    category: "auftrag",
    explanation: {
      de: "Der Lagerplatz, von dem kommissioniert wird. Vor dem Öffnen eines Kartons immer prüfen, ob du am richtigen Komm-Platz bist. Steht die Position am Scanner rot, scannst du vorübergehend den Barcode des Komm-Platzes statt der EAN.",
      hu: "Kiszedőhely: az a tárhely, ahonnan komissiózunk. Doboz bontása előtt mindig ellenőrizd, hogy a megfelelő Komm-Platzon vagy. Ha a pozíció a szkenneren piros, ideiglenesen a Komm-Platz vonalkódját szkenneled az EAN helyett.",
      en: "Pick location: the storage location you pick from. Before opening a carton, always check you're at the right Komm-Platz. If the position is red on the scanner, you temporarily scan the Komm-Platz barcode instead of the EAN.",
    },
  },
  {
    id: "leistung",
    term: "Leistung",
    kind: "word",
    category: "zeiterfassung",
    explanation: {
      de: "Deine gemessene Arbeitsleistung, z. B. Picks pro Stunde. Wird aus deinen Buchungen am Scanner berechnet – Gap-Zeit senkt sie.",
      hu: "A mért teljesítményed, pl. kiszedés óránként. A szkenneres rögzítéseidből számolják – a Gap-Zeit rontja.",
      en: "Your measured performance, e.g. picks per hour. Calculated from your bookings on the scanner – Gap-Zeit lowers it.",
    },
  },
  {
    id: "gap-zeit",
    term: "Gap-Zeit",
    kind: "word",
    category: "zeiterfassung",
    explanation: {
      de: "Lücke im System: Zeit, in der nichts gebucht wurde. Zählt gegen deine Leistung. Vermeiden: bei Pausen Pause buchen, bei anderen Tätigkeiten Nebenzeit.",
      hu: "Üres idő, rés a rendszerben: amikor semmit nem rögzítettél. Rontja a Leistungodat. Elkerülése: szünetnél a Pause-t, más munkánál a Nebenzeit-et csekkold.",
      en: "Gap in the system: time with no booking. Counts against your Leistung. Avoid it by booking Pause for breaks and Nebenzeit for other tasks.",
    },
  },
  {
    id: "reinigung",
    term: "Reinigung",
    kind: "word",
    category: "zeiterfassung",
    explanation: {
      de: "Reinigen bzw. Aufräumen des Arbeitsbereichs. Wird als Nebenzeit gebucht: Nebenzeiterfassung → Reinigung.",
      hu: "Takarítás, a munkaterület rendbetétele. Nebenzeit-ként kell csekkolni: Nebenzeiterfassung → Reinigung.",
      en: "Cleaning or tidying up the work area. Booked as Nebenzeit: Nebenzeiterfassung → Reinigung.",
    },
  },
  {
    id: "besprechung",
    term: "Besprechung",
    kind: "word",
    category: "zeiterfassung",
    explanation: {
      de: "Meeting bzw. Teambesprechung, z. B. zu Schichtbeginn. Wird als Nebenzeit gebucht: Nebenzeiterfassung → Besprechung.",
      hu: "Megbeszélés, csapateligazítás, pl. a műszak elején. Nebenzeit-ként kell csekkolni: Nebenzeiterfassung → Besprechung.",
      en: "Meeting or team briefing, e.g. at the start of the shift. Booked as Nebenzeit: Nebenzeiterfassung → Besprechung.",
    },
  },
  {
    id: "zeiterfassung",
    term: "Zeiterfassung",
    kind: "word",
    category: "zeiterfassung",
    explanation: {
      de: "Menüpunkt am Scanner, in dem du deine Arbeitszeit buchst: Kommen, Pause, Komm Pause und Gehen. Erreichbar nach dem Einloggen. Nebenzeit buchst du über den eigenen Menüpunkt Nebenzeiterfassung. Daraus wird deine Arbeitszeit berechnet.",
      hu: "Időnyilvántartás: menüpont a szkenneren, ahol a munkaidődet rögzíted: Kommen, Pause, Komm Pause és Gehen. Bejelentkezés után érhető el. A Nebenzeit-et a külön Nebenzeiterfassung menüpontban csekkolod. Ebből számolják a munkaidődet.",
      en: "Menu item on the scanner where you book your working time: Kommen, Pause, Komm Pause and Gehen. Available after logging in. Nebenzeit is booked in the separate Nebenzeiterfassung menu item. Your working hours are calculated from it.",
    },
  },
  {
    id: "einloggen",
    term: "Einloggen / Anmelden",
    kind: "word",
    category: "zeiterfassung",
    explanation: {
      de: "Sich mit Mitarbeiternummer und Passwort am Scanner anmelden – der erste Schritt der Schicht. Danach in der Zeiterfassung „Kommen“ buchen. Alles läuft auf deinen Namen.",
      hu: "Bejelentkezés a szkennerre a dolgozói számmal és jelszóval – a műszak első lépése. Utána a Zeiterfassung menüben „Kommen”. Minden a te nevedre fut.",
      en: "Logging in on the scanner with your employee number and password – the first step of the shift. Then book “Kommen” in Zeiterfassung. Everything is booked under your name.",
    },
  },
  {
    id: "abmelden",
    term: "Abmelden / Ausloggen",
    kind: "word",
    category: "zeiterfassung",
    explanation: {
      de: "Sich vom Scanner abmelden – am Schichtende erst nach „Gehen“, und immer bevor du das Gerät abgibst. Sonst bucht der Nächste unter deinem Namen.",
      hu: "Kijelentkezés a szkennerről – műszak végén csak a „Gehen” után, és mindig, mielőtt leadod a készüléket. Különben a következő ember a te nevedre könyvel.",
      en: "Logging out of the scanner – at the end of the shift only after “Gehen”, and always before handing the device over. Otherwise the next person books under your name.",
    },
  },
  {
    id: "kommen",
    term: "Kommen",
    kind: "word",
    category: "zeiterfassung",
    explanation: {
      de: "Arbeitsbeginn buchen („einstempeln“): nach dem Einloggen im Menü Zeiterfassung. Ab jetzt zählt deine Arbeitszeit.",
      hu: "A munkakezdés rögzítése („becsekkolás”): bejelentkezés után a Zeiterfassung menüben. Innentől számít a munkaidőd.",
      en: "Booking the start of work (“clocking in”): after logging in, in the Zeiterfassung menu. Your working time counts from now on.",
    },
  },
  {
    id: "gehen",
    term: "Gehen",
    kind: "word",
    category: "zeiterfassung",
    explanation: {
      de: "Arbeitsende buchen („ausstempeln“) im Menü Zeiterfassung – danach am Scanner abmelden. Ab jetzt zählt keine Arbeitszeit mehr.",
      hu: "A munka végének rögzítése („kicsekkolás”) a Zeiterfassung menüben – utána kijelentkezés a szkennerről. Innentől már nem számít munkaidő.",
      en: "Booking the end of work (“clocking out”) in the Zeiterfassung menu – then log out of the scanner. No more working time counts from now on.",
    },
  },
  {
    id: "pause",
    term: "Pause",
    kind: "word",
    category: "zeiterfassung",
    explanation: {
      de: "Wenn du in die Pause gehst (kleine Pause oder Mittagspause), buchst du in der Zeiterfassung „Pause“. Danach meldet dich der Scanner ab. Zurück aus der Pause loggst du dich wieder ein und buchst „Komm Pause“.",
      hu: "Amikor szünetre mész (kis szünet vagy ebédszünet), a Zeiterfassung menüben a „Pause”-t csekkolod. Ezután a szkenner kiléptet. Amikor visszajössz, újra bejelentkezel (einloggen), és a „Komm Pause”-t csekkolod.",
      en: "When you go on a break (short break or lunch), you book “Pause” in Zeiterfassung. The scanner then logs you out. When you come back, you log in again and book “Komm Pause”.",
    },
  },
  {
    id: "komm-pause",
    term: "Komm Pause",
    kind: "word",
    category: "zeiterfassung",
    explanation: {
      de: "Buchung in der Zeiterfassung, wenn du aus der Pause zurückkommst. Vorher musst du dich wieder einloggen, weil der Scanner dich bei „Pause“ abmeldet.",
      hu: "Csekkolás a Zeiterfassung menüben, amikor visszajössz a szünetről. Előtte újra be kell jelentkezned (einloggen), mert a „Pause” után a szkenner kiléptet.",
      en: "Booking in Zeiterfassung when you come back from your break. First log in again, because the scanner logs you out after “Pause”.",
    },
  },
  {
    id: "nebenzeit",
    term: "Nebenzeit",
    kind: "word",
    category: "zeiterfassung",
    explanation: {
      de: "Zeit, in der du arbeitest, aber gerade nicht kommissionierst – z. B. an der Wickelmaschine, Reinigung oder Besprechung. Im eingeloggten Zustand im Menü Nebenzeiterfassung buchen und dort die Art auswählen, damit sie nicht als langsames Picken zählt.",
      hu: "Mellékidő: amikor dolgozol, de épp nincs komissiózás – pl. Wickelmaschine (fóliázógép), Reinigung (takarítás) vagy Besprechung (megbeszélés). Bejelentkezett állapotban a Nebenzeiterfassung menüben kell csekkolni, ott kiválasztva a típusát, hogy ne számítson lassú kiszedésnek.",
      en: "Time when you're working but not picking – e.g. Wickelmaschine (wrapping machine), Reinigung (cleaning) or Besprechung (meeting). Book it in the Nebenzeiterfassung menu while logged in, choosing the type there, so it doesn't count as slow picking.",
    },
  },
  {
    id: "nebenzeiterfassung",
    term: "Nebenzeiterfassung",
    kind: "word",
    category: "zeiterfassung",
    explanation: {
      de: "Menüpunkt am Scanner, in dem du Nebenzeit buchst. Dort wählst du die Art aus: Wickelmaschine, Reinigung oder Besprechung.",
      hu: "Menüpont a szkenneren, ahol a Nebenzeit-et csekkolod. Itt kell kiválasztani a típusát: Wickelmaschine, Reinigung vagy Besprechung.",
      en: "Menu item on the scanner where you book Nebenzeit. There you choose the type: Wickelmaschine, Reinigung or Besprechung.",
    },
  },
  {
    id: "wickelmaschine",
    term: "Wickelmaschine",
    kind: "word",
    category: "zeiterfassung",
    explanation: {
      de: "Maschine, die Paletten mit Stretchfolie umwickelt. Arbeit daran wird als Nebenzeit gebucht: Nebenzeiterfassung → Wickelmaschine.",
      hu: "Fóliázógép: a raklapokat sztreccsfóliával tekeri be. Az itt végzett munkát Nebenzeit-ként kell csekkolni: Nebenzeiterfassung → Wickelmaschine.",
      en: "Wrapping machine that wraps pallets in stretch film. Work there is booked as Nebenzeit: Nebenzeiterfassung → Wickelmaschine.",
    },
  },
  {
    id: "mde",
    term: "MDE",
    full: "Mobile Datenerfassung",
    kind: "abbr",
    category: "scanner",
    explanation: {
      de: "Das Handgerät mit Scanner, mit dem Aufträge bearbeitet und Barcodes gescannt werden.",
      hu: "A kézi szkenneres készülék, amivel a megbízásokat feldolgozzuk és a vonalkódokat beolvassuk.",
      en: "The handheld scanner device used to work through orders and scan barcodes.",
    },
  },
  {
    id: "le",
    term: "LE",
    full: "Ladeeinheit",
    kind: "abbr",
    category: "lager",
    explanation: {
      de: "Eine Einheit, die als Ganzes bewegt wird, z. B. eine Palette oder ein Behälter. Hat meist ein eigenes Etikett.",
      hu: "Egy egységként mozgatott rakomány, pl. egy raklap vagy egy láda. Általában saját címkéje van.",
      en: "A unit that is moved as a whole, e.g. a pallet or a container. Usually has its own label.",
    },
  },
  {
    id: "ean",
    term: "EAN / GTIN",
    full: "European Article Number / Global Trade Item Number",
    kind: "abbr",
    category: "etiketten",
    explanation: {
      de: "Die Artikelnummer unter dem Strichcode auf dem Produkt (meist 13 Stellen).",
      hu: "A termék vonalkódja alatti cikkszám (általában 13 jegyű).",
      en: "The article number under the barcode on the product (usually 13 digits).",
    },
  },
  {
    id: "art-nr",
    term: "Art.-Nr.",
    full: "Artikelnummer",
    kind: "abbr",
    category: "etiketten",
    explanation: {
      de: "Interne Nummer eines Artikels im Lager. Nicht immer gleich wie die EAN.",
      hu: "Egy cikk belső száma a raktárban. Nem mindig egyezik az EAN-nel.",
      en: "Internal number of an item in the warehouse. Not always the same as the EAN.",
    },
  },
  {
    id: "mhd",
    term: "MHD",
    full: "Mindesthaltbarkeitsdatum",
    kind: "abbr",
    category: "etiketten",
    explanation: {
      de: "Datum, bis zu dem die Ware mindestens haltbar ist. Wird oft beim Picken abgefragt.",
      hu: "Minőségmegőrzési idő: a dátum, ameddig az áru legalább eltartható. Kiszedéskor gyakran rákérdez a szkenner.",
      en: "Best-before date. Often requested by the scanner while picking.",
    },
    example: "MHD 31.12.2026",
  },
  {
    id: "charge",
    term: "Ch.-Nr. / Charge",
    full: "Chargennummer",
    kind: "abbr",
    category: "etiketten",
    explanation: {
      de: "Nummer einer Produktionsserie. Wichtig für Rückverfolgung und Rückrufe.",
      hu: "Gyártási tétel száma. Fontos a visszakövethetőséghez és a visszahívásokhoz.",
      en: "Batch / lot number of a production run. Important for traceability and recalls.",
    },
  },
  {
    id: "we",
    term: "WE",
    full: "Wareneingang",
    kind: "abbr",
    category: "lager",
    explanation: {
      de: "Bereich bzw. Vorgang, in dem angelieferte Ware angenommen und geprüft wird.",
      hu: "Áruátvétel: az a terület vagy folyamat, ahol a beérkező árut átveszik és ellenőrzik.",
      en: "Goods receiving: the area or process where delivered goods are accepted and checked.",
    },
  },
  {
    id: "wa",
    term: "WA",
    full: "Warenausgang",
    kind: "abbr",
    category: "lager",
    explanation: {
      de: "Bereich bzw. Vorgang, in dem fertige Aufträge verladen und versendet werden.",
      hu: "Árukiadás: az a terület vagy folyamat, ahol a kész megbízásokat felrakodják és kiszállítják.",
      en: "Goods issue / outbound: where finished orders are loaded and shipped.",
    },
  },
  {
    id: "lvs",
    term: "LVS / WMS",
    full: "Lagerverwaltungssystem / Warehouse Management System",
    kind: "abbr",
    category: "scanner",
    explanation: {
      de: "Die Software, die alle Lagerplätze, Bestände und Aufträge verwaltet. Der Scanner ist damit verbunden.",
      hu: "A raktárkezelő szoftver, amely az összes tárhelyet, készletet és megbízást kezeli. A szkenner ehhez kapcsolódik.",
      en: "The software that manages all storage locations, stock and orders. The scanner is connected to it.",
    },
  },
  {
    id: "lp",
    term: "LP / Lagerplatz",
    full: "Lagerplatz",
    kind: "abbr",
    category: "lager",
    explanation: {
      de: "Fester Ort im Lager, an dem Ware liegt. Aufbau: Gang – Fachnummer – Fach. Beispiel 502 62 30: Gang 502, Fachnummer 62, Fach 30. Jede Fachnummer hat 3 Fächer (10, 20, 30). Ungerade Fachnummern liegen links, gerade rechts. In Gängen mit Kleinfächern zeigt die letzte Zahl die Ebene: 10 = Boden, 11, 12 darüber, 13 meist ganz oben.",
      hu: "Tárhely: a raktár egy konkrét helye, ahol az áru van. Felépítése: sor – fakkszám – fakk. Példa: 502 62 30 = 502-es sor, 62-es fakkszám, 30-as fakk. Egy fakkszámon belül 3 fakk van (10, 20, 30). A páratlan fakkszámok bal kéz, a párosak jobb kéz felől vannak. Emeletes kisfakkos soroknál az utolsó szám a szint: 10 = földszint, 11, 12 afelett, 13 általában a legfelső.",
      en: "Storage location. Structure: aisle – compartment number – compartment. Example 502 62 30: aisle 502, compartment number 62, compartment 30. Each compartment number has 3 compartments (10, 20, 30). Odd numbers are on the left, even ones on the right. In aisles with small compartments the last number is the level: 10 = floor, 11, 12 above, 13 usually the top.",
    },
    example: "502 62 30",
  },
  {
    id: "ve",
    term: "VE",
    full: "Verpackungseinheit",
    kind: "abbr",
    category: "mengen",
    explanation: {
      de: "Wie viele Stück zusammen verpackt sind, z. B. ein Karton mit 6 Flaschen.",
      hu: "Csomagolási egység: hány darab van együtt becsomagolva, pl. egy karton 6 üveggel.",
      en: "Packaging unit: how many pieces are packed together, e.g. a carton with 6 bottles.",
    },
    example: "1 VE = 6 Stk.",
  },
  {
    id: "ueberkarton",
    term: "Exportkarton / Überkarton",
    kind: "word",
    category: "mengen",
    explanation: {
      de: "Der äußere Karton, in dem die GVE stecken. Wenn wir „einen Karton öffnen“, ist das der Überkarton – die GVE darin werden herausgenommen.",
      hu: "A külső karton, amiben a GVE-k vannak. Amikor „bontunk”, az az Überkarton – a benne lévő GVE-ket vesszük ki.",
      en: "The outer carton holding the GVE. When we “open a carton”, it's the Überkarton – the GVE inside are taken out.",
    },
  },
  {
    id: "stk",
    term: "Stk. / Stck / ST",
    full: "Stück",
    kind: "abbr",
    category: "mengen",
    explanation: {
      de: "Einzelnes Teil. Mengenangabe in Stück.",
      hu: "Darab. Mennyiség darabban.",
      en: "Piece. Quantity in pieces.",
    },
  },
  {
    id: "krt",
    term: "Krt. / KT",
    full: "Karton",
    kind: "abbr",
    category: "mengen",
    explanation: {
      de: "Mengenangabe in Kartons.",
      hu: "Mennyiség kartonban.",
      en: "Quantity in cartons.",
    },
  },
  {
    id: "pal",
    term: "Pal. / EPAL",
    full: "Palette / Europalette",
    kind: "abbr",
    category: "lager",
    explanation: {
      de: "Palette. Die Europalette (EPAL) ist 120 × 80 cm groß und tauschbar.",
      hu: "Raklap. Az EUR-raklap (EPAL) 120 × 80 cm-es és cserélhető.",
      en: "Pallet. The Euro pallet (EPAL) is 120 × 80 cm and exchangeable.",
    },
  },
  {
    id: "klt",
    term: "KLT",
    full: "Kleinladungsträger",
    kind: "abbr",
    category: "lager",
    explanation: {
      de: "Kleiner, genormter Kunststoffbehälter für Teile.",
      hu: "Kis méretű, szabványos műanyag tárolóláda alkatrészekhez.",
      en: "Small standardised plastic container for parts.",
    },
  },
  {
    id: "glt",
    term: "GLT",
    full: "Großladungsträger",
    kind: "abbr",
    category: "lager",
    explanation: {
      de: "Großer Behälter oder Gitterbox, meist im Palettenformat.",
      hu: "Nagy méretű láda vagy rácsos konténer, általában raklap méretű.",
      en: "Large container or mesh box, usually pallet-sized.",
    },
  },
  {
    id: "pos",
    term: "Pos.",
    full: "Position",
    kind: "abbr",
    category: "auftrag",
    explanation: {
      de: "Eine Zeile im Auftrag: ein Artikel mit einer Menge. „Pos. 3/12“ heißt: dritte von zwölf Positionen.",
      hu: "Egy sor a megbízásban: egy cikk egy mennyiséggel. A „Pos. 3/12” jelentése: a tizenkét tételből a harmadik.",
      en: "One line of the order: one item with a quantity. “Pos. 3/12” means the third of twelve lines.",
    },
    example: "Pos. 3/12",
  },
  {
    id: "ls",
    term: "LS",
    full: "Lieferschein",
    kind: "abbr",
    category: "etiketten",
    explanation: {
      de: "Begleitpapier zur Lieferung mit allen gelieferten Artikeln und Mengen.",
      hu: "Szállítólevél: a szállítmányt kísérő papír a szállított cikkekkel és mennyiségekkel.",
      en: "Delivery note listing all delivered items and quantities.",
    },
  },
  {
    id: "ma",
    term: "MA",
    full: "Mitarbeiter / Mitarbeiterin",
    kind: "abbr",
    category: "scanner",
    explanation: {
      de: "Mitarbeiter. Oft mit Nummer, z. B. bei der Anmeldung am Scanner.",
      hu: "Munkatárs. Gyakran számmal, pl. a szkenneres bejelentkezésnél.",
      en: "Employee. Often with a number, e.g. when logging in on the scanner.",
    },
  },
  {
    id: "flfz",
    term: "FFZ / Stapler",
    full: "Flurförderzeug / Gabelstapler",
    kind: "abbr",
    category: "lager",
    explanation: {
      de: "Fahrzeuge im Lager, z. B. Gabelstapler oder Elektro-Hubwagen. Nur mit Berechtigung fahren!",
      hu: "Raktári járművek, pl. targonca vagy elektromos békakocsi. Csak jogosultsággal szabad vezetni!",
      en: "Warehouse vehicles, e.g. forklifts or electric pallet trucks. Only drive with authorisation!",
    },
  },
  {
    id: "qs",
    term: "QS",
    full: "Qualitätssicherung",
    kind: "abbr",
    category: "qualitaet",
    explanation: {
      de: "Abteilung bzw. Prüfung, die die Qualität der Ware kontrolliert. Ware „in QS“ ist gesperrt.",
      hu: "Minőségbiztosítás. A „QS-ben” lévő áru zárolt, nem használható.",
      en: "Quality assurance. Goods “in QS” are blocked.",
    },
  },
  {
    id: "kommissionieren",
    term: "Kommissionieren",
    kind: "word",
    category: "auftrag",
    explanation: {
      de: "Artikel nach einem Auftrag aus dem Lager zusammenstellen („picken“).",
      hu: "Komissiózás: cikkek összeszedése a raktárból egy megbízás alapján („pickelés”).",
      en: "Order picking: collecting items from the warehouse according to an order.",
    },
  },
  {
    id: "auftrag",
    term: "Auftrag",
    kind: "word",
    category: "auftrag",
    explanation: {
      de: "Eine Bestellung bzw. Arbeitsaufgabe, die bearbeitet werden muss.",
      hu: "Megbízás / rendelés: egy elvégzendő munkafeladat.",
      en: "An order or task that has to be processed.",
    },
  },
  {
    id: "soll-ist",
    term: "Soll / Ist",
    kind: "word",
    category: "auftrag",
    explanation: {
      de: "Soll = Menge, die genommen werden muss. Ist = Menge, die tatsächlich genommen wurde.",
      hu: "Soll = az előírt mennyiség, amit ki kell venni. Ist = a ténylegesen kivett mennyiség.",
      en: "Soll = target quantity to pick. Ist = quantity actually picked.",
    },
  },
  {
    id: "fehlmenge",
    term: "Fehlmenge",
    kind: "word",
    category: "auftrag",
    explanation: {
      de: "Es ist weniger Ware am Platz als verlangt. Muss am Scanner gemeldet werden.",
      hu: "Hiány: kevesebb áru van a helyen, mint amennyi kell. A szkenneren jelenteni kell.",
      en: "Shortage: less stock at the location than required. Must be reported on the scanner.",
    },
  },
  {
    id: "nachschub",
    term: "Nachschub",
    kind: "word",
    category: "auftrag",
    explanation: {
      de: "Auffüllen eines Pickplatzes aus dem Reservelager.",
      hu: "Utántöltés: egy kiszedőhely feltöltése a tartalékraktárból.",
      en: "Replenishment of a pick location from reserve storage.",
    },
  },
  {
    id: "einlagern",
    term: "Einlagern / Auslagern",
    kind: "word",
    category: "lager",
    explanation: {
      de: "Einlagern = Ware auf einen Lagerplatz bringen. Auslagern = Ware vom Lagerplatz holen.",
      hu: "Einlagern = árut betárolni egy tárhelyre. Auslagern = árut kitárolni a tárhelyről.",
      en: "Einlagern = put goods away to a location. Auslagern = take goods out of a location.",
    },
  },
  {
    id: "umlagern",
    term: "Umlagern / Umbuchen",
    kind: "word",
    category: "lager",
    explanation: {
      de: "Ware von einem Lagerplatz auf einen anderen bringen und im System umbuchen.",
      hu: "Átrakás / átkönyvelés: árut egyik tárhelyről a másikra tenni és a rendszerben is átvezetni.",
      en: "Move goods from one location to another and rebook them in the system.",
    },
  },
  {
    id: "inventur",
    term: "Inventur",
    kind: "word",
    category: "lager",
    explanation: {
      de: "Zählen des Bestands. Die gezählte Menge wird mit dem System verglichen.",
      hu: "Leltár: a készlet megszámolása és összevetése a rendszerrel.",
      en: "Stocktaking: counting stock and comparing it to the system.",
    },
  },
  {
    id: "bestand",
    term: "Bestand",
    kind: "word",
    category: "lager",
    explanation: {
      de: "Menge eines Artikels, die laut System im Lager bzw. auf einem Platz ist.",
      hu: "Készlet: egy cikk mennyisége a rendszer szerint a raktárban vagy egy tárhelyen.",
      en: "Stock: quantity of an item in the warehouse or at a location according to the system.",
    },
  },
  {
    id: "gesperrt",
    term: "Gesperrt",
    kind: "word",
    category: "lager",
    explanation: {
      de: "Ware oder Platz darf nicht benutzt werden (z. B. Schaden, QS, Inventur).",
      hu: "Zárolt: az árut vagy a helyet nem szabad használni (pl. sérülés, minőségellenőrzés, leltár miatt).",
      en: "Blocked: goods or location must not be used (e.g. damage, QA, stocktaking).",
    },
  },
  {
    id: "quittieren",
    term: "Quittieren",
    kind: "word",
    category: "scanner",
    explanation: {
      de: "Bestätigen, dass ein Schritt erledigt ist – meist mit der Enter-Taste.",
      hu: "Nyugtázni: megerősíteni, hogy egy lépés kész – általában az Enter gombbal.",
      en: "Confirm that a step is done – usually with the Enter key.",
    },
  },
  {
    id: "retoure",
    term: "Retoure",
    kind: "word",
    category: "qualitaet",
    explanation: {
      de: "Ware, die vom Kunden zurückgeschickt wurde.",
      hu: "Visszáru: a vevő által visszaküldött áru.",
      en: "Goods returned by the customer.",
    },
  },
  {
    id: "bruch",
    term: "Bruch / Beschädigt",
    kind: "word",
    category: "qualitaet",
    explanation: {
      de: "Kaputte oder beschädigte Ware. Nicht verschicken, sondern melden.",
      hu: "Törött / sérült áru. Nem szabad kiküldeni, jelenteni kell.",
      en: "Broken or damaged goods. Do not ship – report it.",
    },
  },
  {
    id: "verladen",
    term: "Verladen",
    kind: "word",
    category: "lager",
    explanation: {
      de: "Ware in den LKW laden.",
      hu: "Felrakodás: az áru berakása a kamionba.",
      en: "Loading goods onto the truck.",
    },
  },
  {
    id: "rampe",
    term: "Rampe / Tor",
    kind: "word",
    category: "lager",
    explanation: {
      de: "Laderampe bzw. Tor, an dem der LKW be- oder entladen wird.",
      hu: "Rámpa / kapu, ahol a kamiont be- vagy kirakodják.",
      en: "Loading dock / gate where the truck is loaded or unloaded.",
    },
  },
];
