var clearBinds = function() {
  $(document).off("receivedHypothesis");
  $(document).off("finishedSpeaking");
  $('.content-container').off('click', '.backup-start');
  $('.content-container').off('click', '.backup-next');
  $('.content-container').off('click', '.backup-repeat');
  $('.content-container').off('click', '.backup-off');
};

$.fn.stars = function() {
  return $(this).each(function() {
    $(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * 16));
  });
}