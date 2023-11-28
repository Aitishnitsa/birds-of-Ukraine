let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

const navToggleButton = document.querySelector('#burger-btn');
const navList = document.querySelector('.nav-list');
const mobileMenu = document.querySelector('.mobile-menu');
let isMenuOpen = false;

const menuOpen = ($event) => {
  if (!mobileMenu) { return; }
  navList.classList.toggle('hidden');
  mobileMenu.classList.add('fixed', 'top-0', 'left-0', 'flex', 'flex-col',
    'p-10', 'text-white', 'bg-gray-400', 'w-200', 'h-screen', 'box-border', 'z-10');
  $event.stopPropagation();

  if (!isMenuOpen) {
    navToggleButton.addEventListener('click', menuClose);
    isMenuOpen = true;
  }
}

const menuClose = () => {
  if (!mobileMenu) { return; }
  if (isMenuOpen) {
    navToggleButton.removeEventListener('click', menuClose);
    navList.classList.add('hidden');
    mobileMenu.classList.remove('fixed', 'top-0', 'left-0', 'flex', 'flex-col',
      'p-10', 'text-white', 'bg-gray-400', 'w-200', 'h-screen', 'box-border', 'z-10');
    isMenuOpen = false;
  }
}

navToggleButton.addEventListener('click', ($event) => menuOpen($event));
document.addEventListener('click', () => menuClose());