$(document).ready(function () {
  const selected = {};
  const cities = {};
  const state = {};
  const ids = [];
  const citiesids = [];
  const stateids = [];
  let search = {};

  $('.amenities input[type="checkbox"]').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      selected[id] = name;
    } else {
      delete selected[id];
    }

    $('.amenities h4').empty();
    for (const i in selected) {
      $('.amenities h4').append(selected[i] + ', ');
    }

    $('#ids').append(id);
    ids.push(id);
  });
  $('.locations .cities input[type="checkbox"]').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      cities[id] = name;
    } else {
      delete cities[id];
    }
    $('.locations h4').empty();
    for (const t in cities) {
      $('.locations h4').append(cities[t] + ', ');
    }

    $('#citiesids').append(id);
    citiesids.push(id);
  });
  $('.locations .state input[type="checkbox"]').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      state[id] = name;
    } else {
      delete state[id];
    }
    $('.locations h4').empty();
    for (const j in state) {
      $('.locations h4').append(state[j] + ', ');
    }

    $('#stateids').append(id);
    stateids.push(id);
  });

  $.ajax({
    method: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function (json) {
      $('#api_status').addClass('available');
    },
    error: function (json) {
      $('#api_status').removeClass('available');
    }
  });

  $('#Search').click(function () {
    search = { cities: citiesids, amenities: ids, states: stateids };
    $.ajax({
      method: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify(search),
      dataType: 'json',
      success: function (places) {
        const placesContainer = $('section.places');
        for (const place of places) {
          const article = $('<article>');
          article.append(
            $('<div>').addClass('title_box')
              .append($('<h2>').html(place.name))
              .append($('<div>').addClass('price_by_night').html('$' + place.price_by_night))
          );
          article.append(
            $('<div>').addClass('information')
              .append($('<div>').addClass('max_guest').html(place.max_guest))
              .append($('<div>').addClass('number_rooms').html(place.number_rooms))
              .append($('<div>').addClass('number_bathrooms').html(place.number_bathrooms))
          );
          article.append($('<div>').addClass('description').html(place.description));
          placesContainer.append(article);
        }
      }
    });
  });
});
