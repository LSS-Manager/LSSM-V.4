export default () => {
  const addLightChatDesign = (lssmActive) => {
    document.querySelectorAll(`${lssmActive ? '#modals-container ' : ''} .well`).forEach((el) => {
      el.classList.remove('well');
    });
    document.querySelectorAll(`${lssmActive ? '#modals-container ' : ''} .pull-right`).forEach((el) => {
      el.classList.remove('pull-right');
      el.textContent = '[' + el.textContent + ']';
    });
    document.querySelectorAll(`${lssmActive ? '#modals-container ' : ''} p`).forEach((el) => {
      el.parentElement.querySelector('span').append(': ' + el.textContent);
      el.remove();
    });
  };
}
