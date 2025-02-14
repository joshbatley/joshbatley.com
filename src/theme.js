const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

document.addEventListener('DOMContentLoaded', function () {
  var storedState = localStorage.getItem('joshbatley.theme.changed');
  var isChecked = storedState === null ? false : storedState === 'true';
  document.getElementById('theme-selector').checked = isChecked;
  updateCodeHightlighting(isChecked ? !preferDark : preferDark);
});

document.getElementById('theme-selector').addEventListener('change', (event) => {
  var isChecked = event.target.checked;
  localStorage.setItem('joshbatley.theme.changed', isChecked.toString());
  updateCodeHightlighting(isChecked ? !preferDark : preferDark);
});

function updateCodeHightlighting(preferDark) {
  const themeLink = document.getElementById('codeHighlighting');
  if (preferDark) {
    themeLink.href = "https://unpkg.com/@highlightjs/cdn-assets@11.9.0/styles/github-dark.min.css"
  } else {
    themeLink.href = "https://unpkg.com/@highlightjs/cdn-assets@11.9.0/styles/github.min.css"
  }
}

hljs.highlightAll();