//ポップアップウィンドのhtml要素など
//BGのクレジット表記
var BGDisc =
  "<div style='text-align:center'><h1>CreatedBy</h1><ul><li>有田海斗</li><li>木村遥敬</li><li>山口慶大</li></ul><h1>BGSource</h1><ul><li>BG Pink made by <a href='https://www.reddit.com/user/MatrixRetoastet/' target='_blank' rer='noopener noreferrer'><font color='#f4ede4'>MatrixRetoastet</a></font></li><li>BG Green made by <a href='https://www.deviantart.com/ncoll36' target='_blank' rer='noopener noreferrer'><font color='#f4ede4'>ncoll36</a></font></li><li>BG Black made by <a href='https://www.wallpaperflare.com/artistic-mountain-minimalist-moon-nature-night-wallpaper-gktsx' target='_blank' rer='noopener noreferrer'><font color='#f4ede4'>Unknown</a></font></li></ui></div>";
//視差効果
var PE = 1; //ParallaxEffect(視差効果)
var BG = 2; //BackGround(背景画像)
let background = document.querySelector("body");
document.addEventListener("mousemove", (event) => {
  var x = Math.round(event.pageX / 70) * PE;
  var y = Math.round(event.pageY / 70) * PE;
  background.style.marginLeft = x + "px";
  background.style.marginTop = y + "px";
});
//Usageボタン動作  更新：2023/04/21(金) 山口慶大
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
    confirmButtonText: "◀",
    denyButtonText: "▶",
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
  }).then((result) => {
    if (result.isConfirmed) info0();
    else if (result.isDenied) info2();
  });
}
function info2() {
  Swal.fire({
    title: "大学ページ",
    backdrop: "none",
    showDenyButton: true,
    showCancelButton: true,
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
    //テーマ変更
    if (value == 0) {
      document.body.style.backgroundImage = 'url("./img/backgroundPink.jpg")';
      BG = value;
    } else if (value == 1) {
      document.body.style.backgroundImage = 'url("./img/backgroundGreen.jpg")';
      BG = value;
    } else if (value == 2) {
      document.body.style.backgroundImage = 'url("./img/backgroundBlack.jpg")';
      BG = value;
    } else if (value == 3) {
      if (PE == 0) PE = 1;
      else PE = 0;
    }
  } else if (Flg == 1) {
    //テーマ変数の書き込み
    if (value == 3) {
      //視差効果の値：PEをDBに保存する．
    } else {
      //背景画像の値：valueをDBに保存する．
    }
  }
}
//developerボタンが押された時の動作  更新：2023/04/15(土) 山口慶大
//管理者がログインしている場合のみ，押せるようにし，それ以外のユーザーが押すとエラーが出るようにする，フラグで管理．
document.querySelector("#developerIcon").addEventListener("click", function () {
  window.location.href = "./developer/developer-index.html";
  // Swal.fire({
  //   icon: "warning",
  //   title: "DeveloperToolLogin",
  //   html: '<input type="email" class="swal2-input" placeholder="Email" name="selectTime" id="dtEmail"><input type="password" class="swal2-input" placeholder="Password" name="selectTime" id="dtPassword">',
  //   toast: "true",
  //   width: "400px", //ここの値で幅が変わる．
  //   showCancelButton: true,
  //   preConfirm: () => {
  //     var dtEmail = document.getElementById("dtEmail").value;
  //     var dtPassword = document.getElementById("dtPassword").value;
  //     console.log(
  //       dtEmail && dtPassword
  //         ? dtEmail + "&" + dtPassword
  //         : "Please choose a date."
  //     );
  //   },
  // });
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
//時間制限メッセージ表示
function showMessageTimer(message, sec) {
  const Toast = Swal.mixin({
    showConfirmButton: false,
    timer: sec,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: "success",
    title: message,
    toast: true,
    position: "top-end", //top-end：右上
  });
}
//時間制限メッセージエラー表示を行う関数
function showErrorTimer(error, sec) {
  const Toast = Swal.mixin({
    showConfirmButton: false,
    timer: sec,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: "error",
    title: error,
    toast: true,
    position: "top-end", //top-end：右上
  });
}
//バリデーションチェック関数(空文字，xss対策)
function validationCheck(str, mode) {
  if (str.replace(/^[\s\u3000]*$/g, "") === "") {
    if (mode == 0) showError("空文字は使用できません．");
    return false;
  } else
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}
