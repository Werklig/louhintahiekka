// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Select the references and news sections by its ID
  const referencesSection = document.getElementById("referencesSection");
  const newsSection = document.getElementById("newsSection");

  // Check if the references section exists
  if (referencesSection) {
    // Select all .cms_item elements inside the #referencesSection
    const cmsItems = referencesSection.querySelectorAll(".cms_item");

    // If no .cms_item elements are found, hide the #referencesSection
    if (cmsItems.length === 0) {
      referencesSection.style.display = "none";
    }
  }
  if (newsSection) {
    // Select all .cms_item elements inside the #newsSection
    const cmsItems = newsSection.querySelectorAll(".cms_item");

    // If no .cms_item elements are found, hide the #referencesSection
    if (cmsItems.length === 0) {
      newsSection.style.display = "none";
    }
  }
});
