document.getElementById("uploadPhoto").addEventListener("click", function () {
   document.getElementById("photoInput").click();
});

document.getElementById("photoInput").addEventListener("change", function (event) {
   const file = event.target.files[0];
   const img = document.getElementById("uploadedImage");

   if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
         img.src = e.target.result;
         img.style.display = "block";
         document.getElementById("dataImageWrap").appendChild(img);
         document.getElementById("makeQuePro").style.display = "flex"; // Show MAKE QUE PRO button
         document.getElementById("download").style.display = "none";
      };
      reader.readAsDataURL(file);
   }
});

document.getElementById("makeQuePro").addEventListener("click", function () {
   const faceImg = document.getElementById("faceImage");
   const uploadedImg = document.getElementById("uploadedImage");
   if (uploadedImg.src.includes("./assets/background-desktop-1YBVvAA1.jpg")) {
      document.getElementById("photoInput").click();
      return;
   }

   // Show the face image and set its size to 40% of the uploaded image
   const uploadedImgWidth = uploadedImg.clientWidth;
   const uploadedImgHeight = uploadedImg.clientHeight;

   const faceImgSize = Math.min(uploadedImgWidth, uploadedImgHeight) * 0.35; // 40% of the smallest side
   faceImg.style.width = `${faceImgSize}px`;
   faceImg.style.height = `${faceImgSize * 1.5}px`;

   // Center the face image
   faceImg.style.position = "absolute";
   //faceImg.style.left = `${(uploadedImgWidth - faceImgSize) / 2}px`;
   //faceImg.style.top = `${(uploadedImgHeight - faceImgSize) / 2}px`;
   faceImg.style.top = `60%`;
   faceImg.style.display = "block";

   // Enable dragging of the face image
   interact(faceImg)
      .draggable({
         onmove: dragMoveListener,
      })
      .resizable({
         edges: { left: true, right: true, bottom: true, top: true },
         listeners: {
            move(event) {
               let { target } = event;
               const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.deltaRect.left;
               const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.deltaRect.top;

               // Update the element's style
               target.style.width = `${event.rect.width}px`;
               target.style.height = `${event.rect.height}px`;
               target.setAttribute("data-x", x);
               target.setAttribute("data-y", y);

               // Translate the element
               target.style.transform = `translate(${x}px, ${y}px)`;
            },
         },
      });

   // Hide MAKE QUE PRO button and show DOWNLOAD button
   document.getElementById("makeQuePro").style.display = "none";
   document.getElementById("download").style.display = "flex";
});

document.getElementById("download").addEventListener("click", function () {
   const imageWrap = document.getElementById("dataImageWrap");
   imageWrap.style.borderRadius = "0";
   html2canvas(imageWrap).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "image.png";
      link.click();
   });

   imageWrap.removeAttribute("style");
});

function dragMoveListener(event) {
   const target = event.target;
   const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
   const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

   target.style.transform = `translate(${x}px, ${y}px)`;
   target.setAttribute("data-x", x);
   target.setAttribute("data-y", y);
}

const dataImageWrap = document.querySelector(".data-image-wrap");

dataImageWrap.addEventListener("touchstart", function () {
   document.body.style.overflow = "hidden";
});

dataImageWrap.addEventListener("touchend", function () {
   document.body.style.overflow = "";
});

//function dragMoveListener(event) {
//   const target = event.target;
//   // Используем только изменение по оси Y (event.dy), игнорируем X (event.dx)
//   const x = parseFloat(target.getAttribute("data-x")) || 0; // Оставляем X без изменений
//   const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

//   target.style.transform = `translate(${x}px, ${y}px)`;
//   target.setAttribute("data-x", x);
//   target.setAttribute("data-y", y);
//   const dataImageWrap = document.querySelector(".data-image-wrap");

//   dataImageWrap.addEventListener("touchstart", function () {
//      document.body.style.overflow = "hidden";
//   });

//   dataImageWrap.addEventListener("touchend", function () {
//      document.body.style.overflow = "";
//   });
//}

// ... остальной код остается без изменений ...
