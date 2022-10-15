import fs from 'fs'

// This function takes in an array of random items to choose from numItems.
// It should return a new array containing the correct number of randomly selected, unique items from the original array.
// **TASKS**:
//  1. Should take in 2 parameters: array and numItems
//      - array should default to an empty array []
//  2. Check if array length is 0 or 1
//      - if true: return array
//      - else: check numItems
//  3. Check if numItems is a number between 1 to array.length
//      - if 1: return array
//      - if it is in the range: find random item to choose from
//      - else: set to a number in the correct range
export const chooseRandom = (array = [], numItems) => {
  for (let item of array) {
    if (array.length <= 1 || numItems < 1) {
      return array;
    }else if (numItems >= 1 && numItems <= array.length) {
      item = numItems[Math.floor(Math.random() * array.length)];
    } else {
      numItems = Math.floor(Math.random() * array.length);
    }
  }
  return array;
}

// This function expects an object with properties: numQuestions and numChoices and must return an array of objects in a specific format.
// **TASKS**:
//  1. Should take in 2 parameters: numQuestions and numChoices
//      - numQuestions should default to 1
//      - numChoices should default to 2
//  2. Create an empty array to store our objects
//  3. For each numQuestions, map each questionNum to a question object
//      - push the question into the prompt
//  4. For each numChoices, map each choiceNum to a choice object
//      - push the choice into the prompt
//  5. Return the array of objects
export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
  let prompt = [];  
  for (let i = 0; i < numQuestions; i++) {
    const question = questionNum => ({
      type: 'input',
      name: `question-${questionNum}`,
      message: `Enter question ${questionNum}`
    })
    prompt.push(question);
 
    for (let j = 0; j < numChoices; j++) {
      const choice = choiceNum => ({
        type: 'input',
        name: `question-${choiceNum}-choice-${choiceNum}`,
        message: `Enter answer choice ${choiceNum} for question ${questionNum}`
      }) 
      prompt.push(question);
    }
  }
  return prompt;
}

// This function takes an object which has question numbers and choices as keys and returns an array of question objects which each contain a question and its corresponding choices. 
// **TASKS**:
//  1. Should take in 1 parameter: question object
//      - question should default to an empty object
//  2. Map questionKeys as the keys in the question object
//  3. And create a new empty object to store our questions
//  4. For each questionKey, map element(name):
//      a) if the element(name) does NOT include 'choice', then:
//        - Map each element(name) in questions without a choice = [empty array]
//      b) else (the question has a choice for it), then:
//        - split the 1st part of the name ('question-') and the element(name) by ('-') and at index 1
//        - then store the splittedStringElement in questions as a temporary object
//        - then push that object as the choices in the question
//  5. Return array of values in the questions object
export const createQuestions = (question = {}) => {
  let questionKeys = Object.keys(question)

  let questions = {}

  questionKeys.forEach(element => {
    if (!element.includes('choice')) {
      questions[element] = {
        type: 'list',
        name: element,
        message: question[element],
        choices: []
      }
    } else {
      let splittedStringElement = 'question-' + element.split('-')[1]
      let temp = questions[splittedStringElement]
      temp['choices'].push(question[element])
    }
    return Object.values(questions)
  })

  return Object.values(questions)
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
