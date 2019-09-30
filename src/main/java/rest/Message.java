package rest;

public class Message {

    private String content;
    
    private String address;

    public Message() {
    }

    public Message(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public Message setContent(String content) {
        this.content = content;
        return this;
    }
    
    public String getAddress() {
    	return address;
    }
    
    public Message setAddress(String address) {
    	this.address = address;
    	return this;
    }
}