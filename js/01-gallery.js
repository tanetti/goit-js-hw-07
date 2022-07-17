import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainerRef = document.querySelector('div.gallery');

const createGalleryMarkup = galleryData =>
  galleryData
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </div>`
    )
    .join('');

galleryContainerRef.innerHTML = createGalleryMarkup(galleryItems);

const showLightboxModal = imageURL => {
  const modal = basicLightbox.create(`<img src="${imageURL}" width="800" height="600">`);

  modal.show();
};

const onGalleryContainerClick = event => {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') return;

  showLightboxModal(event.target.dataset.source);
};

galleryContainerRef.addEventListener('click', onGalleryContainerClick);
