export const capitalize = (title:string) => {
    const capitalizedTitulo=title
    .split(" ")
    .map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(" ");
    return capitalizedTitulo;
}

export const minutes = (date: Date) => {
    const ahora = new Date();
    const minutesTranscurridos = Math.floor(
      (ahora.getTime() - date.getTime()) / 60000
    );
    return minutesTranscurridos;
}
    