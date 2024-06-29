function changeMenu(){
// Select all <a> elements
var links = document.querySelectorAll('a');

// Loop through all <a> elements
for (var i = 0; i < links.length; i++) {
    // Add an event listener to the current <a> element
    links[i].addEventListener('click', function(event) {
        // Prevent the default action of the <a> element
        event.preventDefault();

        // Select the frame
        var frame = parent.document.getElementById('centerFrame');

        // Change the src attribute of the frame
        frame.src = event.target.href;
    });
}
}
