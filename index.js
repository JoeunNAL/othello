const grid_number = 8; // 짝수 입력

const black = 'black';
const white = 'white';
let black_turn = true;

// 2차 배열 state(위치 탐색용)
let state = [];

function renderGrid(state) {
  const main = document.querySelector('main');
  const section_html = document.createElement('section');
  section_html.id = 'grid_container';
  main.append(section_html);

  const length = state.length;
  for (i = 0; i < length; i++) {
    const row_container_html = document.createElement('div');
    row_container_html.className = 'row_container';

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

function removeGrid() {
  const grid_container_html = document.getElementById('grid_container');
  grid_container_html.remove();
}

function showCurrentTurn() {
  const turn_infor_html = document.querySelector('.turn');
  turn_infor_html?.remove();

  const main_html = document.querySelector('main');
  const score_html = document.createElement('section');
  score_html.className = 'turn';
  score_html.textContent = `${black_turn ? black : white} 차례입니다.`;
  main_html.append(score_html);
}

function initialSet(number) {
  black_turn = true;
  state = new Array(grid_number)
    .fill('')
    .map(el => new Array(grid_number).fill(''));

  const middle_index = number / 2 - 1;

  state[middle_index][middle_index] = white;
  state[middle_index][middle_index + 1] = black;
  state[middle_index + 1][middle_index] = black;
  state[middle_index + 1][middle_index + 1] = white;

  renderGrid(state);
  showCurrentTurn();
}

function getFlipList(row, col, turn) {
  const current_color = turn ? black : white;
  let total = [];

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (i = 0; i < directions.length; i++) {
    const temp_targets = [];
    let temp_row = row;
    let temp_col = col;

    for (j = 0; j < grid_number; j++) {
      temp_row += directions[i][0];
      temp_col += directions[i][1];

      if (
        temp_row < 0 ||
        temp_row >= grid_number ||
        temp_col < 0 ||
        temp_col >= grid_number
      ) {
        break;
      }

      if (state[temp_row]) {
        const value = state[temp_row][temp_col];
        if (value === current_color) {
          total = [...total, ...temp_targets];
          break;
        }
        if (value === '') {
          break;
        }
        if (value !== current_color) {
          temp_targets.push({ row: temp_row, col: temp_col });
        }
      }
    }
  }

  // 중복제거
  // const deduplication = new Set(total);
  // return [...deduplication];
  return total;
}

function flip(flip_targets) {
  flip_targets.forEach(spot => {
    state[spot.row][spot.col] = black_turn ? black : white;
  });
}

function searchState() {
  const empty_spots = [];
  let black_count = 0;
  let white_count = 0;

  for (i = 0; i < grid_number; i++) {
    for (j = 0; j < grid_number; j++) {
      if (state[i][j] === '') {
        empty_spots.push({ row: i, col: j });
        continue;
      }
      if (state[i][j] === black) {
        black_count++;
        continue;
      }
      white_count++;
    }
  }

  return { empty_spots, black_count, white_count };
}

function endGame(black_count, white_count) {
  const winner = black_count > white_count ? '흑' : '백';
  if (window.confirm(`${winner} 승리.\n게임을 재시작하시겠습니까?`)) {
    removeGrid();
    initialSet(grid_number);
  }
}

function checkStateByNextTurn() {
  const state_count_info = searchState();

  // 빈칸 없거나 한쪽 바둑돌이 없는 경우
  if (
    state_count_info.empty_spots.length === 0 ||
    state_count_info.black_count === 0 ||
    state_count_info.white_count === 0
  ) {
    setTimeout(() => {
      endGame(state_count_info.black_count, state_count_info.white_count);
    }, 0);
    return;
  }

  const candidates = state_count_info.empty_spots.filter(
    spot => getFlipList(spot.row, spot.col, black_turn).length > 0
  );

  if (candidates.length === 0) {
    alert(`${black_turn ? '검은' : '하얀'}돌을 놓을 수 있는 위치가 없습니다.`);
    black_turn = !black_turn;
    showCurrentTurn();
  }
}

function addStone(event) {
  const target = event.target;

  if (event.target.localName === 'button') {
    alert('돌을 놓을 수 없는 위치입니다.');
    return;
  }

  const row_index = Number(target.dataset.row);
  const col_index = Number(target.dataset.col);

  if (state[row_index][col_index] !== '') {
    alert('돌을 놓을 수 없는 위치입니다.');
    return;
  }

  const flip_targets = getFlipList(row_index, col_index, black_turn);

  if (flip_targets.length === 0) {
    return;
  }

  state[row_index][col_index] = black_turn ? black : white;
  flip(flip_targets);

  removeGrid();
  renderGrid(state);

  // 상대턴으로 변경, 놓을 수 있는 자리 탐색
  black_turn = !black_turn;
  showCurrentTurn();
  checkStateByNextTurn();
}

function render() {
  initialSet(grid_number);
}

render();
