function onClick(event) {
  // 바둑돌 추가하는 함수
  // console.log(event.target);
}

function renderGrid(number) {
  const main = document.querySelector('main');

  for (i = 0; i < number; i++) {
    const row_container = document.createElement('div');
    row_container.classList.add('row');

    for (j = 0; j < number; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      const stone = document.createElement('button');
      stone.classList.add('stone');
      stone.addEventListener('click', onClick);
      cell.append(stone);

      row_container.append(cell);
    }

    main.append(row_container);
  }
}

function render() {
  renderGrid(8);
}

render();
