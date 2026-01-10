const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    completed: true
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: false
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 3,
    completed: false
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

    courseCard.textContent = `${course.subject} ${course.number} - ${course.title} (${course.credits} credits)`;
    courseList.appendChild(courseCard);
  });

  const totalCredits = courseArray.reduce((sum, course) => sum + course.credits, 0);
  totalCreditsSpan.textContent = totalCredits;
}

// Button filters
document.getElementById("all").addEventListener("click", () => {
  displayCourses(courses);
});

document.getElementById("cse").addEventListener("click", () => {
  const filtered = courses.filter(course => course.subject === "CSE");
  displayCourses(filtered);
});

document.getElementById("wdd").addEventListener("click", () => {
  const filtered = courses.filter(course => course.subject === "WDD");
  displayCourses(filtered);
});

// Initial load
displayCourses(courses);
