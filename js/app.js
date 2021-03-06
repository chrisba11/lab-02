'use strict';

function Unicorn(unicornObject) {
  this.image_url = unicornObject.image_url;
  this.title = unicornObject.title;
  this.description = unicornObject.description;
  this.keyword = unicornObject.keyword;
  this.horns = unicornObject.horns;
  Unicorn.createKeywordArray(this.keyword);
}

Unicorn.createKeywordArray = function(keyword){
  if(!Unicorn.keywordArray.includes(keyword)){
    Unicorn.keywordArray.push(keyword);
  }
};

Unicorn.prototype.render = function() {
  $('main').append(this.toHTML());
};

Unicorn.readJson1 = () => {
  Unicorn.keywordArray = [];
  Unicorn.allUnicorns = [];
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(unicorn => {
        Unicorn.allUnicorns.push( new Unicorn(unicorn) );
      });
    })
    .then(Unicorn.loadUnicorns);
};

Unicorn.readJson2 = () => {
  Unicorn.keywordArray = [];
  Unicorn.allUnicorns = [];
  $.get('data/page-2.json', 'json')
    .then(data => {
      data.forEach(unicorn => {
        Unicorn.allUnicorns.push( new Unicorn(unicorn) );
      });
    })
    .then(Unicorn.loadUnicorns);
};

Unicorn.prototype.toHTML = function() {
  let $htmlTemplate = $('#unicorn-template').html();
  let templateRender = Handlebars.compile($htmlTemplate);
  return templateRender(this);
}

Unicorn.loadUnicorns = () => {
  $('select').empty ();
  $('select').append('<option value="default">Filter by Keyword</option>')
  $('main').empty();

  Unicorn.allUnicorns.forEach( unicorn => unicorn.render());
  Unicorn.keywordArray.forEach( keyword => {
    $('select').append(`<option>${keyword}</option>`);
  })
};

$('#page1').on('click', Unicorn.readJson1);
$('#page2').on('click', Unicorn.readJson2);

$('select').on('change', function() {
  let $selection = $(this).val();
  $('section').hide();
  $(`section[data-keyword="${$selection}"]`).show()
  if($selection === 'default'){
    $('section').show();
  }
});

$(() => Unicorn.readJson1());
