function handleFiles(files) {
    uploadedFile = files[0];
    uploadFile(uploadedFile);
}
function uploadFile(file) {
    var formData = new FormData();
    formData.append("file", file);
    fetch("/convert/", {
        method: "POST",
        body: formData
    })
        .then(function (response) {
        if (!response.ok) {
            throw new Error("Conversion error");
        }
        return response.blob();
    })
        .then(function (blob) {
        downloadArea.style.display = "block";
        downloadButton.addEventListener("click", function () {
            var downloadLink = document.createElement("a");
            var url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = "converted.docx";
            downloadLink.click();
            URL.revokeObjectURL(url);
        });
    })
        .catch(function (error) {
        console.error("Erro: ", error);
    });
}
var fileButton = document.getElementById("fileB");
var fileInput = document.getElementById("fileElement");
var dropArea = document.getElementById("dropArea");
var downloadArea = document.getElementById("downloadBDiv");
var downloadButton = document.getElementById("downloadB");
var uploadedFile = null;
fileButton.addEventListener("click", function () {
    fileInput.click();
});
fileInput.addEventListener("change", function (e) {
    var target = e.target;
    if (target.files && target.files.length > 0) {
        handleFiles(target.files);
    }
});
dropArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropArea.classList.add("dragOverCss");
});
dropArea.addEventListener("dragleave", function () {
    dropArea.classList.remove("dragOverCss");
});
dropArea.addEventListener("drop", function (e) {
    var _a;
    e.preventDefault();
    var files = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files;
    if (files && files.length > 0) {
        handleFiles(files);
    }
    dropArea.classList.remove("dragOverCss");
});
