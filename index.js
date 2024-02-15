
//hente json-dataen asynkront, idk æ prøvde
async function fetchMountains() {
    try {
        const response = await fetch("mountains.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON: ', error);
        return [];
    }
  }
//vise fjellene i en tabell 
async function displayMountains() {
    const data1 = await fetchMountains();
    const table = document.getElementById('mountainTable');
    data1.forEach(mountain => {
        const row = table.insertRow();
        const fylkeCell = row.insertCell(0);
        const fjellCell = row.insertCell(1);
        const hoydeCell = row.insertCell(2);
        fylkeCell.textContent = mountain.Fylke;
        fjellCell.textContent = mountain.hoyesteFjell;
        hoydeCell.textContent = mountain.hoydeMeter;
    });
}

//sortere fjellene etter høyde
async function sortMountains(){
    const table = document.getElementById('mountainTable');
    const rows = Array.from(table.querySelectorAll('tbody > tr')).slice(1);
    rows.sort(async (a,b) => {
        const heightA = parseInt(a.cells[2].textContent);
        const heightB = parseInt(b.cells[2].textContent);
        return heightB - heightA;
    });
    rows.forEach(row => table.appendChild(row));
}

//hovedfunksjon
async function main() {
    await fetchMountains();
    await displayMountains(); //viser fjellene i tabellen
    await sortMountains(); //sorterer fjellene 
}

main();