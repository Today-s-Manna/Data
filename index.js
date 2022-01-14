const fs = require("fs");

const {
  daysOfMccheyne: [mccheyne],
} = JSON.parse(fs.readFileSync("./mccheyne_whole_contents.json", "utf8"));

const plan = {};
const holyDictionary = {};

for (const [date, toRead] of Object.entries(mccheyne)) {
  for (const { book, verse, content } of toRead) {
    const splitted = verse.split(" : ");
    const chapter = parseInt(splitted[0]);
    const verseNumber = parseInt(splitted[1]);

    if (!holyDictionary[book]) {
      holyDictionary[book] = {};
    }
    if (!holyDictionary[book][chapter]) {
      holyDictionary[book][chapter] = {};
    }
    holyDictionary[book][chapter][verseNumber] = content;

    if (!plan[date]) {
      plan[date] = {};
    }
    if (!plan[date][`${book}${chapter}`]) {
      plan[date][`${book}${chapter}`] = {
        isChecked: false,
        book,
        chapter,
        verses: [],
      };
    }
    plan[date][`${book}${chapter}`].verses.push({
      verse: verseNumber,
      content,
    });
  }
}

for (const [date, toRead] of Object.entries(plan)) {
  plan[date] = Object.entries(toRead).map(([_, value]) => value);
}

fs.writeFileSync("plan.json", JSON.stringify(plan, null, 2));
fs.writeFileSync(
  "holy_dictionary.json",
  JSON.stringify(holyDictionary, null, 2)
);
