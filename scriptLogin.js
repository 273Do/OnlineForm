//ロード時の動作
window.onload = function () {
  document.querySelector("#register").style.display = "none";
};

//ログインボタン押下時のクリックイベント．　2023.04.19(水)　有田海斗
//email[1]で登録画面の入力アドレスが取得可能．　2023.04.21(金)　有田海斗
//passsword[1]で登録画面の入力パスワードが取得可能．　2023.04.21(金)　有田海斗
function loginbtn() {
  const email = document.getElementsByClassName('email');
  const password = document.getElementsByClassName('password');
  //alert(email[0].value);
  //alert(password[0].value);

  //スプレッドシートよりユーザー情報取得   2023/04/19(水) 有田海斗
  // 大学メールより，解析されるかチェック   2023.04.19(水)　山口慶大
  const thread_data =
  "https://script.googleusercontent.com/macros/echo?user_content_key=vD4KTWm0hZMDES7NDs6FQLN1dnRmwCDkAvHHVpZvypxKLGsiJItUSAmbzC-SdHtlsAU712aRxY5ux9cRG8o-0E3dWjs6p5SSm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJO1Zq-hrZvcxrF-tnDWrHMuiYc3EmL3SKsr9hTN9wY0oJzoUNvyf94KAzgpzZQDk8lncmXzKm90aPXk2M260fDTO0f0Y-wUpNz9Jw9Md8uu&lib=Myv0raDKCsIQD01rt9rFOEDnQ_tEriaYy";
  fetch(thread_data)
  .then((response) => response.json())
  .then((data) => {
  //alert(data[0]["Mail"]);
  //alert(data[0]["Password"]);

  //データベースとのログイン情報照合処理．　2023.04.21(金)　有田海斗
  for(let i = 0; i <= data.length; i++){
    if(email[0].value == data[i]["Mail"]){
      if(password[0].value == data[i]["Password"]){
          alert("IDとPASSが一致しました．")
          //ログイン処理記述
          // loginページでは，black，PE=1を初期値とし，登録時に一緒に登録，それを掲示板本体に引き渡す．
          BGImageAndPE(data[i]["BackGround"], 0); //いずれはここ消します．
          BGImageAndPE(data[i]["ParallaxEffect"], 1);
          studentIDAndGradeAnalysis(data[i]["Mail"]);
      }
    }else{
      showError("メールアドレスかパスワードが間違っています．");
    }
  }

})
.catch((error) => {
  showError("ユーザー情報の取得に失敗しました.", error);
});
}

//registerボタンが押された時の動作
document.querySelector("#registerIcon").addEventListener("click", function () {
  document.querySelector("#login").style.display = "none";
  document.querySelector("#register").style.display = "block";
});

//loginボタンが押された時の動作
document.querySelector("#loginIcon").addEventListener("click", function () {
  document.querySelector("#register").style.display = "none";
  document.querySelector("#login").style.display = "block";
});

//viewOnlyボタンが押された時の動作
document.querySelector(".viewOnly").addEventListener("click", function () {
  console.log("test");
});

//学籍番号から，学部学科と学年を解析する関数
//処理のみ完成しており、出力はまだ．　2023.04.20(木) 有田海斗
function studentIDAndGradeAnalysis(UniEmail) {
  const str = UniEmail.replace("@st.tachibana-u.ac.jp", "");
  var yearCount = new Date().getFullYear() - 2000;
  const faculty = {
    1020: "文学部/日本語日本文学科",
    1030: "文学部/歴史学科",
    1041: "文学部/歴史遺産学科",
    2010: "国際英語学部/国際英語学科",
    3110: "発達教育学部/児童教育学科",
    4010: "総合心理学部/総合心理学科",
    5011: "現代ビジネス学部/経営学科",
    5020: "現代ビジネス学部/都市環境デザイン学科",
    5510: "経済学部/経済学科",
    5610: "経営学部/経営学科",
    6010: "工学部/情報工学科",
    6020: "工学部/建築デザイン学科",
    7010: "看護学部/看護学科",
    9020: "健康科学部/心理学科",
    9030: "健康科学部/理学療法学科",
    9035: "健康科学部/作業療法学科",
    9040: "健康科学部/救急救命学科",
    9050: "健康科学部/臨床検査学科",
  };

  //コメントデータベースに合わせて、数字のみを出力するように変更．　2023.04.19(水) 有田海斗
  const grade = { 0: "1", 1: "2", 2: "3", 3: "4" };
  console.log(grade[yearCount - (str.charAt(5) + str.charAt(6))]);
  console.log(
    faculty[str.charAt(1) + str.charAt(2) + str.charAt(3) + str.charAt(4)]
  );
}
