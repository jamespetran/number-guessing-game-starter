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
   guessJames: 1,
   guessDez: 2
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
      render(response);
    });
}

function render(guessHistory) {
  $('#kayTable tbody').empty();
  for (let guess of guessHistory) {
    $('#kayTable tbody').append(
      `
      <tr>
        <td>
          ${guess.guessKay}
        </td>
        <td>
          ${guess.resultKay}
        </td>
      </tr>
      `)
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
    
}