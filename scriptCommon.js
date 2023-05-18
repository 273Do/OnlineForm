//ポップアップウィンドのhtml要素など
//BGのクレジット表記
var BGDisc =
  "<div style='text-align:center'><h1>CreatedBy</h1><ul><li>有田海斗</li><li>木村遥敬</li><li>山口慶大</li></ul><h1>BGSource</h1><ul><li>BG Pink made by <a href='https://www.reddit.com/user/MatrixRetoastet/' target='_blank' rer='noopener noreferrer'><font color='#f4ede4'>MatrixRetoastet</a></font></li><li>BG Green made by <a href='https://www.deviantart.com/ncoll36' target='_blank' rer='noopener noreferrer'><font color='#f4ede4'>ncoll36</a></font></li><li>BG Black made by <a href='https://www.wallpaperflare.com/artistic-mountain-minimalist-moon-nature-night-wallpaper-gktsx' target='_blank' rer='noopener noreferrer'><font color='#f4ede4'>Unknown</a></font></li></ui></div>";
//視差効果
var PE = 1; //ParallaxEffect(視差効果)
let background = document.querySelector("body");
document.addEventListener("mousemove", (event) => {
  var x = Math.round(event.pageX / 70) * PE;
  var y = Math.round(event.pageY / 70) * PE;
  background.style.marginLeft = x + "px";
  background.style.marginTop = y + "px";
});
//Usageボタンが押されたときの動作  更新：2023/04/21(金) 山口慶大
//Usageボタンを押すと，ツールチップのOn，Offを切り替えることができる．このツールチップは<span>タグで実装されており，cssで操作すると，それに囲まれている要素にも影響が出てしまう．文字を空白{""}にすることにより回避している．
//このコードは，いくらツールチップを追加削除しても書き換える必要はない．
var UsageFlg = -1;
var tooltipCounter = 0;
var tooltipTmp = [];
function usageIcon() {
  const spanElements = document.querySelectorAll("span[tooltip]");
  UsageFlg *= -1;
  UsageFlg == 1
    ? spanElements.forEach((e) => {
        const tooltipValue = e.getAttribute("tooltip");
        document
          .querySelector("span[tooltip=" + tooltipValue + "]")
          .setAttribute("tooltip", "");
        tooltipTmp.push(tooltipValue);
        document.querySelector("#Usage").style.color = "#f4ede4";
      })
    : spanElements.forEach(() => {
        document
          .querySelector("span[tooltip='']")
          .setAttribute("tooltip", tooltipTmp[tooltipCounter]);
        document.querySelector("#Usage").style.color = "lime";
        tooltipCounter++;
      });
}
usageIcon();
//infoボタン
function info0() {
  Swal.fire({
    icon: "info",
    title: "更新情報",
    backdrop: "none",
    showDenyButton: true,
    showCancelButton: true,
    // toast: true,
    // width: "47rem",
    confirmButtonText: "◀",
    denyButtonText: "▶",
    // html:,
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
    backdrop: "none",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "◀",
    denyButtonText: "▶",
    html: BGDisc,
    // imageUrl: "img/MadeBy.png",
    // footer: "2022_情報工学実践Ⅳ<ｂ>",
  }).then((result) => {
    if (result.isConfirmed) info0();
    else if (result.isDenied) info2();
  });
}
function info2() {
  Swal.fire({
    // icon: "info",
    title: "大学ページ",
    backdrop: "none",
    showDenyButton: true,
    showCancelButton: true,
    // toast: true,
    width: "47rem",
    confirmButtonText: "◀",
    denyButtonText: "▶",
    html: '<iframe src="https://www.tachibana-u.ac.jp" width="600" height="800"></iframe>',
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
      else BGImageAndPE(value, 0);
    },
  });
});
//背景画像変更，視差効果切り替えを行う関数　　更新：2023/04/19(水) 山口慶大
function BGImageAndPE(value, Flg) {
  //Flgの値で背景画像変更，視差効果のスイッチを行っている．
  if (Flg == 0) {
    if (value == 0)
      document.body.style.backgroundImage = 'url("./img/backgroundPink.jpg")';
    else if (value == 1)
      document.body.style.backgroundImage = 'url("./img/backgroundGreen.jpg")';
    else if (value == 2)
      document.body.style.backgroundImage = 'url("./img/backgroundBlack.jpg")';
    else if (value == 3) {
      if (PE == 0) PE = 1;
      else PE = 0;
    }
    //ここにでデータベースに値を書き換えるコードを書く．
  } else if (Flg == 1) PE = value;
}
//developerボタンが押された時の動作  更新：2023/04/15(土) 山口慶大
//管理者がログインしている場合のみ，押せるようにし，それ以外のユーザーが押すとエラーが出るようにする，フラグで管理．
document.querySelector("#developerIcon").addEventListener("click", function () {
  window.location.href = "developer/developer-index.html";
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
    width: "400px",
    text: error,
  });
}
//メッセージ表示
function showMessage(value, message) {
  Swal.fire({
    icon: "success",
    title: value,
    toast: "true",
    width: "400px",
    text: message,
  });
}
