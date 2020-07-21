'use strict';

let gallery1 = [];
let gallery2 = [];

$.getJSON( "data/page-1.json", function( data ) {
  data.forEach(element => {
    var image = new Img(element.image_url, element.title, element.description, element.keyword, element.horns)
    gallery1.push(image);
    });
  renderHello(gallery1, 1);
  populateOptions('#select1');
})

$.getJSON( "data/page-2.json", function( data ) {
  data.forEach(element => {
    var image = new Img(element.image_url, element.title, element.description, element.keyword, element.horns)
    gallery2.push(image);
  });
  renderHello(gallery2, 2);
  populateOptions('#select2');
})

function populateOptions(selectedTab) {
  let options = [];
  let selectOptions = [];

  if (selectedTab == '#select1') {
    selectOptions = gallery1;
  } else if (selectedTab == '#select2') {
    selectOptions = gallery2;
  }

  selectOptions.forEach(element => {
    if (!options.includes(element.keyword)){
      options.push(element.keyword);
      $(selectedTab).append(`<option value="${element.keyword}">${element.keyword}</option>`)
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
}

function renderHello(arr, tab) {
  let template = $('#template').html();
  arr.forEach(element => {
    let newImg = Mustache.render(template, element);

    if (tab == 1) {
      $('#tab1').append(newImg)
    } else if (tab == 2) {
      $('#tab2').append(newImg)
    }
  });
}

$('select').change(function(){
  var selectedHornClass = $(this).children("option:selected").val();
  filterHorns(selectedHornClass);
});

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

$('#horn1').click(function() {
    var byhorns = gallery1.slice(0);
    byhorns.sort(function(a,b) {
        return a.horns - b.horns;
    });
    $('#tab1').empty();
    renderHello(byhorns, 1);
});

$('#title1').click(function() {
    var bytitle = gallery1.slice(0);
    bytitle.sort(function(a,b) {
      var x = a.title.toLowerCase();
      var y = b.title.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
  });

  $('#tab2').empty();
  renderHello(bytitle, 2);
});

$('#horn2').click(function() {
  var byhorns = gallery2.slice(0);
  byhorns.sort(function(a,b) {
      return a.horns - b.horns;
  });
  $('#tab2').empty();
  renderHello(byhorns, 2);
});

$('#title2').click(function() {
  var bytitle = gallery2.slice(0);
  bytitle.sort(function(a,b) {
    var x = a.title.toLowerCase();
    var y = b.title.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
});

$('#tab2').empty();
renderHello(bytitle, 2);
});

// ----------------------- Tabs & Pagination ----------------------- //

function openTab(e, tab) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tab).style.display = "flex";
  e.currentTarget.className += " active";
}

let pastTab = "#div1";
function selectShow(tab) {
  $(pastTab).hide();
  $(tab).show();
  pastTab = tab;
}