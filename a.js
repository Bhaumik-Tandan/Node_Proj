var app = angular.module('app', ['ngMessages']);

function submitResult() {
   if ( confirm("Are you sure you want to submit the message: "+$("#message").val()) == true ) {
      return true ;
   } else {
      return false ;
   }
}
