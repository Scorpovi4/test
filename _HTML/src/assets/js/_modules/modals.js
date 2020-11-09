export function modal(contentAdded) {
  // Инициализация модальных окон
  $('[data-modal]').magnificPopup({
    type: 'ajax',
    callbacks: {
      ajaxContentAdded: contentAdded,
    },
  });
}
