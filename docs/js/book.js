/**
 * Created by rain on 7/29/2016.
 */
$(".books").each(function(index, courses) {
  var gid = $(this).attr("gid");
  var rootDom = this;
  getJSONFromGoogleSpreadsheet(gid, function (books) {
    _.each(books, function (book) {
      //noinspection JSUnresolvedVariable
      var bookDom =
        '<div class="book">' +
        '  <div class="thumb">' +
        '  <img src="' + book.image + '">' +
        '  </div>' +
        '  <div class="description">' +
        '    <a target="_blank" href="' + book.url + '" class="title">' + book.name + '</a><br/>' +
        '    <i class="author">by ' + book.author + '</i><br/>' +
        '    <span class="published">Published ' + book.datepublished + '</span>' +
        '  </div>' +
        '</div>';
      $(rootDom).append(bookDom);
    });
  });
});
