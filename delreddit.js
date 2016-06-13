var page = require('webpage').create();
page.viewportSize = { width: 1024, height: 768 };
console.log('starting reddit.com comment history eraser...');

page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};

page.open('https://www.reddit.com', function(status) {
    console.log('visited reddit.com... status ' + status);

    setTimeout(function(){
      page.evaluate(function() {
        var e = $('#login_login-main')
        e.children().get(1).value='YOURUSERNAMEHERE';
      e.children().get(2).value='YOURPASSWORDHERE';
      e.submit();
      });
      console.log('step 1, logging in...');
      page.render(new Date().toISOString()+'.png');
    }, 10);

    setTimeout(function(){
      page.evaluate(function() {
        //click on your user name
        $('.user a').get(0).click()
      });

      console.log('step 2, visiting comment page...');
      page.render(new Date().toISOString()+'.png');
    }, 3000);


setInterval(function(){
  page.evaluate(function() {
    var newText = function(){
      var t = ['I','am','jupiter','monster','pidgeon','hammer','girls','viagra','pizza','topolino','del','con','per','il',',',':','!!!','tadaan','napoli','pleonasmo','enable','scrub','pop','push','lorem','Sanders','Trump','Microsoft'];
      var r = t[Math.floor(Math.random()*t.length)] + ' ';
      while(Math.random()>0.1) r+= t[Math.floor(Math.random()*t.length)] + ' ';
      return r;
    };
    var ini = 0;
    setInterval(function(){
      if(ini >= $('.edit-usertext').length){
        console.log('DONE');
        return;
      }
      var s = $('.edit-usertext').get(ini);
      console.log('DELETING COMMENT',ini, s);
      console.log('content: ' + $(s.parentElement.parentElement.parentElement).find('textarea').get(0).value);
      $(s.parentElement.parentElement.parentElement).find('textarea').get(0).value = newText();
      $(s.parentElement.parentElement.parentElement).find('button').get(0).click();
      ini++;
    }, 1000);

  });
  page.render(new Date().toISOString()+'.png');
}, 9000);

setInterval(function(){
  page.evaluate(function(){
    $('.nextprev a').get(0).click();
  });
console.log('deleting a new page...');
      page.render(new Date().toISOString()+'.png');
}, 10000 + 25000)



//phantom.exit();
});
