document.getElementById('imageInput').addEventListener('change', function(event) {
    let file = event.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event) {
        let img = new Image();
        img.src = event.target.result;
        img.onload = function() {
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');

            // Set new width and height (reduce to 50% size)
            let scale = 0.5;
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            // Draw image on canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Compression Slider Value
            let compressionLevel = document.getElementById('compressionRange').value / 100;

            // Convert canvas to compressed image
            let compressedImage = canvas.toDataURL('image/jpeg', compressionLevel); 

            // Enable download button
            let downloadBtn = document.getElementById('downloadBtn');
            downloadBtn.style.display = 'block';
            downloadBtn.onclick = function() {
                let a = document.createElement('a');
                a.href = compressedImage;
                a.download = 'compressed-image.jpg';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
        };
    };
});

// Update slider value in UI
document.getElementById('compressionRange').addEventListener('input', function() {
    document.getElementById('compressionValue').textContent = this.value;
});
