function addText(inputText, accText, title, para, remark) {
    const canvasWidth = currSelectedCanvas.width;
    const canvasHeight = currSelectedCanvas.height;

    const remainingWid = canvasWidth - (imgAccWidth * 1.2);

    const textOptions = {
        left: 100,
        top: canvasHeight/8,
        fill: '#000000',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Arial',
        text: inputText,
        lineHeight: 1.1,
        cornerStyle: 'circle',
        
  textBackgroundColor: 'transparent',
        
    };

    if (accText) {
        textOptions.left = imgAccWidth * 1.1;
        if(title == true){
            textOptions.fontSize = 45
            if(canvasWidth < 680){
                textOptions.fontSize = 25
                textOptions.lineHeight = 1
            }else if(canvasWidth < 780){
                textOptions.fontSize = 30
            }
            textOptions.width = remainingWid
            textOptions.fontWeight  = "bold"
            textOptions.top  = canvasHeight/12
            textOptions.fill ="Green"
            textOptions.fontFamily = "poppins"

            
        }
        if(para == true){
            textOptions.fontSize = 16.5

            textOptions.width = remainingWid
            textOptions.fontWeight  = "normal"
            textOptions.top  = titleAccHeight+canvasHeight/12+canvasHeight/24
            textOptions.lineHeight = 1.4
            if(canvasWidth < 680){
                textOptions.fontSize = 14
                textOptions.lineHeight = 1
            }else if(canvasWidth < 780){
                textOptions.fontSize = 15
                textOptions.lineHeight = 1.1
            }
            textOptions.fontFamily = "Arial"

        }

        if(remark == true){
            textOptions.fontSize = 16.5
            textOptions.fontWeight  = "bold"
            textOptions.top  = paraAccHeight+titleAccHeight+canvasHeight/12+canvasHeight/24+canvasHeight/12
            textOptions.left  = imgAccWidth * 1.1+ 50
            textOptions.lineHeight = 1.1
            textOptions.width = remainingWid/2
            if(canvasWidth < 680){
                textOptions.fontSize = 14
                textOptions.lineHeight = 1
            }else if(canvasWidth < 780){
                textOptions.fontSize = 15
                textOptions.lineHeight = 1.1
            }
        }
    }


    const text = new fabric.Textbox(inputText, textOptions);
    if(title == true){
        titleAccHeight = text.height

                // Create a new radial gradient instance
        var radialGradient = new fabric.Gradient({
            type: 'linear',
            coords: {
            x1: 0,
            y1: 0,
            x2: remainingWid,
            y2: 0
            },
            colorStops: [
            { offset: 0, color: '#6C65CF' },
            { offset: 1, color: '#7500CF' }
            ]
        });
        
        // Set the fill value of the text instance to the radial gradient instance
        text.set('fill', radialGradient);
    }
    if(para == true){
        paraAccHeight = text.height
    }

    text.setControlVisible('mt', false);  // Show the middle-top resize handle
    text.setControlVisible('mb', false);  // Show the middle-bottom resize handle

    addObjectToCanvas(text);
}




function mainTemplate(inputText, accText, title, para, remark){
    
    const canvasWidth = currSelectedCanvas.width;
    const canvasHeight = currSelectedCanvas.height;

    const remainingWid = canvasWidth - (imgAccWidth * 1.2);

    const textOptions = {
        left: 100,
        top: canvasHeight/8,
        fill: '#000000',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Arial',
        text: inputText,
        lineHeight: 1.1,
        cornerStyle: 'circle',
        
  textBackgroundColor: 'transparent',
        
    };

    if (accText) {
        textOptions.left = imgAccWidth * 1.1;
        if(title == true){
            textOptions.fontSize = 45
            if(canvasWidth < 680){
                textOptions.fontSize = 25
                textOptions.lineHeight = 1
            }else if(canvasWidth < 780){
                textOptions.fontSize = 30
            }
            textOptions.width = remainingWid
            textOptions.fontWeight  = "bold"
            textOptions.top  = canvasHeight/12
            textOptions.fill ="Green"
            textOptions.fontFamily = "poppins"

            
        }
        if(para == true){
            textOptions.fontSize = 16

            textOptions.width = remainingWid
            textOptions.fontWeight  = "normal"
            textOptions.top  = titleAccHeight+canvasHeight/12+canvasHeight/24
            textOptions.lineHeight = 1.4
            if(canvasWidth < 680){
                textOptions.fontSize = 14
                textOptions.lineHeight = 1
            }else if(canvasWidth < 780){
                textOptions.fontSize = 15
                textOptions.lineHeight = 1.1
            }
            textOptions.fontFamily = "Arial"

        }

        if(remark == true){
            textOptions.fontSize = 16.5
            textOptions.fontWeight  = "bold"
            textOptions.top  = paraAccHeight+titleAccHeight+canvasHeight/12+canvasHeight/24+canvasHeight/12
            textOptions.left  = imgAccWidth * 1.1+ 50
            textOptions.lineHeight = 1.1
            textOptions.width = remainingWid/2
            if(canvasWidth < 680){
                textOptions.fontSize = 14
                textOptions.lineHeight = 1
            }else if(canvasWidth < 780){
                textOptions.fontSize = 15
                textOptions.lineHeight = 1.1
            }
        }
    }


    const text = new fabric.Textbox(inputText, textOptions);
    if(title == true){
        titleAccHeight = text.height

                // Create a new radial gradient instance
        var radialGradient = new fabric.Gradient({
            type: 'linear',
            coords: {
            x1: 0,
            y1: 0,
            x2: remainingWid,
            y2: 0
            },
            colorStops: [
            { offset: 0, color: '#6C65CF' },
            { offset: 1, color: '#7500CF' }
            ]
        });
        
        // Set the fill value of the text instance to the radial gradient instance
        text.set('fill', radialGradient);
    }
    if(para == true){
        paraAccHeight = text.height
    }

    text.setControlVisible('mt', false);  // Show the middle-top resize handle
    text.setControlVisible('mb', false);  // Show the middle-bottom resize handle

    addObjectToCanvas(text);
}

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function leftAccImgWithThreePoints(inputText, accText, title, para, paraNum) {
    const canvasWidth = currSelectedCanvas.width;
    const canvasHeight = currSelectedCanvas.height;

    const remainingWid = canvasWidth - (imgAccWidth * 1.3);

    const textOptions = {
        left: 100,
        top: canvasHeight/8,
        fill: '#000000',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Arial',
        text: inputText,
        lineHeight: 1.1,
        cornerStyle: 'circle',
        
  textBackgroundColor: 'transparent',
        
    };

    if (accText) {
        textOptions.left = imgAccWidth * 1.125;

        if(title == true){
            textOptions.fontSize = 45
            if(canvasWidth < 680){
                textOptions.fontSize = 25
                textOptions.lineHeight = 1
            }else if(canvasWidth < 780){
                textOptions.fontSize = 30
            }
            textOptions.width = remainingWid
            textOptions.fontWeight  = "bold"
            textOptions.top  = canvasHeight/12
            textOptions.fill ="Green"
            textOptions.fontFamily = "poppins"

            
        }
        if(para == true){

            textOptions.fontSize = 18

            textOptions.width = remainingWid
            textOptions.fontWeight  = "normal"
            textOptions.lineHeight = 1.4
            if(canvasWidth < 680){
                textOptions.fontSize = 14
                textOptions.lineHeight = 1
            }else if(canvasWidth < 780){
                textOptions.fontSize = 15
                textOptions.lineHeight = 1.1
            }
            textOptions.fontFamily = "Arial"
            
            if(paraNum == 0){
                textOptions.top  = titleAccHeight+canvasHeight/12+canvasHeight/12
                
            }else if(paraNum == 1){
                textOptions.top  = titleAccHeight+canvasHeight/12+canvasHeight/12+paraAccHeight+canvasHeight/12

            }else if(paraNum == 2){
                textOptions.top  = titleAccHeight+canvasHeight/12+canvasHeight/12+paraAccHeight+canvasHeight/12+paraAccHeight+canvasHeight/12+canvasHeight/36

            }

        }


    }


    const text = new fabric.Textbox(inputText, textOptions);
    if(title == true){
        titleAccHeight = text.height

                // Create a new radial gradient instance
        var radialGradient = new fabric.Gradient({
            type: 'linear',
            coords: {
            x1: 0,
            y1: 0,
            x2: remainingWid,
            y2: 0
            },
            colorStops: [
            { offset: 0, color: '#6C65CF' },
            { offset: 1, color: '#7500CF' }
            ]
        });
        
        // Set the fill value of the text instance to the radial gradient instance
        text.set('fill', radialGradient);
    }
    if(para == true){
        paraAccHeight = text.height
    }

    text.setControlVisible('mt', false);  // Show the middle-top resize handle
    text.setControlVisible('mb', false);  // Show the middle-bottom resize handle

    addObjectToCanvas(text);
}

let paraPointObj0, paraPointObj1, paraPointObj2
let subtitlePointObj0, subtitlePointObj1, subtitlePointObj2

function leftCenterTitle(inputText, accText, title, para, paraNum, subtitle) {
    const canvasWidth = currSelectedCanvas.width;
    const canvasHeight = currSelectedCanvas.height;

    const remainingWid = canvasWidth/2;
    let leftClip = remainingWid / 8;

    const textOptions = {
        left: 100,
        top: canvasHeight/8,
        fill: '#000000',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Arial',
        text: inputText,
        lineHeight: 1.1,
        cornerStyle: 'circle',
        
  textBackgroundColor: 'transparent',
        
    };

    if (accText) {
        textOptions.left =leftClip ;

        if(title == true){
            textOptions.fontSize = 45
            if(canvasWidth < 680){
                textOptions.fontSize = 25
                textOptions.lineHeight = 1
            }else if(canvasWidth < 780){
                textOptions.fontSize = 30
            }
            textOptions.fontWeight  = "bold"
            textOptions.top  = canvasHeight/2.4
            textOptions.fill ="Green"
            textOptions.fontFamily = "poppins"

            
        }
        if(subtitle == true){
            textOptions.left = canvasWidth/1.9;
            textOptions.fontSize = 22
            textOptions.width = remainingWid/1.2
            textOptions.fontWeight  = "bold"
            textOptions.lineHeight = 1
            if(canvasWidth < 680){
                textOptions.fontSize = 20
            }else if(canvasWidth < 780){
                textOptions.fontSize = 18
            }
            textOptions.fontFamily = "poppins"
            


        }
        
        if(para == true){
            textOptions.left = canvasWidth/1.9;

            textOptions.fontSize = 17

            textOptions.width = remainingWid/1.2
            textOptions.fontWeight  = "normal"
            textOptions.lineHeight = 1.3
            if(canvasWidth < 680){
                textOptions.fontSize = 14
                textOptions.lineHeight = 1
            }else if(canvasWidth < 780){
                textOptions.fontSize = 15
                textOptions.lineHeight = 1.1
            }
            textOptions.fontFamily = "Arial"
            


        }


    }


    const text = new fabric.Textbox(inputText, textOptions);
    text.setControlVisible('mt', false);  // Show the middle-top resize handle
    text.setControlVisible('mb', false);  // Show the middle-bottom resize handle

    if(title == true){
        titleAccHeight = text.height

                // Create a new radial gradient instance
        var radialGradient = new fabric.Gradient({
            type: 'linear',
            coords: {
            x1: 0,
            y1: 0,
            x2: remainingWid,
            y2: 0
            },
            colorStops: [
            { offset: 0, color: '#6C65CF' },
            { offset: 1, color: '#7500CF' }
            ]
        });
        
        // Set the fill value of the text instance to the radial gradient instance
        text.set('fill', radialGradient);
        text.set('top', (canvasHeight-titleAccHeight)/2);
    }

    if(para == true || subtitle == true){

        paraAccHeight = text.height

        if(paraNum == 0){
            if(para == true){
                paraPointObj0 = text
            }
            if(subtitle == true){
                subtitleAccHeight = text.height

                subtitlePointObj0 = text
            }

        }else if(paraNum == 1){
            if(para == true){
                paraPointObj1 = text
            }
            if(subtitle == true){
                subtitlePointObj1 = text
            }
        }else if(paraNum == 2){
            if(subtitle == true){
                subtitlePointObj2 = text
            }
            if(para == true){
                paraPointObj2 = text
                // ----------
                var totalHeight = subtitleAccHeight*3+paraPointObj0.height + paraPointObj1.height + paraPointObj2.height+ canvasHeight/24 ;

                // Calculate spacing
                var spacing = (canvasHeight - totalHeight) / 3.2;
                subtitlePointObj0.set({ top: spacing });
                subtitlePointObj1.set({ top: spacing + paraPointObj0.height + canvasHeight/6});
                subtitlePointObj2.set({ top: spacing + paraPointObj0.height + paraPointObj1.height  + canvasHeight/6 + canvasHeight/6 });
    
    
                // Set positions
                paraPointObj0.set({ top: spacing +subtitleAccHeight+ subtitleAccHeight/3 });
                paraPointObj1.set({ top: spacing +subtitleAccHeight+ subtitleAccHeight/3 + paraPointObj0.height + canvasHeight/6});
                paraPointObj2.set({ top: spacing +subtitleAccHeight+ subtitleAccHeight/3 + paraPointObj0.height + paraPointObj1.height  + canvasHeight/6 + canvasHeight/6 });
    
            }


        }
    }

    addObjectToCanvas(text);
}

async function pointsNumImg(url, accentImg, top) {
    return new Promise((resolve, reject) => {
        fabric.Image.fromURL(url, async function(img) {
            const canvasWidth = currSelectedCanvas.width;
            const canvasHeight = currSelectedCanvas.height;
            const remainingWid = canvasWidth * 0.7 / 2.6;

            let imgHeight = img.height * 1.2;
            if (accentImg == true) {
                imgHeight = img.height/1.1;
                
            }
            let scale = remainingWid / img.width;

            img.scaleX = scale/8;
            img.scaleY = scale/8;

            if (accentImg == true) {
                img.left = canvasWidth/2.1
                img.top = top

            }

            const roundedCorners = (fabricObject, cornerRadius) => new fabric.Rect({
                width: fabricObject.width,
                height: fabricObject.height,
                rx: cornerRadius / fabricObject.scaleX,
                ry: cornerRadius / fabricObject.scaleY,
                left: -fabricObject.width / 2,
                top: -fabricObject.height / 2
            });

            img.set("clipPath", roundedCorners(img, 8));

            const canvasJSON = currSelectedCanvas.toJSON();
            await new Promise((loadResolve, loadReject) => {
                currSelectedCanvas.loadFromJSON(canvasJSON, function() {
                    currSelectedCanvas.add(img);
                    images.push(img);
                    currSelectedCanvas.renderAll();
                    updateImageList();
                    loadResolve();
                });
            });

            img.bringToFront()


            resolve();
        });
    });
}



async function colBgImg(url, accentImg) {
    return new Promise((resolve, reject) => {
        fabric.Image.fromURL(url, async function(img) {
            const canvasWidth = currSelectedCanvas.width;
            const canvasHeight = currSelectedCanvas.height;
            const imgWidth = img.width;
            const remainingWid = canvasWidth * 0.7 / 2.6;

            let imgHeight = img.height * 1.2;
            if (accentImg == true) {
                imgHeight = img.height;
            }
            let scale = remainingWid / img.width;

            img.scaleX = scale;
            img.scaleY = scale;

            img.left = (canvasWidth - imgWidth * scale) / 2;
            img.top = ((canvasHeight - imgHeight * scale) / 2) + 50;

            if (accentImg == true) {
                img.left = paraAccLeft + (canvasWidth * 0.7 / 2.8 - remainingWid);
                img.top = titleAccHeight + canvasHeight / 7;

            }

            const roundedCorners = (fabricObject, cornerRadius) => new fabric.Rect({
                width: fabricObject.width,
                height: fabricObject.height,
                rx: cornerRadius / fabricObject.scaleX,
                ry: cornerRadius / fabricObject.scaleY,
                left: -fabricObject.width / 2,
                top: -fabricObject.height / 2
            });

            img.set("clipPath", roundedCorners(img, 20));

            const canvasJSON = currSelectedCanvas.toJSON();
            await new Promise((loadResolve, loadReject) => {
                currSelectedCanvas.loadFromJSON(canvasJSON, function() {
                    currSelectedCanvas.add(img);
                    images.push(img);
                    currSelectedCanvas.renderAll();
                    updateImageList();
                    loadResolve();
                });
            });

            img.sendToBack()


            resolve();
        });
    });
}

async function colBgImgNum(url, accentImg) {
    return new Promise((resolve, reject) => {
        fabric.Image.fromURL(url, async function(img) {
            const canvasWidth = currSelectedCanvas.width;
            const canvasHeight = currSelectedCanvas.height;
            const imgWidth = img.width;
            const remainingWid = canvasWidth * 0.7 / 2.6;

            let imgHeight = img.height * 1.2;
            if (accentImg == true) {
                imgHeight = img.height;
            }
            let scale = remainingWid / img.width;

            img.scaleX = scale/7;
            img.scaleY = scale/7;

            img.left = (canvasWidth - imgWidth * scale) / 2;
            img.top = ((canvasHeight - imgHeight * scale) / 2) + 50;

            if (accentImg == true) {
                img.left = paraAccLeft + (canvasWidth * 0.7 / 2.8 - remainingWid) - 3;
                img.top = titleAccHeight + canvasHeight / 8.7;

            }

            const roundedCorners = (fabricObject, cornerRadius) => new fabric.Rect({
                width: fabricObject.width,
                height: fabricObject.height,
                rx: cornerRadius / fabricObject.scaleX,
                ry: cornerRadius / fabricObject.scaleY,
                left: -fabricObject.width / 2,
                top: -fabricObject.height / 2
            });

            img.set("clipPath", roundedCorners(img, 8));

            const canvasJSON = currSelectedCanvas.toJSON();
            await new Promise((loadResolve, loadReject) => {
                currSelectedCanvas.loadFromJSON(canvasJSON, function() {
                    currSelectedCanvas.add(img);
                    images.push(img);
                    currSelectedCanvas.renderAll();
                    updateImageList();
                    loadResolve();
                });
            });

            img.bringToFront()


            resolve();
        });
    });
}


async function colAccImgWithThreePoints(inputText, accText, title, para, paraNum, subtitle) {
    const canvasWidth = currSelectedCanvas.width;
    const canvasHeight = currSelectedCanvas.height;

    const remainingWid = canvasWidth * 0.7;
    let leftClip = remainingWid / 4 / 3;

    const textOptions = {
        left: leftClip,
        top: canvasHeight / 8,
        fill: '#000000',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Arial',
        text: inputText,
        lineHeight: 1.1,
        cornerStyle: 'circle',
        textBackgroundColor: 'transparent',
    };

    if (accText) {
        textOptions.left = canvasWidth * 0.1;

        if (title == true) {
            textOptions.fontSize = 45;
            if (canvasWidth < 680) {
                textOptions.fontSize = 25;
                textOptions.lineHeight = 1;
            } else if (canvasWidth < 780) {
                textOptions.fontSize = 30;
            }
            textOptions.width = remainingWid;
            textOptions.fontWeight = 'bold';
            textOptions.top = canvasHeight / 12;
            textOptions.fill = 'Green';
            textOptions.fontFamily = 'poppins';
        }

        if (subtitle == true) {
            textOptions.fontSize = 22;
            textOptions.width = remainingWid / 3;
            textOptions.fontWeight = 'bold';
            textOptions.lineHeight = 1;

            if (canvasWidth < 680) {
                textOptions.fontSize = 18;
                textOptions.lineHeight = 1;
            } else if (canvasWidth < 780) {
                textOptions.fontSize = 20;
                textOptions.lineHeight = 1.1;
            }
            textOptions.fontFamily = 'poppins';
            textOptions.top = titleAccHeight + canvasHeight / 10 + canvasHeight / 6;

            if (paraNum == 0) {
            } else if (paraNum == 1) {
                textOptions.left = paraAccWidth + leftClip + leftClip + leftClip / 2 + leftClip / 8;
            } else if (paraNum == 2) {
                textOptions.left = paraAccWidth + leftClip + paraAccWidth + leftClip + leftClip + leftClip / 2;
            }
        }

        if (para == true) {
            textOptions.fontSize = 16.5;
            textOptions.width = remainingWid / 3;
            textOptions.fontWeight = 'normal';
            textOptions.lineHeight = 1.4;

            if (canvasWidth < 680) {
                textOptions.fontSize = 14;
                textOptions.lineHeight = 1;
            } else if (canvasWidth < 780) {
                textOptions.fontSize = 15;
                textOptions.lineHeight = 1.1;
            }
            textOptions.fontFamily = 'Arial';
            textOptions.top = subtitleAccHeight + canvasHeight/24 + titleAccHeight + canvasHeight / 10 + canvasHeight / 6;

            if (paraNum == 0) {
            } else if (paraNum == 1) {
                textOptions.left = paraAccWidth + leftClip + leftClip + leftClip / 2 + leftClip / 8;
            } else if (paraNum == 2) {
                textOptions.left = paraAccWidth + leftClip + paraAccWidth + leftClip + leftClip + leftClip / 2;
            }
        }
    }

    const text = new fabric.Textbox(inputText, textOptions);

    if (title == true) {
        titleAccHeight = text.height;

        var radialGradient = new fabric.Gradient({
            type: 'linear',
            coords: {
                x1: 0,
                y1: 0,
                x2: remainingWid,
                y2: 0,
            },
            colorStops: [
                { offset: 0, color: '#6C65CF' },
                { offset: 1, color: '#7500CF' },
            ],
        });

        text.set('fill', radialGradient);
    }

    if (para == true) {
        paraAccHeight = text.height;
        paraAccWidth = text.width;
        paraAccLeft = textOptions.left;
    }
    if(subtitle == true){
        subtitleAccHeight = text.height
    }

    text.setControlVisible('mt', false);
    text.setControlVisible('mb', false);

    await addObjectToCanvas(text);
}

let threePointsFromGenParaArr = []
let allSlidesJsonContent = []

async function splitPointsAsync(text) {
    return new Promise((resolve) => {
        let titlesArr = text.split("\n");

        // Remove numbering from each string in the array
        let newArray= titlesArr.map(removeNumbering);
        // Use filter with arrow function to remove empty strings
        threePointsFromGenParaArr = newArray.filter(item => item !== "");

        // Resolve with the result
        resolve(threePointsFromGenParaArr);
    });
}

//load main accent Image *
// loadImageFromURL(imgAccLink, true)


// generate titles and para * --first


  
async function generateMainTemplate(userinput) {
    try {
        addPageBelow(2)
        addPageBelow(3)
        addPageBelow(4)
        addPageBelow(5)
        selectCanvas(0)
      // Generate main title -- parallel
      let localEnv = true
        
      const content = await generateContent(userinput);
      console.log('Generated main title:', content);
      localStorage.setItem("content", content)

      let para = await generateParaForMainTemp(userinput);
      console.log('Generated paragraph:', para);
      generatedParaArr.push(para);
      localStorage.setItem("generatedParaArr", generatedParaArr)


      // Generate Acc Image Keyword -- wait for generateContent
      const imageKeywords = await generateImageKeyword(content);
      console.log('Generated image keywords:', imageKeywords);
      localStorage.setItem("imageKeywords", imageKeywords)
  
      await getAccImage(imageKeywords);


// WAIT here for 1s
await new Promise(resolve => setTimeout(resolve, 1000));

      let generatedTitlesStr = await generateTenTitles(userinput)

      let titlesArr = await generatedTitlesStr.split("\n");
  
      // Remove numbering from each string in the array
      generatedTitlesArr = await titlesArr.map(removeNumbering);
      localStorage.setItem("generatedTitlesArr", generatedTitlesArr)


        // Generate paragraphs for each title -- sequential
        // for (const section of generatedTitlesArr) {
        //     if(section.split(" ").length > 20){
        //         para = await generatePara(section);
        //         // console.log('Generated paragraph:', para);
        //         generatedParaArr.push(para);
        //     }else{
        //         let inputForParaWithContent = section + " "+ content
        //         para = await generatePara(inputForParaWithContent);
        //         // console.log('Generated paragraph:', para);
        //         generatedParaArr.push(para);
        //     }

        // }


// ------------------
let threeParaAndTitles
let threeParaAndTitlesJson
        // Generate paragraphs for each title -- sequential
        for (const section of generatedTitlesArr) {
            if(section.split(" ").length > 20){
                threeParaAndTitles = await generateParaJson(section);
                // console.log('Generated paragraph:', para);
                // for (let i = 0; i < JSON.parse(threeParaAndTitles).points.length; i++) {
                threeParaAndTitlesJson = JSON.parse(threeParaAndTitles)
                allSlidesJsonContent.push(threeParaAndTitlesJson)
                // }
            }else{
                let inputForParaWithContent = section + " on "+ content
                console.log(inputForParaWithContent)
                threeParaAndTitles = await generateParaJson(inputForParaWithContent);
                threeParaAndTitlesJson = JSON.parse(threeParaAndTitles)
                allSlidesJsonContent.push(threeParaAndTitlesJson)

            }

        }

      localStorage.setItem("generatedParaArr", generatedParaArr)
      localStorage.setItem("allSlidesJsonContent", allSlidesJsonContent)

// ------------------
        
      await splitPointsAsync(generatedParaArr[0])
      console.log(generatedParaArr)
      console.log("on")
      mainTemplate(content,true, true, false, false)

      let paraForMainTemp = threePointsFromGenParaArr[0]+" "+threePointsFromGenParaArr[1]+" "+threePointsFromGenParaArr[2] +" "+threePointsFromGenParaArr[3]+" "+threePointsFromGenParaArr[4]
      if(currSelectedCanvas.toJSON().objects[1].height>120){
        paraForMainTemp = threePointsFromGenParaArr[0]+" "+threePointsFromGenParaArr[1]+" "+threePointsFromGenParaArr[2] +" "+threePointsFromGenParaArr[3]
      }
      if(currSelectedCanvas.toJSON().objects[1].height>155){
        paraForMainTemp = threePointsFromGenParaArr[0]+" "+threePointsFromGenParaArr[1]+" "+threePointsFromGenParaArr[2]
      }
      
      mainTemplate(paraForMainTemp,true, false, true, false)
      mainTemplate("By Akshat Parmar",true, false, false, true)


        selectCanvas(2)
        loadImageFromURL('assets/acc.jpg', true)

        await new Promise(resolve => setTimeout(resolve, 300));

        // await splitPointsAsync(generatedParaArr[2])

        await leftAccImgWithThreePoints(generatedTitlesArr[2], true, true, false)
        await leftAccImgWithThreePoints(allSlidesJsonContent[2].points[0].para, true, false, true, 0)
        await leftAccImgWithThreePoints(allSlidesJsonContent[2].points[1].para, true, false, true, 1)
        await leftAccImgWithThreePoints(allSlidesJsonContent[2].points[2].para, true, false, true, 2)


        setTimeout(async()=>{
            selectCanvas(1)
            // await splitPointsAsync(generatedParaArr[3])
    
            await colAccImgWithThreePoints(generatedTitlesArr[1], true, true, false)
            
            await colAccImgWithThreePoints(allSlidesJsonContent[1].points[0].title, true, false, false, 0, true)
            await colAccImgWithThreePoints(allSlidesJsonContent[1].points[0].para, true, false, true, 0)

            await colBgImg("/assets/colbg.png", true)
            await colBgImgNum("/assets/1.png", true)
            await colAccImgWithThreePoints(allSlidesJsonContent[1].points[1].title, true, false, false, 1, true)
            await colAccImgWithThreePoints(allSlidesJsonContent[1].points[1].para, true, false, true, 1)
            
            await colBgImg("/assets/colbg.png", true)
            await colBgImgNum("/assets/2.png", true)
            
            await colAccImgWithThreePoints(allSlidesJsonContent[1].points[2].title, true, false, false, 2, true)
            await colAccImgWithThreePoints(allSlidesJsonContent[1].points[2].para, true, false, true, 2)
            await colBgImg("/assets/colbg.png", true)
            await colBgImgNum("/assets/3.png", true)

            setTimeout(async()=>{
                selectCanvas(3)
        
                // await splitPointsAsync(generatedParaArr[4])
        
                await leftCenterTitle(generatedTitlesArr[3], true, true, false)
                await leftCenterTitle(allSlidesJsonContent[3].points[0].title, true, false, false, 0, true)
                await leftCenterTitle(allSlidesJsonContent[3].points[1].title, true, false, false, 1, true)
                await leftCenterTitle(allSlidesJsonContent[3].points[2].title, true, false, false, 2, true)
                
                await leftCenterTitle(allSlidesJsonContent[3].points[0].para, true, false, true, 0)
                await leftCenterTitle(allSlidesJsonContent[3].points[1].para, true, false, true, 1)
                await leftCenterTitle(allSlidesJsonContent[3].points[2].para, true, false, true, 2)
                await pointsNumImg("/assets/1v.png", true, subtitlePointObj0.top)
                await pointsNumImg("/assets/2v.png", true, subtitlePointObj1.top)
                await pointsNumImg("/assets/3v.png", true, subtitlePointObj2.top)

                setTimeout(async()=>{
                    selectCanvas(4)
                    // await splitPointsAsync(generatedParaArr[3])
            
                    await colAccImgWithThreePoints(generatedTitlesArr[4], true, true, false)
                    
                    await colAccImgWithThreePoints(allSlidesJsonContent[4].points[0].title, true, false, false, 0, true)
                    await colAccImgWithThreePoints(allSlidesJsonContent[4].points[0].para, true, false, true, 0)
        
                    await colBgImg("/assets/colbg.png", true)
                    await colBgImgNum("/assets/1.png", true)
                    await colAccImgWithThreePoints(allSlidesJsonContent[4].points[1].title, true, false, false, 1, true)
                    await colAccImgWithThreePoints(allSlidesJsonContent[4].points[1].para, true, false, true, 1)
                    
                    await colBgImg("/assets/colbg.png", true)
                    await colBgImgNum("/assets/2.png", true)
                    
                    await colAccImgWithThreePoints(allSlidesJsonContent[4].points[2].title, true, false, false, 2, true)
                    await colAccImgWithThreePoints(allSlidesJsonContent[4].points[2].para, true, false, true, 2)
                    await colBgImg("/assets/colbg.png", true)
                    await colBgImgNum("/assets/3.png", true)


                    setTimeout(async()=>{
                        selectCanvas(6)

                        // conclusion slide
                    }, 300)

                }, 300)

        
            }, 400)

           
    
        }, 300)



  
  
      // Your code continues here, and it will only execute after both functions have completed.
    } catch (error) {
      console.error('Error:', error);
    }
}


  
// async function generateMainTemplate(userinput) {
//     try {
//       // Generate main title -- parallel
//       let localEnv = true
        
//       const content = localStorage.getItem('content');
//       console.log('Generated main title:', content);
//       localStorage.setItem("content", content)

//       let para = localStorage.getItem('para');
//       console.log('Generated paragraph:', para);
//       generatedParaArr.push(para);
//       localStorage.setItem("generatedParaArr", generatedParaArr)


//       // Generate Acc Image Keyword -- wait for generateContent
//       const imageKeywords = localStorage.getItem('imageKeywords');
//       console.log('Generated image keywords:', imageKeywords);
//       localStorage.setItem("imageKeywords", imageKeywords)
  
//       await getAccImage(imageKeywords);


//         // WAIT here for 5s
// // WAIT here for 5s
// await new Promise(resolve => setTimeout(resolve, 1000));

//       let generatedTitlesStr = localStorage.getItem('generatedTitlesStr')

//       let titlesArr = await generatedTitlesStr.split("\n");
  
//       // Remove numbering from each string in the array
//       generatedTitlesArr = await titlesArr.map(removeNumbering);
//       localStorage.setItem("generatedTitlesArr", generatedTitlesArr)


//         // Generate paragraphs for each title -- sequential
//         for (const section of generatedTitlesArr) {
//             if(section.split(" ").length > 20){
//                 para = await generatePara(section);
//                 // console.log('Generated paragraph:', para);
//                 generatedParaArr.push(para);
//             }else{
//                 let inputForParaWithContent = section + " "+ content
//                 para = await generatePara(inputForParaWithContent);
//                 // console.log('Generated paragraph:', para);
//                 generatedParaArr.push(para);
//             }

//         }

//       localStorage.setItem("generatedParaArr", generatedParaArr)


        
//       await splitPointsAsync(generatedParaArr[0])
//       console.log(generatedParaArr)
//       console.log("on")
//       mainTemplate(content,true, true, false, false)

//       let paraForMainTemp = threePointsFromGenParaArr[0]+" "+threePointsFromGenParaArr[1]+" "+threePointsFromGenParaArr[2] +" "+threePointsFromGenParaArr[3]+" "+threePointsFromGenParaArr[4]
//       if(currSelectedCanvas.toJSON().objects[1].height>120){
//         paraForMainTemp = threePointsFromGenParaArr[0]+" "+threePointsFromGenParaArr[1]+" "+threePointsFromGenParaArr[2] +" "+threePointsFromGenParaArr[3]
//       }
//       if(currSelectedCanvas.toJSON().objects[1].height>155){
//         paraForMainTemp = threePointsFromGenParaArr[0]+" "+threePointsFromGenParaArr[1]+" "+threePointsFromGenParaArr[2]
//       }
      
//       mainTemplate(paraForMainTemp,true, false, true, false)
//       mainTemplate("By Akshat Parmar",true, false, false, true)


//         selectCanvas(2)
//         loadImageFromURL('assets/acc.jpg', true)


//         await splitPointsAsync(generatedParaArr[2])

//         await leftAccImgWithThreePoints(generatedTitlesArr[1], true, true, false)
//         await leftAccImgWithThreePoints(threePointsFromGenParaArr[0], true, false, true, 0)
//         await leftAccImgWithThreePoints(threePointsFromGenParaArr[1], true, false, true, 1)
//         await leftAccImgWithThreePoints(threePointsFromGenParaArr[2], true, false, true, 2)

//         setTimeout(async()=>{
//             selectCanvas(1)
//             await splitPointsAsync(generatedParaArr[3])
    
//             await colAccImgWithThreePoints(generatedTitlesArr[2], true, true, false)
//             await colAccImgWithThreePoints(threePointsFromGenParaArr[0], true, false, true, 0)
//             await colBgImg("/assets/colbg.png", true)
//             await colBgImgNum("/assets/1.png", true)
            
//             await colAccImgWithThreePoints(threePointsFromGenParaArr[1], true, false, true, 1)
//             await colBgImg("/assets/colbg.png", true)
//             await colBgImgNum("/assets/2.png", true)
            
//             await colAccImgWithThreePoints(threePointsFromGenParaArr[2], true, false, true, 2)
//             await colBgImg("/assets/colbg.png", true)
//             await colBgImgNum("/assets/1.png", true)
    
//         }, 300)


  
  
//       // Your code continues here, and it will only execute after both functions have completed.
//     } catch (error) {
//       console.error('Error:', error);
//     }
// }

generateMainTemplate(userinput)

// wgthe accent image dont use scale to resize keep scale as 1 only.

// Multiple objects, resize loop instead of single. image or textbox

//add all the new replaced images to image storage.

// add more template designs, 3 done complete

// weird undo issue after resizing, change scale for canvas history on resizing. 

// record all actions like delete, add new text to save.

// ---------------

//LATER

// demo 1 2 3 index images, use that maybe

// instagram post maker, whatsapp integrated. affiliate marketing on whatsapp itself.
