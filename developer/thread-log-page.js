const li = document.getElementsByTagName("li");

for (let i = 0; i < li.length; i++) {
  li[i].addEventListener("click", function() {
    this.classList.toggle("active");
  });
}