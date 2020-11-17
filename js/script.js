let questionArray = []

const popupOpen = () => {
  document.getElementById('formContainer').style.display = 'block'
}

const cancel = () => {
  document.getElementById('formContainer').style.display = 'none'
  document.getElementById('formContainer').reset()
}

const save = () => {
  const date = new Date()
  const newQuestion = {
    question: document.getElementById('question').value,
    type: document.getElementById('type').value,
    date: date
  }
  if (newQuestion.question !== "") {
    localStorage.setItem(date, JSON.stringify(newQuestion)) // date used as key
    document.getElementById('formContainer').reset()
  } else {
    document.getElementById("question").placeholder = "Ask a question here";
  }
}

const sortQuestions = () => {
  questionArray = []
  for (let i = 0; i < localStorage.length; i++) {
    // Parse jsons in localstorage back to objects and push to array for sorting
    const object = JSON.parse(localStorage.getItem(localStorage.key(i)))
    questionArray.push(object)
  }
  // sort by date
  questionArray = questionArray.sort((a, b) => {
    dateA = new Date(a.date)
    dateB = new Date(b.date)
    return dateB - dateA
  })
}

const renderQuestions = () => {
  for (let i = 0; i < questionArray.length; i++) {
    document.getElementById('questions-container').innerHTML +=
    `<div class="question"><h3>Question: ${questionArray[i].question}</h3> <p>Type: ${questionArray[i].type}</p> <p>Date: ${questionArray[i].date}</p></div>`
  }
}

const filterQuestions = () => {
  // get filter type from DOM
  let type = document.getElementById('filter').value
  // remove questions
  document.getElementById('questions-container').innerHTML = ''
  // sort by selected filter and output to DOM
  if (type === "All") {
      renderQuestions();
  } else {
    questionArray.forEach(el => {
        el.type === type
          ? (document.getElementById('questions-container').innerHTML +=
          `<div class="question"><h3>Question: ${el.question}</h3> <p>Type: ${el.type}</p> <p>Date: ${el.date}</p></div>`)
          : null
      })
  }
}

// Initialize webpage
window.onload = () => {
    sortQuestions();
    renderQuestions();
}
