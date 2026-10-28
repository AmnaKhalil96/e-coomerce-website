
(() => {
  const savedItems = document.getElementById('saved-items');
  const heading = document.getElementById('wishlist-heading');
  const moveAllButton = document.getElementById('move-all');

  /* Update the saved-item heading after a wishlist card is removed. */
  function updateWishlistCount() {
    const count = savedItems.querySelectorAll('.wishlist-card').length;
    heading.textContent = `Wishlist (${count})`;
  }

  /* Remove the selected card and refresh the count displayed in the heading. */
  function removeWishlistItem(button) {
    button.closest('.wishlist-card')?.remove();
    updateWishlistCount();
  }

  /* Mark an add-to-cart action locally without claiming a server-side purchase. */
  function markMoved(button) {
    button.querySelector('img')?.classList.add('hidden');
    button.textContent = 'Added To Cart';
    button.setAttribute('aria-pressed', 'true');
  }

  savedItems.querySelectorAll('.remove-item').forEach(button => button.addEventListener('click', () => removeWishlistItem(button)));
  document.querySelectorAll('.move-item').forEach(button => button.addEventListener('click', () => markMoved(button)));

  /* Apply the visible move action to every saved item from the toolbar. */
  moveAllButton.addEventListener('click', () => {
    savedItems.querySelectorAll('.move-item').forEach(markMoved);
    moveAllButton.textContent = 'Moved To Bag';
    moveAllButton.setAttribute('aria-pressed', 'true');
  });
})();
