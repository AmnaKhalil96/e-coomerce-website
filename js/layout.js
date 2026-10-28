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

    topbar.innerHTML = `
      <div class="relative flex h-12 items-center justify-center bg-black px-4 text-[12px] text-white max-[680px]:h-auto max-[680px]:min-h-11 max-[680px]:justify-start max-[680px]:pb-[7px] max-[680px]:pl-3 max-[680px]:pr-[110px] max-[680px]:pt-[7px] max-[680px]:text-center max-[680px]:text-[10px]">
        <p class="m-0">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a class="ml-2 font-semibold underline" href="#">ShopNow</a></p>
        <button class="absolute right-[8.2%] border-0 bg-transparent text-white max-[680px]:right-[14px]" type="button">English <span aria-hidden="true">⌄</span></button>
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
      <header class="mx-auto flex h-[90px] w-[1170px] items-center justify-between border-b border-[#E8E8E8] max-[1200px]:w-[calc(100%-48px)] max-[1000px]:gap-6 max-[680px]:h-auto max-[680px]:min-h-[78px] max-[680px]:w-[calc(100%-32px)] max-[680px]:flex-wrap max-[680px]:gap-y-[14px] max-[680px]:py-4">
        <a class="text-[24px] font-bold tracking-[.3px] text-black max-[680px]:text-[22px]" href="${new URL('index.html', projectRoot).href}">Exclusive</a>
        <nav class="flex gap-12 max-[1000px]:gap-[22px] max-[680px]:order-3 max-[680px]:w-full max-[680px]:justify-center max-[680px]:gap-6 max-[390px]:gap-[15px]" aria-label="Main navigation">
          ${links.map(([key, label, path]) => `<a class="text-[15px] text-black max-[680px]:text-[14px] max-[390px]:text-[13px] ${activePage === key ? 'underline underline-offset-[7px]' : ''}" href="${new URL(path, projectRoot).href}" ${activePage === key ? 'aria-current="page"' : ''}>${label}</a>`).join('')}
        </nav>
        <div class="flex items-center gap-[17px] max-[680px]:gap-[14px] max-[390px]:gap-[10px]">
          <label class="flex h-[38px] w-[245px] items-center rounded bg-[#F5F5F5] px-3 max-[1000px]:w-[190px] max-[680px]:h-9 max-[680px]:w-[min(42vw,210px)] max-[390px]:w-[38vw]"><input class="w-full min-w-0 bg-transparent text-[12px] outline-none max-[680px]:text-[11px]" type="search" placeholder="What are you looking for?" aria-label="Search"><img class="h-5 w-5 object-contain" src="${asset('search-icon.png')}" alt="Search"></label>
          ${extraIcons ? `<a class="relative flex h-6 w-6 items-center justify-center" href="${new URL('pages/wishlist.html', projectRoot).href}" aria-label="Wishlist"><img class="h-6 w-6 object-contain max-[680px]:h-[22px] max-[680px]:w-[22px]" src="${asset('heart-outline.png')}" alt="">${wishlistCount}</a>
          <a class="relative flex h-6 w-6 items-center justify-center" href="${new URL('pages/cart.html', projectRoot).href}" aria-label="Cart"><img class="h-6 w-6 object-contain" src="${asset('cart-icon.png')}" alt="">${cartCount}</a>
          ${activePage !== 'index' ? `<a class="relative grid ${activePage === 'account' ? 'h-9 w-9 rounded-full bg-exclusive' : 'h-6 w-6'} place-items-center max-[390px]:hidden" href="${new URL('pages/account.html', projectRoot).href}" aria-label="Account"><span class="absolute ${activePage === 'account' ? 'left-[13px] top-[9px] border-white' : 'left-2 top-0 border-[#111111]'} h-2 w-2 rounded-full border-[1.5px]"></span><span class="absolute ${activePage === 'account' ? 'bottom-[9px] left-[10px] border-white' : 'bottom-0 left-[3px] border-[#111111]'} h-2 w-[17px] rounded-t-[11px] border-[1.5px] border-b-0"></span></a>` : ''}` : ''}
        </div>
      </header>`;
  }

  function renderFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;
    footer.innerHTML = `
      <footer class="bg-black pt-[65px] text-white">
        <div class="mx-auto grid w-[1170px] grid-cols-[1.2fr_1.1fr_.75fr_.75fr_1.1fr] gap-[38px] pb-[45px] max-[1200px]:w-[calc(100%-48px)] max-[1000px]:grid-cols-3 max-[1000px]:gap-7 max-[680px]:gap-x-5 max-[680px]:gap-y-[30px] max-[680px]:grid-cols-2 max-[680px]:w-[calc(100%-32px)] max-[390px]:grid-cols-1">
          <section><h2 class="mb-5 mt-0 text-[22px] font-semibold">Exclusive</h2><h3 class="mb-5 mt-0 text-[17px] font-medium">Subscribe</h3><p class="my-[9px] text-[13px] leading-[1.8]">Get 10% off your first order</p><form class="flex h-[42px] w-[220px] items-center justify-between rounded border border-white px-3"><input class="w-full bg-transparent text-[12px] text-white outline-none" type="email" placeholder="Enter your email" aria-label="Email address"><button type="submit" aria-label="Subscribe"><img class="h-5 w-5" src="${asset('subscribe-arrow.png')}" alt=""></button></form></section>
          <section><h2 class="mb-5 mt-0 text-[17px] font-medium">Support</h2><p class="my-[9px] text-[13px] leading-[1.8]">111 Bijoy sarani, Dhaka,<br>DH 1515, Bangladesh.</p><p class="my-[9px] text-[13px] leading-[1.8]">exclusive@gmail.com</p><p class="my-[9px] text-[13px] leading-[1.8]">+88015-88888-9999</p></section>
          <section><h2 class="mb-5 mt-0 text-[17px] font-medium">Account</h2><ul class="m-0 list-none space-y-[10px] p-0 text-[13px]"><li><a href="${new URL('pages/account.html', projectRoot).href}">My Account</a></li><li><a href="${new URL('pages/login.html', projectRoot).href}">Login / Register</a></li><li><a href="${new URL('pages/cart.html', projectRoot).href}">Cart</a></li><li><a href="${new URL('pages/wishlist.html', projectRoot).href}">Wishlist</a></li><li><a href="${new URL('index.html', projectRoot).href}">Shop</a></li></ul></section>
          <section><h2 class="mb-5 mt-0 text-[17px] font-medium">Quick Link</h2><ul class="m-0 list-none space-y-[10px] p-0 text-[13px]"><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms Of Use</a></li><li><a href="#">FAQ</a></li><li><a href="${new URL('pages/contact.html', projectRoot).href}">Contact</a></li></ul></section>
          <section><h2 class="mb-5 mt-0 text-[17px] font-medium">Download App</h2><small class="text-[11px] text-[#AAAAAA]">Save $3 with App New User Only</small><div class="mt-2 flex gap-2"><img class="h-[80px] w-[80px] object-contain" src="${asset('app-download-qr.jpg')}" alt="QR code"><div class="flex flex-col gap-1"><img class="h-[36px] w-[110px] object-contain" src="${asset('google-play.png')}" alt="Google Play"><img class="h-[36px] w-[110px] object-contain" src="${asset('app-store.png')}" alt="App Store"></div></div><div class="mt-4 flex items-center gap-5"><img class="h-4 w-4" src="${asset('facebook.png')}" alt="Facebook"><img class="h-4 w-4" src="${asset('twitter.png')}" alt="Twitter"><img class="h-4 w-4" src="${asset('instagram.png')}" alt="Instagram"><img class="h-4 w-4" src="${asset('linkedin.png')}" alt="LinkedIn"></div></section>
        </div>
        <div class="border-t border-[#222222] py-5 text-center text-[12px] text-[#444444]">© Copyright Rimel 2022. All right reserved</div>
      </footer>`;
    footer.querySelector('form')?.addEventListener('submit', event => event.preventDefault());
  }

  renderHeader();
  renderFooter();
})();
