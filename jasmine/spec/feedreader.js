/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function, since some of these tests may require DOM elements. We want to ensure they don't run until the DOM is ready. */
$(function () {
  /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
  describe('RSS Feeds', function () {

    it('are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    it('has valid URLs', function () {
      allFeeds.forEach(function (feed) {
        expect(feed.url).toBeTruthy();
      });
    });

    it('has names defined', function () {
      allFeeds.forEach(function (feed) {
        expect(feed.name).toBeTruthy();
      });
    });
  });

  describe('The menu', function () {
    const menu = document.querySelector('.menu-hidden');
    const menuLink = document.querySelector('.menu-icon-link');
    const body = document.querySelector('body');

    it('has menu element hidden', function () {
      expect(menu).toBeDefined(true);
    });

    it('menu changes visibility on click', function () {
      menuLink.click();
      expect(body.classList.contains('menu-hidden')).toBe(false);
      menuLink.click();
      expect(body.classList.contains('menu-hidden')).toBe(true);
    }); // classList.contains NOT .hasClass intentional; wanted to use vanillaJS
  });

  describe('Initial Entries', function () {
    beforeEach(function (done) {
      loadFeed(0, function () {
        done();
      });
    });

    // found that Matthew Cranford had an excellent solution to
    // contain .feed class in a variable
    // but liked the toBeGreaterThan matcher used by
    // Benjamin Cunningham, and refactored with it
    // see the following for details:
    // https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/
    // https://medium.com/letsboot/testing-javascript-with-jasmine-basics-48efe03cf973
    it('loadFeed completes', function (done) {
      const feedEntry = document.querySelector('.feed').querySelectorAll('.entry-link');
      expect(feedEntry.length).toBeGreaterThan(0);
      done();
    });
  });

  describe('New Feed Selection', function () {
    let feed0Entries;
    let feed1Entries;
    let feedCT = document.querySelector('.feed.children.text');

    // found the advice from the forum to be most
    // effective for this, see:
    // https://discussions.udacity.com/t/feedreader-testing-async-test-question/865199
    beforeEach(function (done) {
      loadFeed(0, function () {
        feed0Entries = feedCT;
        done();
      });
      loadFeed(1, function () {
        feed1Entries = feedCT;
        done();
      });
    });

    it('content changes', function() {
      expect(feed0Entries).not.toBe(feed1Entries);
    });
  });
}());
