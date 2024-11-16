export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
}

type Order = "asc" | "desc";

export function sortByColumn(array: [], column: string, order: Order = "asc"): [] {
  console.log(array);
  return array.sort((a, b) => {
    const valueA = a[column];
    const valueB = b[column];

    if (order === "asc") {
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
    } else if (order === "desc") {
      if (valueA > valueB) return -1;
      if (valueA < valueB) return 1;
    }
    return 0;
  });
}
