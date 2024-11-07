let currentlyUpdatingUnit = false;
async function updateUnit() {
  if (currentlyUpdatingUnit) return;
  currentlyUpdatingUnit = true;

  const res = await fetch('/unit/' + document.getElementById('unit-select').value);
  const json = await res.json();
  console.log(json);

  currentlyUpdatingUnit = false;
}

document.getElementById('unit-select').addEventListener('change', updateUnit);
updateUnit();