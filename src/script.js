let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

const list = document.querySelector("#birds-list");

const createProductElement = (array) => {
  array.forEach(item => {
    const section = document.createElement("section");
    const img = document.createElement("img");
    const name = document.createElement("h3");
    const description = document.createElement("p");

    section.classList.add("bg-white", "p-4", "rounded-md", "shadow-md", "flex", "flex-col");
    name.classList.add("text-lg", "font-semibold", "mb-2");
    img.classList.add("w-full", "h-64", "object-contain", "mb-4", "rounded-md", "flex-shrink-0");
    description.classList.add("text-gray-600");

    name.innerHTML = item.name;
    img.src = item.imageUrl;
    description.innerHTML = item.description;

    section.append(img, name, description);
    list.appendChild(section);
  });
}

fetch('./birds.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(json => {
    const currentPage = window.location.pathname.split("/").pop().split(".")[0];

    const filteredItems = json.filter(item => {
      switch (currentPage) {
        case "forest":
          console.log('forest');
          return item.category === 0;
        case "water":
          return item.category === 1;
        case "city":
          return item.category === 2;
        default:
          return true;
      }
    });

    createProductElement(filteredItems);
  });

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