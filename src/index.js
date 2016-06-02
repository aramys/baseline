var styles = baseline,
    sourceName = 'baseline',
    BaseLine = new Converter(),
    input = document.getElementById('in'),
    output = document.getElementById('out'),
    form = document.getElementById('form'),
    selector = document.getElementById('selector'),
    reset = document.getElementById('reset'),
    source = document.getElementById('source'),
    generate = document.getElementById('generate');

function generateCSS() {
  if (sourceName === 'baseline') {
    output.value = BaseLine.run(JSON.parse(input.value), sourceName);
  }else{
    output.value = BaseLine.read(JSON.parse(input.value));
  }
}

function resetForm() {
  input.value = JSON.stringify(styles, null, '  ');
  generateCSS();
  BaseLine.draw();
}


function selectFile() {
  sourceName = selector.options[selector.selectedIndex].value;

  styles = window[sourceName];
  BaseLine.parse(styles, styles);
  source.innerHTML = sourceName;
  resetForm();
}

reset.addEventListener('click', resetForm);
selector.addEventListener('change', selectFile);

form.addEventListener('submit', function(e) {
  e.preventDefault();
  e.stopPropagation();

  generateCSS();
});

selectFile();
