const nav_item = document.querySelectorAll('.nav-item')
const lists = document.querySelectorAll('.list')
const personal = document.querySelector('.personal')
const personalWindow = document.querySelector('.personal-window')
const imgHover = document.querySelector('.imgHover')
let isMouseOverDropdown = false;

nav_item.forEach((item) => {
    item.addEventListener('mouseover', () => {
        item.classList.add('itemHover')
        item.style.cursor = 'pointer'
    })
    item.addEventListener('mouseleave', () => {
        item.classList.remove('itemHover')
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
    // console.log(1);
})

lists[0].addEventListener('click', () => {
    location.href = '../login/login.html'
})




