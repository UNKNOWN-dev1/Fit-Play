document.addEventListener("DOMContentLoaded", () => {
  let currentLevel = 1;
  const totalLevels = 50;
  let progressLog = JSON.parse(localStorage.getItem("progressLog")) || [];
  let unlockedLevels = JSON.parse(localStorage.getItem("unlockedLevels")) || [1]; // Level 1 is always unlocked

  const mapNav = document.getElementById('map-nav');
  const progressNav = document.getElementById('progress-nav');
  const randomWorkoutNav = document.getElementById('random-workout-nav');
  const mapSection = document.getElementById('map-section');
  const progressSection = document.getElementById('progress-section');
  const randomWorkoutSection = document.getElementById('random-workout-section');
  const challengeSection = document.getElementById('challenge-section');
  const progressLogContainer = document.getElementById('progress-log');
  const triviaNav = document.getElementById("trivia-nav");
const workoutShowcaseNav = document.getElementById("workout-showcase-nav");

triviaNav.addEventListener("click", () => showSection("trivia"));
workoutShowcaseNav.addEventListener("click", () => showSection("workout-showcase"));

  const workoutsPool = [
    "Push-Ups", "Squats", "Plank", "Burpees", "Sit-Ups",
    "Lunges", "Russian Twists", "Mountain Climbers",
    "Jumping Jacks", "High Knees", "Leg Raises", "Tricep Dips",
    "Wall Sit", "Bicycle Crunches", "Flutter Kicks",
    "Side Plank", "Superman", "Reverse Crunches",
    "Step-Ups", "Toe Touches"
  ];

  // Generate workout list for a level
  function getWorkoutForLevel(level) {
    const exercises = [];
    const numberOfExercises = 5; // Number of exercises per level
    const difficultyFactor = Math.ceil(level / 10);

    for (let i = 0; i < numberOfExercises; i++) {
      const workout = workoutsPool[Math.floor(Math.random() * workoutsPool.length)];
      const reps = Math.ceil((level + i + 5) * difficultyFactor / 2); // Dynamic reps based on level
      exercises.push(`${reps} ${workout}`);
    }
    return exercises.join(", ");
  }

  // Save progress to localStorage
  function saveToLocalStorage() {
    localStorage.setItem("progressLog", JSON.stringify(progressLog));
    localStorage.setItem("unlockedLevels", JSON.stringify(unlockedLevels));
  }

  // Show specific section
  function showSection(section) {
  document.querySelectorAll(".section").forEach((sec) => sec.classList.remove("active"));
  document.querySelectorAll(".nav button").forEach((nav) => nav.classList.remove("active"));

  if (section === "map") {
    mapNav.classList.add("active");
    mapSection.classList.add("active");
  } else if (section === "progress") {
    progressNav.classList.add("active");
    progressSection.classList.add("active");
    displayProgress();
  } else if (section === "random-workout") {
    randomWorkoutNav.classList.add("active");
    randomWorkoutSection.classList.add("active");
  } else if (section === "trivia") {
    document.getElementById("trivia-nav").classList.add("active");
    document.getElementById("trivia-section").classList.add("active");
  } else if (section === "workout-showcase") {
    document.getElementById("workout-showcase-nav").classList.add("active");
    document.getElementById("workout-showcase-section").classList.add("active");
  } else if (section === "challenge") {
    challengeSection.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const triviaNav = document.getElementById("trivia-nav");
  const workoutShowcaseNav = document.getElementById("workout-showcase-nav");

  triviaNav.addEventListener("click", () => showSection("trivia"));
  workoutShowcaseNav.addEventListener("click", () => showSection("workout-showcase"));

  const triviaQuestions = [
    {
      question: "What is the most common workout for building upper body strength?",
      options: ["Squats", "Push-Ups", "Planks", "Lunges"],
      correctAnswer: "Push-Ups",
    },
    {
      question: "How many calories does an average person burn in 30 minutes of running?",
      options: ["200", "400", "600", "800"],
      correctAnswer: "400",
    },
    {
      question: "Which exercise targets your core the most?",
      options: ["Bicep Curl", "Crunches", "Squats", "Lunges"],
      correctAnswer: "Crunches",
    },
    {
      question: "How long should you hold a plank for beginners?",
      options: ["30 seconds", "1 minute", "2 minutes", "3 minutes"],
      correctAnswer: "30 seconds",
    },
  ];

  let currentTriviaQuestionIndex = 0;

  function showTriviaQuestion() {
    const trivia = triviaQuestions[currentTriviaQuestionIndex];
    document.getElementById("trivia-question").textContent = trivia.question;

    const triviaOptionsDiv = document.getElementById("trivia-options");
    triviaOptionsDiv.innerHTML = "";
    trivia.options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => checkAnswer(option, trivia.correctAnswer);
      triviaOptionsDiv.appendChild(button);
    });
  }

  function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
      alert("Correct Answer!");
    } else {
      alert("Wrong Answer. Try again!");
    }
    currentTriviaQuestionIndex = (currentTriviaQuestionIndex + 1) % triviaQuestions.length;
    showTriviaQuestion();
  }

  // Show the workout showcase with exercises and animations
  function showWorkoutShowcase() {
    const workoutListDiv = document.getElementById("workout-list");
    workoutListDiv.innerHTML = ""; // Clear the list

    const workouts = [
      { name: "Push-Ups", description: "Great for building chest and arm strength.", img: "pushups.gif" },
      { name: "Plank", description: "Core strengthening exercise. Hold your body in a straight line.", img: "plank.gif" },
      { name: "Squats", description: "Targets your legs and glutes. Keep your back straight.", img: "squats.gif" },
      { name: "Burpees", description: "Full-body exercise. Involves jumping, squatting, and a push-up.", img: "burpees.gif" },
    ];

    workouts.forEach(workout => {
      const workoutDiv = document.createElement("div");
      const workoutName = document.createElement("h3");
      workoutName.textContent = workout.name;
      const workoutDescription = document.createElement("p");
      workoutDescription.textContent = workout.description;
      const workoutImage = document.createElement("img");
      workoutImage.src = `images/${workout.img}`; // Replace with correct path to animations
      workoutImage.alt = workout.name;

      workoutDiv.appendChild(workoutName);
      workoutDiv.appendChild(workoutDescription);
      workoutDiv.appendChild(workoutImage);
      workoutListDiv.appendChild(workoutDiv);
    });
  }

  function showSection(section) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.querySelectorAll(".nav button").forEach(nav => nav.classList.remove("active"));

    if (section === "trivia") {
      triviaNav.classList.add("active");
      document.getElementById("trivia-section").classList.add("active");
      showTriviaQuestion();
    } else if (section === "workout-showcase") {
      workoutShowcaseNav.classList.add("active");
      document.getElementById("workout-showcase-section").classList.add("active");
      showWorkoutShowcase();
    }
  }
});



  // Generate workout map
  function generateMap() {
    const map = document.getElementById('map');
    map.innerHTML = ""; // Clear map before regenerating
    for (let i = 1; i <= totalLevels; i++) {
      const level = document.createElement('div');
      level.classList.add('level');
      level.id = `level-${i}`;
      level.textContent = i;

      if (unlockedLevels.includes(i)) {
        level.classList.add('active');
      } else {
        level.classList.add('locked');
      }

      level.addEventListener('click', () => {
        if (!level.classList.contains('locked'))  {
          startChallenge(i);
        }
      });

      const path = document.createElement('div');
      path.classList.add('path');
      map.appendChild(level);
      if (i < totalLevels) map.appendChild(path);
    }
  }

// Generate workout list for a level
function getWorkoutForLevel(level) {
  const levelWorkouts = {
    1: ["10 Push-Ups", "15 Squats", "20sec Plank", "20 Lunges"],
    2: ["15 Push-Ups", "20sec Plank", "10 Russian Twists", "15 Jumping Jacks"],
    3: ["10 Pull-Ups", "25 Squats", "30sec Wall Sit", "15 Dips", "20 Lunges"],
    4: ["20 Push-Ups", "30 Step-Ups", "20s Side-Plank", "25 Russian Twists", "5 Pistol Squats"],
    5: ["25 Push-Ups", "20 Jumping Lunges", "40sec Plank", "20 Pull-Ups", "15 Broad Jumps"],
    6: ["15 Clap Push-Ups", "35 Squats", "30sec Handstand Hold", "30 Flutter Kicks", "20 Side Lunges"],
    7: ["30 Push-Ups", "40 Squats", "50sec Superman Hold", "25 Jumping Jacks", "20 Step-Ups"],
    8: ["35 Push-Ups", "50sec Plank", "15 Tricep Extensions", "20 Side Plank Rotations", "30 Russian Twists"],
    9: ["40 Push-Ups", "25 Dips", "20 Pistol Squats", "30sec L-Sit", "50 Flutter Kicks"],
    10: ["50 Push-Ups", "60 Squats", "1min Wall Sit", "20 Pull-Ups", "25 Broad Jumps"],
    11: ["20 Jump Squats", "15 Single-Leg Deadlifts", "45sec Plank", "20 High Knees", "25 Arm Circles"],
    12: ["25 Jump Squats", "20 Single-Leg Deadlifts", "50sec Plank", "25 Step-Ups", "30 Flutter Kicks"],
    13: ["30 Clap Push-Ups", "30sec Handstand Hold", "25 Tricep Extensions", "30 Side Plank Rotations", "20 Broad Jumps"],
    14: ["35 Push-Ups", "35 Squats", "40sec Superman Hold", "15 Pistol Squats", "25 Jumping Jacks"],
    15: ["40 Push-Ups", "45 Squats", "50sec L-Sit", "30 Dips", "25 Russian Twists"],
    16: ["20 Pull-Ups", "50 Jumping Lunges", "30sec Wall Sit", "40 Flutter Kicks", "35 Broad Jumps"],
    17: ["45 Push-Ups", "40sec Handstand Hold", "15 Clap Push-Ups", "50 Side Lunges", "40 Step-Ups"],
    18: ["50 Push-Ups", "1min Wall Sit", "20 Pull-Ups", "20 Pistol Squats", "50 Flutter Kicks"],
    19: ["25 Jump Squats", "30 Single-Leg Deadlifts", "1min Plank", "25 Arm Circles", "35 Side Plank Rotations"],
    20: ["55 Push-Ups", "60 Squats", "1min 15sec Superman Hold", "30 Dips", "30 Step-Ups"],
    21: ["15 L-Sit Pull-Ups", "20 Jump Lunges", "30sec Plank", "20 Heel Touches", "20 High Knees"],
    22: ["20 Clap Push-Ups", "25 Squats", "40sec Plank", "30 Arm Circles", "25 Tricep Extensions"],
    23: ["15 Broad Jumps", "30 Flutter Kicks", "30sec Superman Hold", "20 Side Lunges", "15 Pull-Ups"],
    24: ["30 Push-Ups", "20 Pistol Squats", "35sec Handstand Hold", "25 Jumping Jacks", "25 Side Plank Rotations"],
    25: ["60 Jump Squats", "50 Dips", "45sec Wall Sit", "30 Russian Twists", "30 Flutter Kicks"],
    26: ["30 Broad Jumps", "40 Push-Ups", "25 Pull-Ups", "30sec L-Sit", "40 Side Lunges"],
    27: ["50 Push-Ups", "20 Clap Push-Ups", "1min Wall Sit", "25 Dips", "20 Jump Lunges"],
    28: ["60sec Handstand Hold", "35 Pistol Squats", "40 Flutter Kicks", "15 L-Sit Pull-Ups", "50 Arm Circles"],
    29: ["70 Jump Squats", "45 Broad Jumps", "50sec Superman Hold", "30 Step-Ups", "25 Tricep Extensions"],
    30: ["75 Push-Ups", "30 Pull-Ups", "1min 30sec Wall Sit", "40 Side Plank Rotations", "35 Jumping Jacks"],
    31: ["20 Jump Squats", "10 Pistol Squats", "45sec Plank", "20 High Knees", "15 Step-Ups"],
    32: ["25 L-Sit Pull-Ups", "25 Squats", "1min Handstand Hold", "20 Clap Push-Ups", "20 Russian Twists"],
    33: ["20 Pull-Ups", "50sec Plank", "30 Flutter Kicks", "30 Dips", "25 Side Lunges"],
    34: ["40 Jump Squats", "30 Single-Leg Deadlifts", "45sec Wall Sit", "35 Step-Ups", "15 Superman Hold"],
    35: ["85 Push-Ups", "50 Side Plank Rotations", "50sec L-Sit", "35 Broad Jumps", "40 Side Lunges"],
    36: ["1min Plank", "40 Pistol Squats", "60 Step-Ups", "25 L-Sit Pull-Ups", "45 Flutter Kicks"],
    37: ["25 Clap Push-Ups", "30 Pull-Ups", "1min 30sec Wall Sit", "40 Broad Jumps", "50 Arm Circles"],
    38: ["90 Push-Ups", "45 Squats", "35sec Superman Hold", "25 Side Plank Rotations", "20 Jump Lunges"],
    39: ["25 Jump Squats", "40 Flutter Kicks", "45sec Handstand Hold", "20 Pistol Squats", "25 Russian Twists"],
    40: ["100 Push-Ups", "60 Pull-Ups", "2min Wall Sit", "30 Dips", "50 Broad Jumps"],
    41: ["120 Push-Ups", "1min Handstand Hold", "40 Pistol Squats", "50 Step-Ups", "60 Flutter Kicks"],
    
  };


  if (levelWorkouts[level]) return levelWorkouts[level].join(", ");

  const difficultyFactor = Math.ceil(level / 10); // Progression scaling
  const numberOfExercises = 5; // Fixed number of exercises per level
  const exercises = [];

  for (let i = 0; i < numberOfExercises; i++) {
    const workout = workoutsPool[Math.floor(Math.random() * workoutsPool.length)];
    const reps = Math.min(
      Math.ceil((level + i + 5) * difficultyFactor / 2),
      workout.includes("sec") ? 60 : 50 // Limit reps and duration to reasonable values
    );
    exercises.push(`${reps} ${workout}`);
  }
  return exercises.join(", ");
}


// Start challenge for a level
function startChallenge(level) {
  showSection("challenge");
  document.getElementById("challenge-title").textContent = `Level ${level} Challenge`;
  const workoutDescription = getWorkoutForLevel(level);
  document.getElementById("challenge-description").innerHTML = workoutDescription;

  // Calculate a fair timer based on the workout
  const exercises = workoutDescription.split(", ");
  let timer = 20; // Base buffer time for transitions/rest
  exercises.forEach((exercise) => {
    const match = exercise.match(/(\d+)(\s?)([a-zA-Z]+)/); // Extract reps or seconds
    if (match) {
      const count = parseInt(match[1]);
      const type = match[3].toLowerCase();
      if (type === "sec" || type === "seconds") {
        timer += count; // Add exact seconds for time-based exercises
      } else {
        timer += count * 2; // Estimate 2 seconds per rep
      }
    }
  });

  // Ensure minimum time is 40 seconds and cap at a reasonable max time
  timer = Math.max(timer, 40);
  const maxTime = 600; // Cap timer at 10 minutes
  timer = Math.min(timer, maxTime);

  const timerDisplay = document.getElementById("timer");
  const startChallengeBtn = document.getElementById("start-challenge-btn");
  const completeChallengeBtn = document.getElementById("complete-challenge-btn");
  const retryBtn = document.getElementById("retry-btn");

  const alarmSound = new Audio("alarm-clock-short-6402.mp3"); // Load alarm sound
  let interval;

  completeChallengeBtn.disabled = true;
  completeChallengeBtn.style.display = "none";
  completeChallengeBtn.style.backgroundColor = "grey";
  retryBtn.classList.add("hidden");
  startChallengeBtn.classList.remove("hidden");
  timerDisplay.textContent = timer;

  // Bind the alarm sound to a user interaction
  startChallengeBtn.onclick = () => {
    startChallengeBtn.classList.add("hidden");
    retryBtn.classList.add("hidden");
    completeChallengeBtn.style.display = "inline-block";
    completeChallengeBtn.style.backgroundColor = "grey";

    // Allow alarm playback after user gesture
    alarmSound.play().catch((error) => {
      console.error("Alarm sound playback failed:", error);
    });
    alarmSound.pause(); // Pause immediately to preload sound
    alarmSound.currentTime = 0; // Reset audio

    interval = setInterval(() => {
      if (timer > 0) {
        timer--;
        timerDisplay.textContent = timer;
      } else {
        clearInterval(interval);
        completeChallengeBtn.disabled = false;
        completeChallengeBtn.style.backgroundColor = "#4CAF50"; // Green when enabled
        retryBtn.classList.remove("hidden");
        playAlarm(); // Play the alarm when the timer ends
      }
    }, 1000);
  };

  completeChallengeBtn.onclick = () => {
    if (!completeChallengeBtn.disabled && confirm("Did you complete the challenge?")) {
      logProgress(level);
      showSection("map");
    }
  };

  retryBtn.onclick = () => {
    clearInterval(interval);
    startChallenge(level);
  };

  // Function to play the alarm sound
  function playAlarm() {
    alarmSound.play().catch((error) => {
      console.error("Failed to play alarm sound:", error);
    });
    setTimeout(() => {
      alarmSound.pause(); // Stop the alarm after 5 seconds
      alarmSound.currentTime = 0; // Reset the audio to the beginning
    }, 5000);
  }
}

  // Log progress
  function logProgress(level) {
    progressLog.push(`Level ${level} completed on ${new Date().toLocaleDateString()}`);
    if (!unlockedLevels.includes(level + 1)) {
      unlockedLevels.push(level + 1); // Unlock next level
    }
    saveToLocalStorage(); // Save progress
    generateMap(); // Refresh map
    displayProgress();
  }

  // Display progress log
  function displayProgress() {
    progressLogContainer.innerHTML = '';
    progressLog.forEach((log) => {
      const logItem = document.createElement('div');
      logItem.textContent = log;
      logItem.classList.add('log-item');
      progressLogContainer.appendChild(logItem);
    });
  }

  // Generate random workout
  document.getElementById('generate-workout-btn').addEventListener('click', () => {
    const randomWorkout = getWorkoutForLevel(Math.floor(Math.random() * totalLevels) + 1);
    document.getElementById('random-workout-output').textContent = randomWorkout;
  });

  // Back to map button
  document.getElementById('back-to-map-btn').addEventListener('click', () => {
    showSection('map');
  });
  

  // Initialize the app
  mapNav.addEventListener('click', () => showSection('map'));
  progressNav.addEventListener('click', () => showSection('progress'));
  randomWorkoutNav.addEventListener('click', () => showSection('random-workout'));
  
  

  generateMap();
  displayProgress();
  showSection('map');
});

document.addEventListener("DOMContentLoaded", () => {
  // Trivia Section
  const triviaQuestions = [
    {
      question: "What muscle group does the plank primarily target?",
      options: ["Core", "Arms", "Legs", "Shoulders"],
      correctAnswer: "Core",
    },
    {
      question: "Which exercise burns the most calories?",
      options: ["Burpees", "Walking", "Push-Ups", "Plank"],
      correctAnswer: "Burpees",
    },
    {
      question: "How many minutes of exercise is recommended daily?",
      options: ["15 mins", "30 mins", "1 hour", "2 hours"],
      correctAnswer: "30 mins",
    },
    {
      question: "What is the primary muscle worked in squats?",
      options: ["Chest", "Legs", "Arms", "Core"],
      correctAnswer: "Legs",
    },
    {
      question: "Which nutrient is essential for muscle recovery?",
      options: ["Protein", "Carbohydrates", "Fats", "Vitamins"],
      correctAnswer: "Protein",
    },
  {
    question: "What is the main function of carbohydrates in the body?",
    options: ["Energy", "Muscle repair", "Bone strength", "Hydration"],
    correctAnswer: "Energy",
  },
  {
    question: "Which mineral is crucial for strong bones?",
    options: ["Calcium", "Iron", "Potassium", "Magnesium"],
    correctAnswer: "Calcium",
  },
  {
    question: "What vitamin do we get from sunlight?",
    options: ["Vitamin D", "Vitamin C", "Vitamin B12", "Vitamin A"],
    correctAnswer: "Vitamin D",
  },
  {
    question: "Which exercise targets the chest muscles?",
    options: ["Push-ups", "Squats", "Lunges", "Plank"],
    correctAnswer: "Push-ups",
  },
  {
    question: "What is the primary muscle worked during a squat?",
    options: ["Quadriceps", "Biceps", "Triceps", "Abs"],
    correctAnswer: "Quadriceps",
  },
  {
    question: "Which nutrient helps with oxygen transport in the blood?",
    options: ["Iron", "Protein", "Fiber", "Zinc"],
    correctAnswer: "Iron",
  },
  {
    question: "What is the recommended amount of daily water intake?",
    options: ["8 cups", "4 cups", "12 cups", "6 cups"],
    correctAnswer: "8 cups",
  },
  {
    question: "Which exercise improves balance the most?",
    options: ["Yoga", "Deadlifts", "Bench Press", "Sprints"],
    correctAnswer: "Yoga",
  },
  {
    question: "What is the largest muscle in the human body?",
    options: ["Gluteus Maximus", "Quadriceps", "Biceps", "Deltoids"],
    correctAnswer: "Gluteus Maximus",
  },
  {
    question: "Which macronutrient has the most calories per gram?",
    options: ["Fats", "Protein", "Carbohydrates", "Fiber"],
    correctAnswer: "Fats",
  },
  {
    question: "What is the term for the heart rate during exercise?",
    options: ["Target heart rate", "Resting heart rate", "Peak heart rate", "Pulse rate"],
    correctAnswer: "Target heart rate",
  },
  {
    question: "Which type of fat is considered healthy?",
    options: ["Unsaturated fats", "Saturated fats", "Trans fats", "Animal fats"],
    correctAnswer: "Unsaturated fats",
  },
  {
    question: "What does BMI stand for?",
    options: ["Body Mass Index", "Body Muscle Indicator", "Body Maintenance Indicator", "Body Measurement Index"],
    correctAnswer: "Body Mass Index",
  },
  {
    question: "Which activity is considered an aerobic exercise?",
    options: ["Running", "Weightlifting", "Yoga", "Stretching"],
    correctAnswer: "Running",
  },
  {
    question: "What muscle is primarily used in pull-ups?",
    options: ["Latissimus Dorsi", "Quadriceps", "Glutes", "Hamstrings"],
    correctAnswer: "Latissimus Dorsi",
  },
  {
    question: "Which vitamin helps boost the immune system?",
    options: ["Vitamin C", "Vitamin A", "Vitamin D", "Vitamin B12"],
    correctAnswer: "Vitamin C",
  },
  {
    question: "What is the recommended amount of weekly exercise for adults?",
    options: ["150 minutes", "50 minutes", "200 minutes", "300 minutes"],
    correctAnswer: "150 minutes",
  },
  {
    question: "Which exercise is best for core strength?",
    options: ["Plank", "Squats", "Pull-ups", "Deadlifts"],
    correctAnswer: "Plank",
  },
  {
    question: "What is the main benefit of stretching?",
    options: ["Improves flexibility", "Increases strength", "Burns calories", "Improves digestion"],
    correctAnswer: "Improves flexibility",
  },
  {
    question: "What is the primary fuel source for high-intensity workouts?",
    options: ["Carbohydrates", "Fats", "Protein", "Fiber"],
    correctAnswer: "Carbohydrates",
  },
  {
    question: "What mineral helps regulate muscle contractions?",
    options: ["Potassium", "Calcium", "Iron", "Zinc"],
    correctAnswer: "Potassium",
  },
  {
    question: "Which workout targets the glutes the most?",
    options: ["Deadlifts", "Plank", "Push-ups", "Wall sits"],
    correctAnswer: "Deadlifts",
  },
  {
    question: "What is a common sign of dehydration?",
    options: ["Dry mouth", "Fever", "Hunger", "Dizziness"],
    correctAnswer: "Dry mouth",
  },
  {
    question: "Which workout improves cardiovascular health?",
    options: ["Running", "Push-ups", "Deadlifts", "Plank"],
    correctAnswer: "Running",
  },
  {
    question: "Which nutrient is important for joint health?",
    options: ["Omega-3 fatty acids", "Protein", "Carbohydrates", "Vitamin D"],
    correctAnswer: "Omega-3 fatty acids",
  },
  {
    question: "Which exercise is a compound movement?",
    options: ["Deadlifts", "Bicep curls", "Crunches", "Side plank"],
    correctAnswer: "Deadlifts",
  },
  {
    question: "What is the recommended amount of sleep for teenagers?",
    options: ["8-10 hours", "6-8 hours", "4-6 hours", "10-12 hours"],
    correctAnswer: "8-10 hours",
  },
  {
    question: "Which macronutrient is not a direct energy source?",
    options: ["Protein", "Fiber", "Fats", "Carbohydrates"],
    correctAnswer: "Fiber",
  },
  {
    question: "What is the key benefit of high-intensity interval training (HIIT)?",
    options: ["Burns more calories in less time", "Improves flexibility", "Increases bone density", "Boosts digestion"],
    correctAnswer: "Burns more calories in less time",
  },
  {
    question: "Which vitamin is essential for vision?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
    correctAnswer: "Vitamin A",
  },
  {
    question: "Which exercise strengthens the lower back?",
    options: ["Superman", "Plank", "Push-ups", "Lunges"],
    correctAnswer: "Superman",
  },
  {
    question: "Which nutrient is necessary for healthy hair and skin?",
    options: ["Biotin", "Protein", "Iron", "Vitamin C"],
    correctAnswer: "Biotin",
  },
  {
    question: "Which exercise works the hamstrings?",
    options: ["Leg curls", "Push-ups", "Plank", "Bench press"],
    correctAnswer: "Leg curls",
  },
  {
    question: "What is the benefit of drinking water during exercise?",
    options: ["Prevents dehydration", "Boosts energy", "Improves digestion", "Increases endurance"],
    correctAnswer: "Prevents dehydration",
  },
  {
    question: "What is the best way to recover after a workout?",
    options: ["Stretching and hydration", "Fasting", "Sleeping immediately", "Cold showers"],
    correctAnswer: "Stretching and hydration",
  },
  {
    question: "Which nutrient is important for red blood cell production?",
    options: ["Iron", "Vitamin D", "Vitamin C", "Omega-3s"],
    correctAnswer: "Iron",
  },
  {
    question: "Which exercise helps reduce lower back pain?",
    options: ["Cat-cow stretch", "Push-ups", "Deadlifts", "Wall sit"],
    correctAnswer: "Cat-cow stretch",
  },
  {
    question: "What is the primary muscle worked during bench presses?",
    options: ["Pectorals", "Quadriceps", "Trapezius", "Deltoids"],
    correctAnswer: "Pectorals",
  },
  {
    question: "Which type of fat should be limited in a healthy diet?",
    options: ["Trans fats", "Unsaturated fats", "Omega-3s", "Monounsaturated fats"],
    correctAnswer: "Trans fats",
  },
  ];

  // Get the saved trivia index from localStorage or start from 0
let currentTriviaIndex = parseInt(localStorage.getItem("currentTriviaIndex")) || 0;

function showTriviaQuestion() {
  const trivia = triviaQuestions[currentTriviaIndex];
  const questionElement = document.getElementById("trivia-question");
  const optionsContainer = document.getElementById("trivia-options");
  const feedbackElement = document.getElementById("trivia-feedback");

  if (!questionElement || !optionsContainer || !feedbackElement) {
    console.error("Trivia elements not found!");
    return;
  }

  questionElement.textContent = trivia.question;
  optionsContainer.innerHTML = "";

  trivia.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className = "trivia-option";
    button.onclick = () => checkAnswer(option, trivia.correctAnswer);
    optionsContainer.appendChild(button);
  });

  feedbackElement.textContent = "";
}

function checkAnswer(selectedAnswer, correctAnswer) {
  const feedback = document.getElementById("trivia-feedback");

  if (selectedAnswer === correctAnswer) {
    feedback.textContent = "Correct! Well done.";
    feedback.style.color = "lightgreen";

    // Move to the next trivia question and save the index in localStorage
    currentTriviaIndex++;
    if (currentTriviaIndex >= triviaQuestions.length) {
      currentTriviaIndex = 0; // Restart from the first question if all are answered
    }
    localStorage.setItem("currentTriviaIndex", currentTriviaIndex);

    setTimeout(showTriviaQuestion, 1500); // Wait 1.5s before showing the next question
  } else {
    feedback.textContent = "Incorrect. Try again!";
    feedback.style.color = "red";
  }
}

showTriviaQuestion();
});


document.addEventListener("DOMContentLoaded", function() {
  const workouts = [
    {
      name: "Push-Ups",
      description: "Strengthens your chest, arms, and core.",
      image: "push-up.gif",
    },
    {
      name: "Plank",
      description: "Engages your core muscles and improves balance.",
      image: "plank.jpg",
    },
    {
      name: "Russian Twists",
      description: "Targets your obliques and improves core strength.",
      image: "russian-twist.gif",
    },
    {
      name: "Burpees",
      description: "A full-body workout for cardio and strength.",
      image: "burpees.gif",
    },
    {
      name: "Step-Ups",
      description: "Strengthens legs and improves balance.",
      image: "step-up.gif",
    },
    {
      name: "Lunges",
      description: "Targets glutes, quads, and hamstrings.",
      image: "lunges.gif",
    },
    {
      name: "Wall Sit",
      description: "Builds lower body endurance and strength.",
      image: "wall-sit.gif",
    },
    {
      name: "Bodyweight Squats",
      description: "Improves lower body strength and flexibility.",
      image: "bodyweight-squat.gif",
    },
    {
      name: "Side Plank",
      description: "Strengthens obliques and improves stability.",
      image: "Side-Plank.png",
    },
  {
    name: "L-Sit",
    description: "Builds core strength and improves hip flexibility.",
    image: "Lsit.gif",
  },
  {
    name: "Pistol Squat",
    description: "Enhances balance, leg strength, and flexibility.",
    image: "pistol-squats.gif",
  },
  {
    name: "Diamond Push-Ups",
    description: "Targets triceps and inner chest muscles.",
    image: "diamond-pushup.gif",
  },
  {
    name: "Clap Push-Ups",
    description: "Improves explosive strength and upper body power.",
    image: "clapping-push-ups.gif",
  },
  {
    name: "Superman Hold",
    description: "Strengthens the lower back and glutes.",
    image: "supermanhold.jpg",
  },
  {
    name: "Leg Raises",
    description: "Engages the lower abs and improves core stability.",
    image: "legraises.gif",
  },
  {
    name: "Calf Raises",
    description: "Targets the calves for strength and endurance.",
    image: "calf-raise.jpg",
  },
  {
    name: "Mountain Climbers",
    description: "Great for cardio and strengthening the core.",
    image: "mountain-climbers.gif",
  },
  {
    name: "Glute Bridges",
    description: "Activates glutes, hamstrings, and core muscles.",
    image: "glute-bridges.gif",
  },
  {
    name: "Dips",
    description: "Builds strength in the triceps, chest, and shoulders.",
    image: "dips.gif",
  },
  {
    name: "Bicycle Crunches",
    description: "Targets the obliques and strengthens the core.",
    image: "bicyclecrunche.gif",
  },
];


  const workoutList = document.getElementById("workout-list");

  if (workoutList) {
    workouts.forEach(function(workout) {
      const div = document.createElement("div");
      div.classList.add("workout-item");

      const img = document.createElement("img");
      img.src = workout.image;
      img.alt = workout.name;
      img.classList.add("workout-image");

      const title = document.createElement("h3");
      title.textContent = workout.name;

      const description = document.createElement("p");
      description.textContent = workout.description;

      div.appendChild(img);
      div.appendChild(title);
      div.appendChild(description);
      workoutList.appendChild(div);
    });
  } else {
    console.error("Workout list element not found!");
  }
});
