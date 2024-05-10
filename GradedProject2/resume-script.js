let resumes = [];
let currentIndex = 0;

// Fetch data from JSON file
document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

async function fetchData() {
    try {
        let response = await fetch('Data.json');
        let data = await response.json();
        resumes = data.resume;
        displayResumes(currentIndex);
    } catch (error) {
        console.error('Error while fetching data: ', error);
    }
}


// Display data from JSON file on browser
function displayResumes(index) {
    let resume = resumes[index];

    document.getElementById('name').textContent = resume.basics.name;
    document.getElementById('appliedFor').textContent = `Applied For: ${resume.basics.AppliedFor}`;

    document.getElementById('email').textContent = `Email :- ${resume.basics.email}`;
    document.getElementById('phone').textContent =
        `Contact No :- ${resume.basics.phone}`;
    document.getElementById('social').textContent = resume.basics.profiles.url;

    let techSkillsList = document.getElementById('technicalSkills');
    techSkillsList.innerHTML = resume.skills.keywords.map(skill => `<li>${skill}</li>`).join('');

    let hobbiesList = document.getElementById('hobbies');
    hobbiesList.innerHTML = resume.interests.hobbies.map(hobby => `<li>${hobby}</li>`).join('');


    document.getElementById('position').innerHTML = `<p><strong>Company Name : </strong>${resume.work.CompanyName} </p> <strong>Position : </strong> ${resume.work.Position} <p><strong>Duration : </strong>${resume.work.StartDate} to ${resume.work.EndDate}</p>`;
    document.getElementById('duration').innerHTML = `<strong>Summary : </strong>${resume.work.Summary}`;


    let projectList = document.getElementById('projects');
    projectList.innerHTML = `<li><strong>${resume.projects.name}:</strong> ${resume.projects.description}</li>`;

    let educationList = document.getElementById('education');
    educationList.innerHTML = `<ul>
    <li><strong>UG : </strong>${resume.education.UG.institute} - ${resume.education.UG.course} (${resume.education.UG.StartDate} to ${resume.education.UG.EndDate}), CGPA: ${resume.education.UG.cgpa}</li> 
    <li><strong>Senior Secondary : </strong>${resume.education["Senior Secondary"].institute}, CGPA: ${resume.education["Senior Secondary"].cgpa}</li> 
    <li><strong>High School:  </strong>${resume.education["High School"].institute}, CGPA: ${resume.education["High School"].cgpa}</li>
    </ul>`;

    if (resume.Internship) {
        let internshipList = document.getElementById('internships');
        internshipList.innerHTML = `<ul>
        <li><strong>Company Name : </strong>${resume.Internship.CompanyName}</li>
        <li><strong>Position : </strong>  ${resume.Internship.Position}</li> 
        <li><strong>Duration : </strong> ${resume.Internship.StartDate} to ${resume.Internship.EndDate}</li> 
        <li><strong>Summary : </strong>${resume.Internship.Summary}</li>
        </ul>`;
    }

    let achievementsList = document.getElementById('achievements');
    achievementsList.innerHTML = resume.achievements.Summary.map(achievement => `<li>${achievement}</li>`).join('');
}

function prevData() {
    if (currentIndex > 0) {
        currentIndex--;
        displayResumes(currentIndex);
    }
    else {
        alert('There is no previous resume to show');
    }
    updateButtonVisibility();
}

function nextData() {
    if (currentIndex < resumes.length - 1) {
        currentIndex++;
        displayResumes(currentIndex);
    }
    else {
        alert('There is no next resume to show');
    }
    updateButtonVisibility();
}

function updateButtonVisibility() {
    let prevButton = document.getElementById('previousButton');
    let nextButton = document.getElementById('nextButton');

    if (resumes.length === 1) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        return;
    }

    if (currentIndex === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'inline-block';
    }

    if (currentIndex === resumes.length - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'inline-block';
    }
}

function searchResume() {
    let search = document.getElementById('searchData').value.trim().toLowerCase();
    let matchResume = resumes.filter(resume => resume
        .basics.AppliedFor.toLowerCase().includes(search));

    if (matchResume.length > 0) {
        resumes = matchResume;
        currentIndex = 0;
        displayResumes(currentIndex);
        updateButtonVisibility();
    } else {
        var url = "./error-page.html";
        window.location.replace(url);
    }
}

displayResumes(currentIndex)
updateButtonVisibility();