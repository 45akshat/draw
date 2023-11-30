document.getElementById("cropButton").addEventListener("click", function () {
    $("#crop_cont").fadeIn(500)
    $("#overlay").fadeIn(800)
})




var minAspectRatio = 0.5;
var maxAspectRatio = 1.5;

document.getElementById('cropButton').addEventListener('click', function () {
    // Create an image element dynamically
    var image = new Image();
    image.src = imageUrl;

    image.onload = function () {
        // Create a container for the image
        var container = document.createElement('div');
        container.className = 'container';

        // Append the image to the container
        container.appendChild(image);
        document.getElementById("crop_editor").appendChild(container);

        // Initialize Cropper.js
        var cropper = new Cropper(image, {
            aspectRatio: NaN, // Default aspect ratio
            viewMode: 2,      // Ensure the cropped area is always placed within the canvas
            ready: function () {
                // Your cropping logic goes here
                // For example, you can use cropper.crop()
            },
            cropmove: function () {
                // Your cropmove logic goes here
            },
        });

        function destoryCrop(){
            $("#crop_cont").fadeOut(200)
            $("#overlay").fadeOut(200) 
            document.getElementById("crop_editor").innerHTML = ""
        
            cropped_image = ""
            cropper.destroy();

        }
        

        document.getElementById("overlay").addEventListener("click", function(){
            destoryCrop()
        })

        document.getElementById('saveButton').addEventListener('click', function () {
            if (cropper) {
                // Get the cropped canvas data
                var canvas = cropper.getCroppedCanvas({
                    fillColor: 'transparent' // Set the background color to transparent
                });

                // Convert the canvas data to base64
                var base64ImageData = canvas.toDataURL('image/png'); // Change to image/png to keep transparency

                // Log the base64 representation to the console
                console.log('Base64 Cropped Image:', base64ImageData);
                cropped_image = base64ImageData
                document.getElementById('replaceImage').click()
                destoryCrop()
                imageUrl = ""
                // container.parentNode.removeChild(container); // Remove the container and its contents
             

            } else {
                console.log('Please open the crop popup first.');
            }
        });
    };
});
