// spec.js
describe('Worklow Editor', function() {
  it('should show hello world', function() {
    browser.get('http://localhost:8080');

    expect(element(by.css('h1')).getText()).
      toEqual('Hello World');
  });
});
