$(document).ready(function() {
  let currentPlayer = 'X';
  let board = Array(9).fill(null);
  let gameActive = true;
//winning conditions of the game
  const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];
//function to check if there is a winner
  function checkWinner() {
      for (let condition of winningConditions) {
          const [a, b, c] = condition;
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              return board[a];
          }
      }
      //check for a draw
      return board.includes(null) ? null : 'Draw';
  }
//function to update whose turn it is
  function updateTurnIndicator() {
      $('#turn-indicator').text(`${currentPlayer}'s turn`);
  }
//function to handle cell clicks
  function handleCellClick(event) {
      const index = $(event.target).data('index');
      if (board[index] || !gameActive) return;

      board[index] = currentPlayer;
      $(event.target).text(currentPlayer);
//check if there is a winner
      const winner = checkWinner();
      if (winner) {
          gameActive = false;
          $('#alert-message').text(winner === 'Draw' ? "It's a draw!" : `${winner} wins!`);
          $('#alert').removeClass('hidden');
      } else {
        //switch turns
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          updateTurnIndicator();
      }
  }
//function to reset the game
  function resetGame() {
      currentPlayer = 'X';
      board = Array(9).fill(null);
      gameActive = true;
      $('.cell').text('');
      updateTurnIndicator();
      $('#alert').addClass('hidden');
  }
//event listeners
  $('.cell').on('click', handleCellClick);
  $('#reset-button').on('click', resetGame);
});
