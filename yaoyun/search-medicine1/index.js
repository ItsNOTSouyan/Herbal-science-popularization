
const item = [{
    name: '银杏',
    top: 0,
    left: 0,
    width: 260,
    height: 240
}, {
    name: '桂枝',
    top: 280,
    left: 0,
    width: 280,
    height: 190
}, {
    name: '三七',
    top: 350,
    left: 550,
    width: 90,
    height: 90
}, {
    name: '菊花',
    top: 480,
    left: 470,
    width: 250,
    height: 105
}, {
    name: '决明子',
    top: 420,
    left: 727,
    width: 85,
    height: 100
}, {
    name: '银杏',
    top: 0,
    left: 1220,
    width: 150,
    height: 85
}, {
    name: '蒲公英',
    top: 265,
    left: 1260,
    width: 120,
    height: 250
}, {
    name: '三七',
    top: 330,
    left: 1080,
    width: 83,
    height: 80
}, {
    name: '决明子',
    top: 425,
    left: 1045,
    width: 110,
    height: 110
}, {
    name: '菊花',
    top: 535,
    left: 1135,
    width: 280,
    height: 105
}]

const clickCounts = {};
let count = 0

const nameArr = ['银杏', '桂枝', '三七', '菊花', '决明子', '蒲公英']

const medicines = document.querySelectorAll('.medicine')
const gamearea = document.querySelector('.gamearea')
const resultLeft = gamearea.offsetLeft
const resultTop = gamearea.offsetTop

//开始游戏
document.querySelector('.rule-right').addEventListener('click', (e) => {
    if(e.target.classList.contains('btn')) {
        document.querySelector('.rule-right').classList.add('right-tear')
        document.querySelector('.rule-left').classList.add('left-tear')
        document.querySelector('.rule-right').style.pointerEvents = 'none'
        startTimer()
        updateCountdown();
        // 阻止事件冒泡到父元素
        e.stopPropagation();
    }
    
    // startTimer();       // 启动移动动画
    // updateCountdown();   // 启动倒计时
    // // 阻止事件冒泡到父元素
    // e.stopPropagation();
    // // document.querySelector('.rule-right').style.pointerEvents = 'auto'
})



axios({
    url: 'http://47.243.200.175:6100/findHerb/sci?level=1',
    method:'GET',
    // params: data
}).then((result) => {
    console.log(result.data.data[0].content);
    medicines.forEach((item,index) => {
        item.addEventListener('click', () => {
            document.querySelector('.introduce p').innerHTML = result.data.data[index].content
        })
    })
}
).catch((error) => {
    console.dir(error);
    
})

//渲染需要查找的药材图
medicines.forEach((item, index) => {
    item.style.backgroundImage = `url(./assets/medicine${index}.jpg)`
})
//药材点击
    document.addEventListener('click', function (e) {
    const x = e.clientX;
    const y = e.clientY;
    const result = check(x, y);
    if (result !== -1) {
        creatClick(e.pageX, e.pageY)
        if (['银杏', '三七', '菊花', '决明子'].includes(nameArr[result])) {
            if (!clickCounts[result]) {
                clickCounts[result] = 1;
                medicines[result].innerHTML = `${clickCounts[result]}/2`
                medicines[result].classList.add('duang')
                setTimeout(() => {
                    medicines[result].classList.remove('duang');
                }, 1000);
            } else {
                clickCounts[result]++;
                if (clickCounts[result] === 2) {
                    medicines[result].innerHTML = `${clickCounts[result]}/2`
                    medicines[result].classList.add('duang')
                    medicines[result].style.opacity = '0';
                    appear()
                    setTimeout(() => {
                        medicines[result].style.display = 'none'
                        medicines[result].classList.remove('duang');
                    }, 2000)
                    count++
                }
            }
        } else {
            clickCounts[result] = 1;
            medicines[result].innerHTML = `${clickCounts[result]}/1`
            medicines[result].classList.add('duang')
            medicines[result].style.opacity = '0';
            appear()
            setTimeout(() => {
                medicines[result].style.display = 'none';
                medicines[result].classList.remove('duang');
            }, 2000)
            count++
        }
    }
    if (count === 6) {
        const alert = document.querySelector('.alert')
        alert.innerHTML = "恭喜你通过第一关！"
        alert.style.opacity = '1'
        setTimeout(() => {
            alert.style.opacity = '0'
            location.href = '../search-medicine2/index.html'
        }, 2000)
    }
});

function check(x, y) {
    const mouseLeft = x - resultLeft;
    const mouseTop = y - resultTop;

    const clickedItem = item.find((it) => {
        return mouseLeft >= it.left && mouseLeft <= (it.left + it.width) && mouseTop >= it.top && mouseTop <= (it.top + it.height);
    });
    if (clickedItem) {
        const nameIndex = nameArr.indexOf(clickedItem.name);
        // 删除被点击的元素
        const index = item.findIndex(item => item === clickedItem);
        if (index !== -1) {
            item.splice(index, 1);
        }
        return nameIndex;
    }
    return -1;

}

//创建点击出现圆圈特效
function creatClick(x, y) {
    var effect = document.createElement('div')
    effect.className = 'clickEffect'
    document.body.appendChild(effect)
    //设置特效位置为鼠标中间
    effect.style.left = (x - 20) + 'px'
    effect.style.top = (y - 20) + 'px'
    // //随机生成颜色
    // var randomColor = 'hsl(' + Math.random()*360 + ', 90%, 50%'
    //设置特效的外圈颜色
    effect.style.borderColor = '#fffb7f'

    //在动画结束后移除特效元素
    effect.addEventListener('animationend', () => {
        document.body.removeChild(effect)
    })
}

let fullLeft = 0;  // 初始位置为 0%
const totalSeconds = 100;  // 总时间为 100 秒
let remainSeconds = totalSeconds;
const interval = 1000;  // 每秒更新
let timer, clock;

function startTimer() {
    const full = document.querySelector('.full');

    // 计算每秒移动的百分比，确保 100 秒后移动到 -100%
    const movePerSecond = -100 / totalSeconds;

    timer = setInterval(() => {
        if (fullLeft == -100) {
            clearInterval(timer);
        } else {
            fullLeft += movePerSecond;
            full.style.left = fullLeft + '%';
        }
    }, interval);
}

function updateCountdown() {
    let clockElement = document.querySelector('.clock p');

    const minutes = Math.floor(remainSeconds / 60);
    const seconds = remainSeconds % 60;

    // 格式化显示倒计时
    clockElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (remainSeconds <= 0) {
        clockElement.textContent = '时间到！';
        clearTimeout(clock);  // 停止倒计时
    } else {
        remainSeconds--;
        clock = setTimeout(updateCountdown, interval);  // 每秒更新一次
    }
}

// 可以在页面加载后或者点击按钮时调用 startBoth 函数

document.querySelector('.back').addEventListener('click', () => {
    location.href = '../index.html'
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
    startTimer()
    updateCountdown();
    // 阻止事件冒泡到父元素
    e.stopPropagation();
}




