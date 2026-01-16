const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    completed: true,
    selected: false
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true,
    selected: false
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: false,
    selected: false
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 3,
    completed: false,
    selected: false
  }
];

const courseList = document.getElementById("course-list");
const totalCreditsSpan = document.getElementById("totalCredits");

function displayCourses(courseArray) {
  courseList.innerHTML = "";

  courseArray.forEach(course => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");

    if (course.completed) {
      courseCard.classList.add("completed");
    }

    if (course.selected) {
      courseCard.classList.add("selected");
    }

    courseCard.textContent = `${course.subject} ${course.number} - ${course.title} (${course.credits} credits)`;

    // 🔑 USER SELECTION
    courseCard.addEventListener("click", () => {
      course.selected = !course.selected;
      updateCredits();
      displayCourses(courseArray);
    });

    courseList.appendChild(courseCard);
  });
}

function updateCredits() {
  const totalCredits = courses.reduce(
    (sum, course) => course.selected ? sum + course.credits : sum,
    0
  );

  totalCreditsSpan.textContent = totalCredits;
}

// FILTER BUTTONS
document.getElementById("all").addEventListener("click", () => {
  displayCourses(courses);
});

document.getElementById("cse").addEventListener("click", () => {
  displayCourses(courses.filter(course => course.subject === "CSE"));
});

document.getElementById("wdd").addEventListener("click", () => {
  displayCourses(courses.filter(course => course.subject === "WDD"));
});

// INITIAL LOAD
displayCourses(courses);
updateCredits();
