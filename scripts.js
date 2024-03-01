document.getElementById('pedidoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const jsonData = {};

    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch('/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensagem').innerHTML = `<p style="color: green;">${data.message} ID do Pedido: ${data.pedido_id}</p>`;
    })
    .catch(error => {
        document.getElementById('mensagem').innerHTML = `<p style="color: red;">Erro: ${error}</p>`;
    });
});
