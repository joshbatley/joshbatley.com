const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

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