// Scanner erklärt: Inhalt der Seite /scanner.
//
// BEISPIELINHALT — die Felder, Tasten und Meldungen unten sind typisch für
// MDE-Geräte in der Kommissionierung, aber nicht 1:1 eure Software. Bitte an
// die echten Bildschirme anpassen (Beschriftung so übernehmen, wie sie auf
// dem Gerät steht).

import type { Localized } from "./types";

/** One line of the sample pick screen; `marker` is the number shown in the legend. */
export type ScannerField = {
  marker: number;
  label: string;
  value: string;
  explanation: Localized;
};

export type ScannerKey = {
  key: string;
  explanation: Localized;
};

export type ScannerMessage = {
  message: string;
  meaning: Localized;
  action: Localized;
};

export const SCANNER_SCREEN_TITLE = "Kommissionierung";

export const SCANNER_FIELDS: ScannerField[] = [
  {
    marker: 1,
    label: "Auftrag",
    value: "4711-023",
    explanation: {
      de: "Nummer des Auftrags, den du gerade bearbeitest.",
      hu: "A megbízás száma, amin éppen dolgozol.",
      en: "Number of the order you are working on.",
    },
  },
  {
    marker: 2,
    label: "Pos.",
    value: "3/12",
    explanation: {
      de: "Aktuelle Position / Anzahl aller Positionen. Hier: dritte von zwölf.",
      hu: "Aktuális tétel / összes tétel. Itt: a tizenkettőből a harmadik.",
      en: "Current line / total lines. Here: the third of twelve.",
    },
  },
  {
    marker: 3,
    label: "LP",
    value: "12-04-02-B",
    explanation: {
      de: "Lagerplatz, zu dem du gehen sollst: Gang 12, Regal 04, Ebene 02, Fach B.",
      hu: "A tárhely, ahová menned kell: 12-es sor, 04-es állvány, 02-es szint, B rekesz.",
      en: "Location to go to: aisle 12, rack 04, level 02, bin B.",
    },
  },
  {
    marker: 4,
    label: "Art.-Nr.",
    value: "100245",
    explanation: {
      de: "Artikelnummer des Produkts. Darunter steht meist die Bezeichnung.",
      hu: "A termék cikkszáma. Alatta általában a megnevezése áll.",
      en: "Item number of the product. The description is usually shown below.",
    },
  },
  {
    marker: 5,
    label: "Soll",
    value: "6 Stk.",
    explanation: {
      de: "So viele Stück musst du nehmen.",
      hu: "Ennyi darabot kell kivenned.",
      en: "The quantity you have to pick.",
    },
  },
  {
    marker: 6,
    label: "Ist",
    value: "_",
    explanation: {
      de: "Hier gibst du ein, wie viele Stück du wirklich genommen hast.",
      hu: "Ide írod be, hány darabot vettél ki ténylegesen.",
      en: "Enter how many pieces you actually picked.",
    },
  },
  {
    marker: 7,
    label: "MHD",
    value: "31.12.2026",
    explanation: {
      de: "Mindesthaltbarkeitsdatum. Prüfen, ob es mit der Ware übereinstimmt.",
      hu: "Minőségmegőrzési idő. Ellenőrizd, hogy egyezik-e az áruval.",
      en: "Best-before date. Check that it matches the goods.",
    },
  },
  {
    marker: 8,
    label: "Ziel-LE",
    value: "Bitte scannen",
    explanation: {
      de: "Behälter oder Palette, in die die Ware kommt. Etikett scannen.",
      hu: "A láda vagy raklap, amibe az áru kerül. Olvasd be a címkéjét.",
      en: "Container or pallet the goods go into. Scan its label.",
    },
  },
];

export const SCANNER_KEYS: ScannerKey[] = [
  {
    key: "ENT",
    explanation: {
      de: "Bestätigen / weiter (Quittieren).",
      hu: "Megerősítés / tovább (nyugtázás).",
      en: "Confirm / continue.",
    },
  },
  {
    key: "ESC",
    explanation: {
      de: "Zurück bzw. abbrechen.",
      hu: "Vissza, illetve megszakítás.",
      en: "Back or cancel.",
    },
  },
  {
    key: "CLR / BKSP",
    explanation: {
      de: "Eingabe löschen.",
      hu: "Bevitel törlése.",
      en: "Clear the input.",
    },
  },
  {
    key: "F1 … F4",
    explanation: {
      de: "Sonderfunktionen, z. B. Fehlmenge melden oder Position überspringen. Die Belegung steht meist unten im Display.",
      hu: "Különleges funkciók, pl. hiány jelentése vagy tétel átugrása. A kiosztás általában a kijelző alján látszik.",
      en: "Special functions, e.g. report a shortage or skip a line. The mapping is usually shown at the bottom of the display.",
    },
  },
  {
    key: "Scan",
    explanation: {
      de: "Seitliche oder obere Taste: Barcode scannen.",
      hu: "Oldalsó vagy felső gomb: vonalkód beolvasása.",
      en: "Side or top button: scan a barcode.",
    },
  },
];

export const SCANNER_MESSAGES: ScannerMessage[] = [
  {
    message: "Falscher Lagerplatz",
    meaning: {
      de: "Der gescannte Platz ist nicht der, der im Auftrag steht.",
      hu: "A beolvasott hely nem az, ami a megbízásban szerepel.",
      en: "The scanned location is not the one in the order.",
    },
    action: {
      de: "Platznummer am Display prüfen und den richtigen Platz scannen.",
      hu: "Ellenőrizd a kijelzőn a helyszámot, és a helyes tárhelyet olvasd be.",
      en: "Check the location number on the display and scan the correct one.",
    },
  },
  {
    message: "Artikel unbekannt",
    meaning: {
      de: "Der gescannte Barcode passt zu keinem Artikel im System.",
      hu: "A beolvasott vonalkód egyik cikkhez sem tartozik a rendszerben.",
      en: "The scanned barcode does not match any item in the system.",
    },
    action: {
      de: "Anderen Barcode am Produkt versuchen oder Artikelnummer eintippen. Sonst Vorgesetzten fragen.",
      hu: "Próbálj egy másik vonalkódot a terméken, vagy írd be a cikkszámot. Ha nem megy, kérdezd a vezetőt.",
      en: "Try another barcode on the product or type the item number. Otherwise ask your supervisor.",
    },
  },
  {
    message: "Falscher Artikel",
    meaning: {
      de: "Du hast einen anderen Artikel gescannt als verlangt.",
      hu: "Más cikket olvastál be, mint amit kér.",
      en: "You scanned a different item than requested.",
    },
    action: {
      de: "Ware zurücklegen und Artikelnummer bzw. Bezeichnung vergleichen.",
      hu: "Tedd vissza az árut, és hasonlítsd össze a cikkszámot / megnevezést.",
      en: "Put the item back and compare the item number / description.",
    },
  },
  {
    message: "Menge überschritten",
    meaning: {
      de: "Die eingegebene Ist-Menge ist größer als die Soll-Menge.",
      hu: "A beírt tényleges mennyiség nagyobb, mint az előírt.",
      en: "The entered quantity is higher than the target quantity.",
    },
    action: {
      de: "Menge nachzählen und richtig eingeben.",
      hu: "Számold újra, és írd be a helyes mennyiséget.",
      en: "Recount and enter the correct quantity.",
    },
  },
  {
    message: "Fehlmenge melden?",
    meaning: {
      de: "Die Ist-Menge ist kleiner als die Soll-Menge.",
      hu: "A tényleges mennyiség kevesebb, mint az előírt.",
      en: "The picked quantity is lower than the target.",
    },
    action: {
      de: "Nur bestätigen, wenn wirklich nicht genug Ware am Platz ist. Sonst Menge korrigieren.",
      hu: "Csak akkor erősítsd meg, ha tényleg nincs elég áru a helyen. Különben javítsd a mennyiséget.",
      en: "Only confirm if there really isn't enough stock. Otherwise correct the quantity.",
    },
  },
  {
    message: "LE bereits vergeben",
    meaning: {
      de: "Das gescannte Behälter- bzw. Paletten-Etikett wird schon für einen anderen Auftrag benutzt.",
      hu: "A beolvasott láda- vagy raklapcímke már egy másik megbízáshoz tartozik.",
      en: "The scanned container / pallet label is already used for another order.",
    },
    action: {
      de: "Neuen, leeren Behälter bzw. neues Etikett nehmen.",
      hu: "Vegyél új, üres ládát, illetve új címkét.",
      en: "Take a new, empty container or a new label.",
    },
  },
  {
    message: "Platz gesperrt",
    meaning: {
      de: "Der Lagerplatz ist im System gesperrt (z. B. Inventur oder Schaden).",
      hu: "A tárhely zárolva van a rendszerben (pl. leltár vagy sérülés miatt).",
      en: "The location is blocked in the system (e.g. stocktaking or damage).",
    },
    action: {
      de: "Nichts entnehmen. Vorgesetzten informieren.",
      hu: "Ne vegyél ki semmit. Szólj a vezetőnek.",
      en: "Do not take anything. Inform your supervisor.",
    },
  },
  {
    message: "Keine Verbindung",
    meaning: {
      de: "Der Scanner hat kein WLAN bzw. keine Verbindung zum Lagerverwaltungssystem.",
      hu: "A szkennernek nincs Wi-Fi-je, illetve nincs kapcsolata a raktárkezelő rendszerrel.",
      en: "The scanner has no Wi-Fi / no connection to the warehouse system.",
    },
    action: {
      de: "Ein paar Meter in Richtung Gang-Mitte gehen und warten. Hilft das nicht: Gerät neu anmelden.",
      hu: "Menj pár métert a sor közepe felé, és várj. Ha nem segít: jelentkezz be újra a készüléken.",
      en: "Walk a few metres towards the middle of the aisle and wait. If that doesn't help, log in again.",
    },
  },
];
