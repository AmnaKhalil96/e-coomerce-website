
(() => {
  const rows = document.getElementById('cart-items');
  const subtotalLabel = document.getElementById('cart-subtotal');
  const totalLabel = document.getElementById('cart-total');

  /* Recalculate each row amount and the shared cart subtotal/total. */
  function updateCartTotals() {
    let total = 0;
    rows.querySelectorAll('.cart-row').forEach(row => {
      const price = Number(row.dataset.price);
      const quantity = Math.max(1, Number(row.querySelector('.cart-quantity').value) || 1);
      row.querySelector('.cart-quantity').value = quantity;
      const lineTotal = price * quantity;
      row.querySelector('.cart-subtotal').textContent = `$${lineTotal}`;
      total += lineTotal;
    });
    subtotalLabel.textContent = `$${total}`;
    totalLabel.textContent = `$${total}`;
  }

  rows.querySelectorAll('.cart-quantity').forEach(input => input.addEventListener('change', updateCartTotals));
  rows.querySelectorAll('.remove-cart-item').forEach(button => button.addEventListener('click', () => {
    button.closest('.cart-row').remove();
    updateCartTotals();
  }));
  document.getElementById('update-cart').addEventListener('click', updateCartTotals);

  /* Explain that coupon entry is local only; no discount is invented. */
  document.getElementById('coupon-form').addEventListener('submit', event => {
    event.preventDefault();
    const code = document.getElementById('coupon-code').value.trim();
    const feedback = document.getElementById('coupon-message');
    feedback.textContent = code ? 'Coupon validation is not connected.' : 'Enter a coupon code.';
    feedback.classList.remove('hidden');
  });

  updateCartTotals();
})();
