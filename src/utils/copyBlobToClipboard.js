export default async function copyBlobToClipboard(blob) {
  await navigator.clipboard.write([
    // eslint-disable-next-line no-undef
    new ClipboardItem({
      [blob.type]: blob
    })
  ]);
}