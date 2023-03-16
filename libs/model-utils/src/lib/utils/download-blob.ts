/**
 * Triggers a browser download of the given `Blob`, and should be cross-browser
 * compatible (looking at you IE).
 */
export function downloadBlob(data: Blob, fileName?: string): void {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  const blob = new Blob([data], { type: data.type });

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window.navigator as any)?.msSaveOrOpenBlob) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.navigator as any).msSaveOrOpenBlob(blob, fileName);
    return;
  }

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const otherData = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = otherData;
  link.setAttribute('download', fileName ?? '');
  // this is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(otherData);
    link.remove();
  }, 100);
}
