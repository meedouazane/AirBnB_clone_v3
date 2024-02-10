$(document).ready(function () {
  const selected = {};
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
  });
});
