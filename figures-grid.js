// Function to apply or remove grid-column-start based on screen width
function updateGridColumns() {
  const screenWidth = window.innerWidth;

  // Select all elements with class figures_item_wrap and figures_list
  const figuresList = document.querySelector('.figures_list');
  const figuresItems = figuresList.querySelectorAll('.figures_item_wrap');
  const invisibleFigures = figuresList.querySelectorAll('.figures_item_wrap.w-condition-invisible');

  // Apply CSS only if screen width is greater than 1266px
  if (screenWidth > 1266) {
    if (invisibleFigures.length > 1) {
      // Apply grid-column-start to the first and second .figures_item_wrap
      if (figuresItems.length > 0) {
        figuresItems[0].style.gridColumnStart = '2';
      }
      if (figuresItems.length > 1) {
        figuresItems[1].style.gridColumnStart = '3';
      }
    }
  } else {
    // Remove the grid-column-start properties when screen width is below 1267px
    if (figuresItems.length > 0) {
      figuresItems[0].style.gridColumnStart = '';
    }
    if (figuresItems.length > 1) {
      figuresItems[1].style.gridColumnStart = '';
    }
  }
}

// Initial check when the page loads
updateGridColumns();

// Listen for resize events and update the grid columns accordingly
window.addEventListener('resize', updateGridColumns);
