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
                listItem.classList.add("certificate-item");
    
                let certificateDetails = '';
    
                // Course name and issuing organizations
                if (certificate.course_name && certificate.platform) {
                    const organizations = certificate.platform.split(',').map(org => org.trim()).join(', ');
                    certificateDetails += `<strong>${certificate.course_name}(${organizations})</strong>`;
                }
    
                // Certificate type (if available)
                if (certificate.type) {
                    certificateDetails += `${certificate.type}<br>`;
                }
    
                // Start and End Date (if available)
                if (certificate.start_date && certificate.end_date) {
                    certificateDetails += `From: ${certificate.start_date} to ${certificate.end_date}<br>`;
                }
    
                // Topics
                if (certificate.topics && certificate.topics.length > 0) {
                    certificateDetails += `Topics: ${certificate.topics.join(', ')}<br>`;
                }
    
                // Link to verify the certificate
                if (certificate.certificate_link) {
                    certificateDetails += `<a href="${certificate.certificate_link}" target="_blank" class="certificate-link">Verify Certificate</a><br>`;
                }
    
                // Check if there are sub-courses
                if (certificate.is_specialization && certificate.sub_courses && certificate.sub_courses.length > 0) {
                    certificateDetails += `<div class="sub-courses"><strong>Sub-courses:</strong><ul class="sub-courses-list">`;
    
                    // Loop through sub-courses and list them
                    certificate.sub_courses.forEach(sub_course => {
                        certificateDetails += `<li class="sub-course-item">`;
    
                        // Sub-course name and topics
                        if (sub_course.course_name) {
                            certificateDetails += `<strong>${sub_course.course_name}</strong>`;
                        }
    
                        if (sub_course.topics && sub_course.topics.length > 0) {
                            certificateDetails += `Topics: ${sub_course.topics.join(', ')}`;
                        }
    
                        // Sub-course link
                        if (sub_course.link) {
                            certificateDetails += ` <a href="${sub_course.link}" target="_blank" class="certificate-link">Verify Sub-course</a>`;
                        }
    
                        certificateDetails += `</li>`;
                    });
    
                    certificateDetails += `</ul></div>`;
                }
    
                // Append the certificate item to the list
                listItem.innerHTML = certificateDetails;
                certificatesList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching certificates:', error));
    
    

    fetch("data/projects.json")
        .then(response => response.json())
        .then(data => {
            const projects = data.projects;  // Access the projects array within the object
            const projectsList = document.getElementById("projects-list");

            projects.forEach(project => {
            const listItem = document.createElement("li");

            // Add project name and description
            listItem.innerHTML = `<strong>${project.name}</strong><br>${project.description}<br>`;

            // Add GitHub link
            if (project.repository){
            listItem.innerHTML += `<a href="${project.repository}" target="_blank">GitHub Repository</a>`;
            }

            // Add Live link if available
            if (project.liveLink) {
                listItem.innerHTML += `  | <a href="${project.liveLink}" target="_blank">View Live</a>`;
            }

            // Generate technology icons
            const techIcons = project.technologies.map(tech => {
                return `<div class="skill-item">
                            <img src="img/icons/${tech.toLowerCase()}-logo.png" alt="${tech} icon" class="tech-icon-img" >
                            <span>${tech}</span>
                        </div>`;
            }).join(" ");
        

            // Add technologies icons
            listItem.innerHTML += `<br><strong>Technologies:</strong> <div class="skill-items">${techIcons}<div>`;

            // Append list item to the project list
            projectsList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching projects:", error));


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


document.addEventListener('DOMContentLoaded', function() {
    var toggles = document.querySelectorAll('.toggle-input');
    toggles.forEach(function(toggle) {
        toggle.addEventListener('change', function() {
            var content = this.nextElementSibling.nextElementSibling;
            if (this.checked) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
});