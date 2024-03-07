import { rem } from "../../globals";
import { activateTab } from "./globals";

document.addEventListener('keydown', function(e) {
  const target = e.target;
  if (target.parentElement.classList.contains('tabs-component__list-item') && window.innerWidth > rem(32) || target.closest('.view')) {
    const arrow = e.key;
    if (arrow === 'ArrowLeft' || arrow === 'ArrowDown' || arrow === 'ArrowRight' || arrow === 'ArrowUp') {
      e.preventDefault();
    }
    // Next
    if ((arrow === 'ArrowRight' || arrow === 'ArrowDown') && target.parentElement.nextElementSibling) {
      const nextTab = target.parentElement.nextElementSibling.querySelector('a');
      activateTab(nextTab);
    }
    // Prev
    if ((arrow === 'ArrowLeft' || arrow === 'ArrowUp') && target.parentElement.previousElementSibling) {
      const prevTab = target.parentElement.previousElementSibling.querySelector('a');
      activateTab(prevTab);
    }
  }
});