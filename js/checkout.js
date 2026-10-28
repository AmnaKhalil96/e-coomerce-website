
(() => {
  const form = document.getElementById('checkout-form');
  const feedback = document.getElementById('checkout-feedback');
  const requiredFields = [
    ['billing-first-name', 'Enter your first name.'],
    ['billing-address', 'Enter your street address.'],
    ['billing-city', 'Enter your town or city.'],
    ['billing-phone', 'Enter your phone number.'],
    ['billing-email', 'Enter your email address.']
  ];

  /* Validate required billing information and report the first issue. */
  function validateCheckout(event) {
    event.preventDefault();
    let error = '';
    let invalidField = null;
    for (const [id, message] of requiredFields) {
      const field = document.getElementById(id);
      if (!field.value.trim()) {
        error = message;
        invalidField = field;
        break;
      }
    }
    const email = document.getElementById('billing-email');
    const phone = document.getElementById('billing-phone');
    if (!error && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      error = 'Enter a valid email address.';
      invalidField = email;
    }
    const digits = phone.value.replace(/\D/g, '');
    if (!error && (!/^[+\d().\s-]+$/.test(phone.value.trim()) || digits.length < 7 || digits.length > 15)) {
      error = 'Enter a valid phone number.';
      invalidField = phone;
    }
    feedback.textContent = error || 'Checkout is not connected to an order service.';
    feedback.classList.remove('hidden');
    if (error) invalidField.focus();
  }

  /* Validate billing fields when Place Order is pressed. */
  form.addEventListener('submit', validateCheckout);

  /* Show local-only feedback for the coupon form without inventing a discount. */
  document.getElementById('checkout-coupon').addEventListener('submit', event => {
    event.preventDefault();
    const code = document.getElementById('checkout-coupon-code').value.trim();
    feedback.textContent = code ? 'Coupon validation is not connected.' : 'Enter a coupon code.';
    feedback.classList.remove('hidden');
  });

  /* Hide feedback once the user edits any billing field or coupon value. */
  [...requiredFields.map(([id]) => document.getElementById(id)), document.getElementById('checkout-coupon-code')]
    .forEach(field => field.addEventListener('input', () => feedback.classList.add('hidden')));
})();
