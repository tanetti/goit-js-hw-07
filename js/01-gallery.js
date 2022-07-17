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

let modalWindow = null;

const showLightboxModal = ({ alt, dataset: { source } }) => {
  modalWindow = basicLightbox.create(`<img style="color: #fff" src="${source}" alt="${alt}" width="800" height="600">`, {
    onShow: toggleKeyboardControls,
    onClose: toggleKeyboardControls,
  });

  modalWindow.show();
};

const toggleKeyboardControls = () => {
  if (!window.onkeydown) {
    window.onkeydown = onWindowKeyDown;
    return;
  }

  window.onkeydown = null;
};

const onWindowKeyDown = ({ code }) => {
  if (code != 'Escape') return;

  modalWindow.close();
};

const onGalleryContainerClick = event => {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') return;

  showLightboxModal(event.target);
};

galleryContainerRef.addEventListener('click', onGalleryContainerClick);
