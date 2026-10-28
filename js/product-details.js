
(() => {
  const asset = name => `../assets/images/${name}`;

  /* Related products use the names, prices, ratings, and images shown in the reference. */
  const relatedItems = [
    { name: 'HAVIT HV-G92 Gamepad', price: '$120', oldPrice: '$160', reviews: '(88)', badge: '-40%', image: 'products/havit-hv-g92-gamepad.png' },
    { name: 'AK-900 Wired Keyboard', price: '$960', oldPrice: '$1160', reviews: '(75)', badge: '-35%', image: 'products/ak-900-wired-keyboard.png' },
    { name: 'IPS LCD Gaming Monitor', price: '$370', oldPrice: '$400', reviews: '(99)', badge: '-30%', image: 'products/ips-lcd-gaming-monitor.png' },
    { name: 'RGB liquid CPU Cooler', price: '$160', oldPrice: '$170', reviews: '(65)', badge: '', image: 'products/rgb-liquid-cpu-cooler.png' }
  ];

  /* Create a Tailwind-styled related product card from one data object. */
  function createRelatedCard(item) {
    const card = document.createElement('article');
    card.className = 'group min-w-0';
    card.innerHTML = `
      <div class="relative flex h-[228px] items-center justify-center overflow-hidden rounded bg-pale">
        <div class="flex h-full w-full items-center justify-center"><img class="h-[82%] w-[82%] object-contain" src="${asset(item.image)}" alt="${item.name}"></div>
        ${item.badge ? `<span class="absolute left-3 top-3 rounded bg-exclusive px-3 py-1 text-[12px] text-white">${item.badge}</span>` : ''}
        <div class="absolute right-3 top-3 flex flex-col gap-2"><button class="grid h-[34px] w-[34px] place-items-center rounded-full bg-white text-[22px]" type="button" aria-label="Add to wishlist">♡</button><button class="grid h-[34px] w-[34px] place-items-center rounded-full bg-white" type="button" aria-label="Quick view"><img class="h-[18px] w-[18px]" src="${asset('about/quick-view.png')}" alt=""></button></div>
        <a class="absolute bottom-0 left-0 w-full bg-black py-[10px] text-center text-[14px] text-white opacity-0 transition-opacity group-hover:opacity-100" href="cart.html">Add To Cart</a>
      </div>
      <h3 class="mb-[5px] mt-3 text-[14px] font-medium">${item.name}</h3>
      <p class="m-0 text-[14px] text-exclusive">${item.price} <span class="ml-[10px] text-[#7D8184] line-through">${item.oldPrice}</span></p>
      <div class="mt-1 flex items-center gap-2 text-[16px] text-[#FFAD33]" aria-label="Rated five stars">★★★★★ <small class="text-[12px] text-[#7D8184]">${item.reviews}</small></div>`;
    return card;
  }

  /* Render the reference's four related products from the array above. */
  function renderRelatedItems() {
    const container = document.getElementById('related-products');
    relatedItems.forEach(item => container.append(createRelatedCard(item)));
  }

  /* Replace the large gallery image when a thumbnail is selected. */
  function enableGallery() {
    const mainImage = document.getElementById('main-product-image');
    document.querySelectorAll('.gallery-thumb').forEach(button => button.addEventListener('click', () => {
      const thumbnail = button.querySelector('img');
      mainImage.src = thumbnail.src;
      mainImage.alt = 'Havic HV G-92 Gamepad';
      document.querySelectorAll('.gallery-thumb').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    }));
  }

  /* Keep the selected size visually active and exposed to assistive technology. */
  function enableSizeChoices() {
    document.querySelectorAll('.size-choice').forEach(button => button.addEventListener('click', () => {
      document.querySelectorAll('.size-choice').forEach(choice => {
        choice.classList.remove('border-exclusive', 'bg-exclusive', 'text-white');
        choice.classList.add('border-[#999999]');
        choice.setAttribute('aria-pressed', 'false');
      });
      button.classList.remove('border-[#999999]');
      button.classList.add('border-exclusive', 'bg-exclusive', 'text-white');
      button.setAttribute('aria-pressed', 'true');
    }));
  }

  /* Increase or decrease the quantity while keeping it at one or more. */
  function enableQuantity() {
    const output = document.getElementById('quantity-value');
    document.getElementById('quantity-minus').addEventListener('click', () => {
      output.value = Math.max(1, Number(output.value) - 1);
      output.textContent = output.value;
    });
    document.getElementById('quantity-plus').addEventListener('click', () => {
      output.value = Number(output.value) + 1;
      output.textContent = output.value;
    });
  }

  /* Toggle the outline heart to a filled red heart for the selected product. */
  function enableWishlistButton() {
    const button = document.getElementById('product-wishlist');
    button.addEventListener('click', () => {
      const selected = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(selected));
      button.textContent = selected ? '♥' : '♡';
      button.classList.toggle('text-exclusive', selected);
    });
  }

  renderRelatedItems();
  enableGallery();
  enableSizeChoices();
  enableQuantity();
  enableWishlistButton();
})();
