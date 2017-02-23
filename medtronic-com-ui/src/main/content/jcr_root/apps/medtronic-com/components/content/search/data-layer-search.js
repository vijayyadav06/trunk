var dependencies = ["/apps/medtronic-com/components/common/DataLayer.js",
    "/apps/medtronic-com/components/common/JavaHelper.js"];

use(dependencies, function(dataLayer, JavaHelper) {
  var search = this.search;
  var tagManager = request.getResourceResolver().adaptTo(Packages.com.day.cq.tagging.TagManager);

  var filters = JavaHelper.toJSArray(search.searchCriteria || []);

  filters = filters.map(function(filterString) {
    return tagManager.resolve("medtronic-com:search-filters/" + filterString);
  }).filter(function(filterTag) {
    return filterTag != null;
  }).map(function(filterTag) {
    var tagId = JavaHelper.toJSString(filterTag.getTagID());
    tagId = tagId.slice("medtronic-com:search-filters/".length);
    
    var tagStr = "";
    if (tagId.indexOf("/") > -1) {
      tagStr = tagStr + filterTag.getParent().getTitle() + "|";
    }

    tagStr = tagStr + filterTag.getTitle();

    return tagStr;
  })

  dataLayer.search = {
    keyword: JavaHelper.toJSString(search.searchKeyword),
    results: JavaHelper.toJSString(search.searchResultsCount),
    pageType: JavaHelper.toJSString(search.searchResultsPageType)
  };

  dataLayer.filters = filters;
});