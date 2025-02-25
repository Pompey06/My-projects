/*
  Для родителя табов пишем атрибут data-tabs
  Для елемента при клике на который должен появиться контент "табы" пишем атрибут data-tab-item
  для оболочки содержимого одной табы пишем атрибут data-tab-body
  

  Как работает: при клике на data-tab-item добавиться класс _active ему и data-tab-body ( с тем же index внутри одного data-tabs )
*/
function init_tabs() {
  let tabs = document.querySelectorAll("[data-tabs]");

  for (let index = 0; index < tabs.length; index++) {
    let tab = tabs[index];
    let tabs_items = tab.querySelectorAll("[data-tab-item]");
    let tabs_blocks = tab.querySelectorAll("[data-tab-body]");
    for (let index = 0; index < tabs_items.length; index++) {
      let tabs_item = tabs_items[index];
      tabs_item.addEventListener("click", function (e) {
        for (let index = 0; index < tabs_items.length; index++) {
          let tabs_item = tabs_items[index];
          tabs_item.classList.remove('_active');
          tabs_blocks[index].classList.remove('_active');
        }
        tabs_item.classList.add('_active');
        tabs_blocks[index].classList.add('_active');
        e.preventDefault();
      });
    }
  }
} 

init_tabs();