document.querySelector(".upload").addEventListener("mouseenter", function (e) {
   // Получаем текущий transform
   const style = window.getComputedStyle(this);
   const matrix = new WebKitCSSMatrix(style.transform);

   // Вычисляем угол поворота в градусах
   const angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);

   // Устанавливаем угол как CSS переменную
   this.style.setProperty("--rotation", `${angle}deg`);
});
