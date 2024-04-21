new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',

    clickable: true,
    dynamicBullets: true,
  },
});

const menu = document.querySelector('.navigation');
const menuBtn = document.querySelector('.menu_icon');

const body = document.body;

if (menu && menuBtn) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    body.classList.toggle('lock');
  });
  menu.querySelectorAll('.menu_link').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      menuBtn.classList.remove('active');
      body.classList.remove('lock');
    });
  });
}

const anchor = document.querySelectorAll('a[href*="#"]');

anchor.forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    event.preventDefault();

    const blockID = anchor.getAttribute('href').substring(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
});

const form = document.querySelector('.form_popup');
const formBtns = document.querySelectorAll('.action');
const closeBtns = document.querySelectorAll('.close-btn');

if (form && formBtns) {
  formBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      body.classList.toggle('lock');
      form.classList.toggle('active');
      btn.classList.toggle('active');
    });
  });
}

if (closeBtns && closeBtns.length > 0) {
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      form.classList.remove('active');
      formBtns.forEach((formBtn) => formBtn.classList.remove('active'));
    });

    closeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        console.log('lock');
        body.classList.remove('lock');
      });
    });
  });
}

const token = '6393347387:AAEqa7UCkG9PycwTrDc5UzB6ge7ytZdJFsw';
const chatId = '-4002377221';
const URI_API = `https://api.telegram.org/bot${token}/sendMessage`;
const success = document.getElementById('success');

document.getElementById('tg').addEventListener('submit', function (e) {
  e.preventDefault();

  let message = `<b>Замовлено рішення</b>\n`;
  message += `<b>Ім’я</b> ${this.name.value}\n`;
  message += `<b>Номер телефону</b> ${this.phone.value}`;

  axios
    .post(URI_API, {
      chat_id: chatId,
      parse_mode: 'HTML',
      text: message,
    })
    .then((res) => {
      this.name.value = '';
      this.phone.value = '';
      success.innerHTML = 'Заявку надіслано';
      success.style.backgroundColor = '#61f630';
    })
    .catch((err) => {
      console.warn(err);
    })
    .finally(() => {
      console.log('Виконано');
      body.classList.remove('lock');
      form.classList.remove('active');
    });
});
