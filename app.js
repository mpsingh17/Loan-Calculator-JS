document.querySelector('#loan-form').addEventListener('submit', function(e) {
  document.querySelector('#results').style.display = 'none' ;
  document.querySelector('#loading').style.display = 'block' ;

  setTimeout(calculateResults, 1500) ;

  e.preventDefault() ;
}) ;

function calculateResults() {
  // UI vars.
  const amount   = document.querySelector('#amount') ;
  const interest = document.querySelector('#interest') ;
  const years    = document.querySelector('#years') ;

  const monthlyPayment = document.querySelector('#monthly-payment') ;
  const totalPayment   = document.querySelector('#total-payment') ;
  const totalInterest  = document.querySelector('#total-interest') ;

  const principal          = parseFloat(amount.value) ;
  const calculatedInterest = parseFloat(interest.value) / 100 / 12 ;
  const calculatedPayments = parseFloat(years.value) * 12 ;

  // compute montly payment 
  const x      = Math.pow(1 + calculatedInterest, calculatedPayments) ;
  const montly = (principal*x*calculatedInterest) / (x-1) ;

  if ( isFinite(montly) ) {
    monthlyPayment.value = montly.toFixed(2) ;
    totalPayment.value   = (montly * calculatedPayments).toFixed(2) ;
    totalInterest.value  = ( (montly*calculatedPayments) - principal ).toFixed(2) ;
    
    document.querySelector('#results').style.display = 'block' ;
    document.querySelector('#loading').style.display = 'none' ;
  } else {
    showError('Please, enter correct values') ;
    document.querySelector('#loading').style.display = 'none' ;
  }
}

// Show error if input is wrong.
function showError(err) {
  // Create err div
  const errDiv = document.createElement('div') ;

  // Get parent elements 
  const card    = document.querySelector('.card') ;
  const heading = document.querySelector('.heading') ;

  // Add class
  errDiv.className = 'alert alert-danger' ;

  // Create text node and append div
  errDiv.appendChild(document.createTextNode(err)) ;

  // Insert errDiv above heading.
  card.insertBefore(errDiv, heading) ;

  // Clear errDiv after 3 seconds
  setTimeout(clearErrors, 3000) ;
}
function clearErrors() {
  document.querySelector('.alert').remove() ;
}