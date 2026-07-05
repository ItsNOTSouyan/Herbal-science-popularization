const section = document.querySelector('.section');
const parts = document.querySelectorAll('.part')
const home_contain = document.querySelector('.home-contain')
const change_part = document.querySelectorAll('.change-part')

parts.forEach((part,index) => { 
    parts[index].style.backgroundImage = `url('./assets/part-img${index}.png')`
    // if (index === 2 || index === 3) {
    //     parts[index].style.width = '10' + 'em'
    // }
    if (index == 3) {
        parts[index].style.bottom = '-55px'
    }
    part.addEventListener('mouseover', () => {
        parts[index].style.backgroundImage = `url('./assets/change${index}.png')`
        parts[index].classList.remove('zooming-down');
        parts[index].classList.add('zooming-up');
        // if (index == 0 || index === 1 || index === 2 || index) {
            change_part[index].classList.add('collect')
        // }
    })
    part.addEventListener('mouseleave', () => {
        parts[index].style.backgroundImage = `url('./assets/part-img${index}.png')`
        parts[index].classList.remove('zooming-up');
        parts[index].classList.add('zooming-down');
        // if (index == 0 || index === 1 || index === 2 ) {
            change_part[index].classList.remove('collect')
        // }
    })
});

const address = ['Timelines', 'yaoyun', 'mahjong-entrance', 'Community']
parts.forEach((item,index) => {
    item.addEventListener('click', () => {
        window.location.replace(`../${address[index]}/index.html`)
        console.log(1);
        
    })
})
