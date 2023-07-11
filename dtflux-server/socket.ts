import * as net from 'net';
 const server = net.createServer((socket) => {
  let rawData = Buffer.alloc(0);
   // Handle incoming data
   socket.on('connect', () => {
    console.log('client connected');
   });
  socket.on('data', (data) => {
    // Append received data to the raw buffer
    rawData = Buffer.concat([rawData, data]);
     // Check if the buffer ends with CRLF
    if (rawData.slice(-2).toString() === '\r\n') {
      try {
        // Remove CRLF from the raw buffer
        let jsonBuffer = rawData.slice(0, -2);
        if(rawData.slice(0,-1).toString() === '{')
        jsonBuffer = rawData.slice(0, -1);
        console.log(jsonBuffer.toString());
         // Parse the raw buffer data as JSON
        const jsonData = JSON.parse(jsonBuffer.toString());
         // Save the JSON data to a JSON object
        // Replace 'data.json' with your desired file name
        const jsonObject = jsonData
         // Perform further operations with the JSON object as needed
        console.log('Received JSON data:');
        // console.log(jsonObject);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      } finally {
        // Reset the raw buffer
        rawData = Buffer.alloc(0);
      }
    }
  });
   // Handle end of data transmission
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});
 server.listen(3000, '0.0.0.0', () => {
  console.log('Server is listening on port 3000');
});