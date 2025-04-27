function handleFiles(files: FileList): void {
    uploadedFile = files[0];
    uploadFile(uploadedFile);
}

function uploadFile(file: File): void {
    let formData = new FormData();
    formData.append("file", file);

    fetch("/convert/", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Conversion error");
        }
        return response.blob();
    })
    .then(blob => {
        downloadArea.style.display = "block";

        downloadButton.addEventListener("click", () => {
            let downloadLink = document.createElement("a");
            let url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = "converted.docx";
            downloadLink.click();
            URL.revokeObjectURL(url);
        });
    })
    .catch(error => {
        console.error("Erro: ", error);
    });
}

const fileButton = document.getElementById("fileB") as HTMLButtonElement;
const fileInput = document.getElementById("fileElement") as HTMLInputElement;
const dropArea = document.getElementById("dropArea") as HTMLDivElement;
const downloadArea = document.getElementById("downloadBDiv") as HTMLDivElement;
const downloadButton = document.getElementById("downloadB") as HTMLButtonElement;

let uploadedFile: File | null = null;

fileButton.addEventListener("click", () => {
    fileInput.click(); 
});

fileInput.addEventListener("change", (e: Event) => {
    let target = e.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
        handleFiles(target.files); 
    }
});

dropArea.addEventListener("dragover", (e: DragEvent) => {
    e.preventDefault();
    dropArea.classList.add("dragOverCss");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragOverCss");
});

dropArea.addEventListener("drop", (e: DragEvent) => {
    e.preventDefault();

    let files = e.dataTransfer?.files;

    if (files && files.length > 0) {
        handleFiles(files); 
    }

    dropArea.classList.remove("dragOverCss");
});
