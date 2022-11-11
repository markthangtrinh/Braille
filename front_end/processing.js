// BRAILLE DICTIONARY:
// Braille dictionary contains all alphabets, numbers, and punctuations
window.braille = {
  // Alphabets
  'a': '1','b': '12','c': '14','d': '145','e': '15','f': '124','g': '1245','h': '125','i': '24','j': '245','k': '13','l': '123','m': '134','n': '1345','o': '135','p': '1234','q': '12345','r': '1235','s': '234','t': '2345','u': '136','v': '1236','w': '2456','x': '1346','y': '13456','z': '1356',
  // Numbers
  'numberindicator': '3456','1': '3456 1','2': '3456 12','3': '3456 14', '4': '3456 145','5': '3456 15','6': '3456 124','7': '3456 1245','8': '3456 125','9': '3456 24','0': '3456 245',
  // Punctuations
  ',': '2', ';': '23',':': '25','.': '256','?': '236','!': '235','(': '5 126',')': '5 345','/': '456 34','\\': '456 16',
  // Special punctuations and characters
  ' ': 'SPACE','openapos':'3 236','closeapos': '3 356','openquote': '45 236','closequote': '45 356'
}



// Append into HTML container 80 cells of the Braille Display
$(document).ready(function() {
for (var i=1; i<=80; i++) {
  $("#cell-container").append(`<table cellspacing = "0" id="cell${i}">
  <tr>
    <td name="1">&#11044</td>
    <td name="4">&#11044</td>
  </tr>
  <tr>
    <td name="2">&#11044</td>
    <td name="5">&#11044</td>
  </tr>
  <tr>
    <td name="3">&#11044</td>
    <td name="6">&#11044</td>
  </tr>
</table >`);
}
})

// Check length of user input and display 
$(document).ready(function() {
  $("#userinput").keyup(function() {
    // Current cell to fill in
    currentCell = 1;
    // every time user change the input text, reset all cells
    $('table').find('td').each(function () {
      $(this).css("color", '#ededed')
    })
    // get user input
    getData = $("#userinput").val();
    // variable that check if the user is typing number bigger than 9, number symbol only appears once
    inNumber = 0;

    // Read from BRAILLE DICTIONARY and display, covering many character types
    for (let char of getData) {
      // Name of the cell to fill in
      nameOfCell = '#cell' + currentCell.toString();
      if (char == ' ') {
        // if input is space
        // *** CASE 1 ***:  Input is a space, advance one cell
        inNumber = 0;
        currentCell += 1;
      } else {
        // if input is not space
        dictValue = window.braille[char.toLowerCase()];
        // Handle special unsupported characters 
        if (dictValue == undefined) {
          continue;
        }
        if (dictValue.includes(" ")) {
          // check if input is number, punctuation, or special characters that need more than 1 cells to display
          if (char >= '0' && char <= '9') {
            // if input char is a number
            // *** CASE 2 ***: Input is a number
            if (inNumber == 0) { // if we are not in a number
              inNumber = 1; // now we are in a number
              dictValue = dictValue.split(" ");
              for (let item of dictValue) {
                console.log("<dbg ITEM OF LIST DICTVALUE>", item)
                // every time we use a new cell, check if total cell exceeds 80
                if (currentCell > 80) {
                  $("#message").text("input exceeds limit!");
                } else {
                  $("#message").text("");
                }
                // fill in new cell
                for (let idx of item) {
                  console.log("<dbg INDEX OF ITEM>", idx)
                  getDot = $(nameOfCell).find(`td[name=${idx}]`)
                  getDot.css("color", "#0037E2");
                }
                currentCell += 1;
                nameOfCell = '#cell' + currentCell.toString();
              }
            } else {
              // case when we are already in a number, then do not repeat the number symbol, and write just the number itself
              dictValue = dictValue.split(" ")[1];
              // every time we use a new cell, check if total cell exceeds 80
              if (currentCell > 80) {
                $("#message").text("input exceeds limit!");
              } else {
                $("#message").text("");
              }
              // fill in new cell
              for (let idx of dictValue) {
                console.log("<dbg INDEX OF ITEM>", idx)
                getDot = $(nameOfCell).find(`td[name=${idx}]`)
                getDot.css("color", "#0037E2");
              }
              currentCell += 1;
              nameOfCell = '#cell' + currentCell.toString();
            }
          } else {
            // *** CASE 3 ***: Input is a punctuation or a special character
            inNumber = 0;
            console.log("<dbg CONTAINS SPACE>")
            dictValue = dictValue.split(" ");
            for (let item of dictValue) {
              console.log("<dbg ITEM OF LIST DICTVALUE>", item)
              // every time we use a new cell, check if total cell exceeds 80
              if (currentCell > 80) {
                $("#message").text("input exceeds limit!");
              } else {
                $("#message").text("");
              }
              // fill in new cell
              for (let idx of item) {
                console.log("<dbg INDEX OF ITEM>", idx)
                getDot = $(nameOfCell).find(`td[name=${idx}]`)
                getDot.css("color", "#0037E2");
              }
              currentCell += 1;
              nameOfCell = '#cell' + currentCell.toString();
              }
          }
        } else {
          // *** CASE 4 ***: Input is a letter
          inNumber = 0;
          // every time we use a new cell, check if total cell exceeds 80
          if (currentCell > 80) {
            $("#message").text("input exceeds limit!");
          } else {
            $("#message").text("");
          }
          // fill in new cell
          for (let idx of dictValue) {
            getDot = $(nameOfCell).find(`td[name=${idx}]`)
            getDot.css("color", "#0037E2");
          }
          currentCell += 1;
        }     
      }
    }
  })
})
