export function copyToClipboard(id: string) {
  const text = document.getElementById(id)?.innerText;
  if (text)
    navigator.clipboard
      .writeText(text)

      .catch((err) => {
        console.error("Error copying text: ", err);
      });
}
