const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const tabItems = $$('.tab-item');
const tabPane = $$('.tab-pane');
const highLight = $('.tabs .line ');
const tab = $('.tab-item.active');
highLight.style.left = tab.offsetLeft + 'px';
highLight.style.width = tab.offsetWidth + 'px';
tabItems.forEach((tabItem,index) =>{
    var pane = tabPane[index];
    tabItem.onclick = function(){
        $('.tab-item.active').classList.remove('active');
        $('.tab-pane.active').classList.remove('active');
        this.classList.add('active');
        pane.classList.add('active');
        highLight.style.left = this.offsetLeft + 'px';
        highLight.style.width = this.offsetWidth + 'px';
    } ;
})