function drawSnowflakes() {
    fetch("/draw")
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => alert("Error al generar los copos"));
}
