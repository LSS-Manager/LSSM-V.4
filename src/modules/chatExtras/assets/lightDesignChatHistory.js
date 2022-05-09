export default () => {
  const addLightChatDesign = () => {
    let lssmActive = getSetting('lightDesignChatHistory').then((active) => {
      document.querySelectorAll<Array>(`${lssmActive ? '#modals-container ' : ''} .well`).forEach((el) => {
        el.classList.remove('well');
      });
      document.querySelectorAll<Array>(`${lssmActive ? '#modals-container ' : ''} .pull-right`).forEach((el) => {
        el.classList.remove('pull-right');
        el.textContent = '[' + el.textContent + ']';
      });
      document.querySelectorAll<Array>(`${lssmActive ? '#modals-container ' : ''} p`).forEach((el) => {
        el.parentElement.querySelector<HTMLSpanElement>('span').append(': ' + el.textContent);
        el.remove();
      });
    });
  };
  if(location.pathname == '/') {
    document.addEventListener('lssmv4-event-redesign-finished-loading', (e) => {
      if(e.detail.type == 'chat') addDesign(true);
    });
  } else {
    addDesign(false);
    document.addEventListener('lssmv4-event-redesign-finished-loading', (e) => {
      if(e.detail.type == 'chat') addDesign(false);
    });
  }
})
