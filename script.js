document.addEventListener("DOMContentLoaded", () => {
    fetch("profile.json")
        .then(response => response.json())
        .then(profile => {
            document.getElementById("profile-image").src = profile.profile_image;
            document.getElementById("profile-name").textContent = profile.name;
            document.getElementById("profile-summary").textContent = profile.summary;
            document.getElementById("profile-linkedin").href = profile.linkedin;
            document.getElementById("profile-github").href = profile.github;
            document.getElementById("profile-email").href = `mailto:${profile.email}`;
            document.getElementById("profile-email").textContent = profile.email;

            const hobbiesList = document.getElementById("hobbies-list");
            profile.hobbies.forEach(hobby => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${hobby.name}</strong>: ${hobby.details}`;
                hobbiesList.appendChild(listItem);
            });
        });

    fetch("certificates.json")
        .then(response => response.json())
        .then(certificates => {
            const certificatesList = document.getElementById("certificates-list");
            certificates.forEach(certificate => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<a href="${certificate.link}" target="_blank">${certificate.course_name}</a> - ${certificate.platform} (${certificate.date})<br>Topics: ${certificate.topics.join(', ')}`;
                certificatesList.appendChild(listItem);
            });
        });

    fetch("projects.json")
        .then(response => response.json())
        .then(projects => {
            const projectsList = document.getElementById("projects-list");
            projects.forEach(project => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${project.name}</strong>: ${project.description}<br><a href="${project.github_link}" target="_blank">GitHub</a>`;
                if (project.live_link) {
                    listItem.innerHTML += ` | <a href="${project.live_link}" target="_blank">Live</a>`;
                }
                projectsList.appendChild(listItem);
            });
        });

    fetch("skills.json")
        .then(response => response.json())
        .then(skills => {
            const skillsList = document.getElementById("skills-list");
            skills.forEach(skillCategory => {
                const categoryItem = document.createElement("li");
                categoryItem.innerHTML = `<strong>${skillCategory.category}</strong>:`;
                const skillItems = skillCategory.skills.map(skill => `<span><i class="${skill.icon}"></i> ${skill.name}</span>`).join(', ');
                categoryItem.innerHTML += ` ${skillItems}`;
                skillsList.appendChild(categoryItem);
            });
        });

    fetch("education.json")
        .then(response => response.json())
        .then(education => {
            const educationList = document.getElementById("education-list");
            education.forEach(edu => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${edu.degree}</strong> - ${edu.institution} (${edu.year})<br>${edu.details.join(', ')}`;
                educationList.appendChild(listItem);
            });
        });
});
