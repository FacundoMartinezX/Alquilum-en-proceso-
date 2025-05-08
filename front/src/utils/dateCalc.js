export function calcularDias(start, end) {
    const inicio = new Date(start);
    const fin = new Date(end);
    const diferencia = fin - inicio;
    const dias = diferencia / (1000 * 60 * 60 * 24);
    return dias;
  }