$(document).ready(function () {
  const selected = {};
  const ids = [];
  let search = {};
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      selected[amenityId] = amenityName;
    } else {
      delete selected[amenityId];
    }
    $('.amenities h4').empty();
    for (const i in selected) {
      $('.amenities h4').append(selected[i] + ', ');
    }
    $('#ids').append(amenityId);
    ids.push(amenityId);
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
    search = { amenities: ids };
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
