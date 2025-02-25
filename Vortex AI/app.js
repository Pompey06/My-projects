const BACK_END_URL = "https://vortexai-ketl.onrender.com";

const btnStartGenerate = document.querySelector(".info_started_icon");
const inputPrompt = document.querySelector(".info__start input");

const chatStart = document.querySelector(".chat.start");
const chatLoader = document.querySelector(".chat.loader");
const chatResult = document.querySelector(".chat.result");

btnStartGenerate.addEventListener("click", async (e) => {
  e.preventDefault();
  inputPrompt.parentElement.classList.remove("_error");
  const prompt = inputPrompt.value;

  if (!prompt) {
    inputPrompt.parentElement.classList.add("_error");
    return;
  }

  console.log("prompt", prompt);

  chatStart.classList.add("none");
  chatLoader.classList.remove("none");

  await fetch(`${BACK_END_URL}/generate-video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  })
    .then((res) => {
      console.log("res", res);
      return res.json();
    })
    .then((data) => {
      console.log("data", data);
      const videoUrl = data.url;
      chatResult.querySelector(".result__video").src = videoUrl;
      chatResult
        .querySelector(".download")
        .setAttribute("data-download", videoUrl);
      initDownloadBtns();
    })
    .catch((err) => {
      console.log("error", err);
    })
    .finally(() => {
      chatLoader.classList.add("none");
      chatResult.classList.remove("none");
    });

  // chatLoader.classList.add("none");
  // chatResult.classList.remove("none");
  // const videoUrl =
  //   "https://vortexai-ketl.onrender.com/videos/video_1740092194385.mp4";
  // chatResult.querySelector(".result__video").src = videoUrl;
  // chatResult.querySelector(".download").setAttribute("data-download", videoUrl);
  // initDownloadBtns();
});

function initDownloadBtns() {
  const downloads = document.querySelectorAll("[data-download]");

  downloads.forEach((download) => {
    download.addEventListener("click", async (e) => {
      console.log("click");
      e.preventDefault();
      const videoUrl = download.getAttribute("data-download");
      try {
        const response = await fetch(videoUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "video.mp4";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    });
  });
}
