# cotizador-carving
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CARVING EVOLUTION - Cotizador</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    header {
      background: linear-gradient(135deg, #000, #c00);
      color: white;
      text-align: center;
      padding: 20px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    header img {
      max-width: 250px;
      margin-bottom: 10px;
      filter: drop-shadow(2px 2px 4px #000);
    }
    h2 {
      margin: 0;
      font-size: 28px;
    }
    .info {
      font-size: 14px;
      margin-top: 5px;
    }
    form {
      background: #fff;
      padding: 20px;
      max-width: 800px;
      margin: 20px auto;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    form label {
      display: block;
      margin-bottom: 10px;
    }
    form input, form select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 6px;
      margin-top: 4px;
    }
    .btn {
      background-color: #c00;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 15px;
    }
    .btn:hover {
      background-color: #900;
    }
    table {
      width: 90%;
      margin: 20px auto;
      border-collapse: collapse;
      background: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    }
    table th, table td {
      border: 1px solid #ddd;
      padding: 10px;
    }
    table thead {
      background-color: #333;
      color: white;
    }
    table tbody tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    .total-section {
      width: 90%;
      margin: 20px auto;
      text-align: right;
      font-size: 18px;
    }
    .total-section h3 {
      font-size: 22px;
      color: #c00;
    }
    @media print {
      .btn, form {
        display: none;
      }
      body {
        background: white;
      }
      table, .total-section {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <header>
    <img src="logo_transparente.png" alt="Logo CARVING EVOLUTION" />
    <h2>CARVING EVOLUTION</h2>
    <p class="info">Tel: 477 533 13 28 | Email: jantoniocd703@gmail.com | Facebook: Carving_Evolution</p>
  </header>

  <form id="item-form">
    <label>Nombre del cliente: <input type="text" id="cliente" required></label>
    <label>Tipo de material: <input type="text" id="material" required></label>
    <label>Tipo:
      <select id="tipo">
        <option value="Corte">Corte</option>
        <option value="Grabado">Grabado</option>
      </select>
    </label>
    <label>Descripción: <input type="text" id="descripcion" required></label>
    <label>cantidad: <input type="number" id="cantidad" required></label>
    <label>Precio Unitario ($): <input type="number" id="precio" step="0.01" required></label>
    <button type="submit" class="btn">Agregar</button>
  </form>

  <table id="cotizacion">
    <thead>
      <tr>
        <th>Tipo</th>
        <th>Descripción</th>
        <th>cantidad</th>
        <th>Precio Unitario</th>
        <th>Subtotal</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <div class="total-section">
    <p><strong>Cliente:</strong> <span id="cliente-mostrar"></span></p>
    <p><strong>Material:</strong> <span id="material-mostrar"></span></p>
    <p>Subtotal: $<span id="subtotal">0.00</span></p>
    <p>IVA (16%): $<span id="iva">0.00</span></p>
    <h3>Total: $<span id="total">0.00</span></h3>
  </div>

  <div style="text-align: center">
    <button onclick="window.print()" class="btn">🖨️ Imprimir / Guardar PDF</button>
  </div>

  <script>
    const form = document.getElementById('item-form');
    const tbody = document.querySelector('#cotizacion tbody');
    const subtotalSpan = document.getElementById('subtotal');
    const ivaSpan = document.getElementById('iva');
    const totalSpan = document.getElementById('total');
    const clienteMostrar = document.getElementById('cliente-mostrar');
    const materialMostrar = document.getElementById('material-mostrar');

    let subtotal = 0;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const cliente = document.getElementById('cliente').value;
      const material = document.getElementById('material').value;
      const tipo = document.getElementById('tipo').value;
      const descripcion = document.getElementById('descripcion').value;
      const cantidad = parseFloat(document.getElementById('cantidad').value);
      const precio = parseFloat(document.getElementById('precio').value);
      const itemSubtotal = cantidad * precio;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${tipo}</td>
        <td>${descripcion}</td>
        <td>${cantidad}</td>
        <td>$${precio.toFixed(2)}</td>
        <td>$${itemSubtotal.toFixed(2)}</td>
      `;

      tbody.appendChild(row);

      subtotal += itemSubtotal;
      const iva = subtotal * 0.16;
      const total = subtotal + iva;

      subtotalSpan.textContent = subtotal.toFixed(2);
      ivaSpan.textContent = iva.toFixed(2);
      totalSpan.textContent = total.toFixed(2);

      clienteMostrar.textContent = cliente;
      materialMostrar.textContent = material;

      form.reset();
    });
  </script>
</body>
</html>
