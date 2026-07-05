
const gamearea = document.querySelector('.gamearea');
const medicines = document.querySelectorAll('.medicine')
// 图片大小随机范围
const wmax = 55;
const hmax = 75;
const wmin = 45;
const hmin = 65;
let count = 0


//用于检查即将放置的图片位置是否与已放置的图片位置不重叠。
function if_Availability(left, top, arr) {
    let status = true;
    for (let i = 0; i < arr.length; i++) {
        let y_left = Math.abs(arr[i].left - left);  //返回一个数的绝对值
        let y_top = Math.abs(arr[i].top - top);
        if (y_left < wmax && y_top < hmax) {
            status = false;
        }
    }
    return status;
}

// document.addEventListener('DOMContentLoaded', createImages);

function createImages() {
    const config = {
        // placedPositions: [],      // 存储已经放置的图片位置信息的数组
        windowWidth: 0,    // 图片扩散屏幕范围相关变量
        windowHeight: 0,
        load: false
    };
    const list = setImage()
    const arr = [];
    let placeCount = 0;    //放置图片的次数
    // window.addEventListener('resize', function (e) {
    const gWidth = gamearea.clientWidth
    const gHeight = gamearea.clientHeight
    //确保当gamearea元素的尺寸满足一定条件时，才继续执行后续的操作
    if (gWidth < config.windowWidth || gHeight < config.windowHeight) return;

    config.windowHeight = gHeight - hmax;
    config.windowWidth = gWidth - wmax;

    for (let i = 0; i < list.length; i++) {
        placeCount++;
        let left = Math.floor(Math.random() * config.windowWidth);
        let top = Math.floor(Math.random() * config.windowHeight);
        let obj = { left, top, item: list[i] };   //储存图片的位置和大小以及索引号

        if (arr.length === 0) {
            arr.push(obj);
        } else {
            if (if_Availability(left, top, arr)) {  //检查即将放置的图片位置是否与已放置的图片位置不重叠。
                arr.push(obj);
                if (i === list.length - 1) {   //已经处理完最后一个图片元素
                    // config.placedPositions.length = 0;   //存储已经放置的图片位置信息的数组
                    arr.forEach((obj, index) => {
                        const img = document.createElement('img');
                        if (index < 6) {
                            img.src = `./assets/yaocai${index}.png`;
                        } else { 
                            // getImage();
                            img.src = `./assets/yaocai${getRandomNumber(6, 22)}.png`; 
                            
                        }
                        // const img = document.createElement('img');
                        img.className = 'item';
                        img.style.height = obj.item.height + 'px';
                        img.style.width = obj.item.width + 'px';
                        img.style.left = obj.left + 'px';
                        img.style.top = obj.top + 'px';
                        gamearea.appendChild(img);
                        // config.placedPositions.push([obj.left, obj.top]);
                    });
                }
            } else {
                i--;
            }
        }
    }
    // 初始加载时触发一次窗口大小调整的逻辑
    // window.dispatchEvent(new Event('resize'));
    config.load = true
    console.log(config.load);
    
    if (config.load) {
        const medicines = document.querySelectorAll('.medicine')
        const imgs = document.querySelectorAll('.item')
        // for (let j = 0; j < medicines.length; j++) {
        //     imgs[j].addEventListener('click', () => {
        //         imgs[j].style.display = 'none'
        //     })
        // }
        console.log(document.querySelectorAll('.item'));
        //判断点击的是否为要找的药材
        document.querySelectorAll('.item').forEach((item, index) => {
            item.addEventListener('click', () => {
                if (index <= 5) {
                    item.style.display = 'none'
                    medicine[index].classList.add('duang')
                    medicines[index].style.opacity = '0';
                    appear()
                    setTimeout(() => {
                        medicines[index].style.display = 'none'
                        medicines[index].classList.remove('duang');
                    }, 2000)
                    count++
                } else {  
                    item.classList.add('shock')
                    remainSeconds -= 5;
                    // totalSeconds -= 5
                    // boxLeft -= 5
                    console.log(totalSeconds);
                    
                    setTimeout(() => {
                        item.classList.remove('shock')
                    },500)
                }
                if (count === 6) {
                    const alert = document.querySelector('.alert')
                    alert.innerHTML = "恭喜你通过第一关！"
                    alert.style.opacity = '1'
                    setTimeout(() => {
                        alert.style.opacity = '0'
                        // location.href = '../search-medicine2/index.html'
                    }, 2000)
                }
            })
            
        })
        
    }
}


// document.addEventListener('DOMContentLoaded', createImages);
window.onload = function () {
    createImages()
    
}
function setImage() {
    const list = [];
    for (let i = 0; i < 42; i++) {   //创建一个包含 42 个元素的list数组
        const height = Math.floor(Math.random() * (hmax - hmin + 1) + hmin);   //得到min到max之间的随机数
        const width = Math.floor(Math.random() * (wmax - wmin + 1) + wmin);   //得到min到max之间的随机数
        list.push({ i, height, width });   //图片的索引、随机高度和宽度信息
    }
    return list
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//开始游戏
document.querySelector('button').addEventListener('click', (e) => {
    document.querySelector('.rule').classList.add('swirl-out-bck')
    document.querySelector('.rule').style.pointerEvents = 'none'
    // startTimer();       // 启动移动动画
    updateCountdown();   // 启动倒计时
    // 阻止事件冒泡到父元素
    e.stopPropagation();
})



let fullLeft = 0;  // 初始位置为 0%
const totalSeconds = 100;  // 总时间为 100 秒
let remainSeconds = totalSeconds;
const interval = 1000;  // 每秒更新
let timer, clock;

// function startTimer() {
//     const full = document.querySelector('.full');

//     // 计算每秒移动的百分比，确保 100 秒后移动到 -100%
//     const movePerSecond = -100 / totalSeconds;

//     timer = setInterval(() => {
//         if (fullLeft == -100) {
//             clearInterval(timer);
//         } else {
//             fullLeft += movePerSecond;
//             full.style.left = fullLeft + '%';
//         }
//     }, interval);
// }

function updateCountdown() {
    let clockElement = document.querySelector('.clock p');

    const minutes = Math.floor(remainSeconds / 60);
    const seconds = remainSeconds % 60;

    // 格式化显示倒计时
    clockElement.textContent = `${minutes}${' '}:${' '}${seconds < 10 ? '0' : ''}${seconds}`;

    if (remainSeconds <= 0) {
        clockElement.textContent = '时间到！';
        clearTimeout(clock);  // 停止倒计时
    } else {
        remainSeconds--;
        clock = setTimeout(updateCountdown, interval);  // 每秒更新一次
    }
}

// 返回页面
document.querySelector('.back').addEventListener('click', () => {
    location.href = '../index.html'
})

//添加需要寻找的药材图片
const medicine = document.querySelectorAll('.medicine')
medicine.forEach((item, index) => {
    item.style.backgroundImage = `url(./assets/yaocai${index}.png)`
})


//点击出现介绍页面
document.querySelector('.search-item').addEventListener('click', (e) => {
    if (e.target.classList.contains('medicine')) {
        appear()
    }
})

// 关闭介绍页面
document.querySelector('.introduce').addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
        // document.querySelector('.introduce').style.display = 'none'
        disappear(e)
    }
})

function appear() {
    document.querySelector('.introduce').classList.replace('down', 'up')
    document.querySelector('.introduce').style.pointerEvents = 'auto'
    document.querySelector('.introduce').classList.add('up')
    clearInterval(timer)
    clearTimeout(clock)
}

function disappear(e) {
    document.querySelector('.introduce').classList.replace('up', 'down')
    document.querySelector('.introduce').style.pointerEvents = 'none'
    // startTimer()
    updateCountdown();
    // 阻止事件冒泡到父元素
    e.stopPropagation();
}

//点击提示
console.log(document.querySelectorAll('.tishi'));

document.querySelectorAll('.tishi').forEach((item,index) => {
    item.addEventListener('click', () =>{
        console.log(index);
        document.querySelectorAll('.item')[index].classList.add('duang')
        remainSeconds -= 30
        setTimeout(() => {
            document.querySelectorAll('.item')[index].classList.remove('duang')
        },1000)
    })
})

function getRandomImage(images) {
    const randomIndex = Math.floor(Math.random() * images.length);  // 随机选取图片的索引
    return images[randomIndex];
}

axios({
    url: 'http://47.243.200.175:6100/findHerb/sci?level=2',
    method: 'GET',
    // params: data
}).then((result) => {
    console.log(result.data.data[0].content);
    medicines.forEach((item, index) => {
        item.addEventListener('click', () => {
            const text = result.data.data[index].content
            const pText = text.replace(/【/g, '<br>【');
            document.querySelector('.introduce p').innerHTML = pText
        })
    })
}
).catch((error) => {
    console.dir(error);

})

// 倒计时部分开始
// let fullLeft = 0;  // 初始位置为 0%
// let totalSeconds = 100;  // 总时间为 100 秒
// let remainSeconds = totalSeconds;
// const interval = 100;  // 每秒更新
// let timer, clock;

// function startTimer() {
//     const full = document.querySelector('.full');

//     // 计算每秒移动的百分比，确保 100 秒后移动到 -100%
//     const movePerSecond = -100 / totalSeconds;

//     timer = setInterval(() => {
//         if (fullLeft == -100) {
//             clearInterval(timer);
//         } else {
//             fullLeft += movePerSecond;
//             full.style.left = fullLeft + '%';
//         }
//     }, interval);
// }

// function updateCountdown() {
//     let clockElement = document.querySelector('.clock p');

//     const minutes = Math.floor(remainSeconds / 60);
//     const seconds = remainSeconds % 60;

//     // 格式化显示倒计时
//     clockElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

//     if (remainSeconds <= 0) {
//         clockElement.textContent = '时间到！';
//         clearTimeout(clock);  // 停止倒计时
//     } else {
//         remainSeconds--;
//         clock = setTimeout(updateCountdown, interval);  // 每秒更新一次
//     }
// }

// document.getElementById('addButton').addEventListener('click', function () {
//     remainSeconds += 5;
// });

// timer = setInterval(() => {
//     moveBox();
//     updateCountdown();
// }, interval);

// 倒计时部分结束

// async function getImage() {
//     try {
//         const theImgs = await axios({
//                     method: 'get',  // 明确指定请求方法为 GET
//                     url: 'http://47.243.200.175:6100/findHerb',
//                     params: { level: 2 }  // 查询参数
//         }); // 示例URL，请替换为你的实际URL
//         console.log(theImgs);
        
//         return theImgs.data.data; // 假设服务端返回的数据结构包含 imageUrl
//     } catch (error) {
//         console.error('Error fetching image from server:', error);
//         return './assets/default.png'; // 如果请求失败，返回一个默认图片地址
//     }
// }
// getImage()
