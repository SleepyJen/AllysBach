$(document).ready(function () {
    $('.voting').on('click', function () {
        window.location.href = './voting.html';
    });

    var name;
    var dates = [];
    var locations = [];

    $('.submit').on('click', function () {
        name = $('#name').val();
        $.each($("input[name='dates']:checked"), function () {
            dates.push($(this).val());
        });

        $.each($("input[name='locations']:checked"), function () {
            locations.push($(this).val());
            console.log(locations);
        });

        if (name === '') {
            alert('Please enter your name');
            console.log(locations);
        } else {
            handleResults();
        }
    });


    function handleResults() {
        console.log(dates);
        console.log(locations);
    }
});