'use strict'

let handlePics = [];

function handle(picObj) {
  this.image_url = picObj.image_url;
  this.title = picObj.title;
  this.description = picObj.description;
  this.keyword = picObj.keyword;
  this.horns = picObj.horns;

  handlePics.push(this);
}

handlePics.forEach(newArray => {
  console.log('newArray: ', newArray);


}
)

