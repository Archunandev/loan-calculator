// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //Hide results
    document.getElementById('results').style.display = 'none';

    //show laoding
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);
    
    e.preventDefault();
});

//calculate results
function calculateResults(){
    //UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const prinicpal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;


    //Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (prinicpal*x*calculatedInterest) / (x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - prinicpal).toFixed(2);

        //show results
        document.getElementById('results').style.display = 'block';

        //hide loader
        document.getElementById('loading').style.display = 'none';
    }else{
        showError('Please check your numbers');
        
    }
}

function showError(error){
    //hide results
    document.getElementById('results').style.display = 'none';

    //hide loader
    document.getElementById('loading').style.display = 'none';

    //create a div
    const errorDiv = document.createElement('div');

    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');


    //add class
    errorDiv.className = 'alert alert-danger';

    //insert error
    card.insertBefore(errorDiv, heading);

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    
    //clear error after 3 seconds
    setTimeout(clearError, 3000);
}

//Clear Error
function clearError(){
    document.querySelector('.alert').remove();
}