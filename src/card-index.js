//Text Cards
document.addEventListener('DOMContentLoaded', function() {
  // Get all card items
  const cardItems = document.querySelectorAll('.cards_list .cards_item');

  // Show elements with data-card-number-divider and data-card-number-total attributes if there are more than 3 cards
  if (cardItems.length === 3) {
    document.querySelectorAll('[data-card-number-divider], [data-card-number-total]').forEach(function(element) {
      element.style.display = 'none'; // hide divider between the numbers
    });
  }

  // Set the total number of cards
  document.querySelectorAll('[data-card-number-total]').forEach(function(element) {
    element.textContent = cardItems.length;
  });

  // Update the current card number for each card
  cardItems.forEach(function(card, index) {
    const currentNumberElement = card.querySelector('[data-card-number-current]');
    if (currentNumberElement) {
      currentNumberElement.textContent = index + 1; // Adding 1 since index start from 0
    }
  });
});
