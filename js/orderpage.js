
function orderSuccess(){
    document.querySelector('form').addEventListener('submit', function(event){
        event.preventDefault();

        var cartItems = parent.document.getElementById('rightFrame').contentDocument.querySelector('.cart-items p');
        var cartItemsText = cartItems.map(function(item){
            return item.textContent;
        }).join('\n');

        var successMessage = 'Thank you for your order!\n\nYour Cart Items:\n' + cartItemsText;

        this.parentNode.innerHTML = '<p>' + successMessage.replace('\n', '<br>' + '</p>');
    });
}

function openOrderForm() {
var frame = parent.document.getElementById('centerFrame');
    frame.src = 'orderform.html';
}

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
            frame.onload = function() {
            };

        // Change the src attribute of the frame
        frame.src = event.target.href;
    });
}
}




function initializeCart() {
    var targetFrame = parent.document.getElementById('rightFrame');
    var targetDocument = targetFrame.contentDocument || targetFrame.contentWindow.document;
    var cartItems = targetDocument.querySelector('.cart-items');

    // Event delegation for removing items
    cartItems.addEventListener('click', function(event) {
        if (event.target && event.target.nodeName === 'BUTTON' && event.target.textContent === '-') {
            var itemToRemove = event.target.parentElement;
            itemToRemove.remove();
            updateTotalPrice(targetDocument);
        }
    });
}




function changeCart() {
    var links = document.querySelectorAll('a');
    var targetFrame = parent.document.getElementById('rightFrame');
    var targetDocument = targetFrame.contentDocument || targetFrame.contentWindow.document;
    var cartItems = targetDocument.querySelector('.cart-items');
    var container = targetDocument.querySelector('.container');
    var selectedParagraph = null;
    var selectedConfirmButton = null;


        links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            var itemName = event.currentTarget.id;
            var itemPrice = parseFloat(event.currentTarget.getAttribute('data-price'));
            console.log(itemName, itemPrice);

            var newParagraph = targetDocument.createElement('p');
            newParagraph.textContent = itemName + " - ₱" + itemPrice.toFixed(2);
            newParagraph.style.fontFamily = 'Lato, sans-serif'; // Font family

            // Create a new remove button
            var removeButton = targetDocument.createElement('button');
            removeButton.textContent = '-';
            removeButton.style.fontSize = '30px'; // Adjust styling as needed
            removeButton.style.marginLeft = '10px'; // Adjust styling as needed
            removeButton.style.backgroundColor = '#e9b71e';
            removeButton.style.color = 'red';
            removeButton.style.border = 'none';

            // Add click event listener to the remove button
            removeButton.addEventListener('click', function() {
                newParagraph.remove(); // Remove the paragraph element
                removeButton.remove(); // Remove the remove button
            updateTotalPrice(targetDocument); // Update the total price function call
            });


            // Create a new confirm button
            var confirmButton = targetDocument.createElement('button');
            confirmButton.textContent = 'Add to Cart';
            confirmButton.style.display = 'block'; // Block element to take full width
            confirmButton.style.margin = '10px auto'; // Auto margins for horizontal centering
            confirmButton.style.padding = '10px 20px'; // Padding for larger click area
            confirmButton.style.backgroundColor = '#da291c'; // Background color
            confirmButton.style.color = 'white'; // Text color
            confirmButton.style.border = 'none'; // No border
            confirmButton.style.cursor = 'pointer'; // Cursor on hover
            confirmButton.style.fontSize = '16px'; // Font size
            confirmButton.style.fontFamily = 'Lato, sans-serif'; // Font family
            confirmButton.style.fontWeight = 'bold'; // Bold text
            confirmButton.style.marginBottom = '250px'; // Spacing between elements
            confirmButton.style.borderRadius = '5px'; // Rounded corners

            // Add click event listener to the confirm button
            confirmButton.addEventListener('click', function() {
                // Append the remove button to the new paragraph
                newParagraph.appendChild(removeButton);
                // Append the new paragraph to the cart-items
                cartItems.appendChild(newParagraph);
            updateTotalPrice(targetDocument); // Update the total price function call
                confirmButton.remove(); // Remove the confirm button

                // Reset selectedParagraph and selectedConfirmButton
                selectedParagraph = null;
                selectedConfirmButton = null;
            });

            // Remove previously selected paragraph and button if they exist
            if (selectedParagraph) {
                selectedParagraph.remove();
            }
            if (selectedConfirmButton) {
                selectedConfirmButton.remove();
            }

            // Append the confirm button to the parent of center frame (main parent)
            parent.document.getElementById('centerFrame').contentDocument.body.appendChild(confirmButton);

            // Update selected paragraph and button
            selectedParagraph = newParagraph;
            selectedConfirmButton = confirmButton;
        });
    });
}// Function to update total price (you need to define this function)

initializeCart();


function updateTotalPrice(doc) {

    var cartItems = doc.querySelectorAll('.cart-items p');
    var total = 0;

    // Loop through all cart items to sum up their prices
    for (var i = 0; i < cartItems.length; i++) {
        var itemText = cartItems[i].textContent;
        var itemPrice = parseFloat(itemText.split('₱')[1]);
        total += itemPrice;
    }

    // Update the total price display
    var totalPriceElement = doc.querySelector('.total-price');
    if (!totalPriceElement) {
        // Create the total price element if it doesn't exist
        totalPriceElement = doc.createElement('p');
        totalPriceElement.classList.add('total-price');
        doc.querySelector('.cart').appendChild(totalPriceElement);
    }
    totalPriceElement.textContent = "Total: ₱ " + total.toFixed(2);
}
