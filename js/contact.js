
(() => {
  const form = document.getElementById('contact-form');
  const name = document.getElementById('contact-name');
  const email = document.getElementById('contact-email');
  const phone = document.getElementById('contact-phone');
  const message = document.getElementById('contact-message');
  const feedback = document.getElementById('contact-feedback');

  /* Check the required details and show the first error beside the form. */
  function validateContact(event) {
    event.preventDefault();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    const digits = phone.value.replace(/\D/g, '');
    const phoneValid = /^[+\d().\s-]+$/.test(phone.value.trim()) && digits.length >= 7 && digits.length <= 15;
    let error = '';
    if (!name.value.trim()) error = 'Enter your name.';
    else if (!email.value.trim()) error = 'Enter your email address.';
    else if (!emailValid) error = 'Enter a valid email address.';
    else if (!phone.value.trim()) error = 'Enter your phone number.';
    else if (!phoneValid) error = 'Enter a valid phone number.';
    else if (!message.value.trim()) error = 'Enter your message.';

    feedback.textContent = error || 'Your message is ready. Sending messages is not connected.';
    feedback.classList.remove('hidden', 'text-exclusive', 'text-[#168A4A]');
    feedback.classList.add(error ? 'text-exclusive' : 'text-[#168A4A]');
    if (error) {
      if (!name.value.trim()) name.focus();
      else if (!email.value.trim() || !emailValid) email.focus();
      else if (!phone.value.trim() || !phoneValid) phone.focus();
      else message.focus();
    }
  }

  form.addEventListener('submit', validateContact);
  [name, email, phone, message].forEach(field => field.addEventListener('input', () => feedback.classList.add('hidden')));
})();
