const fileInput = document.getElementById("fileInput");
const invalidFile = document.querySelector(".invalidFile");
const submitBtn = document.getElementById("submitBtn");

fileInput.addEventListener("change", (ev) => {
	console.log(fileInput.files);
	if (fileInput && fileInput.files[0] && fileInput.files[0].type !== "image/jpeg") {
		invalidFile.style.display = "block";
		fileInput.value = "";
		return;
	}

	invalidFile.style.display = "none";
});

submitBtn.addEventListener("click", (ev) => {
	if (fileInput.value === "") ev.preventDefault();
});
