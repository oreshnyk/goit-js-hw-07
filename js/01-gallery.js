import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems); // выводит в консоль псевдо-массив с данными изображения

class Gallery {
    #imgs;
    #instance ;
    #keyListener;

    constructor(galleryItems) {
        const galleryElem = document.querySelector(".gallery");
        this.imgs = [];
        this.instance = null;

        // отключение модалки нажатием Escape
        this.keyListener = (event) => {
            event.preventDefault();
            if(event.code === "Escape" && this.instance){
                this.instance.close();
            }
        };

        // перебераем псевдо-массив с данными и для каждого создаем:
        // 1) ячейку = div>link>img
        // 2) добавляем классы на элементы соответственно
        // 3) подставляем атрибуты из псевдо-массива
        // 4) пушим результат в галерею
        galleryItems.forEach((elem) => {
            const divElem = document.createElement("div");
            const linkElem = document.createElement("a");
            const img = document.createElement("img");
            
            divElem.classList.add('gallery__item');

            linkElem.classList.add('gallery__link');
            linkElem.setAttribute("href", elem.original)
        
            img.classList.add("gallery__image");
            img.setAttribute('src', elem.preview);
            img.setAttribute('data-src', elem.original);
            img.setAttribute('alt', elem.description);
            
            linkElem.append(img);
            divElem.append(linkElem);
            this.imgs.push(divElem);
        });
        
        galleryElem.append(...this.imgs);
        

        // Замена значения атрибута src элемента <img> в модальном окне перед открытием.
        galleryElem.addEventListener("click", (event) => {
            event.preventDefault();
            if(!event.target.dataset.src){
                return; 
            }
            this.instance = basicLightbox.create(
                `<img 
                src="${event.target.dataset.src}" 
                alt="${event.target.getAttribute("alt")}" 
                />`,
            {
                onShow: () => {
                    document.addEventListener("keydown", this.keyListener);
                },
                onClose: () => {
                    document.removeEventListener("keydown", this.keyListener);
                }
            });
            this.instance.show();
        });
    }
};

new Gallery(galleryItems);