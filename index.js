let black_turn = true;
const black = 'black';
const white = 'white';

// 변수 state(위치 탐색용)
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
  state = new Array(8).fill('').map(el => new Array(8).fill(''));

  const middle_index = number / 2 - 1;

  state[middle_index][middle_index] = white;
  state[middle_index][middle_index + 1] = black;
  state[middle_index + 1][middle_index] = black;
  state[middle_index + 1][middle_index + 1] = white;

  renderGrid(state);
  showCurrentTurn();
}

function getFlipList(row, col, turn) {
  const current_turn = turn ? black : white;
  let total = [];

  // 오른쪽 이동
  const right_directions = [];
  let right_col = col;
  while (right_col < 8) {
    right_col++;
    const value = state[row][right_col];
    if (value === current_turn) {
      total = [...total, ...right_directions];
      break;
    }
    if (value === '') {
      break;
    }
    if (value !== current_turn) {
      right_directions.push({ row, col: right_col });
    }
  }

  // 왼쪽 이동
  const left_directions = [];
  let left_col = col;
  while (left_col >= 0) {
    left_col--;
    const value = state[row][left_col];
    if (value === current_turn) {
      total = [...total, ...left_directions];
      break;
    }
    if (value === '') {
      break;
    }
    if (value !== current_turn) {
      left_directions.push({ row, col: left_col });
    }
  }

  // 위 이동
  const up_directions = [];
  let up_row = row;
  while (up_row >= 0) {
    up_row--;
    if (state[up_row]) {
      const value = state[up_row][col];
      if (value === current_turn) {
        total = [...total, ...up_directions];
        break;
      }
      if (value === '') {
        break;
      }
      if (value !== current_turn) {
        up_directions.push({ row: up_row, col });
      }
    }
  }

  // 아래 이동
  const down_directions = [];
  let down_row = row;
  while (down_row < 8) {
    down_row++;
    if (state[down_row]) {
      const value = state[down_row][col];
      if (value === current_turn) {
        total = [...total, ...down_directions];
        break;
      }
      if (value === '') {
        break;
      }
      if (value !== current_turn) {
        down_directions.push({ row: down_row, col });
      }
    }
  }

  // 2시 방향
  const up_right_directions = [];
  let up_right_row = row;
  let up_right_col = col;

  while (up_right_row >= 0 && up_right_col < 8) {
    up_right_row--;
    up_right_col++;
    if (state[up_right_row]) {
      const value = state[up_right_row][up_right_col];
      if (value === current_turn) {
        total = [...total, ...up_right_directions];
        break;
      }
      if (value === '') {
        break;
      }
      if (value !== current_turn) {
        up_right_directions.push({ row: up_right_row, col: up_right_col });
      }
    }
  }

  // 5시 방향
  const down_right_directions = [];
  let down_right_row = row;
  let down_right_col = col;

  while (down_right_row < 8 && down_right_col < 8) {
    down_right_row++;
    down_right_col++;
    if (state[down_right_row]) {
      const value = state[down_right_row][down_right_col];
      if (value === current_turn) {
        total = [...total, ...down_right_directions];
        break;
      }
      if (value === '') {
        break;
      }
      if (value !== current_turn) {
        down_right_directions.push({
          row: down_right_row,
          col: down_right_col,
        });
      }
    }
  }

  // 7시 방향
  const down_left_directions = [];
  let down_left_row = row;
  let down_left_col = col;

  while (down_left_col >= 0 && down_left_row < 8) {
    down_left_row++;
    down_left_col--;
    if (state[down_left_row]) {
      const value = state[down_left_row][down_left_col];
      if (value === current_turn) {
        total = [...total, ...down_left_directions];
        break;
      }
      if (value === '') {
        break;
      }
      if (value !== current_turn) {
        down_left_directions.push({ row: down_left_row, col: down_left_col });
      }
    }
  }

  // 11시 방향
  const up_left_directions = [];
  let up_left_row = row;
  let up_left_col = col;

  while (up_left_row >= 0 && up_left_col >= 0) {
    up_left_row--;
    up_left_col--;
    if (state[up_left_row]) {
      const value = state[up_left_row][up_left_col];
      if (value === current_turn) {
        total = [...total, ...up_left_directions];
        break;
      }
      if (value === '') {
        break;
      }
      if (value !== current_turn) {
        up_left_directions.push({ row: up_left_row, col: up_left_col });
      }
    }
  }

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

  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
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
    initialSet(8);
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
    }, 1000);
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
  initialSet(8);
}

render();
