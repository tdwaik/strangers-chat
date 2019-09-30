var stompClient = null;

var address = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
        $("#connect-loading").hide();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
	$("#connect-loading").show();
	
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings/' + address, function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
	var msg = getMsg();
	if(msg.length > 0) {
    	stompClient.send("/app/chat/" + address, {}, JSON.stringify({'content': msg, 'address': address}));
    	$("#message-form").trigger("reset");
    	$("#message-content").select();
	}
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
    $("#send").prop('disabled', true);
    console.log($("#conversation")[0].scrollHeight);
    $("html, body").animate({ scrollTop: $(document).height() }, 250);
}

function init() {
	
	setAddress();
	
	connect();
	
	$("#message-content").keyup(function() {
    	var msg = $("#message-content").val();
    	$("#send").prop('disabled', msg.length === 0);
    });
	
	$("#message-content").change(function() {
    	var msg = $("#message-content").val();
    	$("#send").prop('disabled', msg.length === 0);
    });
	
	$("#message-content").select();
	
}

function getMsg() {
	return $("#message-content").val();
}

function setAddress() {
	var url = new URL(location.href);
	address = url.searchParams.get("address");
	
	var g = url.searchParams.get("g");
	
	if(address === undefined || address === null) {
		// TODO validate address and alarm if wrong!
		generateAdreess();
	}
	
	console.log("address: " + address);
}

function generateAdreess() {
	address = "ra"
		+ Math.floor((Math.random() * 9999999999) + 1000000000).toString(36)
		+ Math.floor((Math.random() * 9999999999) + 1000000000).toString()
		+ Math.floor((Math.random() * 9999999999) + 1000000000).toString(36)
		+ Math.floor((Math.random() * 9999999999) + 1000000000).toString();

	location.replace(window.location.protocol + "//" + location.host + "?address=" + address);
}

$(function () {
	init();
	
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#send" ).click(function() { sendName(); });
});