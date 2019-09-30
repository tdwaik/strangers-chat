package rest;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {

    @MessageMapping("/chat/{address}")
    @SendTo("/topic/greetings/{address}")
    public Greeting greeting(@PathVariable String address, Message message) throws Exception {
        return new Greeting(handle(message.getContent()));        
    }
    
    private String handle(String message) {
    	message = HtmlUtils.htmlEscape(message);
    	message = message.replace("\n", "<br>");
    	return message;
    }

}