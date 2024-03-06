import { activateTab } from "./globals";

document.addEventListener('click', function(e) {
  const target = e.target;
  if (target.closest('.tabs-component__list-item a')) {
    e.preventDefault();
    activateTab(target);
  }
});