
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanel = tab.getAttribute('data-tab');

            panels.forEach(p => p.style.display = 'none');
            tabs.forEach(t => t.classList.remove('active'));

            const activePanel = document.querySelector(`.tab-panel[data-panel="${targetPanel}"]`);
            if (activePanel) activePanel.style.display = 'block';

            
            tab.classList.add('active');
        });
    });

    const swatches = document.querySelectorAll('.swatch');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.style.backgroundColor;
           
            const title = swatch.parentElement.previousElementSibling.innerText;

            if (title === "BACKGROUND") {
                document.querySelector('.Avatar-layers').style.backgroundColor = color;
            } else if (title === "HAIR COLOR") {
               
            }
        });
    });

});
function changePart(layerId, imagePath) {
    const layer = document.getElementById(layerId);
    if (layer) {
        layer.src = imagePath;
        layer.style.display = 'block'; 
        console.log("layer changed", layerId); 
    }
}
function saveAvatar() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;

    const layers = [
        document.querySelector('.Avatar-layers').style.backgroundColor, 
        document.getElementById('avatar-body'),
        document.getElementById('avatar-eyes'),
        document.getElementById('avatar-top'),
        document.getElementById('avatar-hair')
    ];

   
    ctx.fillStyle = layers[0] || 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    layers.slice(1).forEach(img => {
        if (img && img.complete) {
            ctx.drawImage(img, 0, 0, 300, 300);
        }
    });

    const link = document.createElement('a');
    link.download = 'my-avatar.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
}

document.querySelector('.save-btn').addEventListener('click', saveAvatar);

function changeSkin(imagePath) {
    const bodyImg = document.querySelector('.avatar-body');
    if (bodyImg) {
        bodyImg.src = imagePath;
    }
}