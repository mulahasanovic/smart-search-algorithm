const extractEntities = require("./lib/extractEntities");

const searchTerm = process.argv.slice(2);
try {
  if (searchTerm.length) {
    (async () => {
      const result = await extractEntities(
        searchTerm.join(" ").replace('"', "")
      );

      // Print combinations
      result.forEach((combo) => console.log(combo));
      process.exit(0);
    })();
  } else {
    console.error(
      "Missing searchTerm argument \nUsage: node index.js McDonalds in London or Manchester"
    );
    process.exit(1);
  }
} catch (error) {
  console.log(error);
}
