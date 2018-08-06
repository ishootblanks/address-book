let addressBook = [];
let firstname, lastname, phone, email, address, affiliate;

class Contact {
	constructor(firstname, lastname, phone, email, address, affiliate){
		this.firstname = firstname;
		this.lastname = lastname;
		this.phone = phone;
		this.email = email;
		this.address = address;
		this.affiliate = affiliate;
	}
};

const addContact = (firstname, lastname, phone, email, address, affiliate) => {

	addressBook.push(new Contact(firstname, lastname, phone, email, address, affiliate));
};

$(document).ready(function() {
	$(':input#add').attr('disabled', true);
	$(':input#email').keyup(function(){
		if($(this).val().length !==0) {
					$(":input#add").attr('disabled', false);}
		else {
			$(":input#add").attr('disabled', true);}
	});
	$(":input#add").on('click', function(){
		firstname = $(":input#firstname").val();
		firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
		lastname = $(":input#lastname").val();
		lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);
		phone = $(":input#phone").val();
		email = $(":input#email").val();
		address = $(":input#address").val();
		affiliate = $("select#affiliate").val();

		addContact(firstname, lastname, phone, email, address, affiliate);

		$('#show-panel').append("<div id="+addressBook[addressBook.length-1].email+"> <p> First name: " + addressBook[addressBook.length-1].firstname 
			+ "</p> <p> Last name: " + addressBook[addressBook.length-1].lastname 
			+ "</p> <p> Phone number: " + addressBook[addressBook.length-1].phone 
			+ "</p> <p> Email: " + addressBook[addressBook.length-1].email 
			+ "</p> <p> Address: " + addressBook[addressBook.length-1].address 
			+ "</p> <p> Affiliation: " + addressBook[addressBook.length-1].affiliate 
			+ "</p> </div> <button class='delete-contact'> Delete contact</button> <hr> " );

		$(':button.delete-contact').on('click', function() {

			addressBook = addressBook.filter(contact => (contact.email !== $(this).prev().attr('id')));
			$(this).prev().remove();
			$(this).next().remove();
			$(this).remove();
		});

		$(':input#firstname').val('');
		$(':input#lastname').val('');
		$(':input#phone').val('');
		$(':input#email').val('');
		$(':input#address').val('');

		$(':input#add').attr('disabled', true);
		$(':input#email').keyup(function(){
			if($(this).val().length !==0) {
				$(":input#add").attr('disabled', false);}
			else {
				$(":input#add").attr('disabled', true);}
	});

	});

	$(':button#search-button').on('click', function(){
		$('.matched').remove();
		let searchBox = $(":input#search-input").val();
		searchBox = searchBox.charAt(0).toUpperCase() + searchBox.slice(1);
		let isMatched = false;
		addressBook.map(contact => {
			if ((contact.firstname == searchBox) || (contact.lastname == searchBox)){
					isMatched = true;
					$(":input#search-input").val('');
					$("#search-panel").append("<div class='matched'> <p>First name: " + contact.firstname 
						+ "</p> <p>Last name: " + contact.lastname 
						+ "</p> <p>Phone: " + contact.phone 
						+ "</p> <p>Email: " + contact.email 
						+ "</p> <p>Address: " + contact.address 
						+ "</p> <p>Affiliation: " + contact.affiliate 
						+ "</p> <hr> </div> " );

			};
		});

		(isMatched === false)? alert('Contact not found'):null;
	});

	$('#js-search').on('click', function(){
		$('#add-panel').hide();
		$('#show-panel').hide();
		$('#search-panel').show();
	});
	$('#js-add-new-contact').on('click', function(){
		$('#search-panel').hide();
		$('#show-panel').hide();
		$('#add-panel').show();
	});
	$('#js-show-all-contacts').on('click', function(){
		$('#search-panel').hide();
		$('#add-panel').hide();
		$('#show-panel').show();
	});

	// solution for input reseting form on enter
	
	$(':input#search-input').keypress(function(event) {
   if (event.keyCode == '13') {
       event.preventDefault();
   	}
	});
});

