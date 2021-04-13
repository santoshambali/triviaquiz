import { Component, OnInit } from '@angular/core';
import { BackendApiService } from './services/backend-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private backendApiService : BackendApiService){}

  //To store all the questions with correct and wrong answers
  questions:any[] = new Array();
    
  ngOnInit(){

    //To fetch the questions from server
      this.backendApiService.getQuestions().subscribe(
        data =>{
          var response = JSON.parse(data);

          response.results.forEach(result => {
            
            //Question and all the answers
            let question = {
              "value": result.question,
              "answers": []
            }
            result.incorrect_answers.forEach(incorrect_answer => {
              //answer object which stores answer value, whether it is correct answer, whether it is slected in UI
              let answer = {
                "value":incorrect_answer,
                "isCorrect":false,
                "isSelected":false
              }

              //pushes all the wrong answers
              question.answers.push(answer)
            });

            let answer = {
              "value":result.correct_answer,
              "isCorrect":true,
              "isSelected":false
            }

            // pushes correct answer
            question.answers.push(answer)

            //To shufle the answers so that correct answer will be in random position
            this.shuffle(question.answers)

            //question is pushed to question array
            this.questions.push(question);
            
          });
        },
        err=>{
          alert("event fetch failed or no events found!!");
        }
      );
  }

  shuffle(answers) {
    var ctr = answers.length, temp, index;
    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random indexquestions
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = answers[ctr];
        answers[ctr] = answers[index];
        answers[index] = temp;
    }
    return answers;
}

//To make user slect only onswer per question at a time
  selectAnswer(selectedQuestion, selectedAnswer){
    selectedQuestion.answers.forEach(answer => {
      if(answer.value == selectedAnswer.value){
        answer.isSelected = true;
      }else{
        answer.isSelected = false;
      }
    });
  }

  //calculates how many correct answers selected and alerts the same
  findCorrectAnswers(){
    let correctAnswers = 0;
    this.questions.forEach(question => {
      question.answers.forEach(answer => {
        if(answer.isCorrect){
          if(answer.isSelected){
            correctAnswers++;
          }
        }
      });
    });

    alert("You have answered " +correctAnswers +" questions correctly!!");
  }

}
