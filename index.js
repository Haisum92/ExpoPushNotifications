require('dotenv').config()
const http = require('http');

    try{
    // import { Expo } from 'expo-server-sdk';
    const { Expo } = require('expo-server-sdk')

        // Create a new Expo SDK client
        let expo = new Expo();

        // Create the messages that you want to send to clents
    let messages = [];
    somePushTokens = [process.env.EXPO_DEVICE_TOKEN];
        for (let pushToken of somePushTokens) {
            // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

            // Check that all your push tokens appear to be valid Expo push tokens
            if (!Expo.isExpoPushToken(pushToken)) {
                console.error(`Push token ${pushToken} is not a valid Expo push token`);
                continue;
            }
            // console.log("we are here,",pushToken)
            
            // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications)
            messages.push({
                to: pushToken,
                sound: 'default',
                body: 'This is a test notification',
                data: { video_url :'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4'},
            });
        }


            let chunks = expo.chunkPushNotifications(messages);
            let tickets = [];
            (async () => {
            // Send the chunks to the Expo push notification service. There are
            // different strategies you could use. A simple one is to send one chunk at a
            // time, which nicely spreads the load out over time:
            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log(ticketChunk);
                    tickets.push(...ticketChunk);
                    // NOTE: If a ticket contains an error code in ticket.details.error, you
                    // must handle it appropriately. The error codes are listed in the Expo
                    // documentation:
                    // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
                } catch (error) {
                    console.error(error);
                }
            }
            })();

    } catch (e) {
        console.log("found error is", e);
    }
//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
