//ロード時の動作
window.onload = function () {
  document.querySelector("#register").style.display = "none";
};
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
let UniEmail = "a601021355@st.tachibana-u.ac.jp"; //大学メールアドレスの例
function studentIDAndGradeAnalysis(UniEmail) {
  const str = UniEmail.replace("@st.tachibana-u.ac.jp", "");
  //test
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
  const grade = { 0: "一回生", 1: "二回生", 2: "3回生", 3: "4回生" };
  console.log(grade[yearCount - (str.charAt(5) + str.charAt(6))]);
  console.log(
    faculty[str.charAt(1) + str.charAt(2) + str.charAt(3) + str.charAt(4)]
  );
}
studentIDAndGradeAnalysis(UniEmail);
