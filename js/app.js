'use strict';

let gallery = [];

$.getJSON( "data/page-1.json", function( data ) {
  data.forEach(element => {
    new Img(element.image_url, element.title, element.description, element.keyword, element.horns)
  });
  render(gallery);
  populateOptions();
})

function populateOptions() {
  let options = [];
  gallery.forEach(element => {
    if (!options.includes(element.keyword)){
      options.push(element.keyword);
      $('select').append(`<option value="${element.keyword}">${element.keyword}</option>`)
    }
  });
  $('option').css('textTransform', 'capitalize');
}

function Img(url, title, desc, keyword, horns) {
  this.url = url;
  this.title = title;
  this.desc = desc;
  this.keyword = keyword;
  this.horns = horns;

  gallery.push(this);
}

function render(arr) {

  arr.forEach(element => {
    let template = $('<section></section>');
    template.attr('class', element.keyword)
  
    let innerHtml = `
    <h2>${element.title}</h2>
    <img src="${element.url}" alt="${element.keyword}">
    <p>${element.desc}</p>`;
    template.append(innerHtml);
  
    $('main').append(template)
  });
}

$('select').change(function(){
  var selectedHornClass = $(this).children("option:selected").val();
  filterHorns(selectedHornClass);
});

// Img.prototype.render = function() {
//   let template = $('#photo-template').clone().removeAttr('id');
//   template.empty();
//   template.attr('class', this.keyword)

//   let innerHtml = `
//   <h2>${this.title}</h2>
//   <img src="${this.url}" alt="${this.keyword}">
//   <p>${this.desc}</p>`;
//   template.append(innerHtml);

//   $('main').append(template)
// }

// $('select').change(function(){
//   var selectedHornClass = $(this).children("option:selected").val();
//   filterHorns(selectedHornClass);
// });

function filterHorns(selected){
  let horns  = $('section');  
  jQuery.each(horns, function( i, val ) {
    if (!(val.classList.value == selected)){
      $(val).hide(400);
    } else {
      $(val).show(400);
    }
  })

  if (selected == 'default'){
    $(horns).show(400);
    $(horns).first().hide();
  }
}

console.log(gallery);

let btn1 = $(`<button>Sort by horn number</button>`)
$('select').after(btn1);
$(btn1).click(function() {
    var byhorns = gallery.slice(0);
    byhorns.sort(function(a,b) {
        return a.horns - b.horns;
    });
    $('main').empty();
    render(byhorns);
    console.log(byhorns);
});

let btn2 = $(`<button >Sort by tilte</button>`)
$('select').after(btn2);
$(btn2).click(function() {
    var bytitle = gallery.slice(0);
    bytitle.sort(function(a,b) {
      var x = a.title.toLowerCase();
      var y = b.title.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
  });
  $('main').empty();
    render(bytitle);
    console.log(bytitle);
});
