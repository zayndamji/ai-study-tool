document.getElementById('unit-select').addEventListener('change', async () => {
  const res = await fetch('/unit/' + document.getElementById('unit-select').value);
  const json = await res.json();
  console.log(json);
});