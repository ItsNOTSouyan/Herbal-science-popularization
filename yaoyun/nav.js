const nav_item = document.querySelectorAll('.nav-item')
const lists = document.querySelectorAll('.list')
const personal = document.querySelector('.personal')
const personalWindow = document.querySelector('.personal-window')
const nav_top = document.querySelector('.nav-top')

window.onload = function () {
    if (document.documentElement.scrollTop === 0) {
        nav_top.style.opacity = '1';
        nav_top.style.top = '0';
    }
};
window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {    //向下滚动
        nav_top.style.opacity = '0';
        nav_top.style.top = '-50px';
    } else {
        nav_top.style.opacity = '1';
        nav_top.style.top = '0';
    }
})

const address = ['home-page', 'Timelines', 'yaoyun', 'mahjong', 'Community']

nav_item.forEach((item,index) => {
    item.addEventListener('mouseover', () => {
        item.classList.add('itemHover')
        item.style.cursor = 'pointer'
    })
    item.addEventListener('mouseleave', () => {
        item.classList.remove('itemHover')
    })
    item.addEventListener('click', () => {
        window.location.replace(`../${address[index]}/index.html`)
        
        
    })
})




lists.forEach((list,index) => {
    list.style.backgroundImage = `url(../nav/assets/font${index}.png)`
})

personal.addEventListener('mouseenter', () => {
    personalWindow.style.height = '200px'
    personalWindow.style.opacity = '1'
})
personal.addEventListener('mouseleave', () => {
    personalWindow.style.height = '0px'
    personalWindow.style.opacity = '0'
})










