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
  $('#filter').empty ();
  $('#filter').append('<option value="default">Filter by Keyword</option>');
  Unicorn.keywordArray.forEach( keyword => {
    $('#filter').append(`<option>${keyword}</option>`);
  })
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
  $('#filter').empty ();
  $('#filter').append('<option value="default">Filter by Keyword</option>');
  Unicorn.keywordArray.forEach( keyword => {
    $('#filter').append(`<option>${keyword}</option>`);
  })
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

Unicorn.allUnicorns = [];

Unicorn.loadUnicorns = () => {
  $('main').empty();
  Unicorn.allUnicorns.forEach( unicorn => unicorn.render());
};


$('#page1').on('click', Unicorn.readJson1);
$('#page2').on('click', Unicorn.readJson2);

$('#filter').on('change', function() {
  let $selection = $(this).val();
  $('section').hide();
  $(`section[data-keyword="${$selection}"]`).show()
  if($selection === 'default'){
    $('section').show();
  }
});

$('#sort').on('change', function() {
  let $selection = $(this).val();
  if($selection === 'title') {
    Unicorn.allUnicorns.sort( (a,b) => (a.title.localeCompare(b.title)));
  } else if ($selection === 'horns'){
    Unicorn.allUnicorns.sort((a,b) => (a.horns - b.horns));
  }
  Unicorn.loadUnicorns();
  let $filter = $('#filter').val();
  $('section').hide();
  $(`section[data-keyword="${$filter}"]`).show()
});


$(() => Unicorn.readJson1());
