// Получаем элементы страницы
const gallery = document.getElementById("gallery");

const newImagesButton = document.getElementById("new-images");
const addImageButton = document.getElementById("add-image");
const deleteImageButton = document.getElementById("delete-image");

// Элементы полноэкранного просмотра
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightboxButton = document.getElementById("close-lightbox");

let imageCounter = gallery.querySelectorAll("img").length;
let lastOpenedImage = null;

// Создаём адрес случайного изображения
function getRandomImageUrl() {
  return "https://picsum.photos/240/220?random=" + Date.now() + Math.random();
}

// Обновляем изображения без перезагрузки страницы
newImagesButton.addEventListener("click", function () {
  const images = gallery.querySelectorAll("img");

  images.forEach(function (image) {
    image.src = getRandomImageUrl();
  });
});

// Добавляем новое изображение
addImageButton.addEventListener("click", function () {
  imageCounter++;

  const newImage = document.createElement("img");

  newImage.src = getRandomImageUrl();
  newImage.alt = "Image " + imageCounter;
  newImage.tabIndex = 0;

  gallery.appendChild(newImage);

  updateDeleteButton();
});

// Удаляем последнее изображение
deleteImageButton.addEventListener("click", function () {
  const images = gallery.querySelectorAll("img");

  if (images.length > 1) {
    images[images.length - 1].remove();
  }

  updateDeleteButton();
});

// Проверяем, можно ли удалять изображения
function updateDeleteButton() {
  const images = gallery.querySelectorAll("img");

  deleteImageButton.disabled = images.length <= 1;
}

// Открываем полноэкранный просмотр
function openLightbox(image) {
  lastOpenedImage = image;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;

  lightbox.hidden = false;
  document.body.style.overflow = "hidden";

  closeLightboxButton.focus();
}

// Закрываем полноэкранный просмотр
function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";

  document.body.style.overflow = "";

  if (lastOpenedImage && lastOpenedImage.isConnected) {
    lastOpenedImage.focus();
  }
}

// Открытие изображения по клику
gallery.addEventListener("click", function (event) {
  if (event.target.tagName === "IMG") {
    openLightbox(event.target);
  }
});

// Открытие изображения клавишами Enter и Space
gallery.addEventListener("keydown", function (event) {
  if (
    event.target.tagName === "IMG" &&
    (event.key === "Enter" || event.key === " ")
  ) {
    event.preventDefault();
    openLightbox(event.target);
  }
});

// Закрытие по кнопке
closeLightboxButton.addEventListener("click", closeLightbox);

// Закрытие при клике на затемнённый фон
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Закрытие клавишей Escape
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});

// Проверяем кнопку удаления при запуске
updateDeleteButton();
