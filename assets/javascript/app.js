        var firebaseConfig = {
            apiKey: "AIzaSyD2HPiXF7yZr58arB-2ATyUkU5Yyn1h4R4",
            authDomain: "train-times-6edad.firebaseapp.com",
            databaseURL: "https://train-times-6edad.firebaseio.com",
            projectId: "train-times-6edad",
            storageBucket: "train-times-6edad.appspot.com",
            messagingSenderId: "482120598226",
            appId: "1:482120598226:web:24e53c13335cca6a"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        var dataRef = firebase.database();


        // // Initial Values
        // var train = " ";
        // var destination = " ";
        // var firstTrainTime = " ";
        // var frequency = " ";
        // var nextArrival = " ";
        // var minsAway = 0;


        // Capture Button Click
        $("#add-train-btn").on("click", function(event) {
            event.preventDefault();

            // capture the values of added entries 
            train = $("#train-name-input").val().trim();
            destination = $("#dest-input").val().trim();
            firstTrainTime = $("#start-input").val().trim();
            frequency = $("#frequency-input").val().trim();

            // Code for the push
            dataRef.ref().push({

                train: train,
                destination: destination,
                firstTrainTime: firstTrainTime,
                frequency: frequency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });

            // Alert
            alert("Train successfully added");

            // Clears all of the text-boxes
            $("#train-name-input").val("");
            $("#dest-input").val("");
            $("#start-input").val("");
            $("#frequency-input").val("");
        });


        // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
        dataRef.ref().on("child_added", function(childSnapshot) {

            // Log everything that's coming out of snapshot
            var newTrain = childSnapshot.val().train;
            var trainDest = childSnapshot.val().destination;
            var trainFreq = childSnapshot.val().frequency;

            // // Create new row
            // var newRow = $("<tr>").append(
            //     $("<td>").text(newTrain),
            //     $("<td>").text(trainDest),
            //     $("<td>").text(trainFreq),
            //     $("<td>").text("00.00"),
            //     $("<td>").text("00.00"));

            // $("#train-table").append(newRow);


            // Time is to be entered on the entry form
            var firstTime = "0";

            var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
            console.log(firstTimeConverted);

            // Current Time
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

            // Difference between the times
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            // Time apart (remainder)
            var tRemainder = diffTime % trainFreq;
            console.log(tRemainder);

            // Minute Until Train
            var tMinutesTillTrain = trainFreq - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

            // Next Train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

            // // Add each train's data into the table
            // Create new row
            var newRow = $("<tr>").append(
                $("<td>").text(newTrain),
                $("<td>").text(trainDest),
                $("<td>").text(trainFreq),
                $("<td>").text(tMinutesTillTrain),
                $("<td>").text(nextTrain));

            $("#train-table").append(newRow);
        });

        // // Assumptions
        // var tFrequency = 3;

        // // Time is 3:30 AM
        // var firstTime = "03:30";