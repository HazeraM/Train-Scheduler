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


        // Initial Values
        var train = " ";
        var destination = " ";
        var firstTrainTime = " ";
        var frequency = " ";
        var nextArrival = " ";
        var minsAway = 0;


        // Capture Button Click
        $("#add-train-btn").on("click", function(event) {
            event.preventDefault();

            // capture the values of added entries 
            train = $("#train-name-input").val().trim();
            destination = $("#dest-input").val().trim();
            firstTrainTime = $("#start-input").val().trim();
            frequency = $("#frequency-input").val().trim()

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





        // // Assumptions
        // var tFrequency = 3;

        // // Time is 3:30 AM
        // var firstTime = "03:30";