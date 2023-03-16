/* eslint-disable @typescript-eslint/no-explicit-any */
import { downloadBlob } from './download-blob';

describe('downloadBlob', () => {
  it('should download on IE', () => {
    const blob = new Blob();
    (window.navigator as any).msSaveOrOpenBlob = jest.fn();

    downloadBlob(blob, 'my-file.json');

    expect((window.navigator as any).msSaveOrOpenBlob).toHaveBeenCalledWith(blob, 'my-file.json');
    (window.navigator as any).msSaveOrOpenBlob = undefined;
  });

  it('should download on other browsers', () => {
    const blob = new Blob();
    jest.spyOn(document, 'createElement');
    window.URL.createObjectURL = jest.fn();

    downloadBlob(blob, 'my-file.json');

    expect(document.createElement).toHaveBeenCalledWith('a');
  });
});
