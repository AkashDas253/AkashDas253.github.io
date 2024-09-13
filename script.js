document.addEventListener("DOMContentLoaded", () => {
    fetch("data/profile.json")
        .then(response => response.json())
        .then(profile => {
            document.getElementById("profile-image").src = profile.profile_image;
            document.getElementById("profile-name").textContent = profile.name;
            document.getElementById("profile-summary").textContent = profile.summary;
            document.getElementById("profile-linkedin").href = profile.linkedin;
            document.getElementById("profile-github").href = profile.github;
            document.getElementById("profile-email").href = `mailto:${profile.email}`;
            //document.getElementById("profile-email").textContent = profile.email;

            
            const hobbiesList = document.getElementById("hobbies-list");
            profile.hobbies.forEach(hobby => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${hobby.name}</strong>: ${hobby.details}`;
                hobbiesList.appendChild(listItem);
            });
        });

    fetch("data/certificates.json")
        .then(response => response.json())
        .then(certificates => {
            const certificatesList = document.getElementById("certificates-list");
            certificates.forEach(certificate => {
                const listItem = document.createElement("li");
                listItem.classList.add("certificate-item"); // Add a class for styling
                listItem.innerHTML = `
                    <strong>${certificate.course_name}</strong><br>
                    ${certificate.type} by ${certificate.platform} (${certificate.date})<br>
                    Topics: ${certificate.topics.join(', ')}<br>
                    <a href="${certificate.link}" target="_blank" class="certificate-link">Verify Certificate</a>`;
                certificatesList.appendChild(listItem);
            });
        });

    fetch("data/projects.json")
        .then(response => response.json())
        .then(projects => {
            const projectsList = document.getElementById("projects-list");
            projects.forEach(project => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${project.name}</strong><br>${project.description}<br>GitHub: <a href="${project.github_link}" target="_blank">${project.github_link}</a>`;
                if (project.live_link) {
                    listItem.innerHTML += `<br>Live: <a href="${project.live_link}" target="_blank">${project.live_link}</a>`;
                }
                projectsList.appendChild(listItem);
            });
        });

    fetch("data/skills.json")
        .then(response => response.json())
        .then(skills => {
            const skillsList = document.getElementById("skills-list");
            skills.forEach(skillCategory => {
                const categoryItem = document.createElement("div");
                categoryItem.classList.add("skill-category");
                categoryItem.innerHTML = `<h3>${skillCategory.category}</h3>`;
                const skillItems = skillCategory.skills.map(skill => `
                    <div class="skill-item">
                        <img src="img/icons/${skill.icon}" alt="${skill.name} icon">
                        ${skill.name}
                    </div>`).join('');
                categoryItem.innerHTML += `<div class="skill-items">${skillItems}</div>`;
                skillsList.appendChild(categoryItem);
            });
        });

    fetch("data/education.json")
        .then(response => response.json())
        .then(education => {
            const educationList = document.getElementById("education-list");
            education.forEach(edu => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${edu.degree}</strong><br>${edu.institution} (${edu.year})<br>${edu.details.join(', ')}`;
                educationList.appendChild(listItem);
            });
        });
});
