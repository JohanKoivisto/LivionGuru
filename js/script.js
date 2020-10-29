let objectArray = []

const popupOpen = () => {
  document.getElementById('formContainer').style.display = 'block'
}

const cancel = () => {
  document.getElementById('formContainer').style.display = 'none'
  document.getElementById('formContainer').reset()
}

const save = () => {
  const question = document.getElementById('question').value
  const type = document.getElementById('type').value
  const date = new Date()
  const newQuestion = {
    question: question,
    type: type,
    date: date
  }
  localStorage.setItem(date, JSON.stringify(newQuestion)) // date used as key
  /* for (let i = 0; i < localStorage.length; i++) {
        console.log(JSON.parse(localStorage.getItem(localStorage.key(i))))
    } */
}

const sortQuestions = () => {
  objectArray = []
  for (let i = 0; i < localStorage.length; i++) {
    // Parse jsons in localstorage back to objects and push to array for sorting
    const object = JSON.parse(localStorage.getItem(localStorage.key(i)))
    objectArray.push(object)
  }

  objectArray = objectArray.sort((a, b) => {
    dateA = new Date(a.date)
    dateB = new Date(b.date)
    return dateB - dateA
  })
}

const renderQuestions = () => {
  sortQuestions()
  for (let i = 0; i < objectArray.length; i++) {
    document.getElementById(
      'questions-container'
    ).innerHTML += `<div class="question"><h3>Question: ${objectArray[i].question}</h3> <p>Type: ${objectArray[i].type}</p> <p>Date: ${objectArray[i].date}</p></div>`
  }
}

const filterQuestions = () => {
  // get filter type from DOM
  let type = document.getElementById('filter').value
  // remove questions
  document.getElementById('questions-container').innerHTML = ''
  // sort by selected filter
  if (type === "All") {
      renderQuestions();
  } else {
    objectArray.forEach(el => {
        el.type === type
          ? (document.getElementById(
              'questions-container'
            ).innerHTML += `<div class="question"><h3>Question: ${el.question}</h3> <p>Type: ${el.type}</p> <p>Date: ${el.date}</p></div>`)
          : null
      })
  }
  
}

window.onload = renderQuestions()
