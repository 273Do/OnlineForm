//ポップアップウィンドのhtml要素など
//BGのクレジット表記
var BGDisc =
  "<ul><li>BG Pink made by <a href='https://www.reddit.com/user/MatrixRetoastet/' target='_blank' rer='noopener noreferrer'><font color='#f4ede4'>MatrixRetoastet</a></font></li><li>BG Green made by <a href='https://www.deviantart.com/ncoll36' target='_blank' rer='noopener noreferrer'><font color='#f4ede4'>ncoll36</a></font></li><li>BG Black made by <a href='https://www.wallpaperflare.com/artistic-mountain-minimalist-moon-nature-night-wallpaper-gktsx' target='_blank' rer='noopener noreferrer'><font color='#f4ede4'>Unknown</a></font></li></ui>";
//視差効果
var PE = 1; //ParallaxEffect(視差効果)
let background = document.querySelector("body");
document.addEventListener("mousemove", (event) => {
  var x = Math.round(event.pageX / 70) * PE;
  var y = Math.round(event.pageY / 70) * PE;
  background.style.marginLeft = x + "px";
  background.style.marginTop = y + "px";
});
//infoボタン
// document.querySelector("#infoIcon").addEventListener("click", function () {
//   Swal.fire({
//     // icon: "info",
//     title: "BGSource",
//     backdrop: "none",
//     confirmButtonColor: "#f4ede400",
//     html: BGDisc,
//   });
// });
function info0() {
  Swal.fire({
    icon: "info",
    title: "BGSource",
    backdrop: "none",
    showDenyButton: true,
    showCancelButton: true,
    html: BGDisc,
    // width: "42rem",
    confirmButtonText: "◀",
    denyButtonText: "▶",
    // html: '<iframe src="https://www.tachibana-u.ac.jp" width="600" height="800"></iframe><br><iframe width="600" height="120" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=135.82554638385776%2C34.96764072683185%2C135.82750439643863%2C34.969319985844336&amp;layer=mapnik&amp;marker=34.96848036064079%2C135.82652539014816" style="border: 0px solid black"></iframe>',
    // footer:
    //   '<a href="https://goo.gl/maps/C4BHkpzHDBdJTVZc9">〒607-8175 京都市山科区大宅山田町34</a>　TEL:075-571-111',
  }).then((result) => {
    if (result.isConfirmed) info2();
    else if (result.isDenied) info1();
  });
}
function info1() {
  Swal.fire({
    icon: "info",
    title: "info1",
    backdrop: "none",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "◀",
    denyButtonText: "▶",
    // imageUrl: "img/MadeBy.png",
    // footer: "2022_情報工学実践Ⅳ<ｂ>",
  }).then((result) => {
    if (result.isConfirmed) info0();
    else if (result.isDenied) info2();
  });
}
function info2() {
  Swal.fire({
    icon: "info",
    title: "info2",
    backdrop: "none",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "◀",
    denyButtonText: "▶",
    // imageUrl: "img/creditLogo.png",
    // footer:
    //   '<a href="https://azure.microsoft.com/ja-jp/products/visual-studio-code/">VisualStudioCode</a>　<a href="https://getbootstrap.jp">Bootstrap</a>　<a href="https://jquery.com">jQuery</a>　<a href="https://sweetalert2.github.io">sweetalert2</a>　<a href="https://www.mamp.info/en/mamp-pro/windows/">MAMP PRO</a>',
  }).then((result) => {
    if (result.isConfirmed) info1();
    else if (result.isDenied) info0();
  });
}
//背景画像変更，視差効果切り替え
document.querySelector("#themeIcon").addEventListener("click", function () {
  const inputOptions = {
    0: "Pink",
    1: "Green",
    2: "Black",
    3: "視差効果",
  };
  Swal.fire({
    title: "Theme",
    input: "radio",
    backdrop: "none",
    showCancelButton: true,
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) return "テーマを選択してください．";
      else if (value == 0)
        document.body.style.backgroundImage = 'url("./img/backgroundPink.jpg")';
      else if (value == 1)
        document.body.style.backgroundImage =
          'url("./img/backgroundGreen.jpg")';
      else if (value == 2)
        document.body.style.backgroundImage =
          'url("./img/backgroundBlack.jpg")';
      else if (value == 3) {
        if (PE == 0) PE = 1;
        else PE = 0;
      }
    },
  });
});
//developerボタンが押された時の動作  更新：2023/04/15(土) 山口慶大
document.querySelector("#developerIcon").addEventListener("click", function () {
  Swal.fire({
    icon: "warning",
    title: "DeveloperToolLogin",
    html: '<input type="email" class="swal2-input" placeholder="Email" name="selectTime" id="dtEmail"><input type="password" class="swal2-input" placeholder="Password" name="selectTime" id="dtPassword">',
    toast: "true",
    width: "400px", //ここの値で幅が変わる．
    showCancelButton: true,
    preConfirm: () => {
      var dtEmail = document.getElementById("dtEmail").value;
      var dtPassword = document.getElementById("dtPassword").value;
      console.log(
        dtEmail && dtPassword
          ? dtEmail + "&" + dtPassword
          : "Please choose a date."
      );
    },
  });
});
//エラー出力
function showError(value, error) {
  Swal.fire({
    icon: "error",
    title: value,
    toast: "true",
    text: error,
  });
}
//test3
