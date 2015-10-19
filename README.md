# RanSome

RanSome will take some ransom from you if you do not run some.

RanSome is an webapp for those whom find workout a hassle, however, realizes the importance of keeping fit and being healthy. This will keep you accountable, motivated and inspired to go the extra mile to take the first step and keep going. Goals are realistic for they are entered by you and as a daily event, keeping fit and healthy not only will become a daily event but a lifestyle.

Users can set goals for themselves and friend's should be able to view their friend's goals and upvote them to provide positive encouragement. To make sure that the user was exercising, the Microsoft Band was used to measure heart rate. Once the heart rate exceeded a certain threshold, a timer would be started. Based on the goals initially set, if you break the goal and stop the timer, the webapp will automatically post a status indicating that you have successfully completed the challenge.

Microsoft Band required an intermediary app as the Band was not powerful enough to transmit data to the cloud. To solve this issue, we created a companion Android app that would pair with the Band via Bluetooth. The data was then sent to a Firebase server, and the information was read off of the Firebase server from the web-app.

# Technology Used
  - Meteor.js
  - Microsoft Band SDK
  - Android SDK
  - Facebook SDK
  - Firebase
