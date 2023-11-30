const list = document.querySelector("#birds-list");

const createProductElement = (array) => {
    array.forEach(item => {
        const section = document.createElement("section");
        const imgContainer = document.createElement("div");
        const img = document.createElement("img");
        const spinner = document.createElement("div");

        imgContainer.classList.add("relative");
        spinner.classList.add("absolute", "right-1/2", "bottom-1/2", "transform", "translate-x-1/2", "translate-y-1/2");
        spinner.innerHTML = '<div class="w-12 h-12 rounded-full animate-spin border-2 border-solid border-green-500 border-t-transparent"></div>';

        const name = document.createElement("h3");
        const description = document.createElement("p");

        section.classList.add("bg-white", "p-4", "rounded-md", "shadow-md", "flex", "flex-col");
        name.classList.add("text-lg", "font-semibold", "mb-2");
        img.classList.add("w-full", "h-64", "object-contain", "mb-4", "rounded-md", "flex-shrink-0");
        description.classList.add("text-gray-600");

        name.innerHTML = item.name;
        img.src = item.imageUrl;
        img.alt = item.name;
        description.innerHTML = item.description;

        imgContainer.appendChild(img);
        imgContainer.appendChild(spinner);
        section.append(imgContainer, name, description);
        list.appendChild(section);

        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = item.imageUrl;
        document.head.appendChild(link);

        img.addEventListener('load', () => {
            spinner.style.display = 'none';
        });
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