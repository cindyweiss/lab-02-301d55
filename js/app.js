'use strict';

let allPicture = [];


function Picture(picObj) {
  this.image_url = picObj.image_url;
  this.title = picObj.title;
  this.description = picObj.description;
  this.keyword = picObj.keyword;
  this.horns = picObj.horns;
  allPicture.push(this);
}


Picture.prototype.render = function () {

  //select all html in photo-template

  const myTemplate = $('#photo-template').html();

  // make a new section

  const $newSection = $('<section></section>');

  //put the html for photo-template inside a new section tag.

  $newSection.html(myTemplate);

  //find all elemnets and populate them

  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.title);
  // append to the main
  $('main').append($newSection);
};







$.ajax('/data/page-1.json', { method: 'GET', dataType: 'JSON' })
  .then(data => {
    data.forEach((newPic) => {
      let pic = new Picture(newPic);
      pic.render();
    });

  });
