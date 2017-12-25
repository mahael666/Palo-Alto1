$(document).ready(function () {

  $.ajax({
    url: './mockapi/getAllArticles.json',
    success: function(data) {
      this.articles = $('.js-articles');
      var self = this;

      if (data.articles && data.articles.length) {
        data.articles.forEach(function(article) {
          self.articles.append(
            blocks.templates['article'](article)
          );
        });
      }
    }
  });

});
