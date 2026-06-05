document.addEventListener("DOMContentLoaded", function () {
  const labTabs = document.querySelectorAll(".lab-tab[data-lab-tab]");
  const labMenus = document.querySelectorAll("[data-lab-menu]");
  const labBlocks = document.querySelectorAll("main > section[data-lab]");

  function activateSection(labName, targetId) {
    const activeBlock = document.querySelector(`main > section[data-lab="${labName}"]`);
    const activeMenu = document.querySelector(`[data-lab-menu="${labName}"]`);
    if (!activeBlock || !activeMenu) return;

    const sections = activeBlock.querySelectorAll(".tab-section");
    const links = activeMenu.querySelectorAll(".oval-button");
    const targetSection = targetId
      ? activeBlock.querySelector(`#${CSS.escape(targetId)}`)
      : sections[0];

    sections.forEach(section => section.classList.remove("active"));
    links.forEach(link => link.classList.remove("primary"));

    const sectionToShow = targetSection || sections[0];
    if (sectionToShow) sectionToShow.classList.add("active");

    const activeLink = sectionToShow
      ? activeMenu.querySelector(`a[href="#${CSS.escape(sectionToShow.id)}"]`)
      : null;

    if (activeLink) activeLink.classList.add("primary");
    else if (links[0]) links[0].classList.add("primary");
  }

  function setActiveLab(labName, targetId = "") {
    const activeBlock = document.querySelector(`main > section[data-lab="${labName}"]`);
    const activeMenu = document.querySelector(`[data-lab-menu="${labName}"]`);

    // Не перемикаємося на вкладку, для якої ще не створено контент або меню.
    if (!activeBlock || !activeMenu) return;

    labTabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.labTab === labName);
    });

    labMenus.forEach(menu => {
      menu.hidden = menu.dataset.labMenu !== labName;
    });

    labBlocks.forEach(block => {
      block.hidden = block.dataset.lab !== labName;
    });

    activateSection(labName, targetId);
  }

  labMenus.forEach(menu => {
    menu.addEventListener("click", function (event) {
      const link = event.target.closest("a.oval-button");
      if (!link) return;

      const targetId = link.getAttribute("href").replace("#", "");
      if (!document.getElementById(targetId)) return;

      event.preventDefault();
      const labName = menu.dataset.labMenu;
      setActiveLab(labName, targetId);
      history.replaceState(null, "", `#${targetId}`);
    });
  });

  labTabs.forEach(tab => {
    tab.addEventListener("click", function (event) {
      event.preventDefault();
      const labName = this.dataset.labTab;
      setActiveLab(labName);
      history.replaceState(null, "", `#${labName}`);
    });
  });

  const hash = window.location.hash.replace("#", "");
  const sectionFromHash = hash ? document.getElementById(hash) : null;
  const labFromSection = sectionFromHash?.closest("main > section[data-lab]")?.dataset.lab;
  const initialLab = labFromSection || (document.querySelector(`main > section[data-lab="${hash}"]`) ? hash : "lab1");
  const initialSection = labFromSection ? hash : "";

  setActiveLab(initialLab, initialSection);
});
