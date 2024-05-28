const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const { parseCSV } = require("./../lib/parse_csv");
const mockFs = require("mock-fs");

const data = {
  "/lib/csv/example.csv": `id,name\n1,London\n2,Manchester`,
  "/lib/csv/empty.csv": "",
  "/lib/csv/header.csv": `id,name`,
  "/lib/csv/invalid.csv": `id,name\n1,London\n2,Manchester\ninvalid data`,
};

describe("CSV File Processing", async () => {
  it("should parse a CSV file correctly", async () => {
    const fileName = "/lib/csv/example.csv";
    const expectedRecords = [
      { id: 1, name: "London" },
      { id: 2, name: "Manchester" },
    ];
    mockFs(data);
    const records = await parseCSV(fileName);

    assert.deepStrictEqual(records, expectedRecords);
    mockFs.restore();
  });

  it("should handle empty CSV file", async () => {
    const fileName = "/lib/csv/empty.csv";
    mockFs(data);
    const records = await parseCSV(fileName);
    assert.deepStrictEqual(records, []);
    mockFs.restore();
  });

  it("should handle CSV file with headers", async () => {
    const fileName = "/lib/csv/header.csv";
    mockFs(data);
    const records = await parseCSV(fileName);
    assert.deepStrictEqual(records, []);
    mockFs.restore();
  });

  it("should handle CSV file with invalid data", async () => {
    const fileName = "/lib/csv/invalid.csv";
    mockFs(data);
    try {
      await parseCSV(fileName);
      assert.fail("Expected an CSV parser error");
    } catch (error) {
      assert.match(error.message, /Invalid Record Length/);
    }
    mockFs.restore();
  });

  it("should handle non-existent CSV file", async () => {
    const fileName = "/lib/csv/nonexistent.csv";

    try {
      await parseCSV(fileName);
      assert.fail("Expected an error");
    } catch (error) {
      assert.strictEqual(error.message, "File does not exist.");
    }
  });
});
