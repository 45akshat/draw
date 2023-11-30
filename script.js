// const canvas = new fabric.Canvas('canvas');
// const canvas2 = new fabric.Canvas('canvas2');

let canvases = []; // Array to store multiple canvas instances
let currSelectedCanvas = null; // Variable to keep track of the currently selected canvas
let images = [];
var canvasStateHistory = [];
var currentStateIndex = -1;
var currentJSONState = null; // Store the current JSON state
var imageUrl = "o.png"; // Replace with your image URL

let selectionHistory = []
let textEditingEnabled = false

let selectedCanvas = 1

// Function to calculate the distance between two points
function distanceBetweenPoints(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function snapToObjects(target, canvas) {
    let snapDistance = 5; // Adjust the snap distance as needed

    const targetCenter = target.getCenterPoint();

    // Remove previous suggestive lines
    canvas.getObjects('line').forEach(line => canvas.remove(line));

    // Iterate through all objects on the canvas
    canvas.forEachObject(function (object) {
        if (object === target || !object.selectable) {
            return;
        }

        const objectCenter = object.getCenterPoint();
        const distanceX = Math.abs(targetCenter.x - objectCenter.x);
        const distanceY = Math.abs(targetCenter.y - objectCenter.y);

        // Snap horizontally if close to the vertical center of the nearby object
        if (distanceX < snapDistance) {
            target.set({
                left: objectCenter.x - (target.width * target.scaleX) / 2
            });
            // Draw a suggestive line
            const line = new fabric.Line([objectCenter.x, targetCenter.y, objectCenter.x, objectCenter.y], {
                stroke: 'red',
                strokeWidth: 1,
                selectable: false,
                type: 'line'
            });
            canvas.add(line);
        }

        // Snap vertically if close to the horizontal center of the nearby object
        if (distanceY < snapDistance) {
            target.set({
                top: objectCenter.y - (target.height * target.scaleX) / 2
            });
            // Draw a suggestive line
            const line = new fabric.Line([targetCenter.x, objectCenter.y, objectCenter.x, objectCenter.y], {
                stroke: 'red',
                strokeWidth: 1,
                selectable: false,
                type: 'line'
            });
            canvas.add(line);
        }

        // Snap when edges match horizontally
        if (Math.abs(target.left - object.left) < snapDistance) {
            target.set({
                left: object.left
            });
            // Draw a suggestive line
            const line = new fabric.Line([target.left, targetCenter.y, object.left, objectCenter.y], {
                stroke: 'red',
                strokeWidth: 1,
                selectable: false,
                type: 'line'
            });
            canvas.add(line);
        }

        // Snap when edges match vertically
        if (Math.abs(target.top - object.top) < snapDistance) {
            target.set({
                top: object.top
            });
            // Draw a suggestive line
            const line = new fabric.Line([targetCenter.x, target.top, objectCenter.x, object.top], {
                stroke: 'red',
                strokeWidth: 1,
                selectable: false,
                type: 'line'
            });
            canvas.add(line);
        }
    });

    canvas.renderAll(); // Render the canvas after snapping
}

// Function to create a new canvas and add it to the canvases array
function createNewCanvas(index) {
    const newCanvas = new fabric.Canvas('canvas' + index);
    // console.log(index)
    currSelectedCanvas = newCanvas; // Set the new canvas as the currently selected canvas
        
    newCanvas.on('object:moving', function (options) {
        const target = options.target;
        if (true) {
            snapToObjects(target, newCanvas);
        }
    });

    newCanvas.on('object:moved', function(opts){
        newCanvas.getObjects('line').forEach(line => newCanvas.remove(line));

    })
        
          
    newCanvas.on('mouse:up', function(e) {
        selectCanvas(index)
        


        // Check if the current state is different from the saved state
        if (currentJSONState !== JSON.stringify(currSelectedCanvas)) {
        console.log("saving")
            
            saveCanvasState(index);            

        }
    });

    function changeTextBoxFontSize(target){
        var scaleX = target.scaleX;
                        
        var newFontSize = target.fontSize * scaleX;
        if(scaleX != 1){
            target.scaleX = 1
            target.scaleY = 1
            target.fontSize = newFontSize
            target.width = target.width*scaleX
        }


        // Update font size and display it
        newFontSize = newFontSize.toFixed(1);
        document.getElementById('fontSizeLabel').innerText = newFontSize + 'px';
        document.getElementById('setFontSize').value = newFontSize

    }

    
    let target
    newCanvas.on('mouse:up', function(e) {
        target = {}
        target = e.target;


        document.addEventListener('keydown', function(event) {
            // Check if Delete key is pressed
            if (event.key === 'Delete') {
                if(textEditingEnabled == false ){
                    var selectedObjects = currSelectedCanvas.getActiveObjects();
                    selectedObjects.forEach(function(object) {
                        currSelectedCanvas.remove(object);
                    });
                    currSelectedCanvas.discardActiveObject().renderAll();
                }

            }
        });

        if (target && target.type === 'image') {
            openRepMediaDiv();
            imageUrl = target._element.currentSrc
    
        }else if(target && target.type === 'textbox'){
            openTextDiv()
                // Function to delete the textbox

                target.on('editing:entered', function() {
                    textEditingEnabled = true
                    // Perform any actions you want when the user is typing
                });

                target.on('editing:exited', function() {
                    textEditingEnabled = false
                    // Perform any actions you want when the user is typing
                });
            document.getElementById('setFontFamily').value = target.fontFamily
            document.getElementById('setFontWeight').value = target.fontWeight
            document.getElementById('setTextColor').value = target.fill
            document.getElementById('setTextAlignment').value = target.textAlign
            changeTextBoxFontSize(target)
                // Add event listener for resizing
                target.on('scaling', function (options) {
                    isScaling = true;
                });
                // Add event listener for scaling end
                target.on('scaled', function (options) {
                    if (isScaling) {
                        // Calculate new font size based on the scaling factor
                        changeTextBoxFontSize(target)

                        // Reset scaling flag
                        isScaling = false;
                    }
                });

        }
        else{
            closeAllDiv()
        }
    });


    canvases.push(newCanvas);
    const maxWidth = 930;
    let originalCanvasWidth= Math.min(document.getElementById("cont1").clientWidth * 0.9, maxWidth);


function resizeObjects(canvas) {
    const scaleFactor = canvas.width / originalCanvasWidth; // Calculate the scale factor

    // Iterate through all objects in the canvas
    canvas.forEachObject(function (object) {
        // Adjust the scale of the object based on the new canvas width
        object.set({
            scaleX: object.scaleX * scaleFactor,
            scaleY: object.scaleY * scaleFactor,
            // fontSize: object.fontSize * scaleFactor // Adjust font size
        });

        // If the object has top, left, right, and bottom properties, adjust them
        if (object.top !== undefined) {
            object.set({
                top: object.top * scaleFactor
            });
        }

        if (object.left !== undefined) {
            object.set({
                left: object.left * scaleFactor
            });
        }

        if (object.right !== undefined) {
            object.set({
                right: object.right * scaleFactor
            });
        }

        if (object.bottom !== undefined) {
            object.set({
                bottom: object.bottom * scaleFactor
            });
        }

        // Update coordinates and selection handles
        object.setCoords();
        if(object.type == 'textbox'){
            console.log("scalll")
            changeTextBoxFontSize(object)
        }

    });

    // Update the originalCanvasWidth to the new canvas width
    originalCanvasWidth = canvas.width;
    

    // Render the canvas after adjusting the scales and positions
    canvas.renderAll();
}


    setCanvasDimensions(newCanvas, index);
    window.addEventListener('resize', function(){
        setCanvasDimensions(newCanvas, index);
        resizeObjects(newCanvas);

    });

}
for (let index = 0; index < 3; index++) {
    createNewCanvas(index)
}




function addNewCanvasPage(){
    let lastCanvasIndex = document.getElementsByClassName("canvas-container").length 
    document.getElementsByClassName("addCanvasDiv")[lastCanvasIndex-1].insertAdjacentHTML("afterend",  
    `
        <canvas id="canvas`+[lastCanvasIndex]+`"  width="100" style="height: 80vw; width: 100%;"></canvas>
        <div class="addCanvasDiv"><button class="addCanvasBelowBtn" >+</button></div>
    
    `)

    createNewCanvas(lastCanvasIndex)

    selectCanvas(lastCanvasIndex)

    AddPageVisibility()


}



function addPageBelow(index){
    addNewCanvasPage()
    let startMov = index+1
    // blank the startMov
    let endMov = canvases.length-1
    let canvasesTemp = []
    canvases.forEach((one)=>{
        canvasesTemp.push(one.toJSON())
    })
    for (let i = startMov; i < endMov; i++) {
        canvasesTemp[i+1] =canvases[i].toJSON()
    }


    for (let i = startMov; i < endMov; i++) {
        selectCanvas(i+1)   

        currSelectedCanvas.loadFromJSON(canvasesTemp[i+1], function () {
            currSelectedCanvas.renderAll();
        })
    }
    selectCanvas(startMov)
    currSelectedCanvas.clear()

//loadFromJson use that 
}

function AddPageVisibility(){
    for (let i = 0; i < document.getElementsByClassName("addCanvasDiv").length; i++) {
        document.getElementsByClassName("addCanvasDiv")[i].addEventListener("mouseover", function(){
            document.getElementsByClassName("addCanvasBelowBtn")[i].style.display = "block"
        })
    
        document.getElementsByClassName("addCanvasBelowBtn")[i].addEventListener("click", function(){
            addPageBelow(i)
        })
        
        document.getElementsByClassName("canvas-container")[i].addEventListener("mouseover", function(){
            document.getElementsByClassName("addCanvasBelowBtn")[i].style.display = "block"
        })
        
        document.getElementsByClassName("canvas-container")[i].addEventListener("mouseout", function(){
            document.getElementsByClassName("addCanvasBelowBtn")[i].style.display = "none"
        })
        
    
        document.getElementsByClassName("addCanvasDiv")[i].addEventListener("mouseout", function(){
            document.getElementsByClassName("addCanvasBelowBtn")[i].style.display = "none"
        })
        
    }
}

AddPageVisibility()



function createHtmlFromJson(jsonData) {
    var html = "";

    // Iterate through objects in the canvas JSON
    jsonData.objects.forEach(function(obj) {
        // Check object type
        if (obj.type === 'image') {
            // Handle image objects
            html += '<img src="' + obj.src + '" ';
            html += 'style="';
            html += 'position: absolute;';
            html += 'left: ' + obj.left + 'px; ';
            html += 'top: ' + obj.top + 'px; ';
            html += 'width: ' + obj.width * obj.scaleX + 'px; ';
            html += 'height: ' + obj.height * obj.scaleY + 'px; ';
            html += '" />';
        } else if (obj.type === 'textbox') {
            // Handle text objects
            html += '<div ';
            html += 'style="';
            html += 'position: absolute;';
            html += 'width: '+ obj.width + 'px;'
            html += 'whitespace: word-wrap;'
            html += 'left: ' + obj.left + 'px; ';
            html += 'top: ' + obj.top + 'px; ';
            html += 'font-size: ' + obj.fontSize + 'px; ';
            html += 'font-family: ' + obj.fontFamily+'; ';
            html += 'font-weight: ' + obj.fontWeight+'; ';
            // Add other text-related styles as needed
            html += '"';
            html += '>' + obj.text + '</div>';
        }
        // Add more conditions for other object types as needed
    });

    return html;
}



// Event listener for selecting a canvas
function selectCanvas(index) {

    for (let i = 0; i < document.getElementsByClassName("canvas-container").length; i++) {
        const canvasElement = document.getElementById("canvas"+i);
        if(i==index){
            canvasElement.style.outline = '2px solid #1657d0';
        }else{
            canvasElement.style.outline = 'none';
        }
    }
    
    if (index >= 0 && index < canvases.length) {
        currSelectedCanvas = canvases[index];
        // updateImageList(currSelectedCanvas);
    }
}

selectCanvas(0)


function setCanvasDimensions(canvasChoosed, index) {
    const canvasElement = document.getElementById("canvas" + index);
    const maxWidth = 930;
    const contWidth = Math.min(document.getElementById("cont1").clientWidth * 0.9, maxWidth);
    // Calculate the height based on a 16:9 aspect ratio
    const contHeight = contWidth * (9 / 16);

    canvasElement.style.width = contWidth + 'px';
    canvasElement.style.height = contHeight + 'px';
    canvasElement.style.borderRadius = '25px';
    canvasElement.style.margin = '15px';
    canvasElement.style.marginTop = '5px';
    canvasElement.style.marginBottom = '0px';
    canvasElement.style.border = 'none';
canvasElement.style.background = 'white';
    // canvasElement.style.background = 'linear-gradient(28deg, #fbcee2c4 0%, #fff2de 100%)';
    canvasElement.style.boxShadow = 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px';

    canvasChoosed.setDimensions({
        width: contWidth,
        height: contHeight,
        borderRadius: 25,
        border: 'none',
        margin: 15,
        marginTop: 5,
        marginBottom: 0,
        background: 'white'
        // background: 'linear-gradient(28deg, #fbcee2c4 0%, #fff2de 100%)'
    });
}


// setCanvasDimensions("canvas", canvas);
// setCanvasDimensions("canvas2", canvas2);



function loadImageFromURL(url, accentImg) {

    fabric.Image.fromURL(url, function(img) {
       // Calculate the scale factors to achieve "object-fit: cover" behavior
       const canvasWidth = currSelectedCanvas.width;
       const canvasHeight = currSelectedCanvas.height;
       const imgWidth = img.width;

       let imgHeight = img.height*1.2;
       if(accentImg==true){
         imgHeight = img.height;
         
        }
       const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
       // Set the image's scale using scaleX and scaleY
       img.scaleX = scale;
       img.scaleY = scale;
    //    img.cornerStyle = "circle"

       // Center the image on the canvas
       img.left = (canvasWidth - imgWidth * scale) / 2;
       img.top = ((canvasHeight - imgHeight * scale) / 2) + 50;


       if(accentImg==true){
        img.left = 0;
        img.top = ((canvasHeight - imgHeight * scale) / 2);   
        imgAccWidth =  img.width*scale
        }

        
        // img.setControlVisible('ml', false);  // Show the middle-left resize handle
        // img.setControlVisible('mt', false);  // Show the middle-top resize handle
        // img.setControlVisible('mr', false);  // Show the middle-right resize handle
        // img.setControlVisible('mb', false);  // Show the middle-bottom resize handle
    
        
        const roundedCorners = (fabricObject, cornerRadius) => new fabric.Rect({
            width: fabricObject.width,
            height: fabricObject.height,
            rx: cornerRadius / fabricObject.scaleX,
            ry: cornerRadius / fabricObject.scaleY,
            left: -fabricObject.width / 2,
            top: -fabricObject.height / 2
        })
        
        img.set("clipPath", roundedCorners(img, 10))

        // Add the image to the canvas from the JSON representation
        const canvasJSON = currSelectedCanvas.toJSON();
        currSelectedCanvas.loadFromJSON(canvasJSON, function() {
            currSelectedCanvas.add(img);
            images.push(img);
            currSelectedCanvas.renderAll();
            updateImageList();
        });


        
    });

    
    fabric.Object.NUM_FRACTION_DIGITS = 8

}




function updateImageList() {
    const imageList = document.getElementById('imageList');
    imageList.innerHTML = '';
    images.forEach((img, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = img._originalElement.src;
        thumbnail.onclick = function() {
            addImageFromThumbnail(index);
        };
        imageList.appendChild(thumbnail);
    });
}

function addImageFromThumbnail(index) {
    if (index >= 0 && index < images.length) {
        const imageUrl = images[index]._originalElement.src;
        loadImageFromURL(imageUrl);
    }
}




// function selectImage(index) {
//     const activeObject = images[index];
    
//     if (activeObject) {
//         currSelectedCanvas.discardActiveObject();
//         currSelectedCanvas.setActiveObject(activeObject);
//         currSelectedCanvas.requestRenderAll();
//     }
// }

document.getElementById('deleteImage').addEventListener('click', function() {
    const canvas = currSelectedCanvas;
    const objectsAll = canvas.getObjects();
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.type === 'image') {
        const index = objectsAll.findIndex(obj => obj === activeObject);
        if (index !== -1) {
            deleteImage(index);
        }
    }
});

function deleteImage(index) {
    const canvas = currSelectedCanvas;
    const objectsAll = canvas.getObjects();

    if (index >= 0 && index < objectsAll.length) {
        // Create a copy of the current canvas state as JSON
        const canvasJSON = currSelectedCanvas.toJSON();

        // Remove the image from the JSON representation
        canvasJSON.objects.splice(index, 1);

        // Load the updated canvas state from the modified JSON
        currSelectedCanvas.loadFromJSON(canvasJSON, function() {
            currSelectedCanvas.discardActiveObject();
            currSelectedCanvas.renderAll();
            updateImageList();
        });
    }
}

let repImgFilesFromDrop = []
let cropped_image = ""
document.getElementById('repImageDivInput').addEventListener('input', function(){
    document.getElementById('replaceImage').click()
    document.getElementById('repImageDivInput').value= ""

})
document.getElementById('replaceImage').addEventListener('click', function() {
    const canvas = currSelectedCanvas;
    const objectsAll = canvas.getObjects();
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.type === 'image') {
        const index = objectsAll.findIndex(obj => obj === activeObject);
        if (index !== -1) {
            // Assume you have an input element with type="file" for image upload

            const fileInput = document.getElementById('repImageDivInput');

            // Check if a file was selected
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                let imageUrl

                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        imageUrl = event.target.result;
                            // Create a new fabric.js image object from the uploaded file
                            fabric.Image.fromURL(imageUrl, function(newImage) {
                                // Set the new image's scaleX and scaleY to match the original image
                                let scale = Math.min((activeObject.width * activeObject.scaleX) / newImage.width, (activeObject.height * activeObject.scaleY) / newImage.height)
                                newImage.scaleX = scale
                                newImage.scaleY =  scale
                                const roundedCorners = (fabricObject, cornerRadius) => new fabric.Rect({
                                    width: fabricObject.width,
                                    height: fabricObject.height,
                                    rx: cornerRadius / fabricObject.scaleX,
                                    ry: cornerRadius / fabricObject.scaleY,
                                    left: -fabricObject.width / 2,
                                    top: -fabricObject.height / 2
                                })
                                
                                newImage.set("clipPath", roundedCorners(newImage, 10))
                                

                                
                                // Remove the existing image object from the canvas
                                canvas.remove(activeObject);

                                // Add the new image object at the same position in the canvas
                                canvas.insertAt(newImage, index);

                                // Update the canvas
                                canvas.renderAll();
                            });
                    };
                    reader.readAsDataURL(file);
                }

            }else if(repImgFilesFromDrop.length > 0){
                const file = repImgFilesFromDrop[0]

                let imageUrl
                
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        imageUrl = event.target.result;
                            // Create a new fabric.js image object from the uploaded file
                            fabric.Image.fromURL(imageUrl, function(newImage) {
                                // Set the new image's scaleX and scaleY to match the original image
                                let scale = Math.min((activeObject.width * activeObject.scaleX) / newImage.width, (activeObject.height * activeObject.scaleY) / newImage.height)
                                newImage.scaleX = scale
                                newImage.scaleY =  scale
                                const roundedCorners = (fabricObject, cornerRadius) => new fabric.Rect({
                                    width: fabricObject.width,
                                    height: fabricObject.height,
                                    rx: cornerRadius / fabricObject.scaleX,
                                    ry: cornerRadius / fabricObject.scaleY,
                                    left: -fabricObject.width / 2,
                                    top: -fabricObject.height / 2
                                })
                                
                                newImage.set("clipPath", roundedCorners(newImage, 10))
                                

                                
                                // Remove the existing image object from the canvas
                                canvas.remove(activeObject);

                                // Add the new image object at the same position in the canvas
                                canvas.insertAt(newImage, index);

                                // Update the canvas
                                canvas.renderAll();
                            });
                    };
                    reader.readAsDataURL(file);
                }
            }else if(cropped_image != ""){

                // Create a new fabric.js image object from the uploaded file
                fabric.Image.fromURL(cropped_image, function(newImage) {
                    // Set the new image's scaleX and scaleY to match the original image
                    let scale = Math.min((activeObject.width * activeObject.scaleX) / newImage.width, (activeObject.height * activeObject.scaleY) / newImage.height)
                    newImage.scaleX = scale
                    newImage.scaleY =  scale
                    const roundedCorners = (fabricObject, cornerRadius) => new fabric.Rect({
                        width: fabricObject.width,
                        height: fabricObject.height,
                        rx: cornerRadius / fabricObject.scaleX,
                        ry: cornerRadius / fabricObject.scaleY,
                        left: -fabricObject.width / 2,
                        top: -fabricObject.height / 2
                    })
                    
                    newImage.set("clipPath", roundedCorners(newImage, 10))
                    
                    // Remove the existing image object from the canvas
                    canvas.remove(activeObject);

                    // Add the new image object at the same position in the canvas
                    canvas.insertAt(newImage, index);

                    // Update the canvas
                    canvas.renderAll();

                            

                });
            }
        }
    }
});


document.getElementById('loadImage').addEventListener('click', function() {
    const imageUrl = document.getElementById('imageUrlInput').value;
    if (imageUrl) {
        loadImageFromURL(imageUrl);
    }
});

document.getElementById('rotate').addEventListener('click', function() {
    const activeObject = currSelectedCanvas.getActiveObject();
    if (activeObject && activeObject.type === 'image') {
        activeObject.rotate(activeObject.angle + 90);
        currSelectedCanvas.requestRenderAll();
    }
});

// document.getElementById('scale').addEventListener('input', function() {
//     const activeObject = currSelectedCanvas.getActiveObject();
//     if (activeObject && activeObject.type === 'image') {
//         const scaleValue = parseFloat(this.value);
//         activeObject.scale(scaleValue);
//         currSelectedCanvas.requestRenderAll();
//     }
// });

document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            loadImageFromURL(imageUrl);
        };
        reader.readAsDataURL(file);
    }
});

currSelectedCanvas.on('drop', function(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            loadImageFromURL(imageUrl);
        };
        reader.readAsDataURL(file);
    }
});




updateImageList();


// ... your existing code ...




// ... your existing code ...

// Function to handle the drag-and-drop area
const dragAndDrop = document.getElementById('dragAndDrop');
dragAndDrop.addEventListener('dragover', function(e) {
    e.preventDefault();
    dragAndDrop.classList.add('dragover'); // Add the "dragover" class
});
dragAndDrop.addEventListener('dragleave', function(e) {
    e.preventDefault();
    dragAndDrop.classList.remove('dragover'); // Remove the "dragover" class
});
dragAndDrop.addEventListener('drop', function(e) {
    e.preventDefault();
    dragAndDrop.classList.remove('dragover'); // Remove the "dragover" class
    const file = e.dataTransfer.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            loadImageFromURL(imageUrl);
        };
        reader.readAsDataURL(file);
    }
});


const repImgDragAndDrop = document.getElementById('repImgDragAndDrop');
repImgDragAndDrop.addEventListener('dragover', function(e) {
    e.preventDefault();
    repImgDragAndDrop.classList.add('dragover'); // Add the "dragover" class
});
repImgDragAndDrop.addEventListener('dragleave', function(e) {
    e.preventDefault();
    repImgDragAndDrop.classList.remove('dragover'); // Remove the "dragover" class
});
repImgDragAndDrop.addEventListener('drop', function(e) {
    e.preventDefault();
    repImgDragAndDrop.classList.remove('dragover'); // Remove the "dragover" class
    const file = e.dataTransfer.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            // loadImageFromURL(imageUrl);

        };
        repImgFilesFromDrop.push(file)
        document.getElementById('replaceImage').click()
        reader.readAsDataURL(file);
    }
});






  // Hide the div with a smooth hide effect when the button is clicked
  $(".hideMediaButton").click(function() {
        closeAllDiv()
    });

  // Hide the div with a smooth hide effect when the button is clicked
  $("#openMediaButton").click(function() {
    openMediaDiv()
    });

  $("#openTextButton").click(function(){
    openTextDiv()
  })


  
function openRepMediaDiv() {
    $("#text_div").fadeOut(0); // 500ms (0.5s) is the duration of the hide effect
    $(".col_div").fadeOut(0)
    $('#upload_media_div').fadeOut(0);
    $("#media_div").fadeIn(200);
    $("#replace_media_div").fadeIn(200);
}

function openMediaDiv() {
        $("#text_div").fadeOut(0); // 500ms (0.5s) is the duration of the hide effect
        $(".col_div").fadeOut(0)
        $('#replace_media_div').fadeOut(0);

        $("#media_div").fadeIn(200);
        $('#upload_media_div').fadeIn(200);
}

function openTextDiv() {
    const textDiv = $("#text_div");
    if (textDiv.css("display") === "none") {
        $("#media_div").fadeOut(0); // 500ms (0.5s) is the duration of the hide effect
        $('#upload_media_div').fadeOut(0);
        $(".col_div").fadeOut(0)
        $('#replace_media_div').fadeOut(0);

        textDiv.fadeIn(200);

    }
}

function closeAllDiv(){
    $(".col_div").fadeIn(100)
    $("#media_div").fadeOut(0); // 500ms (0.5s) is the duration of the hide effect
    $('#upload_media_div').fadeOut(0);
    $('#replace_media_div').fadeOut(0);
    $("#text_div").fadeOut(0); // 500ms (0.5s) is the duration of the hide effect
}



// -------------------------------------------------------------------------------------
let objects = [];

function addObjectToCanvas(object) {
    currSelectedCanvas.add(object);
    objects.push(object);
    currSelectedCanvas.setActiveObject(object);
    currSelectedCanvas.renderAll();
}



document.getElementById('addText').addEventListener('click', function () {
    addText("Enter Text Here");
});

document.getElementById('setFontFamily').addEventListener('change', function () {
    const fontFamily = this.value;
    const activeObject = currSelectedCanvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        activeObject.set({ fontFamily: fontFamily });
        currSelectedCanvas.requestRenderAll();
    }
});

document.getElementById('setFontSize').addEventListener('input', function () {
    const fontSize = parseInt(this.value, 10);
    const activeObject = currSelectedCanvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        activeObject.set({ fontSize: fontSize });
        currSelectedCanvas.requestRenderAll();
    }
});

document.getElementById('setFontWeight').addEventListener('change', function () {
    const fontWeight = this.value;
    const activeObject = currSelectedCanvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        activeObject.set({ fontWeight: fontWeight });
        currSelectedCanvas.requestRenderAll();
    }
});

// Add Text Color, Alignment, and other options
document.getElementById('setTextColor').addEventListener('input', function () {
    const textColor = this.value;
    const activeObject = currSelectedCanvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        activeObject.set({ fill: textColor });
        currSelectedCanvas.requestRenderAll();
    }
});


document.getElementById('setTextAlignment').addEventListener('change', function () {
    const textAlignment = this.value;
    const activeObject = currSelectedCanvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        activeObject.set({ textAlign: textAlignment });
        currSelectedCanvas.requestRenderAll();
    }
});



let fontSizeSlider = document.getElementById('setFontSize')
fontSizeSlider.addEventListener("input", function(){
    document.getElementById("fontSizeLabel").innerText = fontSizeSlider.value +"px"
})

// -----------------------------------------------------------------------------
// Undo REDO 

// Assuming 'canvas' is your Fabric.js canvas object

// Assuming 'canvas' is your Fabric.js canvas object

// Initialize an array to store the canvas state history

// Function to save the current canvas state to the history
function saveCanvasState(index) {
    currentStateIndex++;
    if (currentStateIndex < canvasStateHistory.length) {
        canvasStateHistory.length = currentStateIndex;
        selectionHistory.length = currentStateIndex;
    }
    selectionHistory.push(index)

    canvasStateHistory.push(JSON.stringify(currSelectedCanvas));
    currentJSONState = JSON.stringify(currSelectedCanvas); // Update the current JSON state
}

// Function to undo the last action
function undo() {
    if (currentStateIndex > 0) {
        currentStateIndex--;
        selectCanvas(selectionHistory[currentStateIndex])
        var jsonData = canvasStateHistory[currentStateIndex];
        loadFromJSON(jsonData);
    }
}

// Function to redo the last undone action
function redo() {
    if (currentStateIndex < canvasStateHistory.length - 1) {
        currentStateIndex++;
        selectCanvas(selectionHistory[currentStateIndex])

        var jsonData = canvasStateHistory[currentStateIndex];
        loadFromJSON(jsonData);
    }
}

document.addEventListener('keydown', function(event) {
    // Check if Ctrl key is pressed (event.ctrlKey) and the key is 'Z' (event.key === 'z')
    if (event.ctrlKey && event.key === 'z') {
      if(textEditingEnabled == false){
        undo()

      }
    }

    // Check if Ctrl key is pressed (event.ctrlKey) and the key is 'Y' (event.key === 'y')
    if (event.ctrlKey && event.key === 'y') {
      if(textEditingEnabled == false){
          redo()
      }
    }
});

// Event listener for mouse events (e.g., mouseup)
// currSelectedCanvas.on('mouse:up', function (options) {
//     console.log("called")

//     // Check if the current state is different from the saved state
//     if (currentJSONState !== JSON.stringify(currSelectedCanvas)) {
//         saveCanvasState();
//     }
// });

// canvas2.on('mouse:up', function(e) {
//     selectedCanvas = 2
// });


// Example usage
saveCanvasState(1); // Save the initial canvas state

// You can call undo() and redo() to navigate through the canvas state history.
// The canvas will be automatically saved when changes are detected.


// You can call undo() and redo() to navigate through the canvas state history.
// Make sure to call saveCanvasState() after each change to the canvas state.

// Example usage for undo and redo buttons:
// document.getElementById('undo-button').addEventListener('click', undo);
// document.getElementById('redo-button').addEventListener('click', redo);

// Function to load a canvas from JSON
function loadFromJSON(jsonData) {
    currSelectedCanvas.loadFromJSON(jsonData, function () {
        // Callback function that is called after the canvas is loaded
        currSelectedCanvas.renderAll();
    });
}




// -----------------------------------------------

let imageKeyword = "technology"
let imgAccLink = "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
let imgAccWidth;
let titleAccHeight, subtitleAccHeight;
let paraAccHeight=0;
let paraAccWidth;
let paraAccLeft;
let generatedTitlesArr = []
let generatedParaArr = []
let aioutputpara=""
let userinput = "Finance Assistant App, include strategies, tech stacks etc."
// let userinput = "Networking leads to success a guide"
let aioutput=""
var container = {};
location.search.split('&').toString().substr(1).split(",").forEach(item => {
    container[item.split("=")[0]] = decodeURIComponent(item.split("=")[1]) ?  item.split("=")[1]: "No query strings available" ;
});
if(container.input != ""){
    userinput = container.input.replaceAll("%20", " " )
}

const apiUrl = 'https://ohnkp2p5rxptutw657b47yevlq0ffsgr.lambda-url.ap-south-1.on.aws/';
let callcount = 0

async function makeFetchRequest(input) {
    callcount++;

    const urlWithParameters = `${apiUrl}?content=${encodeURIComponent(input)}`;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        resolve(data.completion);
                    } catch (parseError) {
                        console.error('Error parsing response:', parseError);
                        reject(parseError);
                    }
                } else {
                    const error = new Error(`Network response was not ok, status: ${xhr.status}`);
                    console.error('Error:', error);
                    reject(error);
                }
            }
        };

        xhr.open('GET', urlWithParameters, true);
        xhr.send();
    });
}


function removeNumbering(text) {
    // Use regular expression to remove numbering
    return text.replace(/^\d+\.\s/, '');
}





async function generateContent(userinput) {


    const input = 'write a title on subject:' + encodeURIComponent(userinput) + ', max words 3';

    return await makeFetchRequest(input);
}

async function generateTenTitles(userinput) {
  
  const input = `For a presentation write 7 table of content heading on subject: ` + encodeURIComponent(userinput) + `.heading example: Introduction, features, target Audience, benefits etc. each heading of 2 words max`;

  return await makeFetchRequest(input);
}

async function generatePara(userinput) {
  
  const input = `write 3 points on subject: ` + encodeURIComponent(userinput) + `, each point 10-15 words max. 3 points like 1., 2., 3.`;

  return await makeFetchRequest(input);
}

async function generateParaJson(userinput) {
  
    const input = `write 3 points on subject: `+ encodeURIComponent(userinput) + `, each point has title and para, para of 10-15 words and title of 2 words. return in json format {points: []}.`

    return await makeFetchRequest(input);
}

async function generateParaForMainTemp(userinput) {
  
  const input = `write 6 points on subject: ` + encodeURIComponent(userinput) + `, each point 10-15 words max. 6 points like 1., 2., 3.`;

  return await makeFetchRequest(input);
}

async function generateImageKeyword(userinput) {
  
  const input = `write an image keyword that explains on subject: ` + encodeURIComponent(userinput) + `. max keyword words 1`;

  return await makeFetchRequest(input);
}

// "Introduction - Memes and Marketing"













  

// let para = `Business development in today's world is essential for companies to thrive and stay competitive. With rapid advancements in technology and globalization, businesses must adapt and seek new opportunities. This involves researching market trends, fostering strategic partnerships, and leveraging digital tools for marketing and sales. Embracing innovative strategies and staying customer-focused are key factors in successful business development in the modern era.`
// let remarkText = `By Akshat Parmar`

// function mainTemplate(){
//     loadImageFromURL(imgAccLink, true)
//     setTimeout(()=>{
//         generateContent(userinput)
        
//         generatePara(userinput)

    
//     }, 1000)
// }

// selectCanvas(0)
// mainTemplate()



