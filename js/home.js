
(() => {
  
  const projectRoot = new URL('../', document.currentScript.src);
  const image = filename => new URL(`assets/images/${filename}`, projectRoot).href;

  /* Product data follows the names, prices, ratings, and image order in the reference. */
  const products = {
    flash: [
      { name: 'HAVIT HV-G92 Gamepad', price: '120', oldPrice: '160', reviews: '(88)', badge: '-40%', image: 'products/havit-hv-g92-gamepad.png' },
      { name: 'AK-900 Wired Keyboard', price: '960', oldPrice: '1160', reviews: '(75)', badge: '-35%', image: 'products/ak-900-wired-keyboard.png' },
      { name: 'IPS LCD Gaming Monitor', price: '370', oldPrice: '400', reviews: '(99)', badge: '-30%', image: 'products/ips-lcd-gaming-monitor.png' },
      { name: 'S-Series Comfort Chair', price: '375', oldPrice: '400', reviews: '(99)', badge: '-25%', image: 'products/s-series-comfort-chair.png' },
      { name: 'S-Series Comfort Chair', price: '375', oldPrice: '400', reviews: '(99)', badge: '-25%', image: 'products/s-series-comfort-chair.png' }
    ],
    browse: [
      { name: 'The north coat', price: '260', oldPrice: '360', reviews: '(65)', image: 'products/the-north-coat.png' },
      { name: 'Gucci duffle bag', price: '960', oldPrice: '1160', reviews: '(65)', image: 'products/gucci-duffle-bag.png' },
      { name: 'RGB liquid CPU Cooler', price: '160', oldPrice: '170', reviews: '(65)', image: 'products/rgb-liquid-cpu-cooler.png' },
      { name: 'Small Bookshelf', price: '360', oldPrice: '400', reviews: '(65)', image: 'products/small-bookshelf.png' }
    ],
    explore: [
      { name: 'Breed Dry Dog Food', price: '100', reviews: '(35)', image: 'products/breed-dry-dog-food.jpg' },
      { name: 'CANON EOS DSLR Camera', price: '360', reviews: '(95)', image: 'products/canon-eos-dslr-camera.png' },
      { name: 'ASUS FHD Gaming Laptop', price: '700', reviews: '(325)', image: 'products/asus-fhd-gaming-laptop.png' },
      { name: 'Curology Product Set', price: '500', reviews: '(145)', image: 'products/curology-product-set.png' },
      { name: 'Kids Electric Car', price: '960', reviews: '(65)', badge: 'NEW', image: 'products/kids-electric-car.png', colors: ['#DB4444', '#DB4444'] },
      { name: 'Jr. Zoom Soccer Cleats', price: '1160', reviews: '(35)', image: 'products/jr-zoom-soccer-cleats.png', colors: ['#DBDB00', '#DB4444'] },
      { name: 'GP11 Shooter USB Gamepad', price: '660', reviews: '(55)', badge: 'NEW', image: 'products/gp11-shooter-gamepad.png', colors: ['#111111', '#DB4444'] },
      { name: 'Quilted Satin Jacket', price: '660', reviews: '(55)', image: 'products/quilted-satin-jacket.png', colors: ['#5E8A83', '#DB4444'] }
    ]
  };

  /* Build an image, details, and responsive actions for one product. */
  function createProductCard(item, rowId) {
    const card = document.createElement('article');
    const isExploreCard = rowId === 'explore-track';
    // Responsive rails peek on touch screens; the product grid fills its own columns.
    card.className = isExploreCard
      ? 'group grid min-w-0 grid-cols-1 lg:grid-cols-[max-content_1fr] lg:gap-x-2'
      : 'group min-w-[70%] w-[72vw] shrink-0 sm:min-w-[45%] sm:w-[45vw] md:min-w-[30%] md:w-[30vw] xl:min-w-[270px] xl:w-[270px]';

    const detailGrid = isExploreCard;
    const imageClasses = 'h-[82%] w-[82%] object-contain max-lg:h-full max-lg:w-full max-lg:p-3';
    const productImage = item.name === 'HAVIT HV-G92 Gamepad'
      ? '<a class="flex h-full w-full items-center justify-center xl:h-[82%] xl:w-[82%]" href="pages/product-details.html"><img class="' + imageClasses + '" src="' + image(item.image) + '" alt="' + item.name + '"></a>'
      : '<img class="' + imageClasses + '" src="' + image(item.image) + '" alt="' + item.name + '">';
    const productName = item.name === 'HAVIT HV-G92 Gamepad'
      ? '<a href="pages/product-details.html">' + item.name + '</a>'
      : item.name;
    const badge = item.badge
      ? '<span class="absolute left-2 top-2 rounded bg-exclusive px-2 py-1 text-[10px] text-white sm:left-3 sm:top-3 sm:px-3 sm:text-[12px] ' + (item.badge === 'NEW' ? 'bg-music text-black' : '') + '">' + item.badge + '</span>'
      : '';
    const swatches = item.colors
      ? '<div class="mt-1 flex gap-1 lg:col-span-2 lg:row-start-4">' + item.colors.map(color => '<span class="h-[14px] w-[14px] rounded-full border border-[#999999]" style="background-color:' + color + '" aria-label="Color option"></span>').join('') + '</div>'
      : '';
    const exploreImageLayout = detailGrid ? 'lg:col-span-2' : '';
    const exploreNameLayout = detailGrid ? 'lg:col-span-2' : '';
    const explorePriceLayout = detailGrid ? 'lg:col-start-1 lg:row-start-3' : '';
    const exploreRatingLayout = detailGrid ? 'lg:col-start-2 lg:row-start-3 lg:mt-0' : '';

    card.innerHTML =
      '<div class="relative flex h-[170px] min-w-0 items-center justify-center bg-pale p-2 sm:h-[210px] xl:h-[250px] xl:p-0 ' + exploreImageLayout + '">' +
      productImage + badge +
      '<div class="absolute right-2 top-2 grid gap-2 sm:right-3 sm:top-3 sm:gap-[9px]">' +
      '<button class="heart flex h-7 w-7 items-center justify-center rounded-full bg-white sm:h-[34px] sm:w-[34px]" type="button" aria-label="Add to wishlist"><img class="h-[18px] w-[18px]" src="' + image('shared/heart-outline.png') + '" alt=""></button>' +
      '<button class="flex h-7 w-7 items-center justify-center rounded-full bg-white sm:h-[34px] sm:w-[34px]" type="button" aria-label="View product"><img class="h-[18px] w-[18px]" src="' + image('shared/quick-view.png') + '" alt=""></button>' +
      '</div><button class="absolute bottom-0 left-0 w-full whitespace-nowrap bg-black py-2 text-center text-sm text-white opacity-0 transition-opacity group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 xl:h-[42px] xl:pt-[10px]" type="button">Add To Cart</button></div>' +
      '<h3 class="mb-1 mt-2 min-w-0 line-clamp-2 text-sm font-medium leading-snug sm:mb-[5px] sm:mt-3 sm:text-base xl:text-[16px] xl:leading-[1.5] ' + exploreNameLayout + '">' + productName + '</h3>' +
      '<div class="whitespace-nowrap font-medium text-exclusive xl:text-[16px] ' + explorePriceLayout + '">$' + item.price + (item.oldPrice ? '<span class="ml-2 text-[#777777] line-through sm:ml-[10px]">$' + item.oldPrice + '</span>' : '') + '</div>' +
      '<div class="mt-1 flex min-w-0 items-center gap-1.5 sm:mt-[6px] sm:gap-[7px] ' + exploreRatingLayout + '"><img class="h-4 w-20 shrink-0 object-contain sm:h-5 sm:w-[100px]" src="' + image('shared/five-stars.png') + '" alt="Five stars"><small class="whitespace-nowrap text-[11px] text-[#777777] sm:text-[12px]">' + item.reviews + '</small></div>' +
      swatches;

    // Toggle the saved state with the supplied outline and filled heart icons.
    card.querySelector('.heart').addEventListener('click', event => {
      const button = event.currentTarget;
      const icon = button.querySelector('img');
      const active = button.classList.toggle('text-exclusive');
      icon.src = image(active ? 'shared/wishlist-heart-filled.png' : 'shared/heart-outline.png');
      icon.classList.toggle('brightness-0', active);
      icon.classList.toggle('sepia', active);
    });
    return card;
  }

  /* Render the data arrays into their corresponding horizontal rows and grid. */
  function renderProductRows() {
    const collections = [
      ['flash-track', products.flash],
      ['browse-track', products.browse],
      ['explore-track', products.explore]
    ];
    collections.forEach(([id, items]) => {
      const row = document.getElementById(id);
      items.forEach(item => row?.append(createProductCard(item, id)));
    });
  }

  /* Measure card width and gap for arrows so distances follow each responsive row. */
  function enableProductArrows() {
    document.querySelectorAll('[data-scroll]').forEach(button => {
      button.addEventListener('click', () => {
        const row = document.getElementById(button.dataset.scroll);
        if (!row) return;
        if (row.id === 'flash-track') {
          const step = getCardStep(row);
          const end = Math.max(0, row.scrollWidth - row.clientWidth);
          const nextPosition = Math.max(0, Math.min(end, row.scrollLeft + Number(button.dataset.dir) * step));
          row.scrollTo({ left: nextPosition, behavior: 'smooth' });
          flashAutoSlide?.resetTimer();
          return;
        }
        row.scrollBy({ left: Number(button.dataset.dir) * getCardStep(row), behavior: 'smooth' });
      });
    });
  }

  /* Measure one card plus its flex gap for Flash Sales movement. */
  function getCardStep(trackElement) {
    const firstCard = trackElement.firstElementChild;
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 270;
    const gap = Number.parseFloat(window.getComputedStyle(trackElement).columnGap) || 30;
    return cardWidth + gap;
  }

  /* Automatically advance one Flash Sales card, pausing during hover and pointer interaction. */
  function startAutoSlide(trackElement, intervalMs) {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches) return null;

    let timerId = null;
    let isHovered = false;
    let isInteracting = false;

    /* Clear the active timer whenever the row is paused or its timer is reset. */
    function clearSlideTimer() {
      if (timerId !== null) {
        window.clearInterval(timerId);
        timerId = null;
      }
    }

    /* Move to the end without overshooting, then smoothly return to the start. */
    function advanceSlide() {
      const endPosition = Math.max(0, trackElement.scrollWidth - trackElement.clientWidth);
      if (endPosition <= 0) return;
      if (trackElement.scrollLeft >= endPosition - 1) {
        trackElement.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }
      trackElement.scrollTo({
        left: Math.min(endPosition, trackElement.scrollLeft + getCardStep(trackElement)),
        behavior: 'smooth'
      });
    }

    /* Start exactly one interval only when the user is not interacting with the row. */
    function scheduleSlideTimer() {
      clearSlideTimer();
      if (!isHovered && !isInteracting) timerId = window.setInterval(advanceSlide, intervalMs);
    }

    trackElement.addEventListener('mouseenter', () => {
      isHovered = true;
      clearSlideTimer();
    });
    trackElement.addEventListener('mouseleave', () => {
      isHovered = false;
      scheduleSlideTimer();
    });
    trackElement.addEventListener('pointerdown', () => {
      isInteracting = true;
      clearSlideTimer();
    });
    window.addEventListener('pointerup', () => {
      isInteracting = false;
      scheduleSlideTimer();
    });
    window.addEventListener('pointercancel', () => {
      isInteracting = false;
      scheduleSlideTimer();
    });
    scheduleSlideTimer();

    return { resetTimer: scheduleSlideTimer };
  }

  /* Select the active hero dot while keeping the single reference slide unchanged. */
  function enableHeroDots() {
    const dots = [...document.querySelectorAll('.hero-dot')];
    function selectDot(activeIndex) {
      dots.forEach((dot, index) => {
        dot.classList.toggle('bg-exclusive', index === activeIndex);
        dot.classList.toggle('bg-[#888888]', index !== activeIndex);
        if (index === activeIndex) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }
    dots.forEach((dot, index) => dot.addEventListener('click', () => selectDot(index)));
    let activeIndex = 0;
    window.setInterval(() => {
      activeIndex = (activeIndex + 1) % dots.length;
      selectDot(activeIndex);
    }, 4000);
  }

  /* Run a live countdown from the values shown in the reference image. */
  function startCountdown(element, initialSeconds) {
    let secondsRemaining = initialSeconds;
    function updateCountdown() {
      const values = {
        days: Math.floor(secondsRemaining / 86400),
        hours: Math.floor((secondsRemaining % 86400) / 3600),
        minutes: Math.floor((secondsRemaining % 3600) / 60),
        seconds: secondsRemaining % 60
      };
      Object.entries(values).forEach(([unit, value]) => {
        const field = element.querySelector(`[data-time="${unit}"]`);
        if (field) field.textContent = String(value).padStart(2, '0');
      });
      secondsRemaining = secondsRemaining > 0 ? secondsRemaining - 1 : initialSeconds;
    }
    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  }

  function enableCountdowns() {
    const flash = document.querySelector('[data-countdown="flash"]');
    const music = document.querySelector('[data-countdown="music"]');
    if (flash) startCountdown(flash, 3 * 86400 + 23 * 3600 + 19 * 60 + 56);
    if (music) startCountdown(music, 23 * 86400 + 5 * 3600 + 59 * 60 + 35);
  }

  /* Keep all inactive category icons dark and only invert the selected tile's icon. */
  function enableCategorySelection() {
    const tiles = [...document.querySelectorAll('.category-tile')];
    tiles.forEach(tile => tile.addEventListener('click', () => {
      tiles.forEach(other => {
        other.classList.remove('border-exclusive', 'bg-exclusive', 'text-white');
        other.classList.add('border-[#DDDDDD]', 'bg-white');
        other.querySelector('img')?.classList.remove('invert', 'grayscale');
        other.querySelector('img')?.classList.add('brightness-0');
      });
      tile.classList.remove('border-[#DDDDDD]', 'bg-white');
      tile.classList.add('border-exclusive', 'bg-exclusive', 'text-white');
      tile.querySelector('img')?.classList.add('brightness-0', 'invert');
    }));
  }

  /* Reveal the scroll-to-top control after scrolling and return smoothly upward. */
  function enableScrollToTop() {
    const button = document.getElementById('to-top');
    window.addEventListener('scroll', () => {
      button.classList.toggle('hidden', window.scrollY <= 500);
      button.classList.toggle('flex', window.scrollY > 500);
    });
    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* Keep the Flash Sales carousel moving automatically when reduced motion is not requested. */
  const flashAutoSlide = startAutoSlide(document.getElementById('flash-track'), 3000);

  renderProductRows();
  enableProductArrows();
  enableHeroDots();
  enableCountdowns();
  enableCategorySelection();
  enableScrollToTop();
})();
