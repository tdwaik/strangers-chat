var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
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
    	stompClient.send("/app/hello", {}, JSON.stringify({'name': msg}));
    	$("#message-form").trigger("reset");
    	$("#name").select();
	}
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
    $("#send").prop('disabled', true);
    console.log($("#conversation")[0].scrollHeight);
    $("html, body").animate({ scrollTop: $(document).height() }, 250);
}

function init() {
	
	connect();
	
	$("#name").keyup(function() {
    	var msg = getMsg();
    	$("#send").prop('disabled', msg.length === 0);
    });
	
	$("#name").change(function() {
    	var msg = $("#name").val();
    	$("#send").prop('disabled', msg.length === 0);
    });
	
	$("#name").select();
	
}

function getMsg() {
	return $("#name").val();
}

$(function () {
	init();
	
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#send" ).click(function() { sendName(); });
});