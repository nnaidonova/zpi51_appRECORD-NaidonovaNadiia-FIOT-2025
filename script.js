document.addEventListener("DOMContentLoaded", function () {
  const labTabs = document.querySelectorAll(".lab-tab[data-lab-tab]");
  const labMenus = document.querySelectorAll("[data-lab-menu]");
  const labBlocks = document.querySelectorAll("main > section[data-lab]");

  function setActiveLab(labName) {
    // tabs active state
    labTabs.forEach(t => t.classList.toggle("active", t.dataset.labTab === labName));

    // show/hide left menus
    labMenus.forEach(menu => {
      menu.hidden = (menu.dataset.labMenu !== labName);
    });

    // show/hide main lab blocks
    labBlocks.forEach(block => {
      block.hidden = (block.dataset.lab !== labName);
    });

    // activate first section of chosen lab
    const activeBlock = document.querySelector(`main > section[data-lab="${labName}"]`);
    if (!activeBlock) return;

    const sections = activeBlock.querySelectorAll(".tab-section");
    sections.forEach(sec => sec.classList.remove("active"));
    if (sections.length > 0) sections[0].classList.add("active");

    // set first left-menu item as primary
    const activeMenu = document.querySelector(`[data-lab-menu="${labName}"]`);
    if (!activeMenu) return;
    const links = activeMenu.querySelectorAll(".oval-button");
    links.forEach(l => l.classList.remove("primary"));
    if (links.length > 0) links[0].classList.add("primary");

    // optional: align hash for readability
    // window.location.hash = `#${labName}`;
  }

  // LEFT MENU: click handlers (delegation for each menu)
  labMenus.forEach(menu => {
    menu.addEventListener("click", function (e) {
      const link = e.target.closest("a.oval-button");
      if (!link) return;

      const targetId = link.getAttribute("href").replace("#", "");
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      e.preventDefault();

      // determine current active lab by visible menu
      const labName = menu.dataset.labMenu;
      const activeBlock = document.querySelector(`main > section[data-lab="${labName}"]`);
      if (!activeBlock) return;

      // hide all sections within active lab
      activeBlock.querySelectorAll(".tab-section").forEach(sec => sec.classList.remove("active"));

      // show selected section
      targetSection.classList.add("active");

      // highlight clicked link
      menu.querySelectorAll(".oval-button").forEach(l => l.classList.remove("primary"));
      link.classList.add("primary");
    });
  });

  // TOP TABS: click handlers
  labTabs.forEach(tab => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      setActiveLab(this.dataset.labTab);
    });
  });

  // Initial lab (by hash if #lab2 exists, else lab1)
  const initial = (window.location.hash === "#lab2") ? "lab2" : "lab1";
  setActiveLab(initial);
});
