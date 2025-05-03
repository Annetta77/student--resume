document.addEventListener('DOMContentLoaded', function () {
  const sectionBtns = document.querySelectorAll('.item-btn');
  const sections = document.querySelectorAll('.main__section');
  const skillsBtns = document.querySelectorAll('.skills__btn');
  const skillsCount = document.querySelector('.skills__num');
  const saveBtn = document.querySelector('.experience-btn');

  const resumeName = document.querySelector('.result__name');
  const resumeCity = document.querySelector('.result__city');
  const resumeUniversity = document.querySelector('.result__university');
  const resumeSkillsList = document.querySelector('.result__skillsList');
  const resumeExperience = document.querySelector('.result__experience');

  const formName = document.querySelector('.section__form--name');
  const formExperience = document.querySelector('.section__form--experience');

  const skillsArr = [];
  const maxSkills = 5;
  skillsCount.textContent = `${skillsArr.length}/${maxSkills}`;

  sectionBtns.forEach((btn, index) => {
    btn.addEventListener('click', function () {
      sectionBtns.forEach((b) => b.classList.remove('item-btn--active'));
      sections.forEach((sec) => sec.classList.remove('main__section--active'));

      btn.classList.add('item-btn--active');
      sections[index].classList.add('main__section--active');
    });
  });

  skillsBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const index = skillsArr.indexOf(btn);

      if (index !== -1) {
        btn.classList.remove('skills__btn--active');
        skillsArr.splice(index, 1);
        enableAllSkills();
      } else {
        if (skillsArr.length >= maxSkills) {
          alert(`Вы можете выбрать не более ${maxSkills} навыков`);
          return;
        }
        btn.classList.add('skills__btn--active');
        skillsArr.push(btn);

        if (skillsArr.length === maxSkills) {
          disableUnselectedSkills();
        }
      }

      skillsCount.textContent = `${skillsArr.length}/${maxSkills}`;
      updateSkillsInResume();
    });
  });

  saveBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const name = formName.querySelector('[name="name"]').value;
    const city = formName.querySelector('[name="city"]').value;
    const university = formName.querySelector('[name="university"]').value;

    const experience = formExperience.querySelector(
      '[name="experience"]'
    ).value;

    updateResume({
      name,
      city,
      university,
      experience,
    });
    sectionBtns[3].click();
  });

  function updateResume(data) {
    if (data.name) resumeName.textContent = data.name;
    if (data.city) resumeCity.textContent = data.city;
    if (data.university) resumeUniversity.textContent = data.university;
    if (data.experience) resumeExperience.textContent = data.experience;
    updateSkillsInResume();
  }

  function updateSkillsInResume() {
    resumeSkillsList.innerHTML = '';
    skillsArr.forEach((skill) => {
      const skillItem = document.createElement('li');
      skillItem.textContent = skill.textContent;
      resumeSkillsList.appendChild(skillItem);
    });
  }

  function disableUnselectedSkills() {
    skillsBtns.forEach((btn) => {
      if (!btn.classList.contains('skills__btn--active')) {
        btn.style.opacity = '0.5';
      }
    });
  }

  function enableAllSkills() {
    skillsBtns.forEach((btn) => {
      btn.style.opacity = '1';
    });
  }

  sectionBtns[0].classList.add('item-btn--active');
});
