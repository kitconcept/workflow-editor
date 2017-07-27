// spec.js
describe("Worklow Editor", function() {

  it("should show headline", function() {
    browser.get("http://localhost:8080");

    expect(element(by.css("h1")).getText()).
      toEqual("Workflow Editor");
  });

  it("should contain all four states", function() {
    browser.get("http://localhost:8080");
    expect(element.all(by.css(".state")).count()).toEqual(4);
  });

  it("should contain all four transitions", function() {
    browser.get("http://localhost:8080");
    expect(element.all(by.css(".jtk-connector")).count()).toEqual(5);
  });

});
