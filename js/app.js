'use strict';

let allPicture = [];
let pictureKeysArray = [];
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
  $newSection.find('img').attr('class', this.keyword);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.title );
  // append to the main
  $('main').append($newSection);
};


$.ajax('/data/page-1.json', { method: 'GET', dataType: 'JSON' })
  .then(data => {
    data.forEach((newPic) => {
      let pic = new Picture(newPic);
      pic.render();

    });
    populateFilter();
    generateDropDown();
  });



//create a function that populates the keyword filter.

function populateFilter () {
  allPicture.forEach(imgObj => {
    if (!pictureKeysArray.includes(imgObj.keyword)) {
      pictureKeysArray.push(imgObj.keyword);
    }
  });

}

function generateDropDown () {
  const selectEl = $('select');
  pictureKeysArray.forEach(keyword => {
    const $optionEl = $(`<option value = ${keyword}>${keyword}</option>`);
    selectEl.append($optionEl);
  });
}

$('select').on('change', showKeywordPic);

function showKeywordPic() {
  // get rid of everything is there now
  $('h2').hide();
  $('p').hide();
  $('img').hide();
  // $('section').hide;

  // only show image with the shosen keywirds
  let select = $(this).val();
  console.log(select);
  $(`.${select}`).show();

  if($('default').show());
}



