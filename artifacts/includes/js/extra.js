function revealAwsAnswer(number) {
  document.getElementById(`answer-${number}`).classList.toggle('aws-answer');
  document.getElementById(`reason-${number}`).classList.toggle('aws-reason');
}
