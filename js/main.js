function load(url) {
 return new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
   if (this.readyState === 4) {
    if (this.status === 200) {
     resolve(this.responseText);
    } else {
     reject(new Error('Failed to load: ' + url));
    }
   }
  };
  xhr.open('GET', url, true);
  xhr.send();
 });
}

const headerPromise = load('./component/header.html')
const footerPromise = load('./component/footer.html')

Promise.all([headerPromise, footerPromise])
 .then((responseText) => {
  // 两个加载操作都完成后调用 pageChange 函数
  document.getElementsByTagName('header')[0].innerHTML = responseText[0];
  headerMenu();
  document.getElementsByTagName('footer')[0].innerHTML = responseText[1];
  pageChange();
 })
 .catch(error => {
  console.error('Error loading components:', error);
 });
//------------------------------------------------------------------
function headerMenu() {
 let headerMenu = document.getElementsByClassName('header-menu')[0];

 classState();
 clickState();

 window.addEventListener('resize', function () {
  classState();
 }, false);

 let click = 1;

 function classState() {
  let w = window.innerWidth;

  if (w < 640) {

  } else {
   document.getElementsByClassName('header-menu')[0].style.transform = "translateY(0)";
   headerMenu.classList.remove('header-menu-m');
  }
 }

 function clickState() {
  document.getElementsByClassName('header-menu-btn')[0].addEventListener('click', function () {
   headerMenu.classList.add('header-menu-m');
   if (click == 1) {
    console.log(click);
    headerMenu.classList.add('header-menu-m');
    document.getElementsByClassName('header-menu-m')[0].style.transform = "translateY(" + (document.getElementsByTagName('header')[0].offsetHeight - 1) + "px" + ")";
    click = 0;
   } else {
    console.log(click);
    document.getElementsByClassName('header-menu')[0].style.transform = "translateY(0)";
    headerMenu.classList.remove('header-menu-m');
    click = 1;
   }
  });
 }
}

//------------------------------------------------------------------
let main = document.getElementsByTagName('main')[0];
function pageChange() {
 let pageRemoveClass;
 let menuBtn = [
  { getClass_header: document.getElementsByClassName('header-menu-option menu-home'), pageURL: "./component/home-page.html", pageClass: 'home-page' },
  { getClass_header: document.getElementsByClassName('header-menu-option menu-dessert'), pageURL: "./component/dessert-page.html", pageClass: 'dessert-page' },
  { getClass_header: document.getElementsByClassName('header-menu-option menu-login'), pageURL: "./component/login-page.html", pageClass: 'login-page' },
  { getClass_header: document.getElementsByClassName('shopping-cart'), pageURL: "./component/shopping-cart.html", pageClass: 'shopping-cart' },
  { getClass_header: document.getElementsByClassName('checkout'), pageURL: "./component/checkout.html", pageClass: 'checkout' },
  { getClass_header: document.getElementsByClassName('checkout-pay'), pageURL: "./component/checkout-pay.html", pageClass: 'checkout-pay' },
  { getClass_header: document.getElementsByClassName('checkout-Ebill'), pageURL: "./component/checkout-Ebill.html", pageClass: 'checkout-Ebill' },
  { getClass_header: document.getElementsByClassName('checkout-Mbill'), pageURL: "./component/checkout-Mbill.html", pageClass: 'checkout-Mbill' },
  { getClass_header: document.getElementsByClassName('checkout-success'), pageURL: "./component/checkout-success.html", pageClass: 'checkout-success' }
 ];
 //首頁
 menuIn(0);
 //選單分頁切換
 for (let i = 0; i < 4; i++) {
  // if (i > 0) {
  menuBtn[i].getClass_header[0].addEventListener('click', function () {
   menuIn(i);
  }, true);
  // }
 }
 //分頁載入資料
 function menuIn(i) {
  load(menuBtn[i].pageURL)
   .then(responseText => {
    main.classList.remove(pageRemoveClass);
    pageRemoveClass = menuBtn[i].pageClass;
    main.innerHTML = responseText;
    main.classList.add(menuBtn[i].pageClass);
    if (menuBtn[i].pageClass == 'shopping-cart') {
     menuBtn[4].getClass_header[0].addEventListener('click', function () {
      menuIn(4);
     }, true);
    }
    if (menuBtn[i].pageClass == 'checkout') {
     menuBtn[5].getClass_header[0].addEventListener('click', function () {
      menuIn(5);
     }, true);
    }
    if (menuBtn[i].pageClass == 'checkout-pay') {
     menuBtn[6].getClass_header[0].addEventListener('click', function () {
      menuIn(6);
     }, true);
    }
    if (menuBtn[i].pageClass == 'checkout-Ebill') {
     document.getElementsByClassName('bill-list-option m-bill')[0].addEventListener('click', function () {
      menuIn(7);
     }, true);
    }
    if (menuBtn[i].pageClass == 'checkout-Mbill') {
     document.getElementsByClassName('bill-list-option e-bill')[0].addEventListener('click', function () {
      menuIn(6);
     }, true);
    }
    if (menuBtn[i].pageClass == 'checkout-Ebill' || menuBtn[i].pageClass == 'checkout-Mbill') {
     menuBtn[8].getClass_header[0].addEventListener('click', function () {
      menuIn(8);
     }, true);
    }

    if (menuBtn[i].pageClass == 'checkout-success') {
     document.getElementsByClassName('home-page-b')[0].addEventListener('click', function () {
      menuIn(0);
     }, true);
    }

   })
   .catch(error => {
    console.error('Error loading URL 2:', error);
   });
 }
}
//------------------------------------------------------------------
function glassesPageFunction() {

 $('.glasses-products-content').html('');
 OPTICAL_change(1, 12);

 let glasses_area = [
  {
   area: 'OPTICAL-area',
   textEN: 'Celluloid Combi',
   textCN: '賽璐珞鈦金屬混合鏡框',
   img1: 'product-header-1.png',
   img2: 'product-header-2.png'
  }, {
   area: 'SUNGLASSES-area',
   textEN: '2020 NEW COLLECTION',
   textCN: '賽璐珞鈦金屬混合鏡框',
   img1: 'product-header-3.png',
   img2: 'product-header-4.png'
  }, {
   area: 'FUNCTIONAL-area',
   textEN: 'FUNCTIONAL',
   textCN: '???',
   img1: 'product-header-?.png',
   img2: 'product-header-?.png'
  }
 ];
 let glasses_mainContent;
 for (let index = 0; index < glasses_area.length; index++) {
  $('.subMenu-option[value="' + index + '"]').click(function (e) {
   e.preventDefault();
   $(this).addClass("click");
   $(this).siblings().removeClass("click");
   $('.glasses-mainContent').removeClass(glasses_mainContent);
   $('.glasses-mainContent').addClass(glasses_area[index].area);
   glasses_mainContent = glasses_area[index].area;

   $('.glasses-products-content').html('');

   if (glasses_area[index].area == 'OPTICAL-area') {
    glassesChange(index);
    OPTICAL_change(1, 12);
   }
   if (glasses_area[index].area == 'SUNGLASSES-area') {
    glassesChange(index);
    OPTICAL_change(7, 12);
   }
   if (glasses_area[index].area == 'FUNCTIONAL-area') {
    glassesChange(index);
   }

   function glassesChange(index) {
    $('.glasses-title-EN').html(`${glasses_area[index].textEN}`);
    $('.glasses-title-CN').html(`${glasses_area[index].textCN}`);
   }

  })
 }

 function OPTICAL_change(a, b) {
  for (let i = a; i <= b; i++) {
   $('.glasses-products-content').append(`
      <div class="glasses-products-block">
       <div class="glasses-products-img">
         <img src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/380a3830c5ec79e65f02eb756c218209a90ebe10/week3-4/product-`+ i + `.png" />
       </div>
       <div class="glasses-products-infoGroup">
         <div class="glasses-title">
           <div class="model">BJ41600S</div>
           <div class="price">NTD3,490</div>
         </div>
         <div class="glasses-style">
           <div class="color brown"></div>
           <div class="color orange"></div>
         </div>
       </div>
     </div>
   `);
  }
 }

}
//------------------------------------------------------------------
function locationPageFunction() {
 $('.location-mainContent').html('');

 let location_area = [
  {
   title: '台北中山旗艦店',
   phone: '電話：(02)000-1234',
   time: '營業時間：10:00-21:00',
   address: '地址：台北市中山區南京東路25巷2-1號'
  },
  {
   title: '台北綠園店',
   phone: '電話：(02)000-2345',
   time: '營業時間：10:00-21:00',
   address: '地址：台北市中正區復興南路 132-1 號'
  },
  {
   title: '台中清水旗艦店',
   phone: '電話：(02)000-1234',
   time: '營業時間：10:00-21:00',
   address: '地址：台中市清水區經南一路 23 號 8 樓'
  },
  {
   title: '高雄中正形象店',
   phone: '電話：(07)000-2345',
   time: '營業時間：10:00-21:00',
   address: '地址：高雄市苓雅區中正路 38 號 12 樓'
  },
  {
   title: '高雄夢時代店',
   phone: '電話：(07)000-1234',
   time: '營業時間：10:00-21:00',
   address: '地址：高雄市前鎮區中華一路 63 號 6 樓'
  }
 ];

 for (let i = 0; i < location_area.length; i++) {
  $('.location-mainContent').append(`
     <div class="location-content">
       <div class="location-content-img">
         <img src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/380a3830c5ec79e65f02eb756c218209a90ebe10/week3-4/store-${i + 1}.png" />
       </div>
       <div class="location-content-infoGroup">
         <div class="location-info-title">${location_area[i].title}</div>
         <div class="location-info-item">
           <div class="phone">
             <span class="material-symbols-outlined"> call </span>
             <span>${location_area[i].phone}</span>
           </div>
           <div class="time">
             <span class="material-symbols-outlined"> schedule </span>
             <span>${location_area[i].time}</span>
           </div>
           <div class="address">
             <span class="material-symbols-outlined"> location_on </span>
             <span>${location_area[i].address}</span>
           </div>
         </div>
         <div class="moreDetailBtn" onclick="openLocationFunction(${i})" >詳細資訊</div>
       </div>
     </div>
  `);
 }
}
//locationPageFunction
function openLocationFunction(i) {
 load('./component/location-store-page.html')
  .then(responseText => {
   main.innerHTML = responseText;
  })
  .catch(error => {
   console.error('Error loading URL 2:', error);
  });
}
//------------------------------------------------------------------
function blogPageFunction() {
 let blog_area = [
  {
   title: "情人特別企劃",
   subTitle: "2020 Valentine’s Special",
   date: "2020/02/14",
   describe: "一年一度西洋情人節即將到來，我們推出最強「情人節企劃」，為這個甜蜜的節日加溫。偶爾跟另一半來個低調情侶單品，結合彼此喜好、找出合適框型款式，在這個春夏輕鬆搭出屬於你們的甜蜜默契！<br>即日起至2/16為止，不論是熱戀情侶、自由自在一個人或是老夫老妻，只要從未來過本店的新朋友，綁定官方LINE好友，都可享專屬優惠⋯⋯"
  },
  {
   title: "街頭潮人訪問",
   subTitle: "街頭潮人訪問",
   date: "2020/02/02",
   describe: "炎熱的夏季裡，衣著選擇經常希望以簡潔的風格為主，但有時單純只穿搭 T 恤或短袖開襟襯衫，又覺得整體造型度有點不足嗎？那麼不妨可以透過「配件」，為穿搭點綴出與眾不同的視覺層次，而本季有哪些必備的配件系列呢？一起從以下推薦的 3 款單品，讓你瞬間帥氣爆棚散發型男品味⋯⋯"
  },
  {
   title: "春季新品上市",
   subTitle: "New Selection",
   date: "2020/02/02",
   describe: "2020 年春季的光學眼鏡跳脫前幾季流行的復古框型，比起圓框與小方框等文青風格，偏向個性款式的眉框眼鏡成為這一季的耀眼之星。除了經典款式如黑色眉框落在長方形鏡面上，眉宇之間露出專業莊重的特殊氣質，包覆在圓形鏡框上的貓眼型眉框則是強調出特殊設計感，俐落時髦的造型搭配一件簡單的白襯衫就相當有型，是喜愛時尚質感人士絕不能錯過的必備款式⋯⋯"
  },
  {
   title: "設計師獨享鏡框優惠",
   subTitle: "Sales for Designer",
   date: "2020/01/18",
   describe: "2020 年春季的光學眼鏡跳脫前幾季流行的復古框型，比起圓框與小方框等文青風格，偏向個性款式的眉框眼鏡成為這一季的耀眼之星。除了經典款式如黑色眉框落在長方形鏡面上，眉宇之間露出專業莊重的特殊氣質，包覆在圓形鏡框上的貓眼型眉框則是強調出特殊設計感，俐落時髦的造型搭配一件簡單的白襯衫就相當有型，是喜愛時尚質感人士絕不能錯過的必備款式⋯⋯"
  },
  {
   title: "抵抗夏日大作戰",
   subTitle: "Summer Special",
   date: "2019/08/07",
   describe: "2020 年春季的光學眼鏡跳脫前幾季流行的復古框型，比起圓框與小方框等文青風格，偏向個性款式的眉框眼鏡成為這一季的耀眼之星。除了經典款式如黑色眉框落在長方形鏡面上，眉宇之間露出專業莊重的特殊氣質，包覆在圓形鏡框上的貓眼型眉框則是強調出特殊設計感，俐落時髦的造型搭配一件簡單的白襯衫就相當有型，是喜愛時尚質感人士絕不能錯過的必備款式⋯⋯"
  }
 ];
 $('.blog-mainContent').html('');
 for (let i = 0; i < blog_area.length; i++) {
  $('.blog-mainContent').append(`
    <div class="blog-content">
      <div class="blog-content-img">
        <img src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/380a3830c5ec79e65f02eb756c218209a90ebe10/week3-4/blog-${i + 1}.png" />
      </div>
      <div class="blog-contentGroup">
        <div class="blog-contentGroup-in">
          <div class="blog-content-title">${blog_area[i].title}</div>
          <div class="blog-content-subTitleGroups">
            <div class="blog-content-subTitle">${blog_area[i].subTitle}</div>
            <div class="blog-content-date">${blog_area[i].date}</div>
          </div>
          <div class="blog-content-describe">${blog_area[i].describe}</div>
        </div>
        <div class="blog-content-more" onclick="openBlogFunction(${i})">MORE</div>
      </div>
    </div>
  `);
 }
}
//blogPageFunction
function openBlogFunction() {
 load('./component/blog-article-page.html')
  .then(responseText => {
   main.innerHTML = responseText;
  })
  .catch(error => {
   console.error('Error loading URL 2:', error);
  });
}
//------------------------------------------------------------------
function questionPageFunction() {
 let question_area = [
  {
   Q: "Q1.請問可否自備鏡框單配鏡片？",
   A: "A1.我牌鏡框搭配薄型非球面鏡片 1480 元，搭配功能型鏡片則依鏡片種類加價購買。 <br />當日購買JINS盒裝眼鏡，搭配薄型非球面鏡片 980 元（隔日後則為 1480 元），搭配功能型鏡片則依鏡片種類加價購買。 <br />他牌鏡框，搭配薄型非球面鏡片 1980 元，搭配功能型鏡片則依鏡片種類加價購買。</div>"
  },
  {
   Q: "Q2.眼鏡都可以20分鐘取件嗎？",
   A: "A1.我牌鏡框搭配薄型非球面鏡片 1480 元，搭配功能型鏡片則依鏡片種類加價購買。 <br />當日購買JINS盒裝眼鏡，搭配薄型非球面鏡片 980 元（隔日後則為 1480 元），搭配功能型鏡片則依鏡片種類加價購買。 <br />他牌鏡框，搭配薄型非球面鏡片 1980 元，搭配功能型鏡片則依鏡片種類加價購買。</div>"
  },
  {
   Q: "Q3.散光鏡片需要額外加價嗎？",
   A: "A1.我牌鏡框搭配薄型非球面鏡片 1480 元，搭配功能型鏡片則依鏡片種類加價購買。 <br />當日購買JINS盒裝眼鏡，搭配薄型非球面鏡片 980 元（隔日後則為 1480 元），搭配功能型鏡片則依鏡片種類加價購買。 <br />他牌鏡框，搭配薄型非球面鏡片 1980 元，搭配功能型鏡片則依鏡片種類加價購買。</div>"
  },
  {
   Q: "Q4.我可以使用舊眼鏡的度數配鏡片嗎？",
   A: "A1.我牌鏡框搭配薄型非球面鏡片 1480 元，搭配功能型鏡片則依鏡片種類加價購買。 <br />當日購買JINS盒裝眼鏡，搭配薄型非球面鏡片 980 元（隔日後則為 1480 元），搭配功能型鏡片則依鏡片種類加價購買。 <br />他牌鏡框，搭配薄型非球面鏡片 1980 元，搭配功能型鏡片則依鏡片種類加價購買。</div>"
  },
  {
   Q: "Q5.請問可以單購買鏡框嗎？",
   A: "A1.我牌鏡框搭配薄型非球面鏡片 1480 元，搭配功能型鏡片則依鏡片種類加價購買。 <br />當日購買JINS盒裝眼鏡，搭配薄型非球面鏡片 980 元（隔日後則為 1480 元），搭配功能型鏡片則依鏡片種類加價購買。 <br />他牌鏡框，搭配薄型非球面鏡片 1980 元，搭配功能型鏡片則依鏡片種類加價購買。</div>"
  },
 ];

 $('.question-contentGroup').html('');
 for (let i = 0; i < question_area.length; i++) {
  $('.question-contentGroup').append(`
  <div class="question-content">
    <div class="question-content-Q">${question_area[i].Q}</div>
    <div class="question-content-A">${question_area[i].A}</div>
  </div>
  `);
 }
}







