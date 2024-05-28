const fs = require("node:fs");
const { parse } = require("csv-parse");

const processFile = async (filePath) => {
  if (!fs.existsSync(filePath)) throw new Error("File does not exist.");

  const records = [];
  const parser = fs.createReadStream(filePath).pipe(
    parse({
      cast: true,
      from_line: 2,
    })
  );

  for await (const record of parser) {
    records.push({ id: record[0], name: record[1] });
  }

  return records;
};

module.exports = {
  parseCSV: processFile,
};
