let currentlyFetching = false;

document.getElementById('unit-select').addEventListener('change', updateUnit);
updateUnit();

document.getElementById('generate-saq').addEventListener('click', generateSAQ);

async function updateUnit() {
  if (currentlyFetching) return;
  currentlyFetching = true;

  const res = await fetch('/unit/' + document.getElementById('unit-select').value);
  const json = await res.json();
  console.log(json);

  document.getElementById('unit-info').innerHTML = json.info;

  currentlyFetching = false;
}

async function generateSAQ() {
  if (currentlyFetching) return;
  currentlyFetching = true;

  const res = await fetch('/generate/saq/unit/' + document.getElementById('unit-select').value);
  const json = await res.json();

  console.log(json);

  document.getElementById('generated-content').innerHTML = json.info;

  currentlyFetching = false;
}