'use-strict';

const input = document.getElementById('inp');

inp.addEventListener('change', () => {
  document.querySelector('data-table').setAttribute('date', input.value);
  input.value = '';
});
