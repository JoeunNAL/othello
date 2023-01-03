const cell_number = 8;
let black_turn = true;

// 변수 state(위치 탐색용)
const state = new Array(cell_number)
  .fill('')
  .map(el => new Array(cell_number).fill(''));

function renderGrid(state) {
  const main = document.querySelector('main');
  const section_html = document.createElement('section');
  section_html.id = 'grid_container';
  main.append(section_html);

  const length = state.length;
  for (i = 0; i < length; i++) {
    const row_container_html = document.createElement('div');
    row_container_html.className = 'row';

    for (j = 0; j < length; j++) {
      const cell_html = document.createElement('div');
      cell_html.className = 'cell';
      cell_html.setAttribute('data-row', i);
      cell_html.setAttribute('data-col', j);
      cell_html.addEventListener('click', addStone);

      if (state[i][j] !== '') {
        const stone_html = document.createElement('button');
        stone_html.classList.add('stone', state[i][j]);
        cell_html.append(stone_html);
      }

      row_container_html.append(cell_html);
    }

    section_html.append(row_container_html);
  }
}

function initialSet(number) {
  const middle_index = number / 2 - 1;

  state[middle_index][middle_index] = 'white';
  state[middle_index][middle_index + 1] = 'black';
  state[middle_index + 1][middle_index] = 'black';
  state[middle_index + 1][middle_index + 1] = 'white';

  renderGrid(state);
}

function addStone(event) {
  const target = event.target;

  if (event.target.localName === 'button') {
    alert('돌을 놓을 수 없는 위치입니다.');
    return;
  }

  const row_index = target.dataset.row;
  const col_index = target.dataset.col;

  if (state[row_index][col_index] !== '') {
    alert('돌을 놓을 수 없는 위치입니다.');
    return;
  }

  state[row_index][col_index] = black_turn ? 'black' : 'white';
  black_turn = !black_turn;

  const grid_container_html = document.getElementById('grid_container');
  grid_container_html.remove();

  renderGrid(state);
}

function render() {
  initialSet(cell_number);
}

render();
