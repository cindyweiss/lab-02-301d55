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
  $newSection.find('img').attr('alt', this.title);
  // append to the main
  $('#page-template').append($newSection);
};



function loadPage(pageNum) {
  console.log('page num is', pageNum)
  $.ajax(`/data/page-${pageNum}.json`, { method: 'GET', dataType: 'JSON' })
    .then(data => {
      console.log(data);
      data.forEach((newPic) => {
        let pic = new Picture(newPic);
        pic.render();

      });
      populateFilter();
      generateDropDown();
    });
}

//create a function that populates the keyword filter.

function populateFilter() {
  allPicture.forEach(imgObj => {
    if (!pictureKeysArray.includes(imgObj.keyword)) {
      pictureKeysArray.push(imgObj.keyword);
    }
  });

}

function generateDropDown() {
  const selectEl = $('select');
  pictureKeysArray.forEach(keyword => {
    const $optionEl = $(`<option value = ${keyword}>${keyword}</option>`);
    selectEl.append($optionEl);
  });
}

$('select').on('change', showKeywordPic);
$('ul').on('click', handlePageClick);

function handlePageClick() {

  // clear the container 
  $('#page-template').empty();
  //console.log('i am working');
  let selectedPage = $(event.target).val();
  //console.log(selectedPage)
  if (selectedPage === 1) {
    console.log('you clicked  1')
    loadPage(1);
  } else if (selectedPage === 2) {
    console.log('you clicked  2')
    loadPage(2);
  }

  // IF page 1 is clicked load page 1
  // loadPage(1)

  // IF paga 2 is clicked load page 2
  // loadPage(2)

}


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


}
loadPage(1);

