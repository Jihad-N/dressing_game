
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');

    // --- 1. منطق التبديل بين التبويبات (Tabs) ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanel = tab.getAttribute('data-tab');

            // إخفاء كل اللوحات وإزالة نشاط الأزرار
            panels.forEach(p => p.style.display = 'none');
            tabs.forEach(t => t.classList.remove('active'));

            // إظهار اللوحة المختارة وتفعيل الزر
            const activePanel = document.querySelector(`.tab-panel[data-panel="${targetPanel}"]`);
            if (activePanel) activePanel.style.display = 'block';
            //if (activePanel) activePanel.style = 'block';
            
            tab.classList.add('active');
        });
    });

    // --- 2. منطق تغيير الألوان (Background & Hair Color) ---
    const swatches = document.querySelectorAll('.swatch');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.style.backgroundColor;
            // نتحقق إذا كان المربع داخل قسم BACKGROUND أو HAIR COLOR
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
        console.log("layer changed", layerId); // للتأكد في الكونسول
    }
}
function saveAvatar() {
    // 1. إنشاء كانفاس مؤقت في الذاكرة
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;

    // 2. قائمة بالصور التي نريد دمجها (بنفس ترتيب الطبقات)
    const layers = [
        document.querySelector('.Avatar-layers').style.backgroundColor, // الخلفية
        document.getElementById('avatar-body'),
        document.getElementById('avatar-eyes'),
        document.getElementById('avatar-top'),
        document.getElementById('avatar-hair')
    ];

    // 3. رسم الخلفية أولاً
    ctx.fillStyle = layers[0] || 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 4. رسم كل طبقة فوق الأخرى
    layers.slice(1).forEach(img => {
        if (img && img.complete) {
            ctx.drawImage(img, 0, 0, 300, 300);
        }
    });

    // 5. تحميل الصورة الناتجة
    const link = document.createElement('a');
    link.download = 'my-avatar.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
}

// ربط الزر بالوظيفة
document.querySelector('.save-btn').addEventListener('click', saveAvatar);

function changeSkin(imagePath) {
    const bodyImg = document.querySelector('.avatar-body');
    if (bodyImg) {
        bodyImg.src = imagePath;
    }
}