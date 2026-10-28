/* Shared site chrome: inject one Tailwind-only header and footer into each page. */
(() => {
  
  const scriptUrl = new URL(document.currentScript.src);
  const projectRoot = new URL('../', scriptUrl);
  const asset = file => new URL(`assets/images/shared/${file}`, projectRoot).href;
  
  const fontResource = document.createElement('link');
  fontResource.rel = ['style', 'sheet'].join('');
  fontResource.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
  document.head.append(fontResource);
  const pagePath = window.location.pathname;
  const pageName = document.body.dataset.page || pagePath.split('/').pop().replace('.html', '') || 'index';
  const activePage = pageName === 'sign-up' ? 'signup' : pageName;

  function renderHeader() {
    const topbar = document.getElementById('site-topbar');
    const header = document.getElementById('site-header');
    if (!topbar || !header) return;

    // Compact screens allow the promotion message to wrap without clipping.
    topbar.innerHTML = `
      <div class="relative flex min-h-[50px] items-center justify-center bg-black px-4 text-center text-[11px] leading-relaxed text-white sm:text-[12px] sm:leading-normal max-[680px]:py-2 max-[680px]:pr-[100px]">
        <p class="m-0">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a class="ml-2 font-semibold underline" href="#">ShopNow</a></p>
        <button class="absolute right-4 top-1/2 min-h-11 -translate-y-1/2 border-0 bg-transparent text-white sm:right-8 xl:right-[8.2%]" type="button">English <span aria-hidden="true">⌄</span></button>
      </div>`;

    const links = [
      ['index', 'Home', 'index.html'],
      ['contact', 'Contact', 'pages/contact.html'],
      ['about', 'About', 'pages/about.html'],
      ['signup', 'Sign Up', 'pages/sign-up.html']
    ];
    const accountFormPage = activePage === 'login' || activePage === 'signup';
    const extraIcons = !accountFormPage;
    const wishlistCount = ['wishlist', 'cart', 'checkout'].includes(activePage)
      ? '<span class="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-exclusive text-[10px] text-white">4</span>'
      : '';
    const cartCount = activePage === 'cart' || activePage === 'checkout'
      ? '<span class="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-exclusive text-[10px] text-white">2</span>'
      : '';
    header.innerHTML = `
      <header class="mx-auto flex h-auto min-h-[78px] w-full max-w-[1170px] flex-wrap items-center justify-between gap-y-3 border-b border-[#E8E8E8] px-4 py-4 sm:px-6 lg:h-[90px] lg:w-[calc(100%-48px)] lg:flex-nowrap lg:gap-6 lg:px-0 lg:py-0 xl:w-[1170px]">
        <a class="text-[22px] font-bold tracking-[.3px] text-black sm:text-[24px]" href="${new URL('index.html', projectRoot).href}">Exclusive</a>
        <nav class="hidden items-center gap-6 lg:flex xl:gap-12" aria-label="Main navigation">
          ${links.map(([key, label, path]) => `<a class="text-[15px] text-black max-[680px]:text-[14px] max-[390px]:text-[13px] ${activePage === key ? 'underline underline-offset-[7px]' : ''}" href="${new URL(path, projectRoot).href}" ${activePage === key ? 'aria-current="page"' : ''}>${label}</a>`).join('')}
        </nav>
        <div class="order-3 flex w-full min-w-0 flex-wrap items-center justify-between gap-3 lg:order-none lg:w-auto lg:flex-nowrap lg:gap-[17px]">
          <label class="order-2 flex h-11 w-full min-w-0 items-center rounded bg-[#F5F5F5] px-3 lg:order-none lg:h-[38px] lg:w-[190px] xl:w-[245px]"><input class="w-full min-w-0 bg-transparent text-[12px] outline-none max-[680px]:text-[16px]" type="search" placeholder="What are you looking for?" aria-label="Search"><img class="h-5 w-5 object-contain" src="${asset('search-icon.png')}" alt="Search"></label>
          ${extraIcons ? `<a class="relative flex h-11 w-11 items-center justify-center lg:h-6 lg:w-6" href="${new URL('pages/wishlist.html', projectRoot).href}" aria-label="Wishlist"><img class="h-6 w-6 object-contain" src="${asset('heart-outline.png')}" alt="">${wishlistCount}</a>
          <a class="relative flex h-11 w-11 items-center justify-center lg:h-6 lg:w-6" href="${new URL('pages/cart.html', projectRoot).href}" aria-label="Cart"><img class="h-6 w-6 object-contain" src="${asset('cart-icon.png')}" alt="">${cartCount}</a>
          ${activePage !== 'index' ? `<a class="relative grid ${activePage === 'account' ? 'h-9 w-9 rounded-full bg-exclusive' : 'h-6 w-6'} place-items-center max-[390px]:hidden" href="${new URL('pages/account.html', projectRoot).href}" aria-label="Account"><span class="absolute ${activePage === 'account' ? 'left-[13px] top-[9px] border-white' : 'left-2 top-0 border-[#111111]'} h-2 w-2 rounded-full border-[1.5px]"></span><span class="absolute ${activePage === 'account' ? 'bottom-[9px] left-[10px] border-white' : 'bottom-0 left-[3px] border-[#111111]'} h-2 w-[17px] rounded-t-[11px] border-[1.5px] border-b-0"></span></a>` : ''}` : ''}
        </div>
      </header>`;

    // Compact account pages also expose wishlist and cart shortcuts.
    if (accountFormPage) {
      const utilityGroup = header.querySelector('header > div');
      const shortcuts = document.createElement('div');
      shortcuts.className = 'order-1 flex items-center gap-2 lg:hidden';
      shortcuts.innerHTML = '<a class="grid h-11 w-11 place-items-center" href="' + new URL('pages/wishlist.html', projectRoot).href + '" aria-label="Wishlist"><img class="h-6 w-6" src="' + asset('heart-outline.png') + '" alt=""></a><a class="grid h-11 w-11 place-items-center" href="' + new URL('pages/cart.html', projectRoot).href + '" aria-label="Cart"><img class="h-6 w-6" src="' + asset('cart-icon.png') + '" alt=""></a>';
      utilityGroup?.insertBefore(shortcuts, utilityGroup.firstChild);
    }

    // Compact layouts use a toggleable, screen-reader-labeled navigation menu.
    const desktopHeader = header.querySelector('header');
    const desktopNav = desktopHeader?.querySelector('nav');
    if (desktopHeader && desktopNav) {
      const menuToggle = document.createElement('button');
      menuToggle.id = 'mobile-menu-toggle';
      menuToggle.type = 'button';
      menuToggle.className = 'grid h-11 w-11 place-items-center rounded border border-[#DDDDDD] lg:hidden';
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      menuToggle.setAttribute('aria-controls', 'mobile-menu');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '<span class="grid gap-[5px]" aria-hidden="true"><span class="h-[2px] w-5 bg-black"></span><span class="h-[2px] w-5 bg-black"></span><span class="h-[2px] w-5 bg-black"></span></span>';
      desktopHeader.insertBefore(menuToggle, desktopNav);

      const mobileNav = document.createElement('nav');
      mobileNav.id = 'mobile-menu';
      mobileNav.className = 'hidden w-full basis-full flex-col gap-1 border-t border-[#E8E8E8] py-3 lg:hidden';
      mobileNav.setAttribute('aria-label', 'Mobile navigation');
      mobileNav.innerHTML = links.map(([key, label, path]) =>
        '<a class="min-h-11 px-2 py-3 text-[15px] text-black ' +
        (activePage === key ? 'font-semibold underline underline-offset-4' : '') +
        '" href="' + new URL(path, projectRoot).href + '" ' +
        (activePage === key ? 'aria-current="page"' : '') + ' >' + label + '</a>'
      ).join('');
      desktopHeader.append(mobileNav);

      menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isExpanded));
        menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
        mobileNav.classList.toggle('hidden', isExpanded);
        mobileNav.classList.toggle('flex', !isExpanded);
      });
      mobileNav.addEventListener('click', event => {
        if (event.target.closest('a')) menuToggle.click();
      });
      mobileNav.addEventListener('keydown', event => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') menuToggle.click();
      });
      menuToggle.addEventListener('keydown', event => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') menuToggle.click();
      });
    }
  }

  function renderFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;
    footer.innerHTML = `
      <footer class="bg-black pt-10 text-white sm:pt-12 xl:pt-[65px]">
        <!-- Mobile columns group related footer links while preserving the desktop grid. -->
        <div class="mx-auto grid w-full max-w-[1170px] grid-cols-2 gap-x-6 gap-y-8 px-4 pb-10 sm:px-6 lg:grid-cols-5 lg:gap-4 lg:px-4 xl:w-[1170px] xl:grid-cols-[1.2fr_1.1fr_.75fr_.75fr_1.1fr] xl:gap-[38px] xl:px-0 xl:pb-[45px]">
          <!-- Subscribe spans both columns on compact layouts. -->
          <section class="col-span-2 lg:col-span-1">
            <h2 class="mb-3 mt-0 text-[22px] font-semibold lg:mb-5">Exclusive</h2>
            <h3 class="mb-3 mt-0 text-base font-medium lg:mb-5 lg:text-[17px]">Subscribe</h3>
            <p class="my-2 break-words text-sm leading-6 lg:my-[9px] lg:text-[13px] lg:leading-[1.8]">Get 10% off your first order</p>
            <!-- Keep the email field touch-friendly on phones. -->
            <form class="flex h-12 w-full min-w-0 items-center justify-between rounded border border-white px-3 lg:h-11 xl:h-[42px] xl:w-[220px]">
              <input class="w-full min-w-0 bg-transparent text-[16px] text-white outline-none lg:text-[12px]" type="email" placeholder="Enter your email" aria-label="Email address">
              <button class="grid h-11 w-11 shrink-0 place-items-center lg:h-5 lg:w-5" type="submit" aria-label="Subscribe"><img class="h-5 w-5" src="${asset('subscribe-arrow.png')}" alt=""></button>
            </form>
          </section>
          <!-- Support occupies a full phone row and a half-width tablet column. -->
          <section class="col-span-2 sm:col-span-1">
            <h2 class="mb-3 mt-0 text-base font-medium lg:mb-5 lg:text-[17px]">Support</h2>
            <p class="my-2 break-words text-sm leading-6 lg:my-[9px] lg:text-[13px] lg:leading-[1.8]">111 Bijoy sarani, Dhaka,<br>DH 1515, Bangladesh.</p>
            <p class="my-2 break-words text-sm leading-6 lg:my-[9px] lg:text-[13px] lg:leading-[1.8]">exclusive@gmail.com</p>
            <p class="my-2 break-words text-sm leading-6 lg:my-[9px] lg:text-[13px] lg:leading-[1.8]">+88015-88888-9999</p>
          </section>
          <!-- Account links share equal spacing and phone touch padding. -->
          <section>
            <h2 class="mb-3 mt-0 text-base font-medium lg:mb-5 lg:text-[17px]">Account</h2>
            <ul class="m-0 flex list-none flex-col gap-2 p-0 text-sm leading-6 lg:gap-[10px] lg:text-[13px] lg:leading-normal">
              <li><a class="block py-1 lg:py-0" href="${new URL('pages/account.html', projectRoot).href}">My Account</a></li>
              <li><a class="block py-1 lg:py-0" href="${new URL('pages/login.html', projectRoot).href}">Login / Register</a></li>
              <li><a class="block py-1 lg:py-0" href="${new URL('pages/cart.html', projectRoot).href}">Cart</a></li>
              <li><a class="block py-1 lg:py-0" href="${new URL('pages/wishlist.html', projectRoot).href}">Wishlist</a></li>
              <li><a class="block py-1 lg:py-0" href="${new URL('index.html', projectRoot).href}">Shop</a></li>
            </ul>
          </section>
          <section>
            <h2 class="mb-3 mt-0 text-base font-medium lg:mb-5 lg:text-[17px]">Quick Link</h2>
            <ul class="m-0 flex list-none flex-col gap-2 p-0 text-sm leading-6 lg:gap-[10px] lg:text-[13px] lg:leading-normal">
              <li><a class="block py-1 lg:py-0" href="#">Privacy Policy</a></li>
              <li><a class="block py-1 lg:py-0" href="#">Terms Of Use</a></li>
              <li><a class="block py-1 lg:py-0" href="#">FAQ</a></li>
              <li><a class="block py-1 lg:py-0" href="${new URL('pages/contact.html', projectRoot).href}">Contact</a></li>
            </ul>
          </section>
          <!-- App downloads stay compact on phones and keep the desktop asset sizes. -->
          <section class="col-span-2 sm:col-span-1">
            <h2 class="mb-3 mt-0 text-base font-medium lg:mb-5 lg:text-[17px]">Download App</h2>
            <small class="text-[11px] text-[#AAAAAA]">Save $3 with App New User Only</small>
            <div class="mt-2 flex min-w-0 gap-2">
              <img class="h-20 w-20 shrink-0 object-contain lg:h-12 lg:w-12 xl:h-[80px] xl:w-[80px]" src="${asset('app-download-qr.jpg')}" alt="QR code">
              <div class="flex min-w-0 flex-col gap-1">
                <img class="h-[36px] w-[110px] max-w-full object-contain lg:h-7 lg:w-[80px] xl:h-[36px] xl:w-[110px]" src="${asset('google-play.png')}" alt="Google Play">
                <img class="h-[36px] w-[110px] max-w-full object-contain lg:h-7 lg:w-[80px] xl:h-[36px] xl:w-[110px]" src="${asset('app-store.png')}" alt="App Store">
              </div>
            </div>
            <div class="mt-3 grid max-w-[220px] grid-cols-4 place-items-center lg:mt-4 lg:flex lg:max-w-none lg:gap-5">
              <a class="grid h-11 w-11 place-items-center lg:h-4 lg:w-4" href="#" aria-label="Facebook"><img class="h-4 w-4" src="${asset('facebook.png')}" alt=""></a>
              <a class="grid h-11 w-11 place-items-center lg:h-4 lg:w-4" href="#" aria-label="Twitter"><img class="h-4 w-4" src="${asset('twitter.png')}" alt=""></a>
              <a class="grid h-11 w-11 place-items-center lg:h-4 lg:w-4" href="#" aria-label="Instagram"><img class="h-4 w-4" src="${asset('instagram.png')}" alt=""></a>
              <a class="grid h-11 w-11 place-items-center lg:h-4 lg:w-4" href="#" aria-label="LinkedIn"><img class="h-4 w-4" src="${asset('linkedin.png')}" alt=""></a>
            </div>
          </section>
        </div>
        <!-- Smaller copyright padding keeps the footer end compact on phones. -->
        <div class="border-t border-[#222222] py-4 text-center text-xs text-[#444444] lg:py-5 lg:text-[12px]">© Copyright Rimel 2022. All right reserved</div>
      </footer>`;
    footer.querySelector('form')?.addEventListener('submit', event => event.preventDefault());
  }

  renderHeader();
  renderFooter();
})();
