package rest;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        return new Greeting(handle(message.getName()));        
    }
    
    private String handle(String message) {
    	message = HtmlUtils.htmlEscape(message);
    	message = message.replace("\n", "<br>");
    	return message;
    }

}