'use strict';

function Unicorn(unicornObject) {
  this.image_url = unicornObject.image_url;
  this.title = unicornObject.title;
  this.description = unicornObject.description;
  this.keyword = unicornObject.keyword;
  this.horns = unicornObject.horns;
}

Unicorn.allUnicorns = [];

Unicorn.prototype.render = function() {
  $('main').append('<section class ="clone"></section>');
  const $unicornClone = $('section[class="clone"]');
  const $unicornHtml = $('#photo-template').html();
  $unicornClone.html($unicornHtml);

  $unicornClone.find('h2').text(this.title);
  $unicornClone.find('img').attr('src', this.image_url);
  $unicornClone.find('p').text(this.description);
  $unicornClone.removeClass('clone');
  $unicornClone.addClass(this.title);
};

Unicorns.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(unicorn => {
        Unicorns.allUnicorns.push( new Unicorn(unicorn) );
      });
    })
    .then(Unicorn.loadUnicorns);
};

Unicorn.loadUnicorns = () => {
  Unicorn.allUnicorns.forEach( unicorn => unicorn.render());
};

$(() => Unicorn.readJson());