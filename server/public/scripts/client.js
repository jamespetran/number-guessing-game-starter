$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!");
  //html append

  //event handler
  $('#guessNumberForm').on('submit', onSubmit);

  //functions
  // refresh();
}

function onSubmit(event) {
  event.preventDefault();

  console.log("in onSubmit");

  let guesses = {
    guessKay: $('#kayGuess').val(),
    guessJames: $('#jamesGuess').val(),
    guessDez: $('#dezGuess').val()
  };

  $.ajax({
    method: 'POST',
    url: '/guess',
    data: guesses
  })
    .then((response) => {
      console.log('response: ', response);
      refresh();
    })
}

function refresh() {
  console.log('in refresh');
  let ajaxOptions = {
    method: 'GET',
    url: '/guess-history'
  };
  $.ajax(ajaxOptions)
    .then((response) => {
      console.log('AJAX request complete!', response);
      render(response.history);
    });
  // if (response.count === )
}

function render(guessHistory) {
  $('#kayTable tbody').empty();
  for (let guesses of guessHistory) {
    $('#kayTable tbody').append(
      `
      <tr>
        <td>
          ${guesses.guessKay}
        </td>
        <td>
          ${guesses.resultKay}
        </td>
      </tr>
      `)


    $('#jamesTable tbody').empty();
    $('#jamesTable tbody').append(
      `
      <tr>
        <td>
          ${guesses.guessJames}
        </td>
        <td>
          ${guesses.resultJames}
        </td>
      </tr>
      `)


    $('#dezTable tbody').empty();
    $('#dezTable tbody').append(
      `
          <tr>
            <td>
              ${guesses.guessDez}
            </td>
            <td>
              ${guesses.resultDez}
            </td>
          </tr>
          `)

  }
}
  //duplicate for other group members
  // $('#kayTable tbody').empty();
  // for (let guess of guessHistory) {
  //   $('#kayTable tbody').append(
  //     `
  //     <tr>
  //       <td>
  //         ${guess.guessKay}
  //       </td>
  //       <td>
  //         ${guess.resultKay}
  //       </td>
  //     </tr>
  //     `)
  // }
  // $('#kayTable tbody').empty();
  // for (let guess of guessHistory) {
  //   $('#kayTable tbody').append(
  //     `
  //     <tr>
  //       <td>
  //         ${guess.guessKay}
  //       </td>
  //       <td>
  //         ${guess.resultKay}
  //       </td>
  //     </tr>
  //     `)
  // }

