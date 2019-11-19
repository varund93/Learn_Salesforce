public class MessageCallouts {    
    @future(callout=true)
    public static void SendMessage(String message, String phonenumber)
    {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('http://cawhatsapp.azurewebsites.net/Home/SendMessage');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        // Set the body as a JSON object
        request.setBody('{"message":"'+ message +'", phonenumber:"'+phonenumber.removeStart('+91')+'"}');
        HttpResponse response = http.send(request);
        // Parse the JSON response
        if (response.getStatusCode() != 200) {
            System.debug('The status code returned was not expected: ' +
                response.getStatusCode() + ' ' + response.getStatus());
        } else {
            System.debug(response.getBody());
        }
    }
}
